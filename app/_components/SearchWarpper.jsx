"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PlatformFilterSelectorHome from "./PlatformFilterSelectorHome";
import { groupByPlatformOwner } from "../_lib/utils";

function SearchWarpper({ platforms }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.replace(`/`, { scroll: false });
  }, []);

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  return (
    <div className="container flex flex-col items-center justify-center gap-5 py-3">
      <SearchBar />
      <span className="text-primary self-start">Filtra:</span>
      <div className="w-full">
        <div className="flex items-baseline gap-3">
          <button
            onClick={() => setOpenFilters((isExp) => !isExp)}
            className={`text-primary rounded-lg border-slate-600 p-1 text-sm ${isExpanded ? "!text-foreground border-2 !border-blue-500" : "border-primary border"}`}
          >
            Piattaforme
          </button>
          <span>
            {searchParams.get("platform") === "all" ||
            !searchParams.has("platform")
              ? "Tutte"
              : searchParams.get("platform")}
          </span>
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

export default SearchWarpper;
