import { Titillium_Web } from "next/font/google";

import Header from "@/app/_components/Header";
import { Toaster } from "react-hot-toast";

import "./_styles/globals.css";

const TitilliumWeb = Titillium_Web({
  display: "swap",
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata = {
  title: {
    template: "%s | Colman",
    default: "Home | Colman",
  },
  description: "",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${TitilliumWeb.className} tracking-wide antialiased`}>
        <Header />
        <main>
          <Toaster
            position="bottom-center"
            toastOptions={{ error: { duration: 3000 } }}
          />
          {children}
        </main>
      </body>
    </html>
  );
}
