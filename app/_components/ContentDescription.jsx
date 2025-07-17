function ContentDescription({ description, textToList }) {
  return (
    <div className="mt-3">
      <span className="text-primary text-lg">Contenuto:</span>
      {description !== null ? (
        <ul className="mt-2 rounded border border-slate-800 bg-slate-800 p-2">
          {/* se è un solo elemento renderizza solo un <li> */}
          {textToList.length === 1 && <li className="my-1">{textToList[0]}</li>}

          {/* se sono più elementi: */}
          {/* se la stringa non termina con "." aggiunge ";" alla fine */}
          {/* converte la prima lettera di ogni stringa in maiuscola */}
          {/* all'ultimo elemento toglie ";" finale e mette "." */}
          {textToList.length > 1 &&
            textToList.map((elem, i) => (
              <li className="my-1" key={i}>
                -{" "}
                {elem[elem.length - 1] !== "."
                  ? elem.charAt(0).toUpperCase() + elem.slice(1) + ";"
                  : elem.charAt(0).toUpperCase() +
                    elem.slice(1).replace(";", ".")}
              </li>
            ))}
        </ul>
      ) : (
        <p>Contenuto non specificato.</p>
      )}
    </div>
  );
}

export default ContentDescription;
