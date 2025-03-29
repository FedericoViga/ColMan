"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useDebounce from "../_hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";

function SearchGames() {
  const searchRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    searchRef.current.addEventListener("keydown", (e) => {
      e.key === "Enter" ? searchRef.current.blur() : null;
    });
  });

  const loadDataDebounced = useDebounce(handleSearch, 700);

  function handleSearch(searchQuery) {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("query", searchQuery);
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
          /* className="w-full rounded border p-3" */
          className="border-primary block w-full rounded-lg border p-2.5 ps-10 text-white placeholder-gray-400 focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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

export default SearchGames;
