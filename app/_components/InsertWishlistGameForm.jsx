import Link from "next/link";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { groupByPlatformOwner } from "../_lib/utils";
import { insertGameInWishlist } from "../_lib/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
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

  return (
    <div className="bg-background/40 fixed top-0 right-0 bottom-0 left-0 container flex items-center justify-center backdrop-blur-sm">
      <div
        className={`${selectedPlatform && titleText.length !== 0 ? "border-blue-500" : "border-primary"} bg-background relative min-w-11/12 rounded border px-3 py-9`}
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
          <XMarkIcon className="text-primary h-6 w-6" />
        </button>
        <div className="mb-6 flex items-center justify-center gap-2">
          <HeartIcon className="h-6 w-6" />
          <h1 className="text-xl">Aggiungi a wishlist</h1>
        </div>

        <form action={formAction} key={state.submitId} className="min-w-full">
          {/* TITOLO */}
          <div className="mb-7 flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <label className="text-primary" htmlFor="gameName">
                Titolo
              </label>
              <span className="text-primary text-sm">
                {titleText.length}/100
              </span>
            </div>
            <input
              autoCapitalize="sentences"
              name="gameName"
              id="gameName"
              type="text"
              value={titleText}
              className="border-primary rounded border p-1.5 text-base focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              autoComplete="off"
              maxLength="100"
              required
              onChange={(e) => setTitleText(e.target.value)}
            />
          </div>

          {/* Selettore piattaforma */}
          {platforms.length !== 0 ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-primary">Piattaforma</span>
                <div className="flex gap-2 text-xs">
                  <span className="text-primary">
                    La piattaforma non esiste?
                  </span>
                  <Link
                    className="underline underline-offset-2"
                    href="/platforms/insert-platform"
                  >
                    Creala
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
            <p className="text-primary mt-4">
              Non ci sono ancora piattaforme, prima di creare un gioco devi{" "}
              <Link
                className="text-foreground underline underline-offset-2"
                href="/platforms/insert-platform"
              >
                creare la sua piattaforma!
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

  return (
    <button
      disabled={!selectedPlatform || titleText.length === 0}
      className={`disabled:border-primary disabled:text-primary text-foreground mt-9 flex w-full items-center justify-center gap-1 rounded border-2 border-blue-500 px-5 py-1 disabled:pointer-events-none`}
    >
      <span className={`${pending ? "dots-loader animate-pulse" : ""}`}>
        {pending ? "Aggiunta gioco" : "Aggiungi"}
      </span>
    </button>
  );
}

export default InsertWishlistGameForm;
