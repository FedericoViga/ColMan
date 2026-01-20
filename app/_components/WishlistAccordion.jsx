"use client";

import { useRef } from "react";
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
  const ulAccordion = useRef(null);
  // state per chiudere il dropdown dei filtri se viene selezionato un nuovo dropdown
  const isSelectorOpen = accordionId === curOpen;

  return (
    <div className="mb-8">
      <button
        disabled={expandAll}
        onClick={() => {
          if (isSelectorOpen && accordionId === curOpen) {
            onOpen(null);
          } else onOpen(accordionId);
        }}
        className={`${expandAll || isSelectorOpen ? "border-accent rounded border-1" : "border-b border-slate-600"} flex w-full justify-between px-2 py-1 text-lg`}
      >
        <div className="flex items-center gap-1.5">
          <HeartIcon
            className={`h-4 w-4 ${expandAll || isSelectorOpen ? "text-accent" : ""}`}
          />
          <span
            className={`${expandAll || isSelectorOpen ? "text-accent" : ""}`}
          >
            {platform.platformName}
          </span>
          <span className="text-primary text-sm">
            ({platform.games.length})
          </span>
        </div>
        {expandAll || isSelectorOpen ? (
          <span className="text-accent text-xl">+</span>
        ) : (
          <span className="text-xl">-</span>
        )}
      </button>

      <ul
        ref={ulAccordion}
        style={{
          maxHeight:
            expandAll || isSelectorOpen
              ? `${ulAccordion.current?.scrollHeight}px`
              : "0px",
        }}
        className="flex w-full flex-col overflow-hidden rounded border border-t-0 border-slate-600 transition-[max-height] duration-300 ease-in-out"
      >
        {platform.games.map((elem) => (
          <li
            key={elem.id}
            className="flex w-full items-center justify-between border-b border-slate-600 px-2 py-3 last:border-0"
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
