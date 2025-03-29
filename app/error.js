"use client";
// l'error boundary, essendo client prende solo gli errori di rendering
export default function Error({ error, reset }) {
  return (
    <main className="container mt-10 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Qualcosa è andato storto!</h1>
      <p className="text-primary container text-wrap">{error.message}</p>

      <button
        className="inline-block rounded border border-blue-500 px-2 py-1 text-lg"
        onClick={reset}
      >
        Riprova
      </button>
    </main>
  );
}
