import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getDeviceId } from "@/lib/deviceId";
import { Database } from "@/lib/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type ReadingPreferences = Database["public"]["Tables"]["reading_preferences"]["Row"];

export function useProfile() {
  const deviceId = getDeviceId();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile", deviceId],
    queryFn: async () => {
      console.log(`[STARTUP] Fetching profile for device: ${deviceId}`);
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Supabase profile request timed out after 5000ms")), 5000)
      );

      try {
        const result = await Promise.race([
          supabase.from("profiles").select("*").eq("device_id", deviceId).single(),
          timeoutPromise
        ]) as any;

        const { data, error } = result;
        
        if (error) {
          if (error.code === 'PGRST116') {
             console.log("[STARTUP] No profile found, user needs onboarding.");
             return null; // No rows found
          }
          throw error;
        }
        
        console.log("[STARTUP] Profile fetched successfully.");
        return data as Profile;
      } catch (err) {
        console.error("[STARTUP ERROR] Error in profile fetching:", err);
        throw err;
      }
    },
  });

  const preferencesQuery = useQuery({
    queryKey: ["reading_preferences", deviceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reading_preferences")
        .select("*")
        .eq("device_id", deviceId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as ReadingPreferences;
    },
  });

  const createProfile = useMutation({
    mutationFn: async ({ profile, prefs }: { profile: Omit<ProfileInsert, 'device_id'>, prefs: any }) => {
      console.log("[CREATE_PROFILE] 1. Inserting Profile for device:", deviceId);
      const { error: pError } = await supabase
        .from("profiles")
        .insert({ ...profile, device_id: deviceId } as any);
      if (pError) {
        console.error("[CREATE_PROFILE ERROR] Failed to insert profile:", pError);
        throw pError;
      }

      console.log("[CREATE_PROFILE] 2. Inserting Reading Preferences for device:", deviceId);
      const { error: prError } = await supabase
        .from("reading_preferences")
        .insert({ ...prefs, device_id: deviceId } as any);
      if (prError) {
        console.error("[CREATE_PROFILE ERROR] Failed to insert reading_preferences:", prError);
        throw prError;
      }
      
      console.log("[CREATE_PROFILE] Success! Both tables updated.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", deviceId] });
      queryClient.invalidateQueries({ queryKey: ["reading_preferences", deviceId] });
    }
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      const { error } = await supabase
        .from("profiles")
        .update(updates as any)
        .eq("device_id", deviceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", deviceId] });
    }
  });

  return {
    profile: profileQuery.data,
    preferences: preferencesQuery.data,
    isLoading: profileQuery.isLoading || preferencesQuery.isLoading,
    isError: profileQuery.isError || preferencesQuery.isError,
    error: profileQuery.error || preferencesQuery.error,
    createProfile,
    updateProfile
  };
}
