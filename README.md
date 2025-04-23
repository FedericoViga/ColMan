<div align="center">

  <h1>Colman</h1>
  <hr>

</div>
<p>Colman sta per collection manager, è una Web App sviluppata con Next.Js, Tailwind e Supabase per dispositi mobili per gestire la mia collezione di videogiochi in modo rapido.<br>
In questa prima versione ho mantenuto un design semplice con priorità alla funzionalità, anche se non mancano transizioni css per dare più fluidità e ovviamente i vari spinner di caricamento e indicatori per le richieste asincrone grazie a Next, Suspense e useTransition di React.
</p>

## Tecnologie usate

- **Next.Js**
- **Auth.js**
- **Supabase**
- **Tailwindcss**
- **React Hot Toast**

## Funzionalità

- L'intera app è accessibile solo tramite uno specifico account Google che deve corrispondere a quello inserito nel database (non è un'autenticazione vera e propria per ora!);
- Homepage con ricerca in tempo reale di giochi e filtro piattaforma;
- Notifiche toast di avvenuta aggiunta, modifica o eliminazione;
- Lista di tutti i videogiochi con paginazione e filtro piattaforma;
- Lista di tutte le collector's editions con paginazione e filtro piattaforma;
- Lista di tutte le piattaforme;
- Funzione di aggiunta giochi e piattaforme con i propri dati (immagine, nome, regione, contenuti ecc.);
- Checkbox per giochi sigillati, edizioni speciali e collector's editions;
- Funzione di modifica delle schede di giochi e piattaforme;
- Funzione di eliminazione giochi e piattaforme;
- Funzione di modifica dell'immagine del gioco.
