"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useTransition } from "react";
import DeleteLoader from "./DeleteLoader";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function DeleteGameButton({ gameId, gameName, gameImages }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  // rimuove lo scroll durante l'eliminazione
  useEffect(() => {
    if (isPending) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isPending]);

  return (
    <>
      {!isPending ? (
        <>
          <button
            className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border-2 border-red-500 py-1 text-base"
            onClick={() => setIsOpenModal(true)}
          >
            <TrashIcon className="h-4 w-4" />
            Elimina
          </button>
          {isOpenModal && (
            <DeleteConfirmationModal
              onClose={() => setIsOpenModal(false)}
              isPending={isPending}
              onTransition={startTransition}
              targetInfo={{ gameId, gameName, gameImages }}
              deletionTarget={"game"}
            />
          )}
        </>
      ) : (
        <>
          <button className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border-2 border-red-500 py-1 text-base">
            <TrashIcon className="h-4 w-4" />
            Elimina
          </button>
          <DeleteLoader />
        </>
      )}
    </>
  );
}

export default DeleteGameButton;
