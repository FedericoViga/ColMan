import {
  fetchCollectorsWithPagination,
  getUserPlatformsComplete,
} from "@/app/_lib/data-service";
import FilterWrapper from "@/app/_components/FilterWrapper";
import GameCard from "@/app/_components/GameCard";
import Pagination from "@/app/_components/Pagination";

export const metadata = {
  title: "Collector's Editions",
};

async function Page({ searchParams }) {
  const pageParams = await searchParams;
  const fetchedGames = await fetchCollectorsWithPagination(
    pageParams.page,
    pageParams.platform,
  );
  const platforms = await getUserPlatformsComplete();

  const { gamesWithSignedImages, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-primary border-b"}`}
    >
      <h1 className="mb-8 text-center text-2xl">
        Tutte le Collector&apos;s Editions
      </h1>
      {count === 0 ? (
        <p className="text-primary my-10 text-center text-lg font-bold tracking-wide">
          Nessuna Collector&apos;s Edition trovata
        </p>
      ) : (
        <>
          <FilterWrapper platforms={platforms} />

          {gamesWithSignedImages.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </>
      )}
      <Pagination count={count} />
    </div>
  );
}

export default Page;
