"use client";

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function CopyButton({ elemRef }) {
  const [isClicked, setIsClicked] = useState(false);

  async function handleCopy() {
    try {
      setIsClicked(true);
      const listNode = elemRef.current.childNodes;
      const listNodeToArr = Array.from(listNode).map(
        (elem) => elem.textContent,
      );
      listNodeToArr.shift();
      const textToCopy = listNodeToArr.join(",").replaceAll(",", ", ");
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className="text-primary absolute top-1 right-1 text-sm"
      onClick={handleCopy}
    >
      {isClicked ? (
        <ClipboardDocumentCheckIcon className="text-foreground h-5 w-5" />
      ) : (
        <ClipboardDocumentListIcon className="h-5 w-5" />
      )}
    </button>
  );
}

export default CopyButton;
