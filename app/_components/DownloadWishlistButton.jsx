"use client";

import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

function downloadWishlistButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload() {
    setIsLoading(true);

    try {
      // Fetch dati da Supabase tramite route handler
      const res = await fetch("../api/downloadCsv");

      if (!res.ok) {
        const text = await res.text();
        alert(`Errore: ${text}`);
        setIsLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // crea un <a> momentaneo e forza il click per triggerare il download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "wishlist.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Errore download wishlist CSV:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleDownload}
      type="button"
      aria-label="Scarica wishlist come csv"
      className="flex items-end gap-1"
    >
      <ArrowDownTrayIcon
        className={`h-5 w-5 ${isLoading ? "animate-pulse text-blue-500" : "text-primary"}`}
      />
      <span aria-hidden={true} className="text-primary text-xs">
        .csv
      </span>
    </button>
  );
}

export default downloadWishlistButton;
