import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getDeviceId } from "@/lib/deviceId";
import { Database } from "@/lib/database.types";
import { GoogleBook } from "@/lib/googleBooks";

type UserBook = Database["public"]["Tables"]["user_books"]["Row"];
type UserBookInsert = Database["public"]["Tables"]["user_books"]["Insert"];

export function useLibrary() {
  const deviceId = getDeviceId();
  const queryClient = useQueryClient();

  const libraryQuery = useQuery({
    queryKey: ["user_books", deviceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_books")
        .select("*")
        .eq("device_id", deviceId);
      
      if (error) throw error;
      return data as UserBook[];
    },
  });

  const recentlyViewedQuery = useQuery({
    queryKey: ["recently_viewed", deviceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recently_viewed")
        .select("*")
        .eq("device_id", deviceId)
        .order("viewed_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  const addToLibrary = useMutation({
    mutationFn: async (book: GoogleBook & { status?: string, is_favorite?: boolean }) => {
      const entry: UserBookInsert = {
        device_id: deviceId,
        book_id: book.id,
        title: book.title,
        author: book.authors?.[0] || null,
        cover_url: book.highResCover || book.thumbnail || null,
        status: (book.status as any) || "want_to_read",
        is_favorite: book.is_favorite || false,
        total_pages: book.pageCount || 0,
      };

      const { error } = await supabase
        .from("user_books")
        .upsert(entry as any, { onConflict: "device_id, book_id" });
      
      if (error) {
        console.error("Library Upsert Error:", error);
        throw error;
      }
    },
    onError: (err) => {
      console.error("addToLibrary failed:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_books", deviceId] });
    }
  });

  const trackView = useMutation({
    mutationFn: async (book: GoogleBook) => {
      const { error } = await supabase
        .from("recently_viewed")
        .insert({
          device_id: deviceId,
          book_id: book.id,
          title: book.title,
          author: book.authors?.[0] || null,
          cover_url: book.highResCover || book.thumbnail || null,
        } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recently_viewed", deviceId] });
    }
  });

  const updateBook = useMutation({
    mutationFn: async ({ bookId, updates }: { bookId: string, updates: Partial<UserBook> }) => {
      const { error } = await supabase
        .from("user_books")
        .update(updates as any)
        .eq("device_id", deviceId)
        .eq("book_id", bookId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_books", deviceId] });
    }
  });

  const removeBook = useMutation({
    mutationFn: async (bookId: string) => {
      const { error } = await supabase
        .from("user_books")
        .delete()
        .eq("device_id", deviceId)
        .eq("book_id", bookId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_books", deviceId] });
    }
  });

  const library = libraryQuery.data || [];

  return {
    library,
    wantToRead: library.filter(b => b.status === 'want_to_read'),
    currentlyReading: library.filter(b => b.status === 'reading'),
    completed: library.filter(b => b.status === 'completed'),
    favorites: library.filter(b => b.is_favorite),
    recentlyViewed: recentlyViewedQuery.data || [],
    isLoading: libraryQuery.isLoading || recentlyViewedQuery.isLoading,
    addToLibrary,
    updateBook,
    removeBook,
    trackView
  };
}
