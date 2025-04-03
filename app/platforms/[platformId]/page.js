import PlatformFullCard from "@/app/_components/PlatformFullCard";
import { getFullPlatform } from "@/app/_lib/data-service";

async function Page({ params }) {
  const platformParams = await params;

  const { platformId: paramString } = platformParams;

  const id = paramString.split("-")[0];

  const getPlatformDetails = await getFullPlatform(Number(id));

  return (
    <div className="container">
      <PlatformFullCard platformDetails={getPlatformDetails} />
    </div>
  );
}

export default Page;
