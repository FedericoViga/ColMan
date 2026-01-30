import { PAGE_SIZE } from "./constants";
import { createClient } from "./supabase/server";

// Raggruppa e conta i giochi per ogni piattaforma con una funzione SQL
export const numGamesByPlatform = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase.rpc("count_games_by_platform");

  if (error) {
    console.log(error);
    throw new Error(
      "Il numero di giochi per piattaforma non può essere calcolato",
    );
  }
  return data;
};

// read tutte le piattaforme globali
export const getAllPlatforms = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("platforms")
    .select("id, platformName, platformOwner, platformLogo")
    .order("platformName", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Le piattaforme non possono essere caricate");
  }

  return data;
};

// count giochi utente
export const countGames = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { count, error } = await supabase
    .from("games")
    .select("id", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di giochi non può essere calcolato");
  }

  return count;
};

// read tutte le piattaforme utente
export const getUserPlatforms = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("userPlatforms")
    .select("userId, platformId");

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  return data;
};

// read tutte le piattaforme utente complete
export const getUserPlatformsComplete = async function () {
  const supabase = await createClient(); // se sevrve lo userId bisogna passare i cookies

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("userPlatforms")
    .select("platformId, platforms(platformName, platformOwner)");

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  // rimuove completamente la key platforms
  const formattedPlatforms = data.map(({ platformId, platforms }) => ({
    platformId,
    ...platforms,
  }));

  return formattedPlatforms;
};

// count giochi per una specifica piattaforma
export const countGamesByPlatform = async function (platformName) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  if (!platformName || platformName === "all") return 0;

  const { count, error } = await supabase
    .from("games")
    .select("id", { count: "exact" })
    .eq("platform", platformName);

  if (error) {
    console.log(error);
    throw new Error(
      "Il numero di giochi per questa piattaforma non può essere calcolato",
    );
  }

  return count;
};

// count collectors per una specifica piattaforma
export const countCollectorsByPlatform = async function (platformName) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  if (!platformName || platformName === "all") return 0;

  const { count, error } = await supabase
    .from("games")
    .select("id", { count: "exact" })
    .eq("platform", platformName)
    .eq("isCollector", true);

  if (error) {
    console.log(error);
    throw new Error(
      "Il numero di collector's editions per questa piattaforma non può essere calcolato",
    );
  }

  return count;
};

// count piattafrome utente
export const countPlatforms = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { count, error } = await supabase
    .from("userPlatforms")
    .select("platformId", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  return count;
};

// count collectors utente
export const countCollectors = async function () {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { count, error } = await supabase
    .from("games")
    .select("*", { count: "exact" })
    .eq("isCollector", "TRUE");

  if (error) {
    console.log(error);
    throw new Error(
      "Il numero di collector's editions non può essere calcolato",
    );
  }

  return count;
};

// read giochi cercati
export const fetchGames = async function (queryString, platformFilter) {
  if (!queryString) return;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  if (platformFilter === "all" || platformFilter === undefined) {
    const { data, error } = await supabase
      .from("games")
      .select("*, platforms(platformName)")
      .textSearch("gameName", `'${queryString}'`)
      .order("gameName", { ascending: true });

    if (error) {
      console.log(error);
      throw new Error("Non è stato possibile scaricare la lista dei giochi");
    }

    // Signed Url immagini
    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return gamesWithSignedImages;
  } else {
    const { data, error } = await supabase
      .from("games")
      .select("*, platforms(platformName)")
      .eq("platform", platformFilter)
      .textSearch("gameName", `'${queryString}'`)
      .order("gameName", { ascending: true });

    if (error) {
      console.log(error);
      throw new Error(
        "Non è stato possibile scaricare la lista dei giochi filtrati",
      );
    }

    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return gamesWithSignedImages;
  }
};

// read gioco completo
export async function getFullGame(id, platform) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .ilike("platform", `%${platform}%`)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Non è stato possibile caricare i dettagli del gioco");
  }

  // Signed Url immagini
  const { gameImages } = data;

  const { data: signedGameImage, error: signedImageError } =
    await supabase.storage
      .from(`images/users/${user.id}`)
      .createSignedUrl(gameImages, 180);

  if (signedImageError) {
    console.warn(
      `Id gioco: ${id}`,
      "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
    );
    return {
      ...data,
      gameImages: null,
    };
  }

  return { ...data, gameImages: signedGameImage.signedUrl };
}

