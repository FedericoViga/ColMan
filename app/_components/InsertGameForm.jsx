"use client";

import { useState } from "react";
import PlatformSelector from "./PlatformSelector";
import { insertGame } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import placeholderImage from "@/public/placeholder-font-80-1000x1000.jpg";
import Link from "next/link";

function InsertGameForm({ platforms, platformsIdAndName }) {
  const [curActive, setCurActive] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  // genera un oggetto che contiene X oggetti e ognuno di essi è una coppia key-value dove la key è una stringa col nome del platformOwner e il value è un array di oggetti con la lista piattaforme e tutto il resto
  function groupByPlatformOwner(platforms, property) {
    return platforms.reduce((acc, curr) => {
      if (!acc[curr[property]]) {
        acc[curr[property]] = [];
      }
      acc[curr[property]].push(curr);
      return acc;
    }, {});
  }

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  const insertGameWithData = insertGame.bind(null, platformsIdAndName);

  return (
    <div className="container">
      <form action={insertGameWithData}>
        <div className="mb-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <h1 className="mb-4 text-center text-2xl">Crea un nuovo gioco</h1>

          <div className="mt-4">
            <div
              className={`relative m-auto flex aspect-square max-w-60 flex-col items-center justify-center gap-2 ${selectedImage === null || selectedImage === placeholderImage ? "border-primary rounded border border-dashed" : ""}`}
            >
              <label
                className={`flex h-10 w-10 cursor-pointer items-center justify-center text-2xl ${selectedImage === null || selectedImage === placeholderImage ? "rounded border-2 border-blue-500" : "absolute right-2 bottom-2 z-50 rounded bg-blue-500"}`}
                htmlFor="img"
              >
                {selectedImage === null ||
                selectedImage === placeholderImage ? (
                  <PlusIcon className="h-5 w-5" />
                ) : (
                  <PencilIcon className="h-5 w-5" />
                )}
              </label>
              {selectedImage === null || selectedImage === placeholderImage ? (
                <p className="text-primary">Scegli Immagine</p>
              ) : (
                <Image
                  priority
                  alt="Titolo gioco"
                  src={
                    selectedImage !== null ? selectedImage : placeholderImage
                  }
                  fill
                  className="object-cover"
                />
              )}
              <input
                required
                id="img"
                type="file"
                name="gameImages"
                accept="image/*"
                className="absolute bottom-0 w-full bg-red-300 opacity-0 file:hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedImage(
                    file ? URL.createObjectURL(file) : placeholderImage,
                  );
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary">Titolo</label>
            <input
              autoCapitalize="sentences"
              required
              name="gameName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary">Regione</label>
            <select
              required
              name="gameRegion"
              className="bg-background border-primary rounded border p-1 text-base"
            >
              <option hidden></option>
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
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label>Edizione speciale (Steelbook, Deluxe ecc.)</label>
            <input
              name="isSpecial"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label>Collector's Edition</label>
            <input
              name="isCollector"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary mt-2">Contenuto</label>
            <textarea
              autoCapitalize="sentences"
              required
              name="contentDescription"
              rows="6"
              id=""
              className="border-primary rounded border p-1.5 text-base"
            ></textarea>
          </div>

          {platforms.length !== 0 ? (
            <div>
              <p className="text-primary mt-3">Piattaforme</p>
              {platformsToArray.map((platform, i) => (
                <PlatformSelector
                  platformDetails={platform}
                  key={platform[0]}
                  id={i}
                  curActive={curActive}
                  onActive={setCurActive}
                />
              ))}
            </div>
          ) : (
            <>
              <p className="text-primary mt-3">Piattaforme</p>
              <p className="text-primary">
                Non ci sono ancora piattaforme, prima di creare un gioco devi{" "}
                <Link
                  className="text-foreground underline underline-offset-2"
                  href="/platforms/insert-platform"
                >
                  creare la sua piattaforma!
                </Link>
              </p>
            </>
          )}

          <div className="mt-5 flex items-center justify-center gap-1 self-start">
            <Button>Crea gioco</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <div
      className={`text-foreground mt-5 flex items-center justify-center gap-1 self-start ${pending ? "text-primary" : "rounded border border-blue-500"} px-1.5 py-1 text-base`}
    >
      <button disabled={pending}>
        {pending ? "Creando nuovo gioco..." : "Crea gioco"}
      </button>
    </div>
  );
}

export default InsertGameForm;
