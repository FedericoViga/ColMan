"use client";

import { useOptimistic, useState } from "react";
import { deleteGameFromWishlist } from "../_lib/actions";
import AddToWishlistButton from "./AddToWishlistButton";
import WishlistAccordion from "./WishlistAccordion";
import InsertWishlistGameForm from "./InsertWishlistGameForm";
import DownloadWishlistButton from "./DownloadWishlistButton";
import ToTopButton from "./ToTopButton";

function WishListWrapper({ wishlistByPlatforms, platforms }) {
  const [isOpenInsertGame, setIsOpenInsertGame] = useState(false);
  const [curOpen, setCurOpen] = useState(null);
  const [expandAll, setExpandAll] = useState(false);

  const [optimisticPlatforms, optimisticDelete] = useOptimistic(
    wishlistByPlatforms,
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
    optimisticDelete(gameId);
    await deleteGameFromWishlist(gameId);
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

            <div className="border-primary mt-7 mb-10 flex items-baseline justify-between border-b p-3">
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

            {/* Lista giochi per piattaforma */}
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
