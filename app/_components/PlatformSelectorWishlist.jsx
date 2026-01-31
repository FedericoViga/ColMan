"use client";

function PlatformSelectorWishlist({
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
        name="platformId"
        className="focus:border-accent focus:ring-accent bg-surface border-line mt-1 cursor-pointer rounded border px-1 py-0.5 focus-visible:outline-0"
        value={!isSelectedActive ? isSelectedActive : undefined}
        onChange={(e) => {
          onSelectedPlatform(e.target.value);
          onActive(id);
        }}
      >
        <option hidden></option>
        {platformDetails[1].map((elem) => (
          <option key={elem.platformId} value={`${elem?.platformId}`}>
            {elem.platformName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlatformSelectorWishlist;
