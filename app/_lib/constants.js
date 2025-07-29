// quantità di risultati per pagine con paginazione
export const PAGE_SIZE = 10;

// oggetto per assegnazione dinamica emoji bandiere in base alla regione del gioco
export const FLAGS = [
  { region: "ITA", flag: "🇮🇹" },
  { region: "PAL-ITA", flag: "🇪🇺🇮🇹" },
  { region: "PAL", flag: "🇪🇺" },
  { region: "NTSC-U", flag: "🇺🇸" },
  { region: "NTSC-J", flag: "🇯🇵" },
];

// testo di default per gioco sigillato
export const SEALED_TEXT = "Gioco completo sigillato.";

// Testo informativo per crezione liste in form di crezione gioco
export const DESCRIPTION_PLACEHOLDER =
  "Scrivi ogni contenuto del gioco seguito da una virgola (es. manuale, flyer, punti vip) e seleziona Lista per generare un'anteprima come lista che verrà visualizzata nella scheda del gioco.";
