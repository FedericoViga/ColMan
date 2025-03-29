"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deletePlatform } from "../_lib/actions";

function DeletePlatform({ platformId, platformName }) {
  function handleDelete() {
    const confirmation = window.confirm(
      `Sei sicuro di voler cancellare ${platformName.toUpperCase()}?`,
    );
    if (confirmation) {
      deletePlatform(platformId);
    }
  }
  return (
    <div className="mt-5 flex min-w-24 items-center gap-1 self-start rounded border border-red-500 pt-0.5 pb-1 pl-1.5 text-base">
      <TrashIcon className="h-4 w-4" />
      <button onClick={handleDelete}>Elimina</button>
    </div>
  );
}

export default DeletePlatform;
