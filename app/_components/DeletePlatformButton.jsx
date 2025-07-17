"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deletePlatform } from "../_lib/actions";

function DeletePlatformButton({ platformId, platformName }) {
  function handleDelete() {
    const confirmation = window.confirm(
      `Sei sicuro di voler cancellare ${platformName.toUpperCase()}?`,
    );
    if (confirmation) {
      deletePlatform(platformId);
    }
  }

  return (
    <div className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border border-red-500 py-1 text-base">
      <TrashIcon className="h-4 w-4" />
      <button className="cursor-pointer" onClick={handleDelete}>
        Elimina
      </button>
    </div>
  );
}

export default DeletePlatformButton;
