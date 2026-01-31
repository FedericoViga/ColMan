import Link from "next/link";
import { useRef } from "react";

function PlatformsAccordion({ platformDetails, id, curOpen, onOpen }) {
  // state per chiudere il dropdown dei filtri se viene selezionato un nuovo dropdown
  const isSelectorOpen = id === curOpen;
  const listRef = useRef(null);

  return (
    <div className={`my-8`}>
      <button
        onClick={() => {
          if (isSelectorOpen && id === curOpen) {
            onOpen(null);
          } else onOpen(id);
        }}
        className={`${isSelectorOpen ? "border-accent border-2" : ""} bg-surface flex w-full justify-between rounded px-2 py-1.5 text-lg`}
      >
        <span className={`${isSelectorOpen ? "text-accent" : ""}`}>
          {platformDetails[0]}
        </span>
        {isSelectorOpen ? (
          <span className="text-accent text-xl">+</span>
        ) : (
          <span className="text-xl">-</span>
        )}
      </button>

      <ul
        ref={listRef}
        style={{
          maxHeight: isSelectorOpen
            ? `${listRef.current?.scrollHeight}px`
            : "0px",
        }}
        className={`${isSelectorOpen ? "" : "border-y-0"} bg-surface overflow-hidden rounded transition-[max-height] duration-300 ease-in-out`}
      >
        {platformDetails[1].map((elem) => (
          <li key={elem.platformId} className="hover:bg-background px-2 py-3">
            <Link
              className="inline-block w-full"
              href={`/platforms/${elem.platformId.toString().startsWith("-") ? elem.platformId.slice(1) : elem.platformId}-${elem.platformName.toLowerCase().replaceAll(" ", "-")}`}
            >
              {elem.platformName}{" "}
              <span className="text-subtle-surface">({elem.games})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformsAccordion;
