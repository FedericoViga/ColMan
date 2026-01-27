import { getAllPlatforms, getUserPlatforms } from "@/app/_lib/data-service";
import { groupByPlatformOwner } from "@/app/_lib/utils";
import PlatformsWrapperSettings from "@/app/_components/PlatformsWrapperSettings";

export const metadata = {
  title: "Le mie piattaforme",
};

async function Page() {
  const [globalPlatforms, userPlatforms] = await Promise.all([
    getAllPlatforms(),
    getUserPlatforms(),
  ]);

  const globalPlatformsByOwner = groupByPlatformOwner(
    globalPlatforms,
    "platformOwner",
  );

  return (
    <div className="container">
      <PlatformsWrapperSettings
        globalPlatformsByOwner={globalPlatformsByOwner}
        userPlatforms={userPlatforms}
      />
    </div>
  );
}

export default Page;
