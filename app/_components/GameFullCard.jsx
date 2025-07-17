"use client";

import DeleteGameButton from "./DeleteGameButton";
import Image from "next/image";
import placeholderImageSmall from "@/public/placeholder-400x400.png";
import UpdateLink from "./UpdateLink";
import ContentDescription from "./ContentDescription";

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

  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platform.toLowerCase().replaceAll(" ", "-");

  // converte il testo in array e fa il trim
  const textToList = contentDescription
    .split(/\s+e\s+|,/g)
    .map((elem) => elem.trim());

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

      {/* Piattaforma e regione */}
      <p className="text-xl">
        {platform}{" "}
        <span className="text-primary ms-1.5 text-lg">{gameRegion}</span>
      </p>

      {isCollector !== null && (
        <p className="mt-1 max-w-fit rounded border border-yellow-300 bg-yellow-900 px-1 py-0.5 text-yellow-300">
          Collector's Edition
        </p>
      )}

      {isSealed !== null && (
        <p className="mt-1 max-w-fit rounded border border-blue-300 bg-blue-900 px-1 py-0.5 text-blue-300">
          Sigillato
        </p>
      )}

      {isSpecial !== null && <p>Edizione speciale</p>}

      <ContentDescription
        description={contentDescription}
        textToList={textToList}
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
