// Debounce testo ricerca gioco
export const textDebounce = (func, delay) => {
  let timeout = null;

  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Genera un oggetto che contiene X array, ognuno due elementi:
// a index [0] una stringa col nome del platformOwner
// a index [1] un array di oggetti dove ogni oggetto è una specifica piattaforma di quel platformOwner
export function groupByPlatformOwner(platforms, key) {
  const platformsbyOwner = platforms.reduce((acc, curr) => {
    if (!acc[curr[key]]) {
      acc[curr[key]] = [];
    }
    acc[curr[key]].push(curr);
    return acc;
  }, {});

  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsbyOwner);
  return platformsToArray;
}

// Aggiunge il numero di giochi corrispondente ad ogni piattaforma
export function addGameCount(platformsByOwner, gamesByPlatform) {
  const combined = platformsByOwner.map(([owner, platforms]) => {
    const updatedPlatforms = platforms.map((platform) => {
      // Trova il dato games corrispondente
      const gamesData = gamesByPlatform.find(
        (obj) => obj.platform === platform.platformName,
      );
      return {
        ...platform,
        games: gamesData ? gamesData.games : 0, // 0 se non trovato
      };
    });
    return [owner, updatedPlatforms];
  });

  return combined;
}

// Ordina per piattaforma i giochi in wishlist
// Ritorna un array di oggetti dove ogni oggetto ha due proprietà:
// platformName: stringa nome piattaforma
// games: array di oggetti con i giochi in wishlit per quella piattaforma
export function wishlistByPlatforms(wishlist) {
  const groupedArray = Object.values(
    wishlist.reduce((acc, game) => {
      const platformName = game.platforms.platformName;

      if (!acc[platformName]) {
        acc[platformName] = { platformName, games: [] };
      }

      acc[platformName].games.push(game);
      return acc;
    }, {}),
  );

  return groupedArray;
}

// Combina piattaforme globali (gia divise per produttore) e piattaforme selezionate dall'utente
// aggiunge isActive: boolean se la piattaforma è presente o meno in quelle dell'utente
// ordina in ordine alfabetico per produttore e piattaforme
export function globalAndUserPlatformsCombined(globalPlatforms, userPlatforms) {
  const updatedPlatforms = globalPlatforms.map(([owner, platforms]) => {
    // nuovo array di piattaforme con isActive per il defaultChecked delle checkbox
    const updatedPlatforms = platforms.map((platform) => {
      // controlla se la piattaforma è presente in userPlatforms
      const isActive = userPlatforms.some(
        (uplatform) => uplatform.platformId === platform.id,
      );
      return {
        ...platform,
        isActive,
      };
    });

    return [owner, updatedPlatforms];
  });

  // ordinamemnto alfabetico per produttore e piattaforme
  const alphabeticalGlobalAndUserPlatforms = updatedPlatforms
    .map(([groupName, platforms]) => [
      groupName,
      platforms
        .slice()
        .sort((a, b) => a.platformName.localeCompare(b.platformName)),
    ])
    .sort((a, b) => a[0].localeCompare(b[0]));

  return alphabeticalGlobalAndUserPlatforms;
}
