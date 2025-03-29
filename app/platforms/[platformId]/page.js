import PlatformFullCard from "@/app/_components/PlatformFullCard";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { getFullPlatform } from "@/app/_lib/data-service";
import { Suspense } from "react";

async function Page({ params }) {
  const platformParams = await params;

  const { platformId: paramString } = platformParams;

  const id = paramString.split("-")[0];

  const getPlatformDetails = await getFullPlatform(Number(id));

  return (
    <div className="container">
      <Suspense fallback={<SpinnerMini />}>
        <PlatformFullCard platformDetails={getPlatformDetails} />
      </Suspense>
    </div>
  );
}

export default Page;
