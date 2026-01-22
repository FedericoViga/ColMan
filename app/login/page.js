"use client";
import SigninButton from "../_components/SigninButton";
import { supabase } from "../_lib/supabaseClient";

export const metadata = {
  title: "Login",
};

function Page() {
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
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-primary text-5xl font-bold">ColMan</h1>
      <div className="flex flex-col gap-2 px-5">
        <p>
          ColMan sta per Collection Manager ed è una Single Page Application
          sviluppata da{" "}
          <a
            href="https://portfolio-federico-vigano.vercel.app/"
            className="text-blue-400 underline underline-offset-3"
          >
            Federico Viganò
          </a>
          &nbsp;per uso personale.
        </p>

        <p>
          Maggiori informazioni su{" "}
          <a
            href="https://github.com/FedericoViga/ColMan"
            className="text-blue-400 underline underline-offset-3"
          >
            GitHub
          </a>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 px-5">
        <h2 className="text-primary text-lg font-bold">
          Accedi per visualizzare ColMan
        </h2>
        <p>Accesso autorizzato solo per uno specifico account Google</p>
        <SigninButton onSignIn={signInWithGoogle} />
      </div>

      <span className="text-primary fixed bottom-2">
        {currentYear} Federico Viganò
      </span>
    </div>
  );
}

export default Page;
