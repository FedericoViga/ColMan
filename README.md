<div align="center">

  <h1>ColMan</h1>

</div>
<p>Colman sta per "Collection Manager" ed è una Single Page Application full-stack specifica per smartphone e tablet per gestire la mia collezione di videogiochi in modo rapido.<br>

Con questa applicazione si possono inserire/modificare/eliminare nuovi giochi e piattaforme direttamente nel database di Supabase (PostgreSQL) scattando la foto sul momento o prendendola dalla galleria del telefono e compilando una vera e propria "scheda prodotto" con le informazioni sul gioco o sulla piattaforma.<br>

In questa prima versione ho mantenuto un design semplice con priorità alla funzionalità e con transizioni/animazioni css per dare più fluidità, ma anche spinner di caricamento, skeleton loader e indicatori visivi durante il fetch dei dati e le server actions grazie a Next.Js, Suspense e useTransition di React.<br>

Le notifiche toast di avvenuta aggiunta/modifica/eliminazione sono gestite con la fantastica libreria React Hot Toast.<br>

</p>

![schermate-Colman](colman-new-showcase.png)

Questo progetto è interamente fatto a mano da zero e non sono stati usati tools IA.

## Funzionalità

- Homepage con ricerca in tempo reale e filtro piattaforma che renderizza le card di preview dei giochi;
- Hero section con recap del numero totale di giochi, collector's editions e piattaforme
- Spinner, indicatori e skeleton loader durante i caricamenti, fetch dei dati e server actions di Next;
- Notifiche toast di avvenuta aggiunta, modifica o eliminazione giochi e piattaforme;
- Lista delle card di tutti i giochi con paginazione variabile e filtro piattaforma;
- Lista delle card di tutte le collector's editions con paginazione variabile e filtro piattaforma;
- Lista di tutte le piattaforme;
- Creazione giochi e piattaforme con i relativi dati (immagine, nome, regione, contenuti ecc.);
- Modifica dei dati dei giochi e dell'immagine;
- Modifica dei dati delle piattaforme;
- Checkbox per giochi sigillati, edizioni speciali e collector's editions;
- Eliminazione di giochi e piattaforme con modal di conferma custom.

## Tecnologie usate

- **Next.Js**
- **Tailwindcss**
- **Auth.js**
- **Supabase**
- **React Hot Toast**
- **Js-cookie**

> ⚠️ Quest'app è per uso personale, perciò è accessibile solo tramite uno specifico account.
