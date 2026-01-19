import { Titillium_Web } from "next/font/google";

import Header from "@/app/_components/Header";
import { Toaster } from "react-hot-toast";
import "./_styles/globals.css";

const titilliumWeb = Titillium_Web({
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
      <body className={`${titilliumWeb.className} tracking-wide antialiased`}>
        <Header />
        <main>
          <Toaster
            position="bottom-center"
            gutter={12}
            toastOptions={{
              success: {
                style: {
                  border: "1px solid oklch(0.8696 0.2201 153.8)",
                  background: "oklch(20.8% 0.042 265.755)",
                  color: "var(--foreground)",
                },
              },
              error: {
                duration: 3000,
                style: {
                  border: "1px solid oklch(0.637 0.2201 25.331)",
                  background: "oklch(20.8% 0.042 265.755)",
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
