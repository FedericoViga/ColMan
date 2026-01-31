"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { groupByPlatformOwner } from "../_lib/utils";
import SearchBar from "./SearchBar";
import PlatformSelectorButton from "./PlatformSelectorButton";
import PlatformFilterSelectorHome from "./PlatformFilterSelectorHome";

function SearchWrapper({ platforms }) {
  const [curActive, setCurActive] = useState();
  const [isExpanded, setOpenFilters] = useState(false);
  const [filterName, setFilterName] = useState("Tutte"); // valore del filtro mostrato nel button di selezione piattaforma
  const router = useRouter();
  const filterRef = useRef(null);

  useEffect(() => {
    router.replace(`/`, { scroll: false });
  }, []);

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");

  return (
    <div className="container flex flex-col items-center justify-center gap-6 py-3">
      <SearchBar onOpenFilters={setOpenFilters} />

      {/* Filtro piattaforme */}
      <div className="w-full">
        <div className="flex items-center gap-3">
          <span className="text-secondary">Piattaforma</span>

          <PlatformSelectorButton
            onOpenFilters={setOpenFilters}
            isExpanded={isExpanded}
            filterName={filterName}
          />
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
                <PlatformFilterSelectorHome
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
                  onExpanded={setOpenFilters}
                  onFilterName={setFilterName}
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
                {" "}
                aggiungine una.
              </Link>
            </p>
          )}
        </div>
      </div>
      <hr
        className={`${isExpanded ? "border-accent" : "border-line"} w-full`}
      />
    </div>
  );
}

export default SearchWrapper;
