import { useEffect } from "react";
import { deleteGame, deletePlatform } from "../_lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteConfirmationModal({
  deletionTarget,
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
    if (deletionTarget === "game") {
      onTransition(deleteGame(targetInfo?.gameId, targetInfo?.gameImages));
      onClose();
    }
    if (deletionTarget === "platform") {
      onTransition(deletePlatform(targetInfo?.platformId));
      onClose();
    }
  }

  return (
    <>
      <div className="bg-background/90 fixed top-0 right-0 bottom-0 left-0 container flex items-center justify-center backdrop-blur-sm">
        <div className="bg-background flex min-w-full flex-col items-center justify-center gap-7 rounded-lg border-2 border-red-500 px-4 py-6 text-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-center gap-2">
              <ExclamationCircleIcon className="h-9 w-9 self-center text-red-500" />
              <span className="text-2xl">Conferma eliminazione</span>
            </div>

            <p className="text-primary text-lg">
              Sei sicuro di voler eliminare{" "}
              <span className="text-gray-50">
                {deletionTarget === "game" && targetInfo?.gameName}
                {deletionTarget === "platform" && targetInfo?.platformName}
              </span>
              ?
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
