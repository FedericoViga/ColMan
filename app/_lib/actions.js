"use server";

import { auth, signIn } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

/* INSERT */

// inserisci gioco
export async function insertGame(platformsIdAndName, formData) {
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");

  const isSealed = formData?.get("isSealed") || null;
  const isCollector = formData?.get("isCollector") || null;
  const isSpecial = formData?.get("isSpecial") || null;

  const contentDescription = formData
    .get("contentDescription")
    .slice(0, 500)
    .trim();

  // rimuove i valori "" degli altri select, perchè si può avere solo una piattaforma per gioco
  const platform = formData
    .getAll("platform")
    .filter((platform) => platform !== "")[0];

  // assegna il platformId (foreign key da platforms) in base alla piattaforma scelta nel select del form
  const platformId = platformsIdAndName.filter(
    (plat) => plat.platformName === platform,
  )[0].id;

  const image = formData.get("gameImages");

  // rinomina il nome del file come gameName-platform (es. metroid-prime-gamecube)
  Object.defineProperty(image, "name", {
    writable: true,
    value: `${gameName.toLowerCase().replaceAll(" ", "-")}-${platform.toLowerCase().replaceAll(" ", "-")}`,
  });

  const imageName = `${uuidv4()}-${image.name}`.replaceAll("/", "");
  const imagePath = `https://igyqtugipdfweornkjrg.supabase.co/storage/v1/object/public/games-images//${imageName}`;

  const newGame = {
    gameName,
    gameRegion,
    isSealed,
    isSpecial,
    isCollector,
    contentDescription,
    platform,
    platformId,
    gameImages: imagePath,
  };

  const { error } = await supabase.from("games").insert([newGame]);

  if (error) {
    throw new Error("Il gioco non può essere inserito");
  } else {
    const cookieStore = await cookies();
    cookieStore.set("insertGame", `Gioco aggiunto!`, {
      httpOnly: false,
    });
  }

  // upload immagine nel database
  const { error: storageError } = await supabase.storage
    .from("games-images")
    .upload(imageName, image);

  if (storageError) throw new Error("L'immagine non può essere caricata");

  redirect("/");
}

// inserisci piattaforma
export async function insertPlatform(formData) {
  const platformName = formData.get("platformName").slice(0, 25).trim();
  const platformOwner = formData.get("platformOwner").slice(0, 25).trim();

  // check case insensitive per pattern platformName già esistente
  const { data, error: duplicatePlatformError } = await supabase
    .from("platforms")
    .select("*")
    .ilike("platformName", platformName);

  if (data.length > 0) {
    const cookieStore = await cookies();
    cookieStore.set("duplicatedPlatformError", `Piattaforma già esistente!`, {
      httpOnly: false,
    });
    return;
  }

  if (duplicatePlatformError) {
    throw new Error("Tentativo di inserimento di piattaforma già esistente");
  }

  // se il check passa, aggiunge nuova piattaforma
  const newPlatform = {
    platformName,
    platformOwner,
  };

  const { error } = await supabase.from("platforms").insert([newPlatform]);

  if (error) {
    throw new Error("La piattaforma non può essere inserita");
  } else {
    const cookieStore = await cookies();
    cookieStore.set("insertPlatform", `Piattaforma ${platformName} aggiunta!`, {
      httpOnly: false,
    });
  }

  redirect("/");
}

export async function insertGameInWishlist(_prevState, formData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Non autorizzato");
  }

  const gameNameRaw = formData.get("gameName");
  const platformNames = formData.getAll("platformName");

  if (!gameNameRaw || platformNames.length === 0) {
    throw new Error("Dati mancanti");
  }

  const gameName = gameNameRaw.slice(0, 100).trim();
  const platformName = platformNames.find((p) => p !== "");

  if (!platformName) {
    throw new Error("Piattaforma non valida");
  }

  const { data: platform, error: platformError } = await supabase
    .from("platforms")
    .select("id")
    .eq("platformName", platformName)
    .single();

  if (platformError || !platform) {
    throw new Error("Piattaforma non trovata");
  }

  const { error: insertError } = await supabase.from("wishlist").insert({
    gameName,
    platformName,
    platformId: platform.id,
    userEmail: session.user.email,
  });

  if (insertError) {
    throw new Error("Errore durante l'aggiunta alla wishlist");
  }

  revalidatePath("/user/my-wishlist", "page");

  return { submitId: crypto.randomUUID() };
}

/* UPDATE */

