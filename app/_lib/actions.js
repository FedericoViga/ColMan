"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { v4 as uuidv4 } from "uuid";
import { MAXIMUM_IMAGE_SIZE } from "./constants";

// Google OAuth action
export async function signInWithGoogleAction() {
  const supabase = await createClient();
  const requestHeaders = await headers();
  // es. 'http://localhost:3000' o 'https://nome-sito.com'
  const origin = requestHeaders.get("origin");

  if (!origin) {
    console.error("Missing origin header");
    return redirect("/login");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`, // redirect a auth/callback/route.js
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return redirect(
      `/login?error=OAuthSigninFailed&message=${encodeURIComponent(error.message)}`,
    );
  }

  if (data.url) {
    // Redirect del browser alla pagin di Google OAuth
    return redirect(data.url);
  } else {
    console.error("signInWithOAuth did not return a URL");
    return redirect("/login?error=OAuthConfigurationError");
  }
}

/* INSERT */

// inserisci gioco
export async function insertGame(platformsIdAndName, _prevState, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non sei loggato");

  const userId = user.id;
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");

  const isSealed = formData?.get("isSealed") || null;
  const isCollector = formData?.get("isCollector") || null;
  const isSpecial = formData?.get("isSpecial") || null;

  const contentDescription = formData
    .get("contentDescription")
    .slice(0, 500)
    .trim();

  const gameNotes = formData.get("gameNotes")?.slice(0, 300)?.trim() || null;

  // rimuove i valori "" degli altri select, perchè si può avere solo una piattaforma per gioco
  const platform = formData
    .getAll("platform")
    .filter((platform) => platform !== "")[0];

  // assegna il platformId (foreign key da platforms) in base alla piattaforma scelta nel select del form
  const platformId = platformsIdAndName.filter(
    (plat) => plat.platformName === platform,
  )[0].platformId;

  const image = formData.get("gameImages");

  if (image.size === 0) {
    console.error("Dimensione immagine non valida");
    return { error: true, message: "Errore: Dimensione immagine non valida" };
  }

  const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  if (!allowedFileTypes.includes(image.type)) {
    return { error: true, message: "Formato immagine non supportato!" };
  }

  if (image.size > MAXIMUM_IMAGE_SIZE) {
    return { error: true, message: "Immagine troppo grande" };
  }

  // rinomina il nome del file come gameName-platform (es. metroid-prime-gamecube)
  Object.defineProperty(image, "name", {
    writable: true,
    value: `${gameName.toLowerCase().replaceAll(" ", "-")}-${platform.toLowerCase().replaceAll(" ", "-")}`,
  });

  const imageName = `${uuidv4()}-${image.name}`.replaceAll("/", "");

  const newGame = {
    gameName,
    gameRegion,
    isSealed,
    isSpecial,
    isCollector,
    contentDescription,
    platform,
    platformId,
    gameImages: imageName,
    userId,
    gameNotes,
  };

  const { error } = await supabase.from("games").insert([newGame]);

  if (error) {
    console.error("Il gioco non può essere inserito");
    return { error: true, message: "Errore: Il gioco non può essere inserito" };
  }

  // upload immagine nel database
  const { error: storageError } = await supabase.storage
    .from(`images/users/${userId}`)
    .upload(imageName, image);

  // se c'è un errore all'upload immagine, cancella il gioco
  if (storageError) {
    const { data, error: deleteGameError } = await supabase
      .from("games")
      .delete()
      .eq("gameImages", imageName);

    if (deleteGameError) {
      console.error(
        "Erroe eliminazione gioco a seguito del tentativo fallito di caricare un'immagine",
      );
      return {
        error: true,
        message: "Errore inserimento gioco",
      };
    }
    return {
      error: true,
      message: "Errore inserimento gioco",
    };
  }

  // se tutto va a buon fine
  const cookieStore = await cookies();
  cookieStore.set("insertGame", `Gioco aggiunto!`, {
    httpOnly: false,
  });

  return { success: true, redirectTo: "/" };
}

export async function insertGameInWishlist(_prevState, formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const userId = user.id;

  if (userError || !user) throw new Error("Utente non autenticato");

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
    userId,
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
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const id = Number(formData.get("gameId"));
  const platform = formData.get("platform");
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");

  const isSealed = formData?.get("isSealed") || null;
  const isCollector = formData?.get("isCollector") || null;
  const isSpecial = formData?.get("isSpecial") || null;

  const userId = user.id;

  const contentDescription = formData
    .get("contentDescription")
    .slice(0, 500)
    .trim();

  const gameNotes = formData.get("gameNotes")?.slice(0, 300)?.trim() || null;

  const newImage = formData.get("gameImages");

  // prende vecchio path immagine in caso di eliminazione vecchia immagine
  const { data: oldImagePath, error: getImageError } = await supabase
    .from("games")
    .select("gameImages")
    .eq("id", id)
    .single();

  if (getImageError) {
    console.error("Impossibile prendere il path della vecchia immagine");
    return { error: "Errore aggiornamento dati" };
  }

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
      userId,
      gameNotes,
    };
  }

  // rinomina il nome del file immagine come gameName-platform (es. metroid-prime-gamecube)
  Object.defineProperty(newImage, "name", {
    writable: true,
    value: `${gameName.toLowerCase().replaceAll(" ", "-")}-${platform.toLowerCase().replaceAll(" ", "-")}`,
  });

  // al nome dell'immagine viene aggiunto un discriminator all'inizio della stringa con uuidv4 e vengono sostiuiti tutti gli spazi con "-"
  const imageName =
    `${uuidv4()}-${newImage.name.replaceAll(" ", "-")}`.replaceAll("/", "");
  const newImagePath = imageName;

  // se c'è una nuova immagine, aggiorna tutto compresa l'immagine
  if (newImage.size !== 0) {
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (!allowedFileTypes.includes(newImage.type)) {
      return { error: "Formato immagine non supportato!" };
    }

    if (newImage.size > MAXIMUM_IMAGE_SIZE) {
      return { error: "Immagine troppo grande" };
    }

    updateData = {
      id,
      gameName,
      gameRegion,
      isSealed,
      isSpecial,
      isCollector,
      contentDescription,
      gameImages: newImagePath,
      userId,
      gameNotes,
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
      const { gameImages } = oldImagePath;
      const toDeleteOldImage = await supabase.storage
        .from("images")
        .remove([`users/${user.id}/${gameImages}`]);
    }
  } catch (error) {
    console.error(
      `Non è stato possibile cancellare la vecchia immagine durante l'update del gioco. Utente: ${userId}, Immagine non cancellata: ${oldImagePath}`,
      error,
    );
    return { error: "Non è stato possibile cancellare la vecchia immagine" };
  }

  // carica nuova immagine nel bucket
  try {
    if (newImage.size === 0) {
      return;
    } else {
      const toUploadNewImage = await supabase.storage
        .from(`images/users/${userId}`)
        .upload(imageName, newImage);
    }
  } catch (error) {
    console.error(
      `Non è stato possibile caricare la nuova immagine durante l'update del gioco. Utente: ${userId}, Immagine non caricata: ${imageName}`,
      error,
    );
    return { error: "Non è stato possibile caricare la nuova immagine" };
  }

  revalidatePath("/games/[gameId]/update-game", "page");
}

