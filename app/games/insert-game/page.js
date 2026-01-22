import InsertGameForm from "@/app/_components/InsertGameForm";
import { getUserPlatformsComplete } from "@/app/_lib/data-service";

export const metadata = {
  title: "Aggiungi Gioco",
};

async function Page() {
  const platforms = await getUserPlatformsComplete();
  const platformsIdAndName = platforms.map(({ platformId, platformName }) => ({
    platformId,
    platformName,
  }));

  return (
    <div>
      <InsertGameForm
        platforms={platforms}
        platformsIdAndName={platformsIdAndName}
      />
    </div>
  );
}

export default Page;
