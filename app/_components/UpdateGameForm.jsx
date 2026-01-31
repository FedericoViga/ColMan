"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { updateGame } from "../_lib/actions";
import InfoRegion from "./InfoRegion";
import placeholderImage from "@/public/placeholder-400x400.png";
import { MAXIMUM_IMAGE_SIZE } from "../_lib/constants";

function UpdateGameForm({ gameDetails }) {
  let {
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
  const [imageSize, setImageSize] = useState(undefined); // state che legge dimensioni immagine selezionata
  const [selectedImage, setSelectedImage] = useState(gameImages); // state per anteprima visiva immagine selezionata (url)
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [nameLength, setNameLength] = useState(gameName.length);
  const [descriptionLength, setDescriptionLength] = useState(
    contentDescription.length,
  );
  const [notesLength, setNotesLength] = useState(gameNotes?.length ?? 0);
  const hiddenInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // placeholder image se gameImages è null
  gameImages = gameImages || placeholderImage;

  const launchboxDbUrl = `https://gamesdb.launchbox-app.com/games/results/${encodeURIComponent(gameName)}`;
  const googleImagesUrl = `https://www.google.com/search?tbm=isch&tbs=isz:m&q=${encodeURIComponent(gameName)}+boxart`;

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

  async function handleChangeImage(e) {
    const file = e.target?.files[0];

    // Se non ci sono file selezionati torna a initial state
    if (!file) {
      setSelectedImage(gameImages);
      hiddenInputRef.current.value = "";
      return;
    }

    // Due variabili per lo state che legge le dimensioni del file
    let fileSizeInBytes; // dimensione file in bytes
    let formattedFileSize; // dimensione file formattata (MB o KB)
    const KB = 1000;
    const MB = 1000 * 1000;

    // Se c'è un file selezionato dall'utente
    if (file) {
      fileSizeInBytes = file.size;

      // se l'immagine è >1MB formatta la stringa in MB (es. "1.5MB")
      if (fileSizeInBytes >= MB) {
        formattedFileSize = (fileSizeInBytes / MB).toFixed(2) + " MB";
        // se l'immagine è <1MB formatta la stringa in KB (es. "378KB")
      } else {
        formattedFileSize = Math.round(fileSizeInBytes / KB) + " KB";
      }

      // Se l'immagine non supera la dimensione massima consentita,
      // la mette subito nell'input hidden per mandarla alla server action
      if (file.size <= MAXIMUM_IMAGE_SIZE) {
        setImageSize({
          formattedSize: formattedFileSize,
          rawSize: fileSizeInBytes,
        });
        // Inserisce il file direttamente nel file input nascosto tramite DataTransfer
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        hiddenInputRef.current.files = dataTransfer.files;
        // Aggiorna lo state dell'immagine selezionata (anteprima)
        setSelectedImage(file ? URL.createObjectURL(file) : placeholderImage);
        return;
      }
    }

    // Se non c'è immagine selezionata resetta
    if (!formattedFileSize) {
      setImageSize(undefined);
      setSelectedImage(null);
    } else {
      // Se c'è immagine selezionata
      // Se supera la grandezza consentita prova a convertirla in webp
      if (fileSizeInBytes > MAXIMUM_IMAGE_SIZE) {
        // se è già webp non fa niente
        if (file.type === "images/webp") {
          setSelectedImage(null);
          setImageSize({
            formattedSize: formattedFileSize,
            rawSize: fileSizeInBytes,
          });
          return;
        }

        // Crea un'immagine dal file
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        await img.decode();

        // Crea il canvas e disegna l'immagine
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Funzione per ottenere Blob con fallback
        async function canvasToBlobWithFallback(canvas) {
          return new Promise((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve({ blob, type: "image/webp", ext: "webp" });
                } else {
                  // se il browser non supporta canvas.toBlob risolve blob null
                  resolve({ blob: null, type: null, ext: null });
                }
              },
              "image/webp",
              0.8,
            );
          });
        }

        // Ottiene il blob (webp)
        const { blob, type, ext } = await canvasToBlobWithFallback(canvas);

        // Se il blob è null, resetta anteprima immagine e mostra dimensioni immagine
        // (per renderizzare avviso immagine troppo grande)
        if (!blob) {
          setSelectedImage(null);
          setImageSize({
            formattedSize: formattedFileSize,
            rawSize: fileSizeInBytes,
          });
          return;
        }

        // Crea un nuovo File con il nome corretto e l'estensione webp
        const newFile = new File(
          [blob],
          file.name.replace(/\.\w+$/, `.${ext}`),
          {
            type,
          },
        );

        // Se l'immagine POST CONVERSIONE NON supera la grandezza consentita
        if (newFile.size <= MAXIMUM_IMAGE_SIZE) {
          setImageSize({
            formattedSize: `${newFile.size >= MB ? (newFile.size / MB).toFixed(2) + " MB" : Math.round(newFile.size / KB) + " KB"}`,
            rawSize: newFile.size,
          });
          // Aggiorna lo state dell'immagine selezionata (anteprima)
          setSelectedImage(file ? URL.createObjectURL(file) : placeholderImage);

          // Inserisce il file convertito nel file input nascosto tramite DataTransfer
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(newFile);
          hiddenInputRef.current.files = dataTransfer.files;
        } else {
          // Se l'immagine POST CONVERSIONE supera la grandezza consentita
          setImageSize({
            formattedSize: `${newFile.size >= MB ? (newFile.size / MB).toFixed(2) + " MB" : Math.round(newFile.size / KB) + " KB"}`,
            rawSize: newFile.size,
          });
          setSelectedImage(null);
        }
      }
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
          <div
            className={`relative m-auto flex aspect-square max-w-60 flex-col items-center justify-center gap-2 ${selectedImage === null || selectedImage === placeholderImage ? "border-secondary rounded border border-dashed" : ""}`}
          >
            <label
              className={` ${isOpenInfo ? "pointer-events-none hidden" : ""} flex h-10 w-10 cursor-pointer items-center justify-center text-2xl ${selectedImage === null || selectedImage === placeholderImage ? "h-full w-full rounded border-0" : "bg-accent absolute right-2 bottom-2 z-50 rounded"}`}
              htmlFor="imageInput"
            >
              {selectedImage === null || selectedImage === placeholderImage ? (
                <PlusIcon className="text-subtle h-10 w-10" />
              ) : (
                <PencilIcon className="h-5 w-5" />
              )}
            </label>

            {/* Testo box immagine */}
            {selectedImage === null || selectedImage === placeholderImage ? (
              <p
                className={`absolute top-[60%] text-base ${imageSize?.rawSize > MAXIMUM_IMAGE_SIZE ? "text-amber-400" : "text-subtle"}`}
              >
                {`${imageSize?.rawSize > MAXIMUM_IMAGE_SIZE ? `File troppo grande (${imageSize.formattedSize})` : `Scegli Immagine (max 500KB)`}`}
              </p>
            ) : (
              <>
                <Image
                  priority
                  alt="Titolo gioco"
                  src={
                    selectedImage !== null ? selectedImage : placeholderImage
                  }
                  fill
                  className="object-cover"
                  onLoad={() => setIsLoading(true)}
                />
                {/* LOADER */}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gray-500 blur-sm" />
                )}
              </>
            )}
            <input
              id="imageInput"
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.heic,.heif"
              className="absolute bottom-0 w-full opacity-0 file:hidden"
              onChange={(e) => handleChangeImage(e)}
            />
          </div>
        </div>

        {/* input file nascosto che contiene il WebP pronto per la server action */}
        <input ref={hiddenInputRef} type="file" name="gameImages" hidden />

        {/* Cerca immagine */}
        {nameLength > 0 && (
          <div className="text-secondary mt-3.5 flex flex-col items-center justify-center gap-0.5">
            <span className="text-sm">Cerca immagine</span>
            <div className="flex gap-3">
              <div className="flex items-center justify-center gap-1 text-sm">
                <a
                  className="decoration decoration-subtle underline underline-offset-2"
                  href={googleImagesUrl}
                  target="_blank"
                >
                  Google
                </a>
                <ArrowTopRightOnSquareIcon className="h-2.5 w-2.5" />
              </div>

              <div className="flex items-center justify-center gap-1 text-sm">
                <a
                  className="decoration decoration-subtle underline underline-offset-2"
                  href={launchboxDbUrl}
                  target="_blank"
                >
                  LaunchBox
                </a>
                <ArrowTopRightOnSquareIcon className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>
        )}

        {/* TITOLO */}
        <div className="mb-5 flex flex-col justify-items-start gap-4 py-5 text-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-secondary" htmlFor="gameName">
                Titolo
              </label>
              <span className="text-subtle text-sm">{nameLength}/100</span>
            </div>
            <input
              name="gameName"
              id="gameName"
              type="text"
              className="focus-within:bg-background focus:bg-background focus-within:border-accent focus:ring-accent bg-surface rounded p-1.5 text-base focus:ring-1 focus:outline-none"
              defaultValue={gameName}
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setNameLength(e.target.value.length)}
            />
          </div>

          {/* REGIONE */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <label className="text-secondary" htmlFor="gameRegion">
                Regione
              </label>

              <button
                aria-label="Informazioni sulle regioni"
                onClick={(e) => handleRegionInfo(e)}
              >
                <QuestionMarkCircleIcon className="text-subtle mt-0.5 h-4 w-4" />
              </button>

              {isOpenInfo && <InfoRegion onOpenClose={setIsOpenInfo} />}
            </div>

            <select
              name="gameRegion"
              id="gameRegion"
              className="focus:border-accent focus:ring-accent bg-surface rounded p-1 text-base focus-visible:outline-0"
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
          <div className="text-subtle group mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
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
          <div className="group text-subtle mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
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
          <div className="text-subtle group mt-2.5 flex flex-row-reverse items-center justify-end gap-2">
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
              <label
                className="text-secondary mt-2"
                htmlFor="contentDescription"
              >
                Contenuto
              </label>
              <span className="text-subtle text-sm">
                {descriptionLength}/500
              </span>
            </div>

            <textarea
              name="contentDescription"
              id="contentDescription"
              rows="6"
              className="focus-within:bg-background focus:bg-background placeholder:text-secondary/50 focus-within:border-accent focus:ring-accent bg-surface max-h-80 min-h-40 resize-none rounded p-1.5 text-base focus:placeholder-transparent focus:ring-1 focus:outline-none"
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
              <label className="text-secondary text-lg" htmlFor="gameNotes">
                Note
              </label>

              <span className="text-subtle just text-sm">
                {notesLength}/300
              </span>
            </div>
            <textarea
              autoCapitalize="sentences"
              name="gameNotes"
              id="gameNotes"
              defaultValue={gameNotes}
              className="focus-within:bg-background focus:bg-background placeholder:text-secondary/50 focus-within:border-accent focus:ring-accent bg-surface max-h-44 min-h-20 rounded p-1.5 text-base focus:placeholder-transparent focus:ring-1 focus:outline-none"
              maxLength="300"
              onChange={(e) => setNotesLength(e.target.value.length)}
            ></textarea>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1">
            <Button imageSize={imageSize} />
          </div>
        </div>
      </form>
    </>
  );
}

function Button({ imageSize }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={imageSize?.rawSize > MAXIMUM_IMAGE_SIZE || pending}
      className={`flex w-full items-center justify-center gap-1 ${pending ? "text-subtle" : "border-accent rounded border-2"} p-1`}
    >
      <ArrowPathIcon className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Aggiornamento gioco" : "Modifica gioco"}
      </span>
    </button>
  );
}

export default UpdateGameForm;
