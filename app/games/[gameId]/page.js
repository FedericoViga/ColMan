import GameFullCard from "@/app/_components/GameFullCard";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { getFullGame } from "@/app/_lib/data-service";
import { Suspense } from "react";

async function Page({ params }) {
  const gameParams = await params;
  /*   const {
    gameId: [id, platform],
  } = gameParams; */

  const { gameId: paramString } = gameParams;

  const id = paramString.split("-")[0];
  const platform = paramString.split("-")[1];

  const getGameDetails = await getFullGame(Number(id), platform);

  return (
    <div className="container">
      <Suspense fallback={<SpinnerMini />}>
        <GameFullCard gameDetails={getGameDetails} />
      </Suspense>
    </div>
  );
}

export default Page;
