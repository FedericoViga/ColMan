import {
  countGames,
  countPlatforms,
  countCollectors,
} from "../_lib/data-service";
import Link from "next/link";

async function GameCount({ numGames }) {
  return (
    <Link href="/games">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500">{numGames}</span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          {numGames !== 1 ? "GIOCHI" : "GIOCO"}
        </p>
      </div>
    </Link>
  );
}

async function CollectorCount({ numCollectors }) {
  return (
    <Link href="/games/collectors">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500">
          {numCollectors}
        </span>
        <p
          className={`text-primary font-bold underline decoration-2 underline-offset-3 ${numCollectors > 99 ? "text-2xl" : "text-3xl"}`}
        >
          {numCollectors !== 1 ? "COLLECTOR'S EDITIONS" : "COLLECTOR'S EDITION"}
        </p>
      </div>
    </Link>
  );
}

async function PlatformsCount({ numPlatforms }) {
  return (
    <Link href="/platforms">
      <div className="flex items-center justify-center gap-1">
        <span className="text-5xl font-bold text-blue-500">{numPlatforms}</span>
        <p className="text-primary text-3xl font-bold underline decoration-2 underline-offset-3">
          {numPlatforms !== 1 ? "PIATTAFORME" : "PIATTAFORMA"}
        </p>
      </div>
    </Link>
  );
}

async function HeroRecap() {
  const [numGames, numCollectors, numPlatforms] = await Promise.all([
    countGames(),
    countCollectors(),
    countPlatforms(),
  ]);

  return (
    <div className="container flex flex-col items-center justify-center gap-3 py-5 text-center">
      <GameCount numGames={numGames} />
      <CollectorCount numCollectors={numCollectors} />
      <PlatformsCount numPlatforms={numPlatforms} />
    </div>
  );
}

export default HeroRecap;
