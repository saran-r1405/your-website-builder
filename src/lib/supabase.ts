import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("[STARTUP] Supabase URL exists:", !!supabaseUrl);
console.log("[STARTUP] Supabase Anon Key exists:", !!supabaseAnonKey);

let client;
try {
  console.log("[STARTUP] Initializing Supabase createClient...");
  client = createClient<Database>(
    supabaseUrl || "",
    supabaseAnonKey || ""
  );
  console.log("[STARTUP] Supabase client initialized successfully");
} catch (error) {
  console.error("[STARTUP ERROR] Failed to initialize Supabase client:", error);
  // Provide a dummy fallback so it doesn't crash everything instantly, but operations will fail gracefully
  client = {} as ReturnType<typeof createClient<Database>>;
}

export const supabase = client;
