export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          device_id: string
          name: string
          age: number | null
          country: string | null
          language: string | null
          reading_level: string | null
          reading_goal: string | null
          daily_goal_time: string | null
          reading_speed: string | null
          preferred_length: string | null
          mood: string | null
          created_at: string
        }
        Insert: {
          device_id: string
          name: string
          age?: number | null
          country?: string | null
          language?: string | null
          reading_level?: string | null
          reading_goal?: string | null
          daily_goal_time?: string | null
          reading_speed?: string | null
          preferred_length?: string | null
          mood?: string | null
          created_at?: string
        }
        Update: {
          device_id?: string
          name?: string
          age?: number | null
          country?: string | null
          language?: string | null
          reading_level?: string | null
          reading_goal?: string | null
          daily_goal_time?: string | null
          reading_speed?: string | null
          preferred_length?: string | null
          mood?: string | null
          created_at?: string
        }
      }
      reading_preferences: {
        Row: {
          id: string
          device_id: string
          favorite_genres: string[] | null
          favorite_authors: string[] | null
          favorite_books: string[] | null
          books_already_read: string[] | null
          updated_at: string
        }
        Insert: {
          id?: string
          device_id: string
          favorite_genres?: string[] | null
          favorite_authors?: string[] | null
          favorite_books?: string[] | null
          books_already_read?: string[] | null
          updated_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          favorite_genres?: string[] | null
          favorite_authors?: string[] | null
          favorite_books?: string[] | null
          books_already_read?: string[] | null
          updated_at?: string
        }
      }
      user_books: {
        Row: {
          id: string
          device_id: string
          book_id: string
          title: string
          author: string | null
          cover_url: string | null
          status: 'want_to_read' | 'reading' | 'completed' | 'dropped' | null
          progress_percent: number | null
          pages_read: number | null
          total_pages: number | null
          rating: number | null
          notes: string | null
          is_favorite: boolean | null
          is_bookmarked: boolean | null
          updated_at: string
        }
        Insert: {
          id?: string
          device_id: string
          book_id: string
          title: string
          author?: string | null
          cover_url?: string | null
          status?: 'want_to_read' | 'reading' | 'completed' | 'dropped' | null
          progress_percent?: number | null
          pages_read?: number | null
          total_pages?: number | null
          rating?: number | null
          notes?: string | null
          is_favorite?: boolean | null
          is_bookmarked?: boolean | null
          updated_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          book_id?: string
          title?: string
          author?: string | null
          cover_url?: string | null
          status?: 'want_to_read' | 'reading' | 'completed' | 'dropped' | null
          progress_percent?: number | null
          pages_read?: number | null
          total_pages?: number | null
          rating?: number | null
          notes?: string | null
          is_favorite?: boolean | null
          is_bookmarked?: boolean | null
          updated_at?: string
        }
      }
      recently_viewed: {
        Row: {
          id: string
          device_id: string
          book_id: string
          title: string
          author: string | null
          cover_url: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          device_id: string
          book_id: string
          title: string
          author?: string | null
          cover_url?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          book_id?: string
          title?: string
          author?: string | null
          cover_url?: string | null
          viewed_at?: string
        }
      }
    }
  }
}
