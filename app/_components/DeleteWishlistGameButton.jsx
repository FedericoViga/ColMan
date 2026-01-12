"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";

function DeleteWishlistGameButton({ gameId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="px-1.5"
      onClick={() => startTransition(() => onDelete(gameId))}
      type="button"
      aria-label="Elimina gioco dalla wishlist"
    >
      <TrashIcon className="text-primary h-3.5 w-3.5" />
    </button>
  );
}

export default DeleteWishlistGameButton;
