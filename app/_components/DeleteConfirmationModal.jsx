import { useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

import { deleteGame } from "../_lib/actions";

function DeleteConfirmationModal({
  targetInfo,
  isOpenModal,
  onClose,
  onTransition,
}) {
  // rimuove lo scroll quando è aperto il componente
  useEffect(() => {
    if (isOpenModal) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isOpenModal]);

  function confirmedDelete() {
    onTransition(deleteGame(targetInfo?.gameId));
    onClose();
  }

  return (
    <>
      <div className="bg-background/80 fixed top-0 right-0 bottom-0 left-0 container flex items-center justify-center backdrop-blur-sm">
        <div className="bg-background flex min-w-full flex-col items-center justify-center gap-10 rounded-lg border-2 border-red-500 px-4 py-6 text-center">
          <div className="flex flex-col gap-5 rounded bg-[#1d1412] py-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex gap-2">
                <ExclamationCircleIcon className="h-8 w-8 self-center text-red-500" />

                <span className="text-xl text-amber-400">
                  CONFERMA DEFINITIVA
                </span>
              </div>

              <p className="text-sm text-slate-500">
                Operazione irreversibile, i dati del gioco (compresa l'immagine)
                non potranno essere recuperati
              </p>
            </div>
            <p className="text-primary text-lg">
              Sei sicuro di voler eliminare{" "}
              <span className="text-gray-50">{targetInfo.gameName}</span>?
            </p>
          </div>

          <div className="flex gap-9">
            <button
              className="flex items-center gap-1 rounded-lg border-2 border-red-500 px-2.5 py-1"
              onClick={confirmedDelete}
            >
              <TrashIcon className="h-4 w-4" />
              Elimina
            </button>
            <button
              className="border-primary rounded-lg border px-2.5 py-1"
              onClick={onClose}
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmationModal;
