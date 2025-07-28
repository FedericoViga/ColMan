"use client";

import DeleteGameButton from "./DeleteGameButton";
import Image from "next/image";
import placeholderImageSmall from "@/public/placeholder-400x400.png";
import UpdateLink from "./UpdateLink";
import ContentDescription from "./ContentDescription";
import { FLAGS } from "../_lib/constants";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import EbayLogoIcon from "./EbayLogoIcon";
import GoogleLogoIcon from "./GoogleLogoIcon";

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

      <ContentDescription description={contentDescription} />

      <div className="mt-3 flex items-center gap-3">
        <span className="text-primary">Cercalo su</span>
        <div className="flex items-center gap-3">
          <a
            href={`https://www.google.com/search?q=site%3A+it.m.wikipedia.org ${gameName}`}
            className="flex items-center gap-1 text-lg"
            target="_blank"
          >
            <GoogleLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>

          <span className="text-primary w-0.5" aria-hidden="true">
            |
          </span>

          <a
            href={`https://www.ebay.it/sch/i.html?_nkw=${gameName.replaceAll(" ", "+")}+${platform.replaceAll(" ", "+")}&_sacat=139973&_from=R40&_trksid=p2334524.m570.l1313&rt=nc&_odkw=metroid+prime&_osacat=139973&LH_PrefLoc=1`}
            className="flex items-center gap-1"
            target="_blank"
          >
            <EbayLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>
        </div>
      </div>

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
