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
        className="bg-background border-primary mt-1 cursor-pointer rounded border p-1 focus:border-blue-500 focus:ring-blue-500"
        value={!isSelectedActive ? isSelectedActive || filterName : undefined}
        onChange={(e) => {
          onActive(id);
          handleFilter(e);
          onFilterName(e.target.value);
        }}
      >
        <option>---</option>
        {platformDetails[1].map((elem) => (
          <option key={elem.id} value={elem.platformName}>
            {elem.platformName}
          </option>
        ))}
      </select>
    </div>
  );
}
export default PlatformFilterSelectorPagination;
