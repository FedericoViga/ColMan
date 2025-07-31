"use client";

import { useFormStatus } from "react-dom";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/24/solid";
import { updateGame } from "../_lib/actions";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const [nameLength, setNameLength] = useState(gameName.length);
  //prettier-ignore
  const [descriptionLength, setDescriptionLength] = useState(contentDescription.length);

  async function handleUpdateGame(formData) {
    const res = await updateGame(gameImages, formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Gioco aggiornato!");
    }
  }

  return (
    <>
      <form action={handleUpdateGame} className="container">
        <input type="hidden" name="gameId" value={id} />
        <input type="hidden" name="platform" value={platform} />
        <h1 className="mt-4 mb-10 text-center text-2xl">Modifica gioco</h1>

        {/* IMMAGINE */}
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
              htmlFor="gameImages"
            >
              <PencilIcon className="h-5 w-5" />
            </label>
            <input
              id="gameImages"
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

        {/* TITOLO */}
        <div className="my-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="gameName">
                Titolo
              </label>
              <span className="text-primary text-sm">{nameLength}/100</span>
            </div>
            <input
              name="gameName"
              id="gameName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={gameName}
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setNameLength(e.target.value.length)}
            />
          </div>

          {/* REGIONE */}
          <div className="flex flex-col gap-1">
            <label className="text-primary" htmlFor="gameRegion">
              Regione
            </label>
            <select
              name="gameRegion"
              id="gameRegion"
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

          {/* SIGILLATO */}
          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label htmlFor="isSealed">Sigillato</label>
            <input
              name="isSealed"
              id="isSealed"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isSealed ? true : false}
            />
          </div>

          {/* EDIZIONE SPECIALE */}
          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label htmlFor="isSpecial">
              Edizione speciale (Steelbook, Deluxe ecc.)
            </label>
            <input
              name="isSpecial"
              id="isSpecial"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isSpecial ? true : false}
            />
          </div>

          {/* COLLECTOR'S EDITION */}
          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label htmlFor="isCollector">Collector's Edition</label>
            <input
              name="isCollector"
              id="isCollector"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              defaultChecked={isCollector ? true : false}
            />
          </div>

          {/* CONTENUTO */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary mt-2" htmlFor="contentDescription">
                Contenuto
              </label>
              <span className="text-primary text-sm">
                {descriptionLength}/500
              </span>
            </div>

            <textarea
              name="contentDescription"
              id="contentDescription"
              rows="6"
              className="border-primary rounded border p-1.5 text-base"
              defaultValue={contentDescription}
              maxLength="500"
              required
              onChange={(e) => setDescriptionLength(e.target.value.length)}
            ></textarea>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1">
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
    <button
      disabled={pending}
      className={`flex w-full items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border-2 border-blue-500"} p-1`}
    >
      <ArrowPathIcon className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Aggiornamento gioco" : "Modifica gioco"}
      </span>
    </button>
  );
}

export default UpdateGameForm;
