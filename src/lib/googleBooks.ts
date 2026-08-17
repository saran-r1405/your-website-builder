export interface GoogleBook {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  description?: string;
  categories: string[];
  language?: string;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  pageCount?: number;
  averageRating?: number;
  ratingsCount?: number;
  previewLink?: string;
  thumbnail?: string;
  highResCover?: string;
}

const API_BASE = "https://www.googleapis.com/books/v1/volumes";

function mapGoogleBook(item: any): GoogleBook {
  const v = item.volumeInfo;
  
  let isbn = undefined;
  if (v.industryIdentifiers) {
    const isbns = v.industryIdentifiers.filter((i: any) => i.type.startsWith("ISBN"));
    if (isbns.length > 0) isbn = isbns[0].identifier;
  }

  // Google books often provides small thumbnails. We can try to request larger ones by stripping zoom=1
  let thumbnail = v.imageLinks?.thumbnail?.replace("http:", "https:");
  let highResCover = thumbnail ? thumbnail.replace("&zoom=1", "&zoom=3") : undefined;

  return {
    id: item.id,
    title: v.title,
    subtitle: v.subtitle,
    authors: v.authors || [],
    description: v.description,
    categories: v.categories || [],
    language: v.language,
    publisher: v.publisher,
    publishedDate: v.publishedDate,
    isbn,
    pageCount: v.pageCount,
    averageRating: v.averageRating,
    ratingsCount: v.ratingsCount,
    previewLink: v.previewLink,
    thumbnail,
    highResCover
  };
}

export interface BookSearchResponse {
  data: GoogleBook[];
  error: 'NETWORK_ERROR' | 'API_ERROR' | 'NO_RESULTS' | null;
}

export async function searchGoogleBooks(query: string, maxResults = 12): Promise<BookSearchResponse> {
  if (!query) return { data: [], error: null };
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  
  try {
    const res = await fetch(`${API_BASE}?q=${encodeURIComponent(query)}&maxResults=${maxResults}${keyParam}`);
    
    if (!res.ok) {
      console.error(`Google Books API Error: ${res.status} ${res.statusText}`);
      return { data: [], error: 'API_ERROR' };
    }
    
    const data = await res.json();
    if (!data.items || data.items.length === 0) return { data: [], error: 'NO_RESULTS' };
    
    return { data: data.items.map(mapGoogleBook), error: null };
  } catch (err) {
    console.error("Network Error fetching from Google Books", err);
    return { data: [], error: 'NETWORK_ERROR' };
  }
}

export async function getGoogleBookById(id: string): Promise<GoogleBook | null> {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const keyParam = apiKey ? `?key=${apiKey}` : "";
  
  try {
    const res = await fetch(`${API_BASE}/${id}${keyParam}`);
    const data = await res.json();
    if (data.error) return null;
    return mapGoogleBook(data);
  } catch (err) {
    console.error("Error fetching book by ID", err);
    return null;
  }
}

export async function getBooksBySubject(subject: string, maxResults = 6): Promise<GoogleBook[]> {
  const res = await searchGoogleBooks(`subject:${subject}`, maxResults);
  return res.data;
}
