import Link from "next/link";
import { useState } from "react";

function PlatformsAccordion({ platformDetails, id, curOpen, onOpen }) {
  // state per chiudere il dropdown dei filtri se viene selezionato un nuovo dropdown
  const isSelectorOpen = id === curOpen;
  return (
    <div
      className={`border-primary my-5 rounded border ${isSelectorOpen ? "border-b" : "border-b-0"}`}
    >
      <button
        onClick={() => {
          onOpen(id);
        }}
        className="border-primary flex w-full justify-between rounded border-b p-1.5"
      >
        <span>{platformDetails[0]}</span>
        {isSelectorOpen ? <span>+</span> : <span>-</span>}
      </button>
      <ul
        className={`grid max-h-60 overflow-auto transition-all duration-300 ease-in-out ${isSelectorOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        {platformDetails[1].map((elem) => (
          <li
            key={elem.id}
            className={`overflow-hidden ${isSelectorOpen ? "h-auto p-2" : "h-0"}`}
          >
            <Link
              href={`/platforms/${elem.id.toString().startsWith("-") ? elem.id.slice(1) : elem.id}-${elem.platformName.toLowerCase().replaceAll(" ", "-")}`}
            >
              {elem.platformName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformsAccordion;
