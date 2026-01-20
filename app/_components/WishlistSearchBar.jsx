import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function WishlistSearchBar({
  searchGame,
  searchedWishlist,
  gameNotFound,
  onSearchGame,
  handleSearchGame,
  searchRef,
}) {
  function handleChangeSearch(e) {
    // Rimuove tutti gli spazi all'inizio anche se il testo viene incollato
    const cleanedValue = e.target.value.replace(/^ +/, "");
    onSearchGame(cleanedValue);
  }

  return (
    <div className="mt-7 flex gap-1">
      <input
        ref={searchRef}
        value={searchGame}
        type="search"
        className="focus-within:border-accent focus-within:bg-background focus:bg-background focus:ring-accent block w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 focus:ring-1 focus:outline-none"
        placeholder={
          searchedWishlist.length === 0 && gameNotFound
            ? "Nessun gioco trovato"
            : "Cerca gioco"
        }
        onChange={(e) => handleChangeSearch(e)}
        autoComplete="off"
      />

      <button
        onClick={handleSearchGame}
        disabled={searchGame.length === 0}
        className={`${searchGame.length === 0 ? "border-slate-500" : "border-accent"} inset-y-0 start-0 flex items-center rounded-lg border-2 px-2`}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default WishlistSearchBar;
