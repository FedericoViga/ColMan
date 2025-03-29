import InsertGameForm from "@/app/_components/InsertGameForm";
import { getAllPlatforms } from "@/app/_lib/data-service";

async function Page() {
  const platforms = await getAllPlatforms();

  const platformsIdAndName = platforms.map(({ id, platformName }) => ({
    id,
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
