import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type, Schema } from "npm:@google/genai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function searchGoogleBooks(query: string, maxResults: number = 10) {
  try {
    const apiKey = Deno.env.get('GOOGLE_BOOKS_API_KEY');
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&langRestrict=en${keyParam}`);
    if (!response.ok) return { error: 'API_ERROR', data: [] };
    const data = await response.json();
    if (!data.items) return { error: 'NO_RESULTS', data: [] };
    
    return {
      data: data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        description: item.volumeInfo.description || "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
        highResCover: item.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=3').replace('http:', 'https:') || null,
        categories: item.volumeInfo.categories || [],
        averageRating: item.volumeInfo.averageRating || null,
        publishedDate: item.volumeInfo.publishedDate || null,
        previewLink: item.volumeInfo.previewLink || null,
      }))
    };
  } catch (err) {
    return { error: 'NETWORK_ERROR', data: [] };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let userMessage = "";
  let conversation = [];

  try {
    const body = await req.json();
    userMessage = body.message || "";
    conversation = body.conversation || [];

    if (!userMessage) {
      return new Response(JSON.stringify({ success: false, message: "Empty request." }), { status: 400, headers: corsHeaders });
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error("AI service is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Use a strict tool structure
    const searchGoogleBooksTool = {
      name: 'search_google_books',
      description: 'Search the Google Books API for real books matching the user\'s request. Use this tool whenever the user asks for book recommendations.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          query: { type: Type.STRING, description: 'The search query to send to Google Books' },
          maxResults: { type: Type.INTEGER, description: 'Maximum results to return' },
        },
        required: ['query'],
      } as Schema,
    };

    // Format contents specifically for @google/genai v2.17+ 
    const contents: any[] = conversation
      .filter((msg: any) => msg.text && typeof msg.text === 'string' && msg.text.trim().length > 0)
      .map((msg: any) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // Prevent duplicate last message
    if (contents.length > 0 && contents[contents.length - 1].role === 'user' && contents[contents.length - 1].parts[0].text === userMessage) {
      contents.pop();
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // Gemini requires the first element to be from user
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    const systemInstruction = {
      parts: [{ 
        text: `You are an AI Librarian. Recommend real books to users.
1. NEVER invent a book, author, or title.
2. Only recommend books returned by the search_google_books tool.
3. Format response as JSON with "message" and "recommendations" (array of books with added "reason").
4. Do not include markdown formatting like \`\`\`json in the output.` 
      }]
    };

    console.log("Gemini request started with query:", userMessage);

    let response = await ai.models.generateContent({
      model: 'gemini-3.0-flash',
      contents: contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [searchGoogleBooksTool] }],
        temperature: 0.7,
      }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      if (call.name === 'search_google_books') {
        const args = call.args as any;
        console.log("Google Books request started with query:", args.query);
        const searchResult = await searchGoogleBooks(args.query, args.maxResults || 10);
        console.log("Google Books result count:", searchResult.data?.length || 0);
        
        if (searchResult.error || !searchResult.data) {
           return new Response(JSON.stringify({
             success: true,
             message: "Sorry, I couldn't access the book database right now.",
             recommendations: []
           }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Return function response to model
        response = await ai.models.generateContent({
          model: 'gemini-3.0-flash',
          contents: [
            ...contents,
            { role: 'model', parts: [{ functionCall: call }] },
            { 
              role: 'user', 
              parts: [{
                functionResponse: {
                  name: call.name,
                  response: { books: searchResult.data }
                }
              }]
            }
          ],
          config: {
            systemInstruction,
          }
        });
      }
    }

    const text = response.text || "";
    console.log("Gemini response received");
    
    try {
      const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
      console.log("Recommendation count:", parsed.recommendations?.length || 0);
      return new Response(JSON.stringify({
        success: true,
        message: parsed.message || "Here are some recommendations:",
        recommendations: parsed.recommendations || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (e) {
      // Fallback if AI didn't return valid JSON
      throw new Error("AI returned invalid JSON: " + text);
    }

  } catch (err: any) {
    console.error("Gemini request failed:", err);
    
    // GOOGLE BOOKS FALLBACK
    console.log("Executing Google Books fallback search...");
    try {
      // Create a simplified query from the user's message
      const fallbackQuery = userMessage.split(' ').slice(0, 5).join(' '); // Simple keyword extraction
      const fallbackResults = await searchGoogleBooks(fallbackQuery, 5);
      
      if (!fallbackResults.error && fallbackResults.data && fallbackResults.data.length > 0) {
        return new Response(JSON.stringify({
          success: true,
          message: `I found these books matching "${userMessage}":`,
          recommendations: fallbackResults.data.map((b: any) => ({
            ...b,
            reason: "Found via direct search."
          }))
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    } catch (fallbackErr) {
      console.error("Fallback search also failed:", fallbackErr);
    }

    // Completely failed
    return new Response(JSON.stringify({
      success: false,
      message: "I couldn't complete your recommendation right now.",
      errorDetail: err.message
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