/* DELETE */

export async function deleteGame(id) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  // prende vecchio path in caso di eliminazione vecchia immagine
  const { data: oldImagePath, error: getImageError } = await supabase
    .from("games")
    .select("gameImages")
    .eq("id", id)
    .single();

  if (getImageError) {
    console.error("Impossibile prendere il path della vecchia immagine");
    return { error: "Non è stato possibile eliminare il gioco" };
  }

  // cancella immagine nel bucket
  const { gameImages } = oldImagePath;

  const { error: fileRemoveError } = await supabase.storage
    .from("images")
    .remove([`users/${user.id}/${gameImages}`]);

  if (fileRemoveError) {
    console.log(fileRemoveError);
    return { error: "Non è stato possibile eliminare il gioco" };
  }

  // se l'immagine viene cancellata con successo, cancella il gioco dal db
  const { data, error } = await supabase.from("games").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { error: "Non è stato possibile eliminare il gioco" };
  } else {
    const cookieStore = await cookies();
    cookieStore.set("deleteGame", `Gioco eliminato!`, {
      httpOnly: false,
      path: "/",
    });
  }

  redirect("/");
}

export async function deleteGameFromWishlist(gameId) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

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
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const userId = user.id;

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
      .insert(
        toInsertPlatforms.map((id) => ({ userId: userId, platformId: id })),
      );
  }

  // togli piattaforme
  const toDeletePlatforms = currentUserPlatformIds.filter(
    (id) => !newPlatformIds.includes(id),
  );

  if (toDeletePlatforms.length > 0) {
    await supabase
      .from("userPlatforms")
      .delete()
      .in("platformId", toDeletePlatforms);
  }

  revalidatePath("/settings/my-platforms", "page");
}
