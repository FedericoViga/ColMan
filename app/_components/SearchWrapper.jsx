"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PlatformFilterSelectorHome from "./PlatformFilterSelectorHome";
import { groupByPlatformOwner } from "../_lib/utils";

function SearchWrapper({ platforms }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.replace(`/`, { scroll: false });
  }, []);

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  return (
    <div className="container flex flex-col items-center justify-center gap-6 py-3">
      <SearchBar />

      {/* Filtro piattaforme */}
      <div className="w-full">
        <div className="flex items-baseline gap-3">
          <span className="text-primary">Piattaforma</span>

          <button
            onClick={() => setOpenFilters((isExp) => !isExp)}
            className={`text-primary cursor-pointer rounded-lg border-2 border-slate-600 p-1 text-sm ${isExpanded || (selectedFilter !== "Tutte" && selectedFilter !== undefined) ? "!text-foreground border-2 !border-blue-500" : "border-primary border"}`}
          >
            {searchParams.get("platform") === "all" ||
            !searchParams.has("platform")
              ? "Tutte"
              : selectedFilter}
          </button>
        </div>

        <div
          className={`w-full transition-all transition-discrete duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
        >
          {platforms.length !== 0 ? (
            <>
              {platformsToArray.map((platform, i) => (
                <PlatformFilterSelectorHome
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
                  onExpanded={setOpenFilters}
                  onSelectedFilter={setSelectedFilter}
                />
              ))}
            </>
          ) : (
            <p className="text-primary mt-4">
              Non ci sono ancora piattaforme, prima di creare un gioco devi{" "}
              <Link
                className="text-foreground underline underline-offset-2"
                href="/platforms/insert-platform"
              >
                creare la sua piattaforma!
              </Link>
            </p>
          )}
        </div>
      </div>
      <hr
        className={`${isExpanded ? "border-blue-500" : "border-primary"} w-full`}
      />
    </div>
  );
}

export default SearchWrapper;
