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
        className={`${isSelectorOpen ? "border-2 border-blue-500" : "border-primary border"} flex w-full justify-between rounded px-2 py-2 text-lg`}
      >
        <span>{platformDetails[0]}</span>
        {isSelectorOpen ? (
          <span className="text-xl">+</span>
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
        className={`${isSelectorOpen ? "" : "border-y-0"} border-primary overflow-hidden rounded border transition-[max-height] duration-300 ease-in-out`}
      >
        {platformDetails[1].map((elem) => (
          <li
            key={elem.id}
            className={`${isSelectorOpen ? "" : "last:border-b"} px-2 py-3 hover:bg-blue-500`}
          >
            <Link
              className="inline-block w-full"
              href={`/platforms/${elem.id.toString().startsWith("-") ? elem.id.slice(1) : elem.id}-${elem.platformName.toLowerCase().replaceAll(" ", "-")}`}
            >
              {elem.platformName}{" "}
              <span className="text-primary">({elem.games})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformsAccordion;
