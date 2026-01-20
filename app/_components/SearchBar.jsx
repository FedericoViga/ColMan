"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { textDebounce } from "../_lib/utils";

function SearchBar({ onOpenFilters }) {
  const searchRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // avvia ricerca premendo enter e nasconde la tastiera virtuale da mobile
  useEffect(() => {
    searchRef.current.addEventListener("keydown", (e) => {
      e.key === "Enter" ? searchRef.current.blur() : null;
    });
  }, []);

  // chiude il filtro piattaforme al focus della search bar
  useEffect(() => {
    searchRef.current.addEventListener("focus", () => {
      onOpenFilters(false);
    });
  }, []);

  const loadDataDebounced = textDebounce(handleSearch, 600);

  function handleSearch(searchQuery) {
    const cleanedValue = searchQuery.replace(/^ +/, ""); // impedisce la ricerca di stringhe con solo spazi
    const params = new URLSearchParams(searchParams);
    if (cleanedValue) {
      params.set("query", cleanedValue);
    } else {
      params.delete("query");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={searchRef}
          type="search"
          name="search-games"
          id="search-games"
          className="focus-within:border-accent focus-within:bg-background focus:bg-background focus:ring-accent block w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 ps-10 focus:ring-1 focus:outline-none"
          placeholder="Cerca gioco"
          onChange={(e) => loadDataDebounced(e.target.value)}
          defaultValue=""
          autoComplete="off"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <MagnifyingGlassIcon className="h-4 w-4"></MagnifyingGlassIcon>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
