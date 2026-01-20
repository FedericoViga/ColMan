"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import PlatformSelector from "./PlatformSelector";
import { insertGame } from "../_lib/actions";
import placeholderImage from "@/public/placeholder-font-80-1000x1000.jpg";
import { groupByPlatformOwner } from "../_lib/utils";
import { SEALED_TEXT } from "../_lib/constants";
import ContentDescriptionInsert from "./ContentDescriptionInsert";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import InfoRegion from "./InfoRegion";

function InsertGameForm({ platforms, platformsIdAndName }) {
  const [curActive, setCurActive] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [titleLength, setTitleLength] = useState(0);
  const [isSealedChecked, setSealedChecked] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [listView, setListView] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");

  // server action
  const insertGameWithData = insertGame.bind(null, platformsIdAndName);

  // gestione del testo automatico per gioco sigillato
  useEffect(() => {
    if (descriptionValue.length > 0 || descriptionValue === SEALED_TEXT) return;

    if (isSealedChecked) {
      setDescriptionValue(SEALED_TEXT);
    }
  }, [isSealedChecked, descriptionValue]);

  function handleRegionInfo(e) {
    e.preventDefault();
    setIsOpenInfo(true);
  }

  return (
    <div className="container">
      <form action={insertGameWithData}>
        <div className="mb-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <h1 className="mb-4 text-center text-2xl">Crea un nuovo gioco</h1>

          {/* IMMAGINE */}
          <div className="mt-4">
            <div
              className={`relative m-auto flex aspect-square max-w-60 flex-col items-center justify-center gap-2 ${selectedImage === null || selectedImage === placeholderImage ? "border-primary rounded border border-dashed" : ""}`}
            >
              <label
                className={`flex h-10 w-10 cursor-pointer items-center justify-center text-2xl ${selectedImage === null || selectedImage === placeholderImage ? "h-full w-full rounded border-0" : "bg-accent absolute right-2 bottom-2 z-50 rounded"}`}
                htmlFor="gameImages"
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
                id="gameImages"
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

          {/* TITOLO */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="gameName">
                Titolo
              </label>
              <span className="text-primary text-sm">{titleLength}/100</span>
            </div>
            <input
              autoCapitalize="sentences"
              name="gameName"
              id="gameName"
              type="text"
              className="focus-within:bg-background focus:bg-background focus-within:border-accent focus:ring-accent rounded border border-slate-700 bg-slate-900 p-1.5 text-base focus:ring-1 focus:outline-none"
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setTitleLength(e.target.value.length)}
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
              required
              name="gameRegion"
              id="gameRegion"
              className="focus:border-accent focus:ring-accent rounded border border-slate-800 bg-slate-900 p-1 text-base last:border focus-visible:outline-0"
            >
              <option hidden></option>
              <option value="ITA">ITA</option>
              <option value="PAL-ITA">PAL-ITA</option>
              <option value="PAL">PAL</option>
              <option value="NTSC-U">NTSC-U</option>
              <option value="NTSC-J">NTSC-J</option>
            </select>
          </div>

          {/* SIGILLATO */}
          <div className="group text-primary mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="isSealed"
              className="group-has-[input:checked]:text-foreground"
            >
              Sigillato
            </label>
            <input
              id="isSealed"
              name="isSealed"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
              onChange={() => {
                setSealedChecked((isChecked) => !isChecked);
              }}
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
              id="isSpecial"
              name="isSpecial"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
            />
          </div>

          {/* COLLECTOR'S EDITION */}
          <div className="group text-primary mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
            <label
              htmlFor="isCollector"
              className="group-has-[input:checked]:text-foreground"
            >
              Collector's Edition
            </label>
            <input
              id="isCollector"
              name="isCollector"
              type="checkbox"
              className="group/checkbox accent-accent h-4 w-4"
            />
          </div>

          {/* CONTENUTO */}
          <ContentDescriptionInsert
            descriptionValue={descriptionValue}
            onDescriptionValue={setDescriptionValue}
            listView={listView}
            onListView={setListView}
          />

          {/* PIATTAFORMA */}
          {platforms.length !== 0 ? (
            <div>
              <p className="text-primary mt-3">Piattaforma</p>
              {platformsByOwner.map((platform, i) => (
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
            <Button onListView={setListView}>Crea gioco</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Button({ onListView }) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={() => onListView(false)}
      disabled={pending}
      className={`text-foreground mt-5 flex w-full items-center justify-center gap-1 ${pending ? "text-primary animate-pulse" : "border-accent rounded border-2"} px-5 py-1`}
    >
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Creazione gioco" : "Crea gioco"}
      </span>
    </button>
  );
}

export default InsertGameForm;
