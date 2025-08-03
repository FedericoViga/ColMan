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

// Genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove:
// la key è una stringa col nome del platformOwner
// il value è un array di oggetti dove ogni oggetto è una specifica piattaforma di quel platformOwner
export function groupByPlatformOwner(platforms, property) {
  const platformsbyOwner = platforms.reduce((acc, curr) => {
    if (!acc[curr[property]]) {
      acc[curr[property]] = [];
    }
    acc[curr[property]].push(curr);
    return acc;
  }, {});

  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsbyOwner);
  return platformsToArray;
}

// Aggiunge il numero di giochi che appartengono ad ogni piattaforma
export function countGamesByPlatform(platformsByGame, platformsByOwner) {
  // oggetto con numero di occorrenze di ogni piattaforma
  const numPlatforms = {};

  // riempie l'oggetto numPlatforms
  // esempio: {GameCube: 15, PlayStation 2: 22, 3DS: 7}
  for (const { platform } of platformsByGame) {
    numPlatforms[platform] = (numPlatforms[platform] || 0) + 1;
  }

  // viene iterata ogni piattaforma dell'array platformsByOwner e viene aggiunto "numByGame" alla piataforma corrispondente col numero di giochi per quella piattaforma
  for (const [, platforms] of platformsByOwner) {
    for (const platformObj of platforms) {
      const name = platformObj.platformName;
      platformObj.numByGame = numPlatforms[name] || 0;
    }
  }

  return platformsByOwner;
}
