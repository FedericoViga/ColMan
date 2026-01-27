// Quantità di risultati per pagine con paginazione
export const PAGE_SIZE = 10;

// Oggetto per assegnazione dinamica emoji bandiere in base alla regione del gioco
export const FLAGS = [
  { region: "ITA", flag: "🇮🇹" },
  { region: "PAL-ITA", flag: "🇪🇺🇮🇹" },
  { region: "PAL", flag: "🇪🇺" },
  { region: "NTSC-U", flag: "🇺🇸" },
  { region: "NTSC-J", flag: "🇯🇵" },
];

// Testo di default per gioco sigillato
export const SEALED_TEXT = "Gioco completo sigillato.";

// Testo informativo per generazione liste contenuti nel form di crezione gioco
export const DESCRIPTION_PLACEHOLDER =
  "Scrivi ogni contenuto del gioco seguito da una virgola (manuale, flyer, punti vip) per generare un'anteprima che verrà visualizzata nella pagina del gioco. Puoi vedere la lista generata in tempo reale selezionando Lista.";
