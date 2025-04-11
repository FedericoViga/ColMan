import { PAGE_SIZE } from "./constants";
import { supabase } from "./supabase";

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();
  return data;
}

export const getAllPlatforms = async function () {
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
  const { data, error } = await supabase
    .from("games")
    .select("gameName", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di giochi non può essere calcolato");
  }

  return data.length;
};

export const countPlatforms = async function () {
  const { data, error } = await supabase
    .from("platforms")
    .select("platformName", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Il numero di piattaforme non può essere calcolato");
  }

  return data.length;
};

export const countCollectors = async function () {
  const { data, error } = await supabase
    .from("games")
    .select("*", { count: "exact" })
    .eq("isCollector", "TRUE");

  if (error) {
    console.log(error);
    throw new Error("Il numero di collector non può essere calcolato");
  }

  return data.length;
};

export const fetchGames = async function (queryString, platformFilter) {
  if (queryString === undefined) return;

  const normalizedQuery = queryString.replaceAll(" ", "+");

  if (platformFilter === "all" || platformFilter === undefined) {
    const { data, error } = await supabase
      .from("games")
      .select("*, platforms(platformName)")
      .textSearch("gameName", `${normalizedQuery}`);

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
      .textSearch("gameName", `${normalizedQuery}`);

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
  const { data, error } = await supabase
    .from("platforms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(
      "Non è stato possibile caricare i dettagli della piattaforma",
    );
  }

  return data;
}

export async function fetchGamesWithPagination(page, platformFilter) {
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
