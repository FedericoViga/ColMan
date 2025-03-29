"use client";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

function ChooseCreate() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      <div
        className={`bg-background flex ${isOpen ? "absolute bottom-0 h-64 border-t-2 border-t-blue-500" : "bottom-0 hidden h-0"} w-full flex-col items-center justify-center`}
      >
        <div
          className={`relative flex w-full flex-col items-center justify-center ${isOpen ? "h-56" : "h-0"}`}
        >
          <span className="absolute top-1 right-3">
            <XMarkIcon
              className="h-6 w-6"
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
        className={`bg-background fixed right-7 bottom-7 flex ${!isOpen ? "size-12" : "hidden size-0"} items-center justify-center rounded-lg border-2 border-blue-500 text-5xl`}
        onClick={() => setisOpen((isOpen) => !isOpen)}
      >
        <PlusIcon className="h-7 w-7" />
      </div>
    </>
  );
}

export default ChooseCreate;
