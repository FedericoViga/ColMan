import { useRef, useState } from "react";
import CopyButton from "./CopyButton";

function ContentDescription({ description }) {
  const [listView, setListView] = useState(true);
  const descrRef = useRef(null);

  // se l'utente mette una virgola come ultimo carattere la rimuove
  const removeLastComma =
    description[description.length - 1] === ","
      ? description.slice(0, -1)
      : description;

  // converte in arrray il testo del contenuto e fa il trim
  // la regex trova il carattere "," e il carattere "e" preceduto e seguito da uno spazio come separatori dell'array
  // in questo modo divide ogni elemento della lista separato dalle virgole e opzionalmente l'elemento finale separato dalla "e"
  const textToList = removeLastComma
    .split(/\s+e\s+|,/g)
    .map((elem) => elem.trim());

  function handleList() {
    if (listView) return;
    setListView((view) => !view);
  }

  function handleOriginal() {
    if (!listView) return;
    setListView((view) => !view);
  }

  return (
    <div className="mt-2.5">
      <div>
        <div className="flex justify-between">
          <span className="text-primary text-lg">Contenuto</span>
          <div className="flex justify-center gap-1">
            <button
              onClick={handleList}
              className={`rounded px-2 text-sm ${listView ? "text-foreground border-1 border-blue-500 ring-1 ring-blue-500" : "text-primary border"}`}
            >
              Lista
            </button>
            <button
              onClick={handleOriginal}
              className={`rounded px-2 text-sm ${!listView ? "text-foreground border-1 border-blue-500 ring-1 ring-blue-500" : "text-primary border"}`}
            >
              Originale
            </button>
          </div>
        </div>
      </div>
      {listView ? (
        <>
          <ul
            className="relative z-0 mt-2 rounded border border-slate-800 bg-slate-800 p-3"
            ref={descrRef}
          >
            <CopyButton elemRef={descrRef} />

            {/* se è un solo elemento renderizza solo un <li> */}
            {textToList.length === 1 && <li>{textToList[0]}</li>}

            {/* se sono più elementi: */}
            {/* se la stringa non termina con "." aggiunge ";" alla fine */}
            {/* converte la prima lettera di ogni stringa in maiuscola */}
            {/* all'ultimo elemento toglie ";" finale e mette "." */}
            {textToList.length > 1 &&
              textToList.map((elem, i) => (
                <li className="my-1 list-inside list-disc" key={i}>
                  {elem.charAt(0).toUpperCase() +
                    elem.slice(1).replaceAll(/[.,;]/g, "")}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p className="mt-2 rounded border border-slate-800 bg-slate-800 p-3">
          {description}
        </p>
      )}
    </div>
  );
}

export default ContentDescription;
