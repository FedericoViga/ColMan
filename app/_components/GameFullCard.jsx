"use client";

import Image from "next/image";
import DeleteGameButton from "./DeleteGameButton";
import UpdateLink from "./UpdateLink";
import ContentDescription from "./ContentDescription";
import ExternalSearchLinks from "./ExternalSearchLinks";
import placeholderImageSmall from "@/public/placeholder-400x400.png";
import { FLAGS } from "../_lib/constants";

function GameFullCard({ gameDetails }) {
  const {
    id,
    platform,
    gameName,
    gameRegion,
    isCollector,
    isSpecial,
    isSealed,
    contentDescription,
    gameImages,
  } = gameDetails;

  // elimina "-" al'inizio della stringa nel caso che Supabase metta l'id signed negativo
  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platform.toLowerCase().replaceAll(" ", "-");

  // trova l'emoji della bandiera che corrisponde alla regione del gioco
  const { flag } = FLAGS.find((obj) => obj.region === gameRegion);

  return (
    <div className="mt-3 mb-10 flex flex-col gap-3">
      {/* Immagine */}
      <div className="relative aspect-square">
        <Image
          src={gameImages ? gameImages : placeholderImageSmall}
          className="block object-cover"
          fill
          alt={gameName}
        />
      </div>

      {/* Titolo */}
      <h1 className="font text-3xl font-bold">{gameName}</h1>

      {/* Piattaforma e Regione */}
      <p className="text-xl">
        {platform}{" "}
        <span className="text-primary ms-1.5 text-lg">
          {" "}
          {`${gameRegion} ${flag}`}
        </span>
      </p>

      {/* Collector's edition */}
      <div className="flex flex-wrap gap-3">
        {isCollector !== null && (
          <p className="mt-1 max-w-fit rounded border border-yellow-300 bg-yellow-900 px-1 py-0.5 text-yellow-300">
            Collector's Edition
          </p>
        )}

        {/* Sigillato */}
        {isSealed !== null && (
          <p className="mt-1 max-w-fit rounded border border-blue-300 bg-blue-900 px-1 py-0.5 text-blue-300">
            Sigillato
          </p>
        )}

        {/* Edizione speciale */}
        {isSpecial !== null && (
          <p className="mt-1 max-w-fit rounded border border-green-300 bg-green-900 px-1 py-0.5 text-green-300">
            Edizione speciale
          </p>
        )}
      </div>

      {/* Contenuto */}
      <ContentDescription description={contentDescription} />

      {/* Link ricerca esterna */}
      <ExternalSearchLinks
        googleUrl={`https://www.google.com/search?q=site%3A+it.m.wikipedia.org ${gameName}`}
        ebayUrl={`https://www.ebay.it/sch/i.html?_nkw=${gameName.replaceAll(" ", "+")}+${platform.replaceAll(" ", "+")}&_sacat=0&_from=R40&rt=nc&LH_PrefLoc=1`}
        doesItPlayUrl={`https://www.doesitplay.org/list?search=${gameName.replaceAll(" ", "+")}&order=Alphabetically`}
      />

      <div className="flex gap-4">
        <UpdateLink
          linkHref={`/games/${normalizedId}-${normalizedPlatform}/update-game`}
        />

        <DeleteGameButton
          gameId={normalizedId}
          gameName={gameName}
          gameImages={gameImages}
        />
      </div>
    </div>
  );
}

export default GameFullCard;
