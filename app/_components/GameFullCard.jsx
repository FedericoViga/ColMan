"use client";

import DeleteGameButton from "./DeleteGameButton";
import Image from "next/image";
import placeholderImageSmall from "@/public/placeholder-400x400.png";
import UpdateLink from "./UpdateLink";
import ContentDescription from "./ContentDescription";
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

  // prende l'emoji della bandiera che corrisponde alla regione del gioco
  const { flag } = FLAGS.find((obj) => obj.region === gameRegion);

  // converte in arrray il testo del contenuto e fa il trim
  // la regex trova il carattere "," e il carattere "e" preceduto e seguito da uno spazio come separatori dell'array
  // in questo modo divide ogni elemento della lista separato dalle virgole e opzionalmente l'elemento finale separato dalla "e"
  const textToList = contentDescription
    .split(/\s+e\s+|,/g)
    .map((elem) => elem.trim());

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
        <span className="text-primary ms-1.5 text-lg">
          {" "}
          {`${gameRegion} ${flag}`}
        </span>
      </p>

      <div className="flex flex-wrap gap-3">
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

        {isSpecial !== null && (
          <p className="mt-1 max-w-fit rounded border border-green-300 bg-green-900 px-1 py-0.5 text-green-300">
            Edizione speciale
          </p>
        )}
      </div>

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
