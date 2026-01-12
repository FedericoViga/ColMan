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
      aria-label="Aggiungi un prodotto alla wishlist"
      aria-haspopup="dialog"
      aria-controls="wishlist-modal"
      onClick={(e) => handleOpenModal(e)}
      className="fixed right-6 bottom-8 flex cursor-pointer items-center justify-center bg-transparent text-5xl"
    >
      <HeartPlusIcon className="h-12 w-12 text-blue-500" />
    </button>
  );
}

export default AddToWishlistButton;
