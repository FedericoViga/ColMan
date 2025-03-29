import { fetchGames } from "../_lib/data-service";
import GameCard from "./GameCard";

async function SearchResultsList({ queryString, platformFilter }) {
  const fetchedGames = await fetchGames(queryString, platformFilter);

  return (
    <div className="container mt-3 mb-10 flex w-full flex-col items-center justify-center !px-0">
      {fetchedGames === undefined && (
        <p className="text-primary mt-5 text-xl">Cerca un gioco...</p>
      )}
      {fetchedGames !== undefined && (
        <>
          <p className="text-primary mb-4 self-start pl-[9px] font-bold tracking-wide">
            <span className="text-foreground text-lg">
              {fetchedGames.length}
            </span>{" "}
            {fetchedGames.length === 1
              ? "Risultato trovato"
              : "Risultati trovati"}
          </p>
          {fetchedGames.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default SearchResultsList;
