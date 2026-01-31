"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import { globalAndUserPlatformsCombined } from "../_lib/utils";
import { updateUserPlatforms } from "../_lib/actions";
import PlatformsAccordionSettings from "./PlatformsAccordionSettings";

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
        <p className="text-secondary text-center">
          Aggiungi o rimuovi piattaforme, così potrai aggiungere nuovi giochi
          per le relative piattaforme, filtri e giochi alla tua wishlist.
        </p>
        <p className="text-subtle border-line border-b pt-3 pb-5 text-center">
          Puoi cambiarle in qualsiasi momento
        </p>
        <form action={updateUserPlatforms}>
          <p className="text-subtle mt-7 mb-4 text-sm">Ordine alfabetico</p>
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
        className={`bg-background flex w-2xs items-center justify-center gap-1 ${pending ? "text-subtle border-subtle pointer-events-none" : "border-accent"} rounded border-2 p-1`}
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
