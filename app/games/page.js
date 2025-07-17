import FilterWrapper from "../_components/FilterWrapper";
import GameCard from "../_components/GameCard";
import Pagination from "../_components/Pagination";
import ToCreateButton from "../_components/ToCreateButton";
import {
  fetchGamesWithPagination,
  getAllPlatforms,
} from "../_lib/data-service";

async function Page({ searchParams }) {
  const platforms = await getAllPlatforms();
  const pageParams = await searchParams;
  const fetchedGames = await fetchGamesWithPagination(
    pageParams.page,
    pageParams.platform,
  );

  const { data: games, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-8 text-center text-2xl">Tutti i giochi</h1>
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
