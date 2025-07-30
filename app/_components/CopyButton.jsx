"use client";

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

function CopyButton({ elemRef }) {
  const checkIconRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  async function handleCopy() {
    if (!elemRef.current) return;

    try {
      const listItems = elemRef.current.querySelectorAll("li");
      const textToCopy = Array.from(listItems)
        .map((li) => li.textContent.trim())
        .join("\n");
      await navigator.clipboard.writeText(textToCopy);
      setIsClicked(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePingAnimationAdd() {
    checkIconRef.current.classList.add("ping-once");
  }
  function handlePingAnimationRemove() {
    checkIconRef.current.classList.remove("ping-once");
  }

  return (
    <button
      className="text-primary absolute top-1 right-1 text-sm"
      onClick={handleCopy}
    >
      {isClicked ? (
        <ClipboardDocumentCheckIcon
          ref={checkIconRef}
          className="text-foreground ping-once h-5 w-5"
          onClick={handlePingAnimationAdd}
          onAnimationEnd={handlePingAnimationRemove}
        />
      ) : (
        <ClipboardDocumentListIcon className="h-5 w-5" />
      )}
    </button>
  );
}

export default CopyButton;
