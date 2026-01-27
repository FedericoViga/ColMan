import { getUserPlatformsComplete } from "@/app/_lib/data-service";
import InsertGameForm from "@/app/_components/InsertGameForm";

export const metadata = {
  title: "Aggiungi Gioco",
};

async function Page() {
  const platforms = await getUserPlatformsComplete();

  const platformsIdAndName = platforms?.map(({ platformId, platformName }) => ({
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
