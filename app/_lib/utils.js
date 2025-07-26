// Genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove:
// la key è una stringa col nome del platformOwner
// il value è un array di oggetti dove ogni oggetto è una specifica piattaforma di quel platformOwner
export function groupByPlatformOwner(platforms, property) {
  return platforms.reduce((acc, curr) => {
    if (!acc[curr[property]]) {
      acc[curr[property]] = [];
    }
    acc[curr[property]].push(curr);
    return acc;
  }, {});
}

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
