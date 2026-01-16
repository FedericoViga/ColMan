import PlatformFullCard from "@/app/_components/PlatformFullCard";
import { getFullPlatform } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Piattaforma",
};

async function Page({ params }) {
  const platformParams = await params;

  const { platformId: paramString } = platformParams;

  const id = paramString.split("-")[0];

  const [getPlatformDetails] = await getFullPlatform(Number(id));

  return (
    <div className="container">
      {getPlatformDetails ? (
        <PlatformFullCard platformDetails={getPlatformDetails} />
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center gap-5">
          <p className="text-primary text-xl">Piattaforma non trovata</p>
          <Link
            className="underline decoration-blue-500 underline-offset-4"
            href="/"
          >
            Homepage
          </Link>
        </div>
      )}
    </div>
  );
}

export default Page;
