import { getAllPlatforms } from "../_lib/data-service";
import PlatformsWrapper from "../_components/PlatformsWrapper";

async function Page() {
  const platforms = await getAllPlatforms();

  // genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove la key è una stringa col nome del platformOwner e il value è un array di oggetti con la lista piattaforme e tutto il resto
  function groupByPlatformOwner(platforms, property) {
    return platforms.reduce((acc, curr) => {
      if (!acc[curr[property]]) {
        acc[curr[property]] = [];
      }
      acc[curr[property]].push(curr);
      return acc;
    }, {});
  }

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