// read piattaforma globale completa
export async function getFullPlatform(id) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("platforms")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(
      "Non è stato possibile caricare i dettagli della piattaforma",
    );
  }

  return data;
}

// read giochi utente per paginazione
export async function fetchGamesWithPagination(page, platformFilter) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  // se non c'è il param platfom o se è "all" li fetcha tutti
  if (platformFilter === undefined || platformFilter === "all") {
    let queryAll = supabase.from("games").select("*", { count: "exact" });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryAll = queryAll.range(from, to);
    }

    // setta route /games come param "?page=1"
    if (!page) {
      page = 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryAll = queryAll.range(from, to);
    }

    const { data, error, count } = await queryAll;

    if (error) {
      console.log(error);
    }

    // Signed Url immagini
    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return { gamesWithSignedImages, count };
  } else {
    // se c'è il filtro piattaforma fetcha solo quelli del filtro
    let queryWithPlatform = supabase
      .from("games")
      .select("*", { count: "exact" })
      .eq("platform", platformFilter);

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryWithPlatform = queryWithPlatform.range(from, to);
    }

    // setta route /games come param ?page=1
    if (!page) {
      page = 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryWithPlatform = queryWithPlatform.range(from, to);
    }

    const { data, error, count } = await queryWithPlatform;

    if (error) {
      console.log(error);
    }

    // Signed Url immagini
    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return { gamesWithSignedImages, count };
  }
}

// read collectors per paginazione
export async function fetchCollectorsWithPagination(page, platformFilter) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  // se non c'è il param platfom o se è "all" li fetcha tutti
  if (platformFilter === undefined || platformFilter === "all") {
    let queryAll = supabase
      .from("games")
      .select("*", { count: "exact" })
      .eq("isCollector", "TRUE");

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryAll = queryAll.range(from, to);
    }

    // setta route /games come param "?page=1"
    if (!page) {
      page = 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryAll = queryAll.range(from, to);
    }

    const { data, error, count } = await queryAll;

    if (error) {
      console.log(error);
    }

    // Signed Url immagini
    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return { gamesWithSignedImages, count };
  } else {
    // se c'è il filtro piattaforma fetcha solo quelli del filtro
    let queryWithPlatform = supabase
      .from("games")
      .select("*", { count: "exact" })
      .eq("isCollector", "TRUE")
      .eq("platform", platformFilter);

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryWithPlatform = queryWithPlatform.range(from, to);
    }

    // setta route /games come param ?page=1
    if (!page) {
      page = 1;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      queryWithPlatform = queryWithPlatform.range(from, to);
    }

    const { data, error, count } = await queryWithPlatform;

    if (error) {
      console.log(error);
    }

    // Signed Url immagini
    const gamesWithSignedImages = await Promise.all(
      data.map(async (game) => {
        const { gameImages } = game;

        const { data: signedGameImage, error: signedImageError } =
          await supabase.storage
            .from(`images/users/${user.id}`)
            .createSignedUrl(gameImages, 180);

        if (signedImageError) {
          console.warn(
            `Id gioco: ${game.id}`,
            "Errore generazione signedUrl, il file immagine potrebbe essere mancante.",
          );
          return {
            ...game,
            gameImages: null,
          };
        }

        return {
          ...game,
          gameImages: signedGameImage.signedUrl,
        };
      }),
    );

    return { gamesWithSignedImages, count };
  }
}

/* WISHLIST */

// read wishlist utente
export async function getMyWishlist() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("wishlist")
    .select("id, gameName, platformId, platforms(platformName)")
    .order("platforms(platformName)", { ascending: true })
    .order("gameName", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Non è stato possibile caricare la tua wishlist");
  }

  return data;
}

// count giochi in wishlist utente
export async function countWishlistGames() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { count, error } = await supabase
    .from("wishlist")
    .select("id", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di giochi in wishlist non può essere calcolato");
  }

  return count;
}
