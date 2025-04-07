// genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove la key è una stringa col nome del platformOwner e il value è un array di oggetti con la lista piattaforme e tutto il resto
export function groupByPlatformOwner(platforms, property) {
  return platforms.reduce((acc, curr) => {
    if (!acc[curr[property]]) {
      acc[curr[property]] = [];
    }
    acc[curr[property]].push(curr);
    return acc;
  }, {});
}
