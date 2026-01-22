import { PAGE_SIZE } from "./constants";
import { createSupabaseServerClient } from "./supabaseServer";

// Raggruppa e conta i giochi per ogni piattaforma con una funzione SQL
/* export const numGamesByPlatform = async function () {
  const { data, error } = await supabase.rpc("count_games_by_platform");

  if (error) {
    console.log(error);
    throw new Error(
      "Il numero di giochi per piattaforma non può essere calcolato",
    );
  }
  return data;
}; */

export const getAllPlatforms = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

export const countGames = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { count, error } = await supabase
    .from("games")
    .select("id", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di giochi non può essere calcolato");
  }

  return count;
};

export const getUserPlatforms = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { data, error } = await supabase
    .from("userPlatforms")
    .select("userId, platformId")
    .eq("userId", userId);

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  return data;
};

export const getUserPlatformsComplete = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { data, error } = await supabase
    .from("userPlatforms")
    .select("platformId, platforms(platformName, platformOwner)")
    .eq("userId", userId);

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

// Conta i giochi per una specifica piattaforma
export const countGamesByPlatform = async function (platformName) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

export const countPlatforms = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { count, error } = await supabase
    .from("userPlatforms")
    .select("platformId", { count: "exact" })
    .eq("userId", userId);

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  return count;
};

export const countCollectors = async function () {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

export const fetchGames = async function (queryString, platformFilter) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");
  if (!queryString) return;

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

    return data;
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

    return data;
  }
};

export async function getFullGame(id, platform) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");
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

  return data;
}

export async function getFullPlatform(id) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

export async function fetchGamesWithPagination(page, platformFilter) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

    return { data, count };
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

    return { data, count };
  }
}

export async function fetchCollectorsWithPagination(page, platformFilter) {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

    return { data, count };
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

    return { data, count };
  }
}

/* WISHLIST */

export async function getMyWishlist() {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { data, error } = await supabase
    .from("wishlist")
    .select("id, gameName, platformId, platforms(platformName)")
    .eq("userId", userId)
    .order("platforms(platformName)", { ascending: true })
    .order("gameName", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Non è stato possibile caricare la tua wishlist");
  }

  return data;
}

export async function countWishlistGames() {
  const supabase = await createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { count, error } = await supabase
    .from("wishlist")
    .select("id", { count: "exact" })
    .eq("userId", userId);

  if (error) {
    console.log(error);
    throw new Error("Il numero di giochi in wishlist non può essere calcolato");
  }

  return count;
}
