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
export async function updateGame(oldImage, formData) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  console.log("FORMDATA", formData);
  console.log("OLDIMAGE", oldImage);

  const id = Number(formData.get("gameId"));
  const gameName = formData.get("gameName").trim();
  const gameRegion = formData.get("gameRegion");
  const contentDescription = formData.get("contentDescription").trim();

  let isSealed = formData.get("isSealed");
  let isCollector = formData.get("isCollector");
  let isSpecial = formData.get("isSpecial");
  isSealed ? (isSealed = true) : null;
  isSpecial ? (isSpecial = true) : null;
  isCollector ? (isCollector = true) : null;

  const newImage = formData.get("gameImages");
  const imageName =
    `${uuidv4()}-${newImage.name.replaceAll(" ", "-")}`.replaceAll("/", "");
  const newImagePath = `https://igyqtugipdfweornkjrg.supabase.co/storage/v1/object/public/games-images//${imageName}`;

  const updateData = {
    id,
    gameName,
    gameRegion,
    isSealed,
    isSpecial,
    isCollector,
    contentDescription,
    gameImages: newImagePath,
  };

  // aggiorna gioco
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
  const imageToDelete = oldImage.split("//").at(-1);

  try {
    const toDeleteOldImage = await supabase.storage
      .from("games-images")
      .remove([imageToDelete]);
  } catch (error) {
    console.log(error);
    return { error: "Non è stato possibile cancellare la vecchia immagine" };
  }

  // carica nuova imamgine nel bucket
  try {
    const toUploadNewImage = await supabase.storage
      .from("games-images")
      .upload(imageName, newImage);
  } catch (error) {
    console.log(error);
    return { error: "Non è stato possibile caricare la nuova foto" };
  }

  revalidatePath("/games/[gameId]/update-game", "page");
}

export async function updatePlatform(formData) {
  const session = await auth();
  if (!session) throw new Error("Devi essere loggato");

  const id = Number(formData.get("platformId"));
  const platformName = formData.get("platformName").trim();
  const platformOwner = formData.get("platformOwner").trim();

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
      maxAge: 8,
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
      maxAge: 8,
      path: "/",
    });
  }

  redirect("/");
}

//INSERT
export async function insertGame(platformsIdAndName, formData) {
  const gameName = formData.get("gameName").trim();
  const gameRegion = formData.get("gameRegion");

  let isSealed = formData?.get("isSealed");
  let isCollector = formData?.get("isCollector");
  let isSpecial = formData?.get("isSpecial");
  isSealed ? (isSealed = true) : null;
  isSpecial ? (isSpecial = true) : null;
  isCollector ? (isCollector = true) : null;

  const contentDescription = formData.get("contentDescription").trim();

  // rimuove i valori "" degli altri select, perchè si può avere solo una piattaforma per gioco
  const platform = formData
    .getAll("platform")
    .filter((platform) => platform !== "")[0];

  // assegna il platformId (foreign key da platforms) in base alla piattaforma scelta nel select del form
  const platformId = platformsIdAndName.filter(
    (plat) => plat.platformName === platform,
  )[0].id;

  const image = formData.get("gameImages");

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

  if (error) throw new Error("Il gioco non può essere inserito");

  // upload immagine nel databse
  const { error: storageError } = await supabase.storage
    .from("games-images")
    .upload(imageName, image);

  if (storageError) throw new Error("L'immagine non può essere caricata");

  redirect("/");
}

export async function insertPlatform(formData) {
  const platformName = formData.get("platformName").trim();
  const platformOwner = formData.get("platformOwner").trim();

  const newPlatform = {
    platformName,
    platformOwner,
  };

  const { error } = await supabase.from("platforms").insert([newPlatform]);

  if (error) {
    throw new Error("La piattaforma non può essere inserita");
  } else {
    const cookieStore = await cookies();
    cookieStore.set("insertPlatform", `piattaforma ${platformName} aggiunta!`, {
      httpOnly: false,
      maxAge: 10,
    });
  }

  redirect("/");
}
