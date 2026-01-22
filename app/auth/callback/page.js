"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session && isMounted) {
          router.replace("/"); // redirect alla home se loggato
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkSession();

    return () => {
      isMounted = false; // cleanup se il componente si smonta
    };
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <p>Redirecting…</p>;
}
