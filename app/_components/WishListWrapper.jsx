"use client";

import { useOptimistic, useState } from "react";
import { deleteGameFromWishlist } from "../_lib/actions";
import AddToWishlistButton from "./AddToWishlistButton";
import WishlistAccordion from "./WishlistAccordion";
import InsertWishlistGameForm from "./InsertWishlistGameForm";
import DownloadWishlistButton from "./DownloadWishlistButton";
import ToTopButton from "./ToTopButton";
import WishlistSearchBar from "./WishlistSearchBar";
import { XMarkIcon } from "@heroicons/react/24/solid";

function WishListWrapper({ wishlistByPlatforms, platforms }) {
  const [isOpenInsertGame, setIsOpenInsertGame] = useState(false);
  const [curOpen, setCurOpen] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [searchGame, setSearchGame] = useState(""); // testo ricerca gioco
  const [searchedWishlist, setSearchedWishlist] = useState([]); // array dei risultati di ricerca
  const [searchedGameDisplay, setSearchedGameDisplay] = useState(""); // testo ricerca gioco mostrato dopo aver premuto il button per cercare

  const [gameNotFound, setGameNotFound] = useState(false);
  // lo useOptimistic cambia l'array usato se ci sono o no risultati di ricerca
  // se ci sono risultati usa l'array searchedWishlist
  // altrimenti usa l'array orignale wishlistByPlatforms da Supabase
  const [optimisticPlatforms, optimisticDelete] = useOptimistic(
    searchedWishlist.length > 0 ? searchedWishlist : wishlistByPlatforms,
    (curWishlistPlatforms, gameId) => {
      return curWishlistPlatforms
        .map((platform) => ({
          ...platform,
          games: platform.games.filter((game) => game.id !== gameId),
        }))
        .filter((platform) => platform.games.length > 0); // toglie anche la piattaforma se ha 0 giochi
    },
  );

  async function handleDelete(gameId) {
    setGameNotFound(false);
    optimisticDelete(gameId);

    // aggiorna SOLO nel client la lista momentanea dei risultati di ricerca post cancellazione
    const clientListUpdated = searchedWishlist
      .map((platform) => {
        const filteredGames = platform.games.filter(
          (game) => game.id !== gameId,
        );
        // ritorno la piattaforma solo con i giochi filtrati
        return {
          ...platform,
          games: filteredGames,
        };
      })
      .filter((platform) => platform.games.length > 0);

    setSearchedWishlist(clientListUpdated);
    await deleteGameFromWishlist(gameId);
  }

  function handleSearchGame() {
    setGameNotFound(true);
    setCurOpen(null);
    setSearchedGameDisplay(searchGame);

    // filtra i giochi in base al testo di ricerca
    const filteredWishlistBySearch = wishlistByPlatforms
      .map((platform) => {
        const filteredGames = platform.games.filter((game) =>
          game.gameName.toLowerCase().includes(searchGame.toLowerCase()),
        );
        // ritorna la piattaforma solo con i giochi filtrati
        return {
          ...platform,
          games: filteredGames,
        };
      })
      .filter((platform) => platform.games.length > 0); // toglie anche la piattaforma se ha 0 giochi

    setSearchedWishlist(filteredWishlistBySearch);
    setSearchGame("");
  }
  return (
    <>
      <div className="mt-5 mb-30">
        <h1 className="text-foreground my-6 text-center text-2xl">
          La mia wishlist
        </h1>

        {wishlistByPlatforms.length !== 0 ? (
          <>
            <p className="text-primary text-center text-lg">
              Seleziona una piattaforma per visualizzare i relativi giochi.
            </p>

            <WishlistSearchBar
              searchGame={searchGame}
              searchedWishlist={searchedWishlist}
              gameNotFound={gameNotFound}
              onSearchGame={setSearchGame}
              handleSearchGame={handleSearchGame}
            />

            <div className="border-primary mt-3 mb-8 flex items-baseline justify-between border-b p-3">
              {/* Toggle espandi tutto */}
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-11">
                  <input
                    onChange={() => {
                      setExpandAll((isChecked) => !isChecked);
                      setCurOpen(null);
                    }}
                    id="switch-component-blue"
                    type="checkbox"
                    className="peer bg-primary h-5 w-11 cursor-pointer appearance-none rounded-full transition-colors duration-300 checked:bg-blue-500"
                  />
                  <label
                    htmlFor="switch-component-blue"
                    className="absolute top-0 left-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-500"
                  ></label>
                </div>
                <label htmlFor="switch-component-blue" className="text-primary">
                  Espandi tutto
                </label>
              </div>

              {/* Download lista come csv */}
              <DownloadWishlistButton />
            </div>

            {/* Chiudi ricerca */}
            {searchedGameDisplay !== "" && searchedWishlist.length > 0 && (
              <div className="mb-6 flex items-center gap-0.5 px-1.5 text-sm">
                <button
                  type="button"
                  aria-label="Cancella ricerca"
                  onClick={() => {
                    setCurOpen(null);
                    setSearchedWishlist([]);
                    setGameNotFound(false);
                  }}
                  className="flex items-center"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <p className="text-primary min-w-0 flex-1 break-words">
                  {searchedGameDisplay}
                </p>
              </div>
            )}

            {/* Wishlist */}
            {optimisticPlatforms.map((platform, i) => (
              <WishlistAccordion
                platform={platform}
                key={platform.platformName}
                accordionId={i}
                expandAll={expandAll}
                onDelete={handleDelete}
                curOpen={curOpen}
                onOpen={setCurOpen}
              />
            ))}
          </>
        ) : (
          <p className="text-primary mt-12 text-center text-lg">
            Premi il button a forma di cuore in basso a destra per iniziare ad
            aggiungere giochi.
          </p>
        )}
      </div>

      <AddToWishlistButton onOpenClose={setIsOpenInsertGame} />

      {isOpenInsertGame && (
        <InsertWishlistGameForm
          platforms={platforms}
          onOpenClose={setIsOpenInsertGame}
        />
      )}

      <ToTopButton isOpenInsertGame={isOpenInsertGame} />
    </>
  );
}

export default WishListWrapper;
