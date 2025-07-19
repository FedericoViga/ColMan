import FilterWrapper from "../_components/FilterWrapper";
import GameCard from "../_components/GameCard";
import Pagination from "../_components/Pagination";
import ToCreateButton from "../_components/ToCreateButton";
import {
  countCollectors,
  countGames,
  fetchGamesWithPagination,
  getAllPlatforms,
} from "../_lib/data-service";

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const [numGames, numCollectors, platforms, fetchedGames] = await Promise.all([
    countGames(),
    countCollectors(),
    getAllPlatforms(),
    fetchGamesWithPagination(pageParams.page, pageParams.platform),
  ]);

  const { data: games, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-4 text-center text-2xl">
        Tutti i <span className="text-2xl font-bold text-blue-500">421</span>{" "}
        giochi
      </h1>

      <p className="text-primary mb-5 text-center text-lg">
        Hai 421 giochi di cui 26 sono collector&apos;s editions
      </p>

      <FilterWrapper platforms={platforms} />

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
