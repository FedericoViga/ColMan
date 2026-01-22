"use client";

import { useState } from "react";
import PlatformsAccordion from "./PlatformsAccordion";
import ToCreateButton from "./ToCreateButton";

function PlatformsWrapper({ platformsByOwners }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <>
      <div className="mt-5">
        <p className="text-foreground my-7 text-center text-2xl">
          Le tue piattaforme
        </p>
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
      </div>
      <ToCreateButton url={"/settings/my-platforms"} />
    </>
  );
}

export default PlatformsWrapper;
