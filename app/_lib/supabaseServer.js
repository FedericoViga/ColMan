import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper lato server
export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookies().getAll() } },
  );
}
