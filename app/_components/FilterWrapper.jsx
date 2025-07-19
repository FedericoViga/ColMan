"use client";

import { useState } from "react";
import PlatformFilterSelectorPagination from "./PlatformFilterSelectorPagination";
import { useSearchParams } from "next/navigation";
import { groupByPlatformOwner } from "../_lib/utils";

function FilterWrapper({ platforms }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState();

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  return (
    <>
      <div className="mb-3 w-full">
        <div className="flex items-baseline gap-3">
          <span className="text-primary">Piattaforma</span>
          <button
            onClick={() => setOpenFilters((isExp) => !isExp)}
            className={`text-primary cursor-pointer rounded-lg border-slate-600 p-1 text-sm ${isExpanded || (selectedFilter !== "Tutte" && selectedFilter !== undefined) ? "!text-foreground border-2 !border-blue-500" : "border-primary border-2"}`}
          >
            {searchParams.get("platform") === "all" ||
            !searchParams.has("platform")
              ? "Tutte"
              : (selectedFilter ?? searchParams.get("platform"))}
          </button>
        </div>
        <div
          className={`w-full transition-all transition-discrete duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
        >
          {platforms.length !== 0 ? (
            <>
              {platformsToArray.map((platform, i) => (
                <PlatformFilterSelectorPagination
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
                  onExpanded={setOpenFilters}
                  selectedFilter={selectedFilter}
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
        className={`${isExpanded ? "border-blue-500" : "border-primary"} mb-4 w-full`}
      />
    </>
  );
}

export default FilterWrapper;
