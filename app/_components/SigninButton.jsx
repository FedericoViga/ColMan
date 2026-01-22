function SigninButton({ onSignIn }) {
  return (
    <button
      onClick={onSignIn}
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
