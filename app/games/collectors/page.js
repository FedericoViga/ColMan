import {
  countCollectors,
  countCollectorsByPlatform,
  fetchCollectorsWithPagination,
  getUserPlatformsComplete,
} from "@/app/_lib/data-service";
import FilterWrapper from "@/app/_components/FilterWrapper";
import GameCard from "@/app/_components/GameCard";
import Pagination from "@/app/_components/Pagination";
import CollectorEditionIcon from "@/app/_components/icons/CollectorEditionIcon";

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
  const numCollectors = await countCollectors();
  const numCollectorsByPlatform = await countCollectorsByPlatform(
    pageParams.platform,
  );

  const { gamesWithSignedImages, count } = fetchedGames;

  return (
    <div
      className={`container my-5 flex flex-col gap-1 ${fetchedGames && count !== 0 && "border-b border-slate-600"}`}
    >
      <h1 className="mb-7 text-center text-2xl">
        Tutte le Collector&apos;s Editions
      </h1>

      <p className="text-primary mb-7 flex flex-col text-center text-lg">
        <span>Hai {numCollectors} collector&apos;s editions</span>
      </p>

      <FilterWrapper
        platforms={platforms}
        numGamesByPlatform={numCollectorsByPlatform}
      />

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-primary mt-10 mb-5 flex min-h-14 flex-col text-center text-lg font-bold tracking-wide">
            <span>{`Nessuna Collector's Edition trovata`}</span>
            <span>{` ${pageParams.platform && pageParams.platform !== "all" ? `per ${pageParams.platform}` : ``}`}</span>
          </p>
          <CollectorEditionIcon />
        </div>
      ) : (
        <>
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
