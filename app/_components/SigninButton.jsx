import { signInAction } from "../_lib/actions";

function SigninButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-4 rounded border border-blue-500 px-4 py-2 text-lg font-bold hover:cursor-pointer">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Logo Google"
          height="24"
          width="24"
        />
        <span>Continua con Google</span>
      </button>
    </form>
  );
}

export default SigninButton;
