import { getAllPlatforms } from "./_lib/data-service";
import HeroRecap from "./_components/HeroRecap";
import SearchWarpper from "./_components/SearchWarpper";
import SearchResultsList from "./_components/SearchResultsList";
import CreateSelector from "./_components/CreateSelector";

export const metadata = {
  title: {
    template: "%s | Colman",
    default: "Home | Colman",
  },
  description: "",
};

export default async function Page({ searchParams }) {
  const platforms = await getAllPlatforms();
  const filters = await searchParams;

  const queryString = filters?.query;
  const platformFilter = filters?.platform;

  return (
    <div className="flex flex-col gap-2">
      <HeroRecap />
      <SearchWarpper platforms={platforms} />
      <SearchResultsList
        queryString={queryString}
        platformFilter={platformFilter}
      />
      <CreateSelector />
    </div>
  );
}
