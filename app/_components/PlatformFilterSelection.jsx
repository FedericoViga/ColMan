import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PlatformFilterSelector({ platformDetails, id, curActive, onActive }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  // state per togliere il testo se viene selezionata una nuova piattaforma
  const isSelectedActive = id === curActive;

  /* setta il search param in base alla piattaforma scelta */
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    if (filter.target.value === "---") {
      params.set("platform", "all");
    } else {
      params.set("platform", filter.target.value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mt-2 flex flex-col">
      <label>{platformDetails[0]}</label>
      <select
        required={isSelectedActive}
        name="platform"
        className="bg-background border-primary mt-1 rounded border p-1"
        value={!isSelectedActive ? isSelectedActive : undefined}
        onChange={(e) => {
          onActive(id);
          handleFilter(e);
        }}
      >
        {/* <option hidden></option> */}
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

export default PlatformFilterSelector;
