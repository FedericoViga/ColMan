"use client";

import { useState } from "react";
import PlatformsAccordionSettings from "./PlatformsAccordionSettings";
import { globalAndUserPlatformsCombined } from "../_lib/utils";
import { updateUserPlatforms } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function PlatformsWrapperSettings({ globalPlatformsByOwner, userPlatforms }) {
  const globalAndUserPlatforms = globalAndUserPlatformsCombined(
    globalPlatformsByOwner,
    userPlatforms,
  );
  const [curOpen, setCurOpen] = useState(null);

  return (
    <>
      <div className="mt-5 mb-20">
        <p className="text-foreground my-7 text-center text-2xl">
          Lista piattaforme
        </p>
        <p className="text-primary text-center">
          Seleziona le tue piattaforme, così potrai aggiungere nuovi giochi per
          quella piattaforma e giochi alla tua wishlist.
        </p>
        <p className="text-center text-slate-500">
          Puoi cambiarle in qualsiasi momento
        </p>
        <form action={updateUserPlatforms}>
          {globalAndUserPlatforms.map((platform, i) => (
            <PlatformsAccordionSettings
              platformDetails={platform}
              key={platform[0]}
              id={i}
              curOpen={curOpen}
              onOpen={setCurOpen}
            />
          ))}
          <Button onOpen={setCurOpen}>Sincronizza</Button>
        </form>
      </div>
    </>
  );
}

function Button({ onOpen }) {
  const { pending } = useFormStatus();

  return (
    <div className="fixed bottom-6 flex justify-self-center">
      <button
        onClick={() => onOpen(null)}
        disabled={pending}
        className={`bg-background flex w-2xs items-center justify-center gap-1 ${pending ? "text-primary pointer-events-none border-slate-500" : "border-accent"} rounded border-2 p-1`}
      >
        <ArrowPathIcon className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
        <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
          {pending ? "Sincronizzazione" : "Sincronizza"}
        </span>
      </button>
    </div>
  );
}

export default PlatformsWrapperSettings;
