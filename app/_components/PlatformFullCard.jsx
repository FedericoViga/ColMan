"use client";

import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeletePlatformButton from "./DeletePlatformButton";

function PlatformFullCard({ platformDetails }) {
  const { id, platformName, platformOwner } = platformDetails;

  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platformName.toLowerCase().replaceAll(" ", "-");
  const normalizedPlatformOwner = platformOwner.toLowerCase();

  return (
    <div className="mt-3 mb-10 flex flex-col gap-4">
      <h1 className="text-center text-2xl">Dettagli piattaforma</h1>
      <div>
        <p className="text-primary mt-5 text-lg">Piattaforma</p>
        <p className="font border-primary rounded border p-1.5 text-xl">
          {platformName}
        </p>
      </div>

      <div>
        <p className="text-primary text-lg">Produttore</p>
        <p className="border-primary rounded border p-1.5 text-xl">
          {platformOwner}
        </p>
      </div>

      <div className="flex gap-4">
        <div className="mt-5 flex min-w-24 flex-3/6 cursor-pointer items-center justify-center gap-1 self-start rounded border border-blue-500 py-1 text-base">
          <PencilSquareIcon className="h-4 w-4" />
          <Link
            href={`/platforms/${normalizedId}-${normalizedPlatformOwner}-${normalizedPlatform}/update-platform`}
            className="inline-block"
          >
            Modifica
          </Link>
        </div>
        <DeletePlatformButton
          platformId={normalizedId}
          platformName={platformName}
        />
      </div>
    </div>
  );
}

export default PlatformFullCard;
