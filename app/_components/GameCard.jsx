"use client";

import Image from "next/image";
import Link from "next/link";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

import placeholderImageSmall from "@/public/placeholder-400x400.png";
import { FLAGS } from "../_lib/constants";
import { useState } from "react";

function GameCard({ game }) {
  const {
    gameName,
    gameRegion,
    isSealed,
    isSpecial,
    isCollector,
    platform,
    id,
    gameImages,
    gameNotes,
  } = game;

  const [isLoading, setIsLoading] = useState(false);

  // elimina "-" al'inizio della stringa nel caso che Supabase metta l'id signed negativo
  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platform.toLowerCase().replaceAll(" ", "-");

  // prende l'emoji della bandiera che corrisponde alla regione del gioco
  const { flag } = FLAGS.find((obj) => obj.region === gameRegion);

  return (
    <Link
      href={`/games/${normalizedId}-${normalizedPlatform}`}
      className="w-full px-2"
    >
      <div className="flex min-h-48 w-full items-start gap-3 overflow-auto border-t border-slate-600">
        {/* Immagine e nota */}
        <div className="flex flex-col gap-4">
          <div className="aspect relative min-h-32 min-w-32">
            <Image
              src={gameImages ? gameImages : placeholderImageSmall}
              className="mt-3.5 rounded object-cover"
              alt={gameName}
              fill
              onLoad={() => setIsLoading(true)}
            />

            {/* LOADER */}
            {!isLoading && (
              <div className="absolute inset-x-0 top-0 -bottom-3.5 mt-3.5 overflow-hidden rounded-md">
                <div className="shimmer-image" />
              </div>
            )}
          </div>

          {/*  <div className="pointer-events-none absolute overflow-hidden rounded-md">
              <div className="shimmer-image" />
            </div> */}
          {gameNotes && (
            <div className="text-primary flex items-center gap-1">
              <span className="text-sm">Note</span>
              <ChatBubbleLeftEllipsisIcon className="h-3 w-3" />
            </div>
          )}
        </div>

        <div className="mt-3.5 flex flex-1 flex-col leading-normal">
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {isCollector !== null && (
              <span className="max-w-fit rounded bg-yellow-900 px-1 py-0.5 text-xs text-yellow-300">
                Collector's Edition
              </span>
            )}

            {isSealed !== null && (
              <span className="max-w-fit rounded bg-blue-900 px-1 py-0.5 text-xs text-blue-300">
                Sigillato
              </span>
            )}

            {isSpecial !== null && (
              <span className="max-w-fit rounded bg-[#092224] px-1 py-0.5 text-xs text-[#01fc8d]">
                Edizione Speciale
              </span>
            )}
          </div>

          {/* Titolo */}
          <h5 className="my-1.5 text-lg font-bold">{gameName}</h5>

          {/* Regione */}
          <p className="text-primary my-1.5 font-normal dark:text-gray-400">
            {`${gameRegion} ${flag}`}
          </p>

          {/* Piattaforma */}
          <span className="mb-3">{platform}</span>
        </div>
      </div>
    </Link>
  );
}
export default GameCard;
