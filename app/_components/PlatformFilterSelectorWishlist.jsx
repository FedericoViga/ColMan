"use client";

function PlatformFilterSelectorWishlist({
  platformDetails,
  id,
  curActive,
  onActive,
  onSelectedPlatform,
}) {
  // state per togliere il testo se viene selezionata una nuova piattaforma
  const isSelectedActive = id === curActive;

  return (
    <div className="mt-3 flex flex-col">
      <label>{platformDetails[0]}</label>
      <select
        required={isSelectedActive}
        name="platformName"
        className="bg-background border-primary mt-1 cursor-pointer rounded border px-1 py-0.5 focus:border-blue-500 focus:ring-blue-500 focus-visible:outline-0"
        value={!isSelectedActive ? isSelectedActive : undefined}
        onChange={(e) => {
          onSelectedPlatform(e.target.value);
          onActive(id);
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

export default PlatformFilterSelectorWishlist;
