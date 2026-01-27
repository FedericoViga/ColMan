import {
  getUserPlatformsComplete,
  numGamesByPlatform,
} from "../_lib/data-service";
import { addGameCount, groupByPlatformOwner } from "../_lib/utils";
import PlatformsWrapper from "../_components/PlatformsWrapper";

export const metadata = {
  title: "Piattaforme",
};

async function Page() {
  const platforms = await getUserPlatformsComplete();
  const gamesByPlatform = await numGamesByPlatform(); // Raggruppa e conta i giochi per ogni piattaforma

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner"); // Assegna le piattaforme al rispettivo platform owner

  // Aggiunge il numero di giochi ad ogni piattaforma
  const platformsWithGameCount = addGameCount(
    platformsByOwner,
    gamesByPlatform,
  );

  return (
    <div className="container flex flex-col items-center">
      <PlatformsWrapper platformsByOwners={platformsWithGameCount} />
    </div>
  );
}

export default Page;
