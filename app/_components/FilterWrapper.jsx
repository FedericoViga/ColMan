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
        <div className="bg-surface border-surface flex items-baseline gap-3 rounded border px-2 py-3">
          <span className="text-secondary">Piattaforma</span>

          <PlatformSelectorButton
            onOpenFilters={setOpenFilters}
            isExpanded={isExpanded}
            filterName={filterName}
          />

          {filterName !== "---" &&
            filterName !== "Tutte" &&
            numGamesByPlatform !== 0 && (
              <span className="text-secondary">
                {`${numGamesByPlatform} ${numGamesByPlatform === 1 ? "Gioco" : "Giochi"}`}
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
            <p className="text-secondary mt-4">
              Non ci sono ancora piattaforme,{" "}
              <Link
                className="text-foreground underline underline-offset-2"
                href="/settings/my-platforms"
              >
                aggiungine una.
              </Link>
            </p>
          )}
        </div>
      </div>
      <hr
        className={`${isExpanded ? "border-accent" : "border-0"} mb-4 w-full`}
      />
    </>
  );
}

export default FilterWrapper;
