import GameCard from "../_components/GameCard";
import Pagination from "../_components/Pagination";
import { fetchGamesWithPagination } from "../_lib/data-service";

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const fetchedGames = await fetchGamesWithPagination(pageParams.page);
  const { data: games, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && fetchedGames.length !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-8 text-center text-2xl">Tutti i giochi</h1>
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
      <Pagination count={count} />
    </div>
  );
}

export default Page;
