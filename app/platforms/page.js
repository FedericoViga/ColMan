import { getAllPlatforms } from "../_lib/data-service";
import PlatformsWrapper from "../_components/PlatformsWrapper";
import { groupByPlatformOwner } from "../_lib/utils";

async function Page() {
  const platforms = await getAllPlatforms();

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  return (
    <div className="container">
      <PlatformsWrapper platformsByOwners={platformsToArray} />
    </div>
  );
}

export default Page;
