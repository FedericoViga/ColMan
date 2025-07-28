function ContentDescriptionInsert({
  descriptionValue,
  onDescriptionValue,
  listView,
  onListView,
}) {
  // converte in arrray il testo del contenuto e fa il trim
  // la regex trova il carattere "," e il carattere "e" preceduto e seguito da uno spazio come separatori dell'array
  // in questo modo divide ogni elemento della lista separato dalle virgole e opzionalmente l'elemento finale separato dalla "e"
  const textToList = descriptionValue
    .split(/\s+e\s+|,/g)
    .map((elem) => elem.trim());

  function handleList(e) {
    e.preventDefault();
    if (listView) return;
    onListView((view) => !view);
  }

  function handleOriginal(e) {
    e.preventDefault();
    if (!listView) return;
    onListView((view) => !view);
  }
  return (
    <div className="mt-1.5">
      <div>
        <div className="flex justify-between">
          <span className="text-primary text-lg">Contenuto</span>
          <div className="flex justify-center gap-2">
            <button
              onClick={(e) => handleList(e)}
              className={`rounded px-2 text-sm ${listView ? "text-foreground border-1 border-blue-500 ring-1 ring-blue-500" : "text-primary border"}`}
            >
              Lista
            </button>

            <button
              onClick={(e) => handleOriginal(e)}
              className={`rounded px-2 text-sm ${!listView ? "text-foreground border-1 border-blue-500 ring-1 ring-blue-500" : "text-primary border"}`}
            >
              Originale
            </button>

            <div className="flex min-w-14 items-end justify-end">
              <span className="text-primary text-sm">
                {descriptionValue.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>
      {listView ? (
        <>
          {/* se non c'è testo renderizza le informazioni */}
          {textToList.length === 1 && textToList[0] === "" && (
            <p className="text-primary mt-1.5 h-[158px] rounded border border-slate-800 bg-slate-800 p-3 text-base">
              Seleziona "Originale" qui sopra e scrivi una lista dei contenuti
              del gioco{" "}
              <span className="text-foreground font-semibold">
                separati da virgole
              </span>{" "}
              (es. manuale, flyer, punti vip) . Qui verrà generata l'anteprima
              sotto forma di lista che verrà visualizzata nella scheda del
              gioco.
            </p>
          )}

          {/* se è un solo elemento renderizza un paragrafo singolo */}
          {textToList.length === 1 && textToList[0] !== "" && (
            <p className="text-primary mt-2 rounded border border-slate-800 bg-slate-800 p-3">
              {textToList[0].charAt(0).toUpperCase() + textToList[0].slice(1)}
            </p>
          )}

          {textToList.length > 1 && (
            <ul className="mt-2 rounded border border-slate-800 bg-slate-800 p-3 select-none">
              {/* se sono più elementi: */}
              {/* se la stringa non termina con "." aggiunge ";" alla fine */}
              {/* converte la prima lettera di ogni stringa in maiuscola */}
              {/* all'ultimo elemento toglie ";" finale e mette "." */}
              {textToList.length > 1 &&
                textToList.map((elem, i) => (
                  <li className="my-1 list-inside list-disc" key={i}>
                    {elem[elem.length - 1] !== "."
                      ? elem.charAt(0).toUpperCase() + elem.slice(1) + ";"
                      : elem.charAt(0).toUpperCase() +
                        elem.slice(1).replace(";", ".")}
                  </li>
                ))}
            </ul>
          )}
        </>
      ) : (
        <div className="mt-1.5 flex flex-col gap-1">
          <textarea
            value={descriptionValue}
            autoCapitalize="sentences"
            required
            name="contentDescription"
            rows="6"
            className="border-primary rounded border p-1.5 text-base"
            maxLength="500"
            onChange={(e) => {
              onDescriptionValue(e.target.value);
            }}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default ContentDescriptionInsert;
