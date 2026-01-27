"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

function CreateSelector() {
  const [isOpen, setisOpen] = useState(false);

  // notifiche toast per inserimento/eliminazione gioco o piattaforma
  // legge il rispettivo cookie e se è presente renderizza la notifica e rimuove il cookie
  useEffect(() => {
    const cookiesToCheck = [
      { key: "insertGame", toastId: "insert-game" },
      { key: "deleteGame", toastId: "delete-game" },
    ];

    cookiesToCheck.forEach(({ key, toastId }) => {
      const cookieValue = Cookies.get(key);
      if (cookieValue) {
        toast.success(cookieValue, { id: toastId });
        Cookies.remove(key);
      }
    });
  }, []);

  // rimuove lo scroll quando è aperto il componente CreateSelector
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* layer di background opaco visibile mentre è aperto il componente */}
      <div
        className={`fixed top-0 h-full w-full ${isOpen ? "bg-background/10 block backdrop-blur-sm" : "hidden"}`}
      ></div>

      <div
        className={`bg-background border-t-accent fixed bottom-0 w-full border-t-2 transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } `}
      >
        <div
          className={`bg-background relative flex w-full flex-col items-center justify-center py-13 transition-opacity delay-75 duration-200 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} `}
        >
          <span className="absolute top-3 right-3">
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setisOpen((isOpen) => !isOpen)}
            />
          </span>
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-xl">Aggiungi giochi o piattaforme</h1>
            <h2 className="text-primary">Cosa vuoi aggiungere?</h2>
            <div className="decoration-accent flex flex-col items-center justify-center gap-4">
              <Link
                href={"/games/insert-game"}
                className="underline underline-offset-4"
              >
                GIOCO
              </Link>
              <Link
                href={"/settings/my-platforms"}
                className="decoration-accent underline underline-offset-4"
              >
                PIATTAFORME
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`bg-background fixed right-6 bottom-7 flex ${!isOpen ? "size-14" : "hidden size-0"} border-accent cursor-pointer items-center justify-center rounded-lg border-2 text-5xl`}
        onClick={() => setisOpen((isOpen) => !isOpen)}
      >
        <PlusIcon className="text-accent h-7 w-7" />
      </div>
    </>
  );
}

export default CreateSelector;
