import { getAllPlatforms, getAllPlatformsByGame } from "../_lib/data-service";
import PlatformsWrapper from "../_components/PlatformsWrapper";
import { countGamesByPlatform, groupByPlatformOwner } from "../_lib/utils";

async function Page() {
  const platforms = await getAllPlatforms();
  const platformsByGame = await getAllPlatformsByGame();

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");

  const platformsWithGameCount = countGamesByPlatform(
    platformsByGame,
    platformsByOwner,
  );

  return (
    <div className="container">
      <PlatformsWrapper platformsByOwners={platformsWithGameCount} />
    </div>
  );
}

export default Page;
