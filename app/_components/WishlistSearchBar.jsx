import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function WishlistSearchBar({
  searchGame,
  searchedWishlist,
  gameNotFound,
  onSearchGame,
  handleSearchGame,
}) {
  return (
    <div className="mt-7 flex gap-1">
      <input
        value={searchGame}
        type="search"
        className="border-primary placeholder-primaryfocus-within:border-blue-500 block w-full rounded-lg border px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        placeholder={
          searchedWishlist.length === 0 && gameNotFound
            ? "Nessun gioco trovato"
            : ""
        }
        onChange={(e) => onSearchGame(e.target.value)}
        autoComplete="off"
      />

      <button
        onClick={handleSearchGame}
        disabled={searchGame.length === 0}
        className={`${searchGame.length === 0 ? "border-primary" : "border-blue-500"} inset-y-0 start-0 flex items-center rounded-lg border-2 px-2`}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default WishlistSearchBar;
