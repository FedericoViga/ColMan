"use client";

import { useEffect, useState } from "react";
import PlatformSelector from "./PlatformSelector";
import { insertGame } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import placeholderImage from "@/public/placeholder-font-80-1000x1000.jpg";
import Link from "next/link";
import { groupByPlatformOwner } from "../_lib/utils";
import { SEALED_TEXT } from "../_lib/constants";

function InsertGameForm({ platforms, platformsIdAndName }) {
  const [curActive, setCurActive] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [titleLength, setTitleLength] = useState(0);
  const [isSealedChecked, setSealedChecked] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");
  // converte in array per essere più semplice da manipolare
  const platformsToArray = Object.entries(platformsByOwner);

  const insertGameWithData = insertGame.bind(null, platformsIdAndName);

  useEffect(() => {
    if (descriptionValue.length > 0) return;
    if (descriptionValue === SEALED_TEXT) return;

    if (isSealedChecked) {
      setDescriptionValue(SEALED_TEXT);
    }
  }, [isSealedChecked, descriptionValue]);

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
                className={`z-50 flex h-10 w-10 cursor-pointer items-center justify-center text-2xl ${selectedImage === null || selectedImage === placeholderImage ? "h-full w-full rounded border-0" : "absolute right-2 bottom-2 z-50 rounded bg-blue-500"}`}
                htmlFor="img"
              >
                {selectedImage === null ||
                selectedImage === placeholderImage ? (
                  <PlusIcon className="h-10 w-10 text-slate-500" />
                ) : (
                  <PencilIcon className="h-5 w-5" />
                )}
              </label>
              {selectedImage === null || selectedImage === placeholderImage ? (
                <p className="absolute top-[60%] text-slate-500">
                  Scegli Immagine
                </p>
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
            <div className="flex items-baseline justify-between">
              <label className="text-primary">Titolo</label>
              <span className="text-primary text-sm">{titleLength}/100</span>
            </div>
            <input
              autoCapitalize="sentences"
              name="gameName"
              type="text"
              className="border-primary rounded border p-1.5 text-base"
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setTitleLength(e.target.value.length)}
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
            <label htmlFor="sealed">Sigillato</label>
            <input
              id="sealed"
              name="isSealed"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
              onChange={() => {
                setSealedChecked((isChecked) => !isChecked);
              }}
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label htmlFor="special">
              Edizione speciale (Steelbook, Deluxe ecc.)
            </label>
            <input
              id="special"
              name="isSpecial"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
            />
          </div>

          <div className="mt-2.5 flex flex-row-reverse justify-end gap-2">
            <label htmlFor="collector">Collector's Edition</label>
            <input
              id="collector"
              name="isCollector"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary mt-2">Contenuto</label>
              <span className="text-primary text-sm">
                {descriptionValue.length}/500
              </span>
            </div>

            <textarea
              value={descriptionValue}
              autoCapitalize="sentences"
              required
              name="contentDescription"
              rows="6"
              id=""
              className="border-primary rounded border p-1.5 text-base"
              maxLength="500"
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
            ></textarea>
          </div>

          {platforms.length !== 0 ? (
            <div>
              <p className="text-primary mt-3">Piattaforma</p>
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

          <div className="mt-5 flex items-center justify-center gap-1">
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
    <button
      disabled={pending}
      className={`text-foreground mt-5 flex w-full items-center justify-center gap-1 ${pending ? "text-primary" : "rounded border-2 border-blue-500"} px-5 py-1`}
    >
      {pending ? "Creando nuovo gioco..." : "Crea gioco"}
    </button>
  );
}

export default InsertGameForm;
