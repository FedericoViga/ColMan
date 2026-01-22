"use client";

import { supabase } from "../_lib/supabaseClient";

function SigninButton() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="border-accent flex items-center gap-4 rounded border px-4 py-2 text-lg font-bold"
    >
      {/*       <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Logo Google"
        height="24"
        width="24"
      /> */}
      <span>Continua con Google</span>
    </button>
  );
}

export default SigninButton;
