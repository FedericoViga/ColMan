"use client";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CreateSelector() {
  const [isOpen, setisOpen] = useState(false);

  // notifiche toast per inserimento/eliminazione gioco o piattaforma
  // legge il rispetivo cookie e se è presente renderizza la notifica e rimuove il cookie
  useEffect(() => {
    const insertGameCookie = Cookies.get("insertGame");
    const deleteGameCookie = Cookies.get("deleteGame");
    const insertPlatformCookie = Cookies.get("insertPlatform");
    const deletePlatformCookie = Cookies.get("deletePlatform");

    if (insertGameCookie) {
      toast.success(insertGameCookie, { id: "insert-game" });
      Cookies.remove("insertGame");
    }
    if (deleteGameCookie) {
      toast.success(deleteGameCookie, { id: "delete-game" });
      Cookies.remove("deleteGame");
    }
    if (insertPlatformCookie) {
      toast.success(insertPlatformCookie, { id: "insert-platform" });
      Cookies.remove("insertPlatform");
    }
    if (deletePlatformCookie) {
      toast.success(deletePlatformCookie, { id: "delete-platform" });
      Cookies.remove("deletePlatform");
    }
  }, []);

  // rimuove lo scroll quando è aperto il componente CreateSelector
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isOpen]);

  return (
    <>
      {/* layer di background opaco visibile mentre è aperto il componente */}
      <div
        className={`fixed top-0 h-full w-full ${isOpen ? "bg-background/90 block" : "hidden"}`}
      ></div>

      <div
        className={`bg-background fixed bottom-0 transition-all transition-discrete duration-400 ${isOpen ? "flex h-64 border-t-2 border-t-blue-500" : "h-0 border-t-2 border-t-blue-500 opacity-0"} w-full flex-col items-center justify-center`}
      >
        <div
          className={`bg-background relative w-full flex-col items-center justify-center transition-all transition-discrete duration-240 ${isOpen ? "flex h-56 opacity-100" : "hidden h-0 opacity-0"}`}
        >
          <span className="absolute top-1 right-3">
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setisOpen((isOpen) => !isOpen)}
            />
          </span>
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-xl">Crea un gioco o una piattaforma</h1>
            <h2 className="text-primary">Cosa vuoi creare?</h2>
            <div className="flex flex-col items-center justify-center gap-4 decoration-blue-500">
              <Link
                href={"/games/insert-game"}
                className="underline underline-offset-4"
              >
                GIOCO
              </Link>
              <Link
                href={"/platforms/insert-platform"}
                className="underline decoration-blue-500 underline-offset-4"
              >
                PIATTAFORMA
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`bg-background fixed right-6 bottom-7 flex ${!isOpen ? "size-14" : "hidden size-0"} cursor-pointer items-center justify-center rounded-lg border-2 border-blue-500 text-5xl`}
        onClick={() => setisOpen((isOpen) => !isOpen)}
      >
        <PlusIcon className="h-7 w-7" />
      </div>
    </>
  );
}

export default CreateSelector;
