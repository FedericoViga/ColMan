import UpdateGameForm from "@/app/_components/UpdateGameForm";
import { getFullGame } from "@/app/_lib/data-service";

async function Page({ params }) {
  const gameParams = await params;
  const { gameId: paramString } = gameParams;

  const id = paramString.split("-")[0];
  const platform = paramString.split("-")[1];

  const gameDetails = await getFullGame(id, platform);

  return (
    <div>
      <UpdateGameForm gameDetails={gameDetails} />
    </div>
  );
}

export default Page;
