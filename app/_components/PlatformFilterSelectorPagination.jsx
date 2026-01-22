import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function PlatformFilterSelectorPagination({
  platformDetails,
  id,
  curActive,
  onActive,
  onExpanded,
  onFilterName,
  filterName,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // state per togliere il testo se viene selezionata una nuova piattaforma
  const isSelectedActive = id === curActive;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const platform = params.get("platform");

    if (platform) {
      onFilterName(platform === "all" ? "Tutte" : platform);
    } else {
      onFilterName(filterName);
    }
  }, []);

  /* setta il search param in base alla piattaforma scelta */
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    if (filter.target.value === "---") {
      params.set("platform", "all");
      params.set("page", "1");
      onExpanded(false);
    } else {
      params.set("platform", filter.target.value);
      params.set("page", "1");
      onExpanded(false);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mt-3 flex flex-col">
      <label>{platformDetails[0]}</label>
      <select
        required={isSelectedActive}
        name="platform"
        className="focus:border-accent focus:ring-accent mt-1 cursor-pointer rounded border border-slate-700 bg-slate-900 p-1 focus-visible:outline-0"
        value={!isSelectedActive ? isSelectedActive || filterName : undefined}
        onChange={(e) => {
          onActive(id);
          handleFilter(e);
          onFilterName(e.target.value);
        }}
      >
        <option>---</option>
        {platformDetails[1].map((elem) => (
          <option key={elem.platformId} value={elem.platformName}>
            {elem.platformName}
          </option>
        ))}
      </select>
    </div>
  );
}
export default PlatformFilterSelectorPagination;
