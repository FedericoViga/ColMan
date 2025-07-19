<div align="center">

  <h1>ColMan</h1>

</div>
<p>Colman sta per "Collection Manager" ed è una Single Page Application full-stack specifica per smartphone e tablet per gestire la mia collezione di videogiochi in modo rapido.<br>

Con questa applicazione si possono inserire/modificare/eliminare nuovi giochi e piattaforme direttamente nel database di Supabase (PostgreSQL) scattando la foto sul momento o prendendola dalla galleria del telefono e compilando una vera e propria "scheda prodotto" con le informazioni sul gioco o sulla piattaforma.<br>

Le notifiche toast di avvenuta aggiunta/modifica/eliminazione sono gestite con la fantastica libreria React Hot Toast.<br>

In questa prima versione ho mantenuto un design semplice con priorità alla funzionalità, ma non mancano transizioni Css per dare più fluidità e spinner di caricamento o indicatori visivi durante le richieste asincrone grazie a Next.Js, Suspense e useTransition di React.<br>

</p>

![schermate-Colman](colman-new-showcase.png)

## Tecnologie usate

- **Next.Js**
- **Tailwindcss**
- **Auth.js**
- **Supabase**
- **React Hot Toast**
- **Js-cookie**

Questo progetto è interamente fatto a mano da zero e non sono state usate IA.

## Funzionalità

- Homepage con ricerca in tempo reale di giochi con filtro piattaforma;
- Notifiche toast di avvenuta aggiunta, modifica o eliminazione giochi e piattaforma;
- Lista di tutti i videogiochi con paginazione variabile e filtro piattaforma;
- Lista di tutte le collector's editions con paginazione variabile e filtro piattaforma;
- Lista di tutte le piattaforme;
- Funzione di aggiunta giochi e piattaforme con i relativi dati (immagine, nome, regione, contenuti ecc.);
- Funzione di modifica dell'immagine del gioco.
- Checkbox per giochi sigillati, edizioni speciali e collector's editions;
- Funzione di modifica/eliminazione di giochi e piattaforme;

> ⚠️ Quest'app è per uso personale, perciò è accessibile solo tramite uno specifico account.
