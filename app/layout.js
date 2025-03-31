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
            gutter={12}
            toastOptions={{
              success: {
                style: {
                  border: "1px solid oklch(0.723 0.219 149.579)",
                  background: " var(--background)",
                  color: "var(--foreground)",
                },
              },
              error: {
                duration: 3000,
                style: {
                  border: "1px solid oklch(0.637 0.237 25.331)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                },
              },
            }}
          />
          {children}
        </main>
      </body>
    </html>
  );
}
