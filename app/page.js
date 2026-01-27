import { getUserPlatformsComplete } from "./_lib/data-service";
import { Suspense } from "react";

import RecapLoader from "./_components/RecapLoader";
import HeroRecap from "./_components/HeroRecap";
import SearchWrapper from "./_components/SearchWrapper";
import SearchResultsList from "./_components/SearchResultsList";
import CreateSelector from "./_components/CreateSelector";

export const metadata = {
  title: {
    template: "%s | Colman",
    default: "Home | Colman",
  },
  description:
    "Collection Manager per gestire la tua collezione di videogiochi fisici.",
};

// Homepage
export default async function Page({ searchParams }) {
  const platforms = await getUserPlatformsComplete();
  const filters = await searchParams;
  const queryString = filters?.query;
  const platformFilter = filters?.platform;

  return (
    <div className="flex flex-col gap-2">
      <Suspense fallback={<RecapLoader />}>
        <HeroRecap />
      </Suspense>

      <SearchWrapper platforms={platforms} />

      <SearchResultsList
        queryString={queryString}
        platformFilter={platformFilter}
      />

      <CreateSelector />
    </div>
  );
}
