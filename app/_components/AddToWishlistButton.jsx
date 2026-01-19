"use client";

import HeartPlusIcon from "./HeartPlusIcon";

function AddToWishlistButton({ onOpenClose }) {
  function handleOpenModal(e) {
    e.preventDefault();
    onOpenClose(true);
  }

  return (
    <button
      type="button"
      aria-label="Aggiungi un gioco alla wishlist"
      aria-haspopup="dialog"
      aria-controls="wishlist-modal"
      onClick={(e) => handleOpenModal(e)}
      className="fixed right-0 bottom-8 flex cursor-pointer items-center justify-center bg-transparent pr-4 text-5xl"
    >
      <HeartPlusIcon className="text-accent h-12 w-12" />
    </button>
  );
}

export default AddToWishlistButton;
