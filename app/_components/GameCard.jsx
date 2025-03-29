import Image from "next/image";
import Link from "next/link";
import placeholderImageSmall from "@/public/placeholder-400x400.png";

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
  } = game;

  // elimina "-" al'inizio dell stringa nel caso che Supabase metta l'id negativo
  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platform.toLowerCase().replaceAll(" ", "-");

  return (
    <Link
      href={`/games/${normalizedId}-${normalizedPlatform}`}
      className="w-full px-2"
    >
      <div className="border-primary flex h-48 w-full items-start gap-3 overflow-auto border-y">
        <div className="aspect relative min-h-32 min-w-32">
          <Image
            src={gameImages ? gameImages : placeholderImageSmall}
            className="mt-3.5 rounded object-cover"
            alt={gameName}
            fill
          />
        </div>
        <div className="mt-3.5 flex flex-1 flex-col pr-2 leading-normal">
          <div className="flex">
            {isCollector !== null && (
              <span className="me-1.5 max-w-fit rounded bg-yellow-900 px-1 py-0.5 text-xs text-yellow-300">
                Collector's Edition
              </span>
            )}
            {isSealed !== null && (
              <span className="me-1.5 max-w-fit rounded bg-blue-900 px-1 py-0.5 text-xs text-blue-300">
                Sigillato
              </span>
            )}
            {isSpecial !== null && (
              <span className="me-1.5 max-w-fit rounded bg-green-900 px-1 py-0.5 text-xs text-green-300">
                Edizione Speciale
              </span>
            )}
          </div>
          <h5 className="my-1.5 text-xl font-bold">{gameName}</h5>
          <p className="text-primary mb-1.5 text-sm font-normal dark:text-gray-400">
            {gameRegion}
          </p>
          <span>{platform}</span>
        </div>
      </div>
    </Link>
  );
}
export default GameCard;
