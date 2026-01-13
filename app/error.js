"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// l'error boundary, essendo client prende solo gli errori di rendering
export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <main className="container mt-10 flex min-w-0 flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Qualcosa è andato storto!</h1>
      <p className="text-primary container max-h-60 min-w-0 overflow-y-scroll break-words">
        {error.message}
      </p>

      <div className="flex items-center justify-center gap-8">
        <button
          className="rounded border border-blue-500 px-2 py-0.5 text-lg"
          onClick={reset}
        >
          Riprova
        </button>

        <Link
          className="underline decoration-blue-500 underline-offset-4"
          href="/"
        >
          Homepage
        </Link>
      </div>
    </main>
  );
}
