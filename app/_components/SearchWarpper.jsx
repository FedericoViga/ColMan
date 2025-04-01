"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import PlatformFilterSelector from "./PlatformFilterSelection";
import { useRouter } from "next/navigation";

function SearchWarpper({ platforms }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/`, { scroll: false });
  }, []);

  // genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove la key è una stringa col nome del platformOwner e il value è un array di oggetti con la lista piattaforme e tutto il resto
  function groupByPlatformOwner(platforms, property) {
    return platforms.reduce((acc, curr) => {
      if (!acc[curr[property]]) {
        acc[curr[property]] = [];
      }
      acc[curr[property]].push(curr);
      return acc;
    }, {});
  }

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  return (
    <div className="container flex flex-col items-center justify-center gap-5 py-3">
      <SearchBar />
      <span className="text-primary self-start">Filtra:</span>
      <div className="w-full">
        <div className="flex">
          <button
            onClick={() => setOpenFilters((isExp) => !isExp)}
            className={`text-primary rounded-lg border-slate-600 p-1 text-sm ${isExpanded ? "!text-foreground border-2 !border-blue-500" : "border-primary border"}`}
          >
            Piattaforme
          </button>
        </div>
        <div
          className={`w-full transition-all transition-discrete duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
        >
          {platforms.length !== 0 ? (
            <>
              {platformsToArray.map((platform, i) => (
                <PlatformFilterSelector
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
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
