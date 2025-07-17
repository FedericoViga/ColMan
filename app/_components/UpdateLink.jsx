import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function UpdateLink({ text = "Modifica", linkHref }) {
  return (
    <div className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border border-blue-500 py-1 text-base">
      <PencilSquareIcon className="h-4 w-4" />
      <Link href={linkHref} className="inline-block">
        {text}
      </Link>
    </div>
  );
}

export default UpdateLink;
