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

// UPDATE

// aggiorna gioco
export async function updateGame(oldImage, formData) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const id = Number(formData.get("gameId"));
  const platform = formData.get("platform");
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");
  const contentDescription = formData
    .get("contentDescription")
    .slice(0, 500)
    .trim();

  let isSealed = formData.get("isSealed");
  let isCollector = formData.get("isCollector");
  let isSpecial = formData.get("isSpecial");
  isSealed ? isSealed : null;
  isSpecial ? isSpecial : null;
  isCollector ? isCollector : null;

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

// DELETE

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
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const { data, error } = await supabase
    .from("platforms")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("La piattaforma non può essere cancellata");
  } else {
    const cookieStore = await cookies();
    cookieStore.set("deletePlatform", `Piattaforma eliminata!`, {
      httpOnly: false,
      path: "/",
    });
  }

  redirect("/");
}

//INSERT

// inserisci gioco
export async function insertGame(platformsIdAndName, formData) {
  const gameName = formData.get("gameName").slice(0, 100).trim();
  const gameRegion = formData.get("gameRegion");

  let isSealed = formData?.get("isSealed");
  let isCollector = formData?.get("isCollector");
  let isSpecial = formData?.get("isSpecial");
  isSealed ? isSealed : null;
  isSpecial ? isSpecial : null;
  isCollector ? isCollector : null;

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
