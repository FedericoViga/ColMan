import SigninButton from "../_components/SigninButton";

function Page() {
  return (
    <div className="section flex min-h-dvh flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-primary text-5xl font-bold">ColMan</h1>
      <div className="gap- flex flex-col">
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

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-primary text-lg font-bold">
          Accedi per visualizzare ColMan
        </h2>
        <p>Accesso autorizzato solo per uno specifico account Google</p>
        <SigninButton />
      </div>

      <span className="text-primary fixed bottom-2">2025 Federico Viganò</span>
    </div>
  );
}

export default Page;
