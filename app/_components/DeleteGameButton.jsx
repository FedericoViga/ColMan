"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteGame } from "../_lib/actions";
import { useTransition } from "react";
import DeleteLoader from "./DeleteLoader";

function DeleteGame({ gameId, gameName, gameImages }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmation = window.confirm(
      `Sei sicuro di voler cancellare ${gameName.toUpperCase()}?`,
    );
    if (confirmation) {
      startTransition(deleteGame(gameId, gameImages));
    }
  }

  return (
    <>
      {!isPending ? (
        <div className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border-2 border-red-500 py-1 text-base">
          <TrashIcon className="h-4 w-4" />
          <button className="cursor-pointer" onClick={handleDelete}>
            Elimina
          </button>
        </div>
      ) : (
        <>
          <div className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border-2 border-red-500 py-1 text-base">
            <TrashIcon className="h-4 w-4" />
            <button className="cursor-pointer" onClick={handleDelete}>
              Elimina
            </button>
          </div>
          <DeleteLoader />
        </>
      )}
    </>
  );
}

export default DeleteGame;
