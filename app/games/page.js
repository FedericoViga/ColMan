import {
  countCollectors,
  countGames,
  countGamesByPlatform,
  fetchGamesWithPagination,
  getUserPlatformsComplete,
} from "../_lib/data-service";
import FilterWrapper from "../_components/FilterWrapper";
import GameCard from "../_components/GameCard";
import Pagination from "../_components/Pagination";
import ToCreateButton from "../_components/ToCreateButton";
import ControllerIcon from "../_components/icons/ControllerIcon";

export const metadata = {
  title: "Giochi",
};

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const [numGames, numCollectors, platforms] = await Promise.all([
    countGames(),
    countCollectors(),
    getUserPlatformsComplete(),
  ]);

  const numGamesByPlatform = await countGamesByPlatform(pageParams.platform);
  const fetchedGames = await fetchGamesWithPagination(
    pageParams.page,
    pageParams.platform,
  );

  const { gamesWithSignedImages, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-line border-b"}`}
    >
      <h1 className="mb-4 text-center text-2xl">Tutti i giochi</h1>

      <div>
        <p className="text-secondary mb-7 flex flex-col text-center text-lg">
          <span>{`La tua collezione è composta da ${numGames} ${numGames === 1 ? "gioco." : "giochi."}`}</span>
          <span>{`${numCollectors} ${numCollectors === 1 ? "è collector's edition." : "sono collector's editions."}`}</span>
        </p>

        <FilterWrapper
          platforms={platforms}
          numGamesByPlatform={numGamesByPlatform}
        />
      </div>

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-secondary mt-10 mb-5 flex min-h-14 flex-col text-center text-lg font-bold tracking-wide">
            <span>Nessuna gioco trovato</span>
            <span>{` ${pageParams.platform && pageParams.platform !== "all" ? `per ${pageParams.platform}` : ``}`}</span>
          </p>
          <ControllerIcon className="text-line h-20 w-20" />
        </div>
      ) : (
        <>
          {gamesWithSignedImages.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </>
      )}

      <Pagination count={count} />

      {fetchedGames.length === 0 && (
        <ToCreateButton url={"/games/insert-game"} />
      )}
    </div>
  );
}

export default Page;
