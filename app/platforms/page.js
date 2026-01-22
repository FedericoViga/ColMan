import { getUserPlatformsComplete } from "../_lib/data-service";
import PlatformsWrapper from "../_components/PlatformsWrapper";
import { groupByPlatformOwner } from "../_lib/utils";

export const metadata = {
  title: "Piattaforme",
};

export const revalidate = 0;

async function Page() {
  const platforms = await getUserPlatformsComplete();
  /*  const gamesByPlatform = await numGamesByPlatform(); */ // Raggruppa e conta i giochi per ogni piattaforma

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner"); // Assegna le piattaforme al rispettivo platform owner

  // Aggiunge il numero di giochi corrispondente ad ogni piattaforma
  /*   const platformsWithGameCount = addGameCount(
    platformsByOwner,
    gamesByPlatform,
  ); */

  return (
    <div className="container">
      <PlatformsWrapper platformsByOwners={platformsByOwner} />
    </div>
  );
}

export default Page;
