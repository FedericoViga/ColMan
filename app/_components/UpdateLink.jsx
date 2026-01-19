import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function UpdateLink({ text = "Modifica", linkHref }) {
  return (
    <Link
      href={linkHref}
      className="border-accent mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border-2 py-1 text-base"
    >
      <PencilSquareIcon className="h-4 w-4" />
      <span>{text}</span>
    </Link>
  );
}

export default UpdateLink;
