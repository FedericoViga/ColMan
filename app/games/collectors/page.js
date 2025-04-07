import GameCard from "@/app/_components/GameCard";
import { fetchCollectorsWithPagination } from "@/app/_lib/data-service";
import Pagination from "@/app/_components/Pagination";
import ToCreateButton from "@/app/_components/ToCreateButton";

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const fetchedGames = await fetchCollectorsWithPagination(pageParams.page);
  const { data: games, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-8 text-center text-2xl">
        Tutte le collector&apos;s editions
      </h1>
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
      <Pagination count={count} />
      <ToCreateButton url={"/games/insert-game"} />
    </div>
  );
}

export default Page;
