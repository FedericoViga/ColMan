"use client";
import { Roboto } from "next/font/google";

import { signInWithGoogleAction } from "../_lib/actions";
import GoogleGLogoIcon from "./icons/GoogleGLogoIcon";

const roboto = Roboto({ subsets: ["latin"], weight: ["600"] });

function SigninButton() {
  const login = async () => {
    await signInWithGoogleAction();
  };

  return (
    <button
      onClick={login}
      className={`${roboto.className} border-[rgb(211, 207, 201)] mt-4 flex items-center gap-2.5 rounded bg-[#F2F2F2] px-3.5 py-2 font-bold text-[#1F1F1F]`}
    >
      <GoogleGLogoIcon className="h-6 w-6" />
      <span>Accedi con Google</span>
    </button>
  );
}

export default SigninButton;
