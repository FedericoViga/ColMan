"use client";

import { useState } from "react";
import Link from "next/link";

import PlatformsAccordion from "./PlatformsAccordion";
import ToCreateButton from "./ToCreateButton";
import PlatformIcon from "./icons/PlatformIcon";

function PlatformsWrapper({ platformsByOwners }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <>
      <div>
        <p className="text-foreground my-5 text-center text-2xl">
          Le tue piattaforme
        </p>
        {platformsByOwners.length !== 0 ? (
          <>
            <p className="text-primary text-center text-lg">
              Seleziona una piattaforma per visualizzare i dettagli.
            </p>
            {platformsByOwners.map((platform, i) => (
              <PlatformsAccordion
                platformDetails={platform}
                key={platform[0]}
                id={i}
                curOpen={curOpen}
                onOpen={setCurOpen}
              />
            ))}
          </>
        ) : (
          <div className="my-10 flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-primary text-lg font-bold tracking-wide">
                Non hai piattaforme
              </span>
              <Link
                href="/settings/my-platforms"
                className="text-accent decoration-accent font-bold underline underline-offset-2"
              >
                Aggiungi piattaforme
              </Link>
            </div>
            <PlatformIcon />
          </div>
        )}
      </div>

      {platformsByOwners.length !== 0 && (
        <ToCreateButton url={"/settings/my-platforms"} />
      )}
    </>
  );
}

export default PlatformsWrapper;
