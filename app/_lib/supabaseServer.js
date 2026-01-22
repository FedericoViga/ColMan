import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper lato server
export async function createSupabaseServerClient() {
  const allCookies = await cookies().getAll();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => allCookies } },
  );
}
