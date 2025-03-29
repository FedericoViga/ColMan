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
      <p className="text-primary text-3xl font-bold">
        <span className="text-5xl font-bold text-blue-500">{numGames}</span>{" "}
        {numGames !== 1 ? "GIOCHI" : "GIOCO"}
      </p>
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
      <p className="text-primary text-3xl font-bold">
        <span className="text-5xl font-bold text-blue-500">{numPlatforms}</span>{" "}
        {numPlatforms !== 1 ? "PIATTAFORME" : "PIATTAFORMA"}
      </p>
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
