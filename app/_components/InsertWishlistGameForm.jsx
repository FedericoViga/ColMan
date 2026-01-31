import Link from "next/link";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { groupByPlatformOwner } from "../_lib/utils";
import { insertGameInWishlist } from "../_lib/actions";
import PlatformSelectorWishlist from "./PlatformSelectorWishlist";

function InsertWishlistGameForm({ platforms, onOpenClose }) {
  const [curActive, setCurActive] = useState(undefined);
  const [titleText, setTitleText] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [state, formAction] = useActionState(insertGameInWishlist, {
    submitId: null,
  });

  const platformsByOwner = groupByPlatformOwner(platforms, "platformOwner");

  // rimuove lo scroll quando è aperto il componente
  useEffect(() => {
    if (onOpenClose) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [onOpenClose]);

  useEffect(() => {
    if (state.submitId) setTitleText("");
  }, [state.submitId]);

  function handleCloseModal(e) {
    e.preventDefault();
    onOpenClose(false);
  }

  function handleChangeTitle(e) {
    // Rimuove tutti gli spazi all'inizio anche se il testo viene incollato
    const cleanedValue = e.target.value.replace(/^ +/, "");
    setTitleText(cleanedValue);
  }

  return (
    <div className="bg-foreground/10 fixed top-0 right-0 bottom-0 left-0 container flex items-center justify-center backdrop-blur-md">
      <div
        className={`${selectedPlatform && titleText.length !== 0 ? "border-accent" : "border-line"} bg-background relative min-w-11/12 rounded border px-3 py-9`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
        id="wishlist-modal"
      >
        <button
          type="button"
          aria-label="Chiudi finestra Aggiungi a wishlist"
          onClick={(e) => {
            handleCloseModal(e);
          }}
          className="absolute top-2 right-2"
        >
          <XMarkIcon className="text-secondary h-6 w-6" />
        </button>
        <div className="mb-6 flex items-center justify-center gap-2">
          <HeartIcon className="h-6 w-6" />
          <h1 className="text-xl">Aggiungi a wishlist</h1>
        </div>

        <form action={formAction} key={state.submitId} className="min-w-full">
          {/* TITOLO */}
          <div className="mb-7 flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-secondary" htmlFor="gameName">
                Titolo
              </label>
              <span className="text-secondary text-sm">
                {titleText.length}/100
              </span>
            </div>
            <input
              autoCapitalize="sentences"
              name="gameName"
              id="gameName"
              type="text"
              value={titleText}
              className="focus-within:border-accent focus:ring-accent focus-within:bg-background focus:bg-background bg-surface rounded p-1.5 text-base focus:ring-1 focus:outline-none"
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => handleChangeTitle(e)}
            />
          </div>

          {/* Selettore piattaforma */}
          {platforms.length !== 0 ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-secondary">Piattaforma</span>
                <div className="flex gap-2 text-sm">
                  <span className="text-subtle">Non vedi la piattaforma?</span>
                  <Link
                    className="text-secondary underline underline-offset-2"
                    href="/settings/my-platforms"
                  >
                    Aggiungila
                  </Link>
                </div>
              </div>

              <div className="max-h-60 overflow-y-scroll">
                {platformsByOwner.map((platform, i) => (
                  <PlatformSelectorWishlist
                    onSelectedPlatform={setSelectedPlatform}
                    platformDetails={platform}
                    key={platform[0]}
                    id={i}
                    curActive={curActive}
                    onActive={setCurActive}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-secondary mt-4">
              Non ci sono ancora piattaforme, prima di aggiungere un gioco devi{" "}
              <Link
                className="text-accent decoration-accent underline underline-offset-2"
                href="/settings/my-platforms"
              >
                aggiungere una piattaforma
              </Link>
            </p>
          )}

          <div className="flex justify-center">
            <Button titleText={titleText} selectedPlatform={selectedPlatform} />
          </div>
        </form>
      </div>
    </div>
  );
}

function Button({ titleText, selectedPlatform }) {
  const { pending } = useFormStatus();

  const isDisabled = !selectedPlatform || titleText.length === 0;

  return (
    <>
      {isDisabled ? (
        <div
          aria-hidden="true"
          className="border-subtle text-subtle pointer-events-none mt-9 flex w-full justify-center rounded border-2 px-5 py-1"
        >
          Aggiungi
        </div>
      ) : (
        <button
          disabled={pending}
          className={`${pending ? "border-subtle pointer-events-none" : "border-accent"} mt-9 flex w-full justify-center gap-1 rounded border-2 px-5 py-1`}
        >
          <span
            className={`${pending ? "dots-loader text-subtle animate-pulse" : ""}`}
          >
            {pending ? "Aggiunta gioco" : "Aggiungi"}
          </span>
        </button>
      )}
    </>
  );
}

export default InsertWishlistGameForm;
