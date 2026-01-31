import SigninButton from "../_components/SigninButton";

export const metadata = {
  title: "Login",
};

function Page() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-secondary text-5xl font-bold">ColMan</h1>
      <div className="text-secondary flex flex-col gap-2 px-5">
        <p>
          ColMan sta per Collection Manager:
          <br />È una Single Page Application sviluppata da{" "}
          <a
            href="https://portfolio-federico-vigano.vercel.app/"
            className="text-accent decoration-accent underline underline-offset-3"
          >
            Federico Viganò
          </a>
          &nbsp;per uso personale.
        </p>

        <p>
          Maggiori informazioni su{" "}
          <a
            href="https://github.com/FedericoViga/ColMan"
            className="text-accent decoration-accent underline underline-offset-3"
          >
            GitHub
          </a>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 px-5">
        <h2 className="text-secondary text-lg font-bold">
          Accedi per visualizzare ColMan
        </h2>
        <p className="text-secondary">
          Accesso autorizzato solo ad uno specifico account Google
        </p>
        <SigninButton />
      </div>

      <span className="text-secondary fixed bottom-2">
        {currentYear} ColMan by Federico Viganò
      </span>
    </div>
  );
}

export default Page;
