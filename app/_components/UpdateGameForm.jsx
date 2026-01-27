"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { updateGame } from "../_lib/actions";
import InfoRegion from "./InfoRegion";

function UpdateGameForm({ gameDetails }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
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
    gameNotes,
  } = gameDetails;

  const [nameLength, setNameLength] = useState(gameName.length);
  const [descriptionLength, setDescriptionLength] = useState(
    contentDescription.length,
  );
  const [notesLength, setNotesLength] = useState(gameNotes?.length ?? 0);

  async function handleUpdateGame(formData) {
    const res = await updateGame(gameImages, formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Gioco aggiornato!");
    }
  }

  function handleRegionInfo(e) {
    e.preventDefault();
    setIsOpenInfo(true);
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
              className="bg-accent absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded text-2xl"
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
              className="focus-within:bg-background focus:bg-background focus-within:border-accent focus:ring-accent rounded border border-slate-700 bg-slate-900 p-1.5 text-base focus:ring-1 focus:outline-none"
              defaultValue={gameName}
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setNameLength(e.target.value.length)}
            />
          </div>

          {/* REGIONE */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-primary" htmlFor="gameRegion">
                Regione
              </label>

              <button
                aria-label="Informazioni sulle regioni"
                onClick={(e) => handleRegionInfo(e)}
              >
                <QuestionMarkCircleIcon className="text-primary h-4 w-4" />
              </button>

              {isOpenInfo && <InfoRegion onOpenClose={setIsOpenInfo} />}
            </div>

            <select
              name="gameRegion"
              id="gameRegion"
              className="focus:border-accent focus:ring-accent rounded border border-slate-800 bg-slate-900 p-1 text-base focus-visible:outline-0"
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
          <div className="text-primary group mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="isSealed"
              className="group-has-[input:checked]:text-foreground"
            >
              Sigillato
            </label>
            <input
              name="isSealed"
              id="isSealed"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
              defaultChecked={isSealed ? true : false}
            />
          </div>

          {/* EDIZIONE SPECIALE */}
          <div className="group text-primary mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="isSpecial"
              className="group-has-[input:checked]:text-foreground"
            >
              Edizione speciale (Steelbook, Deluxe ecc.)
            </label>
            <input
              name="isSpecial"
              id="isSpecial"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
              defaultChecked={isSpecial ? true : false}
            />
          </div>

          {/* COLLECTOR'S EDITION */}
          <div className="text-primary group mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="isCollector"
              className="group-has-[input:checked]:text-foreground"
            >
              Collector's Edition
            </label>
            <input
              name="isCollector"
              id="isCollector"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
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
              className="focus-within:bg-background focus:bg-background placeholder:text-primary/50 focus-within:border-accent focus:ring-accent max-h-80 min-h-40 resize-none rounded border border-slate-700 bg-slate-900 p-1.5 text-base focus:placeholder-transparent focus:ring-1 focus:outline-none"
              defaultValue={contentDescription}
              minLength="2"
              maxLength="500"
              required
              onChange={(e) => setDescriptionLength(e.target.value.length)}
            ></textarea>
          </div>

          {/* NOTE */}
          <div className="mt-1.5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-primary text-lg" htmlFor="gameNotes">
                Note
              </label>

              <span className="text-primary just text-sm">
                {notesLength}/300
              </span>
            </div>
            <textarea
              autoCapitalize="sentences"
              name="gameNotes"
              id="gameNotes"
              defaultValue={gameNotes}
              className="focus-within:bg-background focus:bg-background placeholder:text-primary/50 focus-within:border-accent focus:ring-accent max-h-44 min-h-20 rounded border border-slate-700 bg-slate-900 p-1.5 text-base focus:placeholder-transparent focus:ring-1 focus:outline-none"
              maxLength="300"
              onChange={(e) => setNotesLength(e.target.value.length)}
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
      className={`flex w-full items-center justify-center gap-1 ${pending ? "text-primary" : "border-accent rounded border-2"} p-1`}
    >
      <ArrowPathIcon className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Aggiornamento gioco" : "Modifica gioco"}
      </span>
    </button>
  );
}

export default UpdateGameForm;
