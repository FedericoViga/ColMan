import { getAllPlatforms, numGamesByPlatform } from "../_lib/data-service";
import PlatformsWrapper from "../_components/PlatformsWrapper";
import { addGameCount, groupByPlatformOwner } from "../_lib/utils";

async function Page() {
  const platforms = await getAllPlatforms();
  const gamesByPlatform = await numGamesByPlatform(); // Raggruppa e conta i giochi per ogni piattaforma

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner"); // Assegna le piattaforme al rispettivo platform owner

  // Aggiunge il numero di giochi corrispondente ad ogni piattaforma
  const platformsWithGameCount = addGameCount(
    platformsByOwner,
    gamesByPlatform,
  );

  return (
    <div className="container">
      <PlatformsWrapper platformsByOwners={platformsWithGameCount} />
    </div>
  );
}

export default Page;
