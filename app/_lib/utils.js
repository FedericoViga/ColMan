// debounce testo ricerca gioco
export const textDebounce = (func, delay) => {
  let timeout = null;

  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Genera un oggetto che contiene X array con due elementi, dove:
// [0] è una stringa col nome del platformOwner
// [1] è un array di oggetti dove ogni oggetto è una specifica piattaforma di quel platformOwner
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
