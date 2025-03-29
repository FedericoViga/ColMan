"use client";

import { useFormStatus } from "react-dom";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/24/solid";
import { updateGame } from "../_lib/actions";
import Image from "next/image";
import { useState } from "react";

function UpdateGameForm({ gameDetails }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    gameName,
    gameRegion,
    contentDescription,
    isSealed,
    isSpecial,
    isCollector,
    platform,
    id,
    gameImages,
  } = gameDetails;

  // binda l'immagine corrente a formdata perchè deve essere cancellata dal bucket
  const updateGameAndImage = updateGame.bind(null, gameImages);

  console.log(gameImages);
  return (
    <>
      <form action={updateGameAndImage} className="container">
        <input type="hidden" name="gameId" value={id} />
        <h1 className="mt-4 mb-10 text-center text-2xl">Modifica gioco</h1>

        <div className="mt-4">
          <div className="relative m-auto aspect-square max-w-60">
            <Image
              priority
              alt={gameName}
              src={selectedImage === null ? gameImages : selectedImage}
              fill
              className="object-cover"
            />
            <label
              className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-2xl"
              htmlFor="img"
            >
              <PencilIcon className="h-5 w-5" />
            </label>
            <input
              id="img"
              type="file"
              name="gameImages"
              accept="image/*"
              className="hidden w-full file:hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setSelectedImage(file ? URL.createObjectURL(file) : null);
              }}
            />
          </div>
        </div>

        <div className="my-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <div className="flex flex-col gap-1">
            <label className="text-primary">Titolo</label>
            <input
              name="gameName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={gameName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary">Regione</label>
            <select
              name="gameRegion"
              className="bg-background border-primary rounded border p-1 text-base"
              defaultValue={gameRegion}
              key={gameRegion}
            >
              <option value="ITA">ITA</option>
              <option value="PAL-ITA">PAL-ITA</option>
              <option value="PAL">PAL</option>
              <option value="NTSC-U">NTSC-U</option>
              <option value="NTSC-J">NTSC-J</option>
            </select>
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label>Sigillato</label>
            <input
              name="isSealed"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isSealed ? true : false}
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label>Collector's Edition</label>
            <input
              name="isCollector"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isCollector ? true : false}
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label>Edizione speciale (Steelbook, Deluxe ecc.)</label>
            <input
              name="isSpecial"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isSpecial ? true : false}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary mt-2">Contenuto:</label>
            <textarea
              name="contentDescription"
              rows="6"
              id=""
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={contentDescription}
            ></textarea>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1 self-start">
            <Button />
          </div>
        </div>
      </form>
    </>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <div
      className={`flex items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border border-blue-500"} p-1.5 text-base`}
    >
      <ArrowPathIcon className="h-4 w-4" />
      <button disabled={pending}>
        {pending ? "Aggiornando..." : "Aggiorna"}
      </button>
    </div>
  );
}

export default UpdateGameForm;
