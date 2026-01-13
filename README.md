<div align="center">

  <h1>ColMan</h1>

</div>
<p>Colman sta per "Collection Manager" ed è una Single Page Application full-stack (React, Next.Js e Supabase) specifica per smartphone che uso regolarmente per gestire la mia collezione di videogiochi in modo rapido.<br>

Si possono inserire/modificare/eliminare nuovi giochi e piattaforme direttamente nel database di Supabase (PostgreSQL), scattando la foto sul momento o selezionandola dalla galleria del telefono e compilando una vera e propria "scheda prodotto" con le informazioni sul gioco o sulla piattaforma.<br>
E molto altro...(vedi features sotto)

In questa prima versione ho mantenuto un design semplice con priorità alla funzionalità e con transizioni/animazioni css per dare più fluidità, ma anche optmistic updates, spinner di caricamento, skeleton loader e overlay durante i fetch e le server actions grazie a Next.Js, Suspense e useTransition di React.<br>

Le notifiche toast di avvenuta aggiunta/modifica/eliminazione sono gestite con la fantastica libreria React Hot Toast.<br>

</p>

![schermate-Colman](colman-new-showcase.png)

Questo progetto è interamente fatto a mano da zero e non sono stati usati tools IA.

---

## Features

#### [New 2026] Wishlist giochi

- Pagina della wishlist raggiungibile con link in homepage o dall'account utente
- Floating button che apre una modal con form per aggiungere alla wishlist un nuovo gioco
- Wishlist con componenti accordion generati dinamicamente per ogni piattaforma e relativi giochi
- Interruttore per espandere tutti gli accordion delle piattaforme che contengono la lista giochi
- Button di eliminazione istantanea con optimistic update per ogni gioco nella lista
- Button per scaricare un file .csv tutti i giochi in wishlist in ordine alfabetico in base alla piattaforma
- Back to top floating button dinamico con smooth scroll per tornare in cima alla lista

#### Esplorazione e gestione collezione

- Ricerca avanzata con filtro per piattaforma e aggiornamento in tempo reale dei risultati
- Liste paginate di giochi, collector’s editions e piattaforme
- Hero section con statistiche dinamiche sull’intera collezione

#### Gestione contenuti e metadati

- Creazione, modifica ed eliminazione di giochi e piattaforme con flussi guidati
- Supporto nativo a giochi sigillati, edizioni speciali e collector’s editions
- Generazione automatica della lista dei contenuti a partire dal testo inserito
- Inserimento intelligente di testi di default e validazione in tempo reale degli input

#### Pagina gioco avanzata

- Vista dedicata con badge visivi per tipologia di edizione
- Toggle tra contenuti originali e lista formattata automaticamente
- Copia rapida della lista contenuti con feedback animato
- Visualizzazione dinamica della regione tramite icone

#### Integrazioni esterne

- Link contestuali a Google ed eBay basati su titolo e piattaforma
- Verifica della completezza del gioco su supporto fisico tramite link contestuali a DoesItPlay

#### Esperienza utente e feedback

- Skeleton loader, spinner e overlay animati durante fetch e server actions
- Notifiche toast per tutte le operazioni principali
- Modal di conferma personalizzate per le azioni critiche

---

## Tecnologie usate

<table>
<tr>
<td valign="top">

### Backend

- **Next.Js (App Router)** per routing, server side rendering e server actions
- **Supabase (PostgreSQL)** per la gestione backend e database
- **Auth.js** per login e autenticazione

</td>
<td valign="top">

### Frontend

- **React** con componenti funzionali e riutilizzabili
- **Tailwindcss** per styling modulare con UI consistente
- **React Hot Toast** per le notifiche dinamiche
- **Js-cookie** per gestione semplice dei cookies nel frontend

</td>
</tr>
</table>

Sviluppata con ❤️ da un essere umano.

> ⚠️ Quest'app è per uso personale, perciò è accessibile solo tramite uno specifico account.
