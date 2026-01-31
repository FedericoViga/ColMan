"use client";

import { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

function DeleteWishlistGameButton({ gameId, onDelete, onOpen, curOpen }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="px-1.5"
      onClick={() => {
        onOpen((prev) => (prev === curOpen ? curOpen : null));
        startTransition(() => onDelete(gameId));
      }}
      type="button"
      aria-label="Elimina gioco dalla wishlist"
    >
      <TrashIcon className="text-subtle h-3.5 w-3.5" />
    </button>
  );
}

export default DeleteWishlistGameButton;
