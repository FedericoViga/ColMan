"use client";

import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteGameButton from "./DeleteGameButton";
import Image from "next/image";
import placeholderImageSmall from "@/public/placeholder-400x400.png";

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

  return (
    <div className="mt-3 mb-10 flex flex-col gap-3">
      <div className="relative aspect-square">
        <Image
          src={gameImages ? gameImages : placeholderImageSmall}
          className="block object-cover"
          fill
          alt={gameName}
        />
      </div>
      <h1 className="font text-3xl font-bold">{gameName}</h1>
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

      <div className="mt-3">
        <span className="text-primary text-lg">Contenuto:</span>
        {contentDescription !== null ? (
          <p className="mt-2 rounded border border-slate-800 bg-slate-800 p-2">
            {contentDescription}
          </p>
        ) : (
          <p>Contenuto non specificato.</p>
        )}
      </div>
      <div className="mt-5 flex min-w-24 items-center justify-center gap-1 self-start rounded border border-blue-500 py-1">
        <PencilSquareIcon className="h-4 w-4" />
        <Link
          href={`/games/${normalizedId}-${normalizedPlatform}/update-game`}
          className="inline-block"
        >
          Modifica
        </Link>
      </div>
      <DeleteGameButton
        gameId={normalizedId}
        gameName={gameName}
        gameImages={gameImages}
      />
    </div>
  );
}

export default GameFullCard;
