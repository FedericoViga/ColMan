import Link from "next/link";

import { Press_Start_2P } from "next/font/google";

const PressStart2P = Press_Start_2P({
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
  adjustFontFallback: false,
  preload: false,
});

function NotFound() {
  return (
    <main
      className={`container mt-10 space-y-6 text-center ${PressStart2P.className} text-gray-300`}
    >
      <span className="text-lg">404</span>
      <h1 className="mt-5 px-5 text-xs uppercase">
        La pagina che cerchi si trova in un altro castello...
      </h1>
      <Link
        href="/"
        className="inline-block px-2 py-1 text-[10px] underline underline-offset-2"
      >
        TORNA ALLA HOME
      </Link>
    </main>
  );
}

export default NotFound;
