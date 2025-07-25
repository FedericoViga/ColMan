import {
  countGames,
  countPlatforms,
  countCollectors,
} from "../_lib/data-service";
import GameCount from "./GameCount";
import CollectorCount from "./CollectorCount";
import PlatformsCount from "./PlatformsCount";

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