// aggiorna gioco
export async function updateGame(oldImage, formData) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const id = Number(formData.get("gameId"));
  const platform = formData.get("platform");
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");

  const isSealed = formData?.get("isSealed") || null;
  const isCollector = formData?.get("isCollector") || null;
  const isSpecial = formData?.get("isSpecial") || null;

  const contentDescription = formData
    .get("contentDescription")
    .slice(0, 500)
    .trim();

  const newImage = formData.get("gameImages");

  let updateData;

  // se non c'è una nuova immagine aggiorna tutto tranne l'immagine
  if (newImage.size === 0) {
    updateData = {
      id,
      gameName,
      gameRegion,
      isSealed,
      isSpecial,
      isCollector,
      contentDescription,
    };
  }

  // rinomina il nome del file come gameName-platform (es. metroid-prime-gamecube)
  Object.defineProperty(newImage, "name", {
    writable: true,
    value: `${gameName.toLowerCase().replaceAll(" ", "-")}-${platform.toLowerCase().replaceAll(" ", "-")}`,
  });

  // al mome dell'immagine viene aggiunto un discriminator all'inizio della stringa con uuidv4 e vengono sostiuiti tutti gli spazi con "-"
  const imageName =
    `${uuidv4()}-${newImage.name.replaceAll(" ", "-")}`.replaceAll("/", "");
  const newImagePath = `https://igyqtugipdfweornkjrg.supabase.co/storage/v1/object/public/games-images//${imageName}`;

  // se c'è una nuova immagine aggiorna tutto compresa l'immagine
  if (newImage.size !== 0) {
    updateData = {
      id,
      gameName,
      gameRegion,
      isSealed,
      isSpecial,
      isCollector,
      contentDescription,
      gameImages: newImagePath,
    };
  }

  // aggiorna dati gioco
  try {
    const toUpdateGameData = await supabase
      .from("games")
      .update(updateData)
      .eq("id", id);
  } catch (error) {
    console.log(error);
    return { error: "Errore aggiornamento dati" };
  }

  // cancella dal bucket l'immagine attuale prima di caricare quella nuova
  try {
    if (newImage.size === 0) {
      revalidatePath("/games/[gameId]/update-game", "page");
      return;
    } else {
      const imageToDelete = oldImage.split("//").at(-1);
      const toDeleteOldImage = await supabase.storage
        .from("games-images")
        .remove([imageToDelete]);
    }
  } catch (error) {
    console.log(error);
    return { error: "Non è stato possibile cancellare la vecchia immagine" };
  }

  // carica nuova imamgine nel bucket
  try {
    if (newImage.size === 0) {
      return;
    } else {
      const toUploadNewImage = await supabase.storage
        .from("games-images")
        .upload(imageName, newImage);
    }
  } catch (error) {
    console.log(error);
    return { error: "Non è stato possibile caricare la nuova foto" };
  }

  revalidatePath("/games/[gameId]/update-game", "page");
}

// aggiorna piattaforma
export async function updatePlatform(formData) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const id = Number(formData.get("platformId"));
  const platformName = formData.get("platformName").slice(0, 25).trim();
  const platformOwner = formData.get("platformOwner").slice(0, 25).trim();

  const updateData = {
    id,
    platformName,
    platformOwner,
  };

  try {
    const toUpdatePlatformData = await supabase
      .from("platforms")
      .update(updateData)
      .eq("id", id);
  } catch (error) {
    console.log(error);
    return { error: "Errore aggiornamento piattaforma" };
  }

  revalidatePath("/platforms/[platformId]/update-platform", "page");
}

/* DELETE */

// cancella gioco
export async function deleteGame(id, images) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  //cancella gioco
  const { data, error } = await supabase.from("games").delete().eq("id", id);
  if (error) {
    throw new Error("Il gioco non può essere cancellato");
  } else {
    const cookieStore = await cookies();
    cookieStore.set("deleteGame", `Gioco eliminato!`, {
      httpOnly: false,
      path: "/",
    });
  }

  // cancella immagine nel bucket
  const imageToDelete = images.split("//").at(-1);

  const { error: fileRemoveError } = await supabase.storage
    .from("games-images")
    .remove([imageToDelete]);

  if (fileRemoveError) {
    throw new Error("Non è stato possibile cancellare l'immagine dal database");
  }

  redirect("/");
}

// cancella piattaforma
export async function deletePlatform(id) {
  try {
    const session = await auth();
    if (!session) throw new Error("Devi essere loggato");

    const { count, error: countError } = await supabase
      .from("games")
      .select("*", { count: "exact" })
      .eq("platformId", id);

    if (countError) throw new Error("Errore nel conteggio dei giochi");

    if (count > 0) {
      return {
        ok: false,
        error: `Non puoi eliminare la piattaforma perchè ha ${count > 1 ? `${count} giochi associati!` : `${count} gioco associato!`}`,
      };
    }

    const { error: deleteError } = await supabase
      .from("platforms")
      .delete()
      .eq("id", id);

    if (deleteError) throw new Error("La piattaforma non può essere eliminata");

    const cookieStore = await cookies();
    cookieStore.set("deletePlatform", `Piattaforma eliminata!`, {
      httpOnly: false,
      path: "/",
    });
  } catch (error) {
    console.error("Errore in deletePlatform:", error.message || error);
    throw new Error(
      "Errore sconosciuto durante l'eliminazione della piattaforma",
    );
  }
}

export async function deleteGameFromWishlist(gameId) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", gameId);

  if (error) {
    throw new Error("Errore nell'eliminazione del gioco");
  }

  revalidatePath("/user/my-wishlist", "page");
}
