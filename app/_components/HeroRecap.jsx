import { Suspense } from "react";
import {
  countGames,
  countPlatforms,
  countCollectors,
} from "../_lib/data-service";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";

async function GameCount() {
  const numGames = await countGames();

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

async function CollectorCount() {
  const numCollectors = await countCollectors();

  return (
    <p className="text-primary text-3xl font-bold">
      <span className="text-5xl font-bold text-blue-500">{numCollectors}</span>{" "}
      {numCollectors !== 1 ? "COLLECTOR'S EDITIONS" : "COLLECTOR'S EDITION"}
    </p>
  );
}

async function PlatformsCount() {
  const numPlatforms = await countPlatforms();

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
  return (
    <div className="container flex flex-col items-center justify-center gap-3 py-5 text-center">
      <Suspense fallback={<SpinnerMini />}>
        <GameCount />
      </Suspense>
      <Suspense fallback={<SpinnerMini />}>
        <CollectorCount />
      </Suspense>
      <Suspense fallback={<SpinnerMini />}>
        <PlatformsCount />
      </Suspense>
    </div>
  );
}

export default HeroRecap;
