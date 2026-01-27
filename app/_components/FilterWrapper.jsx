"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import PlatformSelectorButton from "./PlatformSelectorButton";
import PlatformFilterSelectorPagination from "./PlatformFilterSelectorPagination";
import { groupByPlatformOwner } from "../_lib/utils";

function FilterWrapper({ platforms, numGamesByPlatform }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const [filterName, setFilterName] = useState("Tutte"); // valore del filtro mostrato nel button di selezione piattaforma
  const filterRef = useRef(null);

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");

  return (
    <>
      <div className="mb-3 w-full">
        <div className="flex items-baseline gap-3">
          <span className="text-primary">Piattaforma</span>

          <PlatformSelectorButton
            onOpenFilters={setOpenFilters}
            isExpanded={isExpanded}
            filterName={filterName}
          />

          {filterName !== "---" && filterName !== "Tutte" && (
            <span className="text-primary">
              {numGamesByPlatform === 0 || numGamesByPlatform > 1
                ? `${numGamesByPlatform} Giochi`
                : `${numGamesByPlatform} Gioco`}
            </span>
          )}
        </div>

        <div
          ref={filterRef}
          style={{
            maxHeight: isExpanded
              ? `${filterRef.current?.scrollHeight}px`
              : "0px",
          }}
          className="w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        >
          {platforms.length !== 0 ? (
            <>
              {platformsByOwner.map((platform, i) => (
                <PlatformFilterSelectorPagination
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
                  onExpanded={setOpenFilters}
                  onFilterName={setFilterName}
                  filterName={filterName}
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
        className={`${isExpanded ? "border-accent" : "border-primary"} mb-4 w-full`}
      />
    </>
  );
}

export default FilterWrapper;
