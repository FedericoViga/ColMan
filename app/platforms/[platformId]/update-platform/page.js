import UpdatePlatformForm from "@/app/_components/UpdatePlatformForm";
import { getFullPlatform } from "@/app/_lib/data-service";

export const metadata = {
  title: "Modifica Piattaforma",
};

async function Page({ params }) {
  const platformParams = await params;
  const { platformId: paramString } = platformParams;

  const id = paramString.split("-")[0];

  const [platformDetails] = await getFullPlatform(id);

  return (
    <div>
      <UpdatePlatformForm platformDetails={platformDetails} />
    </div>
  );
}

export default Page;
