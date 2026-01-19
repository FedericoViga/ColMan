"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function ToCreateButton({ url }) {
  return (
    <Link href={url}>
      <div className="bg-background border-accent fixed right-6 bottom-7 size-14 cursor-pointer items-center justify-center rounded-lg border-2 text-5xl not-even:flex">
        <PlusIcon className="h-7 w-7" />
      </div>
    </Link>
  );
}

export default ToCreateButton;
