import { createClient } from "../_lib/supabase/server";
import { AuthProvider } from "./AuthProvider";

export async function AuthServerWrapper({ children }) {
  const supabase = await createClient();
  const {
    data: { user }, // Get the authenticated user
  } = await supabase.auth.getUser();

  let profile;
  if (user) {
    // Se l'utente è loggato, fetch dati utente
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("id, email, isEnabled")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        `Error fetching profile for user ${user.id}:`,
        profileError.message,
      );
    } else {
      profile = userProfile;
    }
  }

  return (
    <AuthProvider serverUser={user} serverProfile={profile}>
      {children}
    </AuthProvider>
  );
}
