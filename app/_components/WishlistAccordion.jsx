"use client";

import DeleteWishlistGameButton from "./DeleteWishlistGameButton";
import { HeartIcon } from "@heroicons/react/24/outline";

function WishlistAccordion({
  platform,
  accordionId,
  curOpen,
  onOpen,
  onDelete,
  expandAll,
}) {
  // state per chiudere il dropdown dei filtri se viene selezionato un nuovo dropdown
  const isSelectorOpen = accordionId === curOpen;

  return (
    <div className="my-6">
      <button
        disabled={expandAll}
        onClick={() => {
          if (isSelectorOpen && accordionId === curOpen) {
            onOpen(null);
          } else onOpen(accordionId);
        }}
        className={`${expandAll || isSelectorOpen ? "rounded border-2 border-blue-500" : "border-primary border-b"} flex w-full justify-between px-2 py-1 text-lg`}
      >
        <div className="flex items-center gap-1.5">
          <HeartIcon
            className={`h-4 w-4 ${expandAll || isSelectorOpen ? "text-blue-500" : ""}`}
          />
          <span>{platform.platformName}</span>
          <span className="text-primary text-sm">
            ({platform.games.length})
          </span>
        </div>
        {expandAll || isSelectorOpen ? (
          <span className="text-xl">+</span>
        ) : (
          <span className="text-xl">-</span>
        )}
      </button>

      <ul
        className={`${expandAll || isSelectorOpen ? "border-primary rounded border border-t-0" : "max-h-0 overflow-hidden"} flex w-full flex-col`}
      >
        {platform.games.map((elem) => (
          <li
            key={elem.id}
            className={`flex w-full items-center justify-between ${
              expandAll || isSelectorOpen
                ? "border-primary border-b px-2 py-2 last-of-type:border-0"
                : "h-0"
            }`}
          >
            <span className="min-w-0 flex-1 break-words">{elem.gameName}</span>
            <DeleteWishlistGameButton gameId={elem.id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WishlistAccordion;
