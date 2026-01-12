import GameFullCard from "@/app/_components/GameFullCard";
import { getFullGame } from "@/app/_lib/data-service";

export const metadata = {
  title: "Gioco",
};

async function Page({ params }) {
  const gameParams = await params;

  const { gameId: paramString } = gameParams;

  const id = paramString.split("-")[0];
  const platform = paramString.split("-")[1];

  const getGameDetails = await getFullGame(Number(id), platform);

  return (
    <div className="container">
      <GameFullCard gameDetails={getGameDetails} />
    </div>
  );
}

export default Page;
