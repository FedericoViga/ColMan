import FilterWrapper from "../_components/FilterWrapper";
import GameCard from "../_components/GameCard";
import Pagination from "../_components/Pagination";
import ToCreateButton from "../_components/ToCreateButton";
import {
  countCollectors,
  countGames,
  countGamesByPlatform,
  fetchGamesWithPagination,
  getAllPlatforms,
} from "../_lib/data-service";

export const metadata = {
  title: "Giochi",
};

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const [numGames, numCollectors, platforms, numGamesByPlatform, fetchedGames] =
    await Promise.all([
      countGames(),
      countCollectors(),
      getAllPlatforms(),
      countGamesByPlatform(pageParams.platform),
      fetchGamesWithPagination(pageParams.page, pageParams.platform),
    ]);

  const { data: games, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-4 text-center text-2xl">Tutti i giochi</h1>

      <p className="text-primary mb-5 flex flex-col text-center text-lg">
        <span>Hai {numGames} giochi totali</span>
        <span>{numCollectors} sono collector&apos;s editions</span>
      </p>

      <FilterWrapper
        platforms={platforms}
        numGamesByPlatform={numGamesByPlatform}
      />

      {count === 0 ? (
        <p className="text-primary my-10 text-center text-lg font-bold tracking-wide">
          Nessun gioco trovato
        </p>
      ) : (
        <>
          {games.map((game) => (
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
