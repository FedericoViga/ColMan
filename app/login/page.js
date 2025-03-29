import SigninButton from "../_components/SigninButton";

function Page() {
  return (
    <div className="section flex min-h-dvh flex-col items-center justify-center gap-10 text-center">
      <h2 className="text-primary text-lg font-bold">
        Accedi per visualizzare ColMan
      </h2>
      <SigninButton />
    </div>
  );
}

export default Page;
