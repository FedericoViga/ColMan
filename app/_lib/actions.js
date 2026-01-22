"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createSupabaseServerClient } from "./supabaseServer";

/* INSERT */

// inserisci gioco
export async function insertGame(platformsIdAndName, formData) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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
  )[0].platformId;

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
    userId: userId,
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

export async function insertGameInWishlist(_prevState, formData) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const gameNameRaw = formData.get("gameName");
  const platformIds = formData.getAll("platformId");

  if (
    !gameNameRaw ||
    platformIds.length === 0 ||
    platformIds.every((id) => id === "")
  ) {
    throw new Error("Nome gioco o piattaforma mancanti");
  }

  const gameName = gameNameRaw.slice(0, 100).trim();
  const platformId = platformIds.find((id) => id !== "");

  if (!platformId) {
    throw new Error("Piattaforma non valida");
  }

  const { error: insertError } = await supabase.from("wishlist").insert({
    gameName,
    platformId,
    userId: userId,
  });

  if (insertError) {
    throw new Error("Errore durante l'aggiunta alla wishlist");
  }

  revalidatePath("/wishlist", "page");

  return { submitId: crypto.randomUUID() };
}

/* UPDATE */

// aggiorna gioco
export async function updateGame(oldImage, formData) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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
      userId: userId,
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
      userId: userId,
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

/* DELETE */

// cancella gioco
export async function deleteGame(id, images) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

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

export async function deleteGameFromWishlist(gameId) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", gameId);

  if (error) {
    throw new Error("Errore nell'eliminazione del gioco");
  }

  revalidatePath("/wishlist", "page");
}

export async function updateUserPlatforms(formData) {
  const supabase = createSupabaseServerClient();
  const userId = supabase.auth.getUser()?.id;

  if (!userId) throw new Error("Non sei loggato");

  const { data: currentPlatforms, error } = await supabase
    .from("userPlatforms")
    .select("platformId")
    .eq("userId", userId);

  if (error) {
    throw new Error("Errore nell'aggiornamento delle piattaforme");
  }

  // piattaforme selezionate nel form
  const newPlatformIds = formData.getAll("platforms");

  const currentUserPlatformIds = currentPlatforms.map((p) =>
    p.platformId.toString(),
  );

  // aggiungi nuove piattaforme
  const toInsertPlatforms = newPlatformIds.filter(
    (id) => !currentUserPlatformIds.includes(id),
  );

  if (toInsertPlatforms.length > 0) {
    await supabase
      .from("userPlatforms")
      .insert(toInsertPlatforms.map((id) => ({ userId: 1, platformId: id })));
  }

  // togli piattaforme
  const toDeletePlatforms = currentUserPlatformIds.filter(
    (id) => !newPlatformIds.includes(id),
  );

  if (toDeletePlatforms.length > 0) {
    await supabase
      .from("userPlatforms")
      .delete()
      .in("platformId", toDeletePlatforms)
      .eq("userId", 1);
  }

  revalidatePath("/settings/my-platforms", "page");
}
