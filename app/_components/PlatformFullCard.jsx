"use client";

import DeletePlatformButton from "./DeletePlatformButton";
import UpdateLink from "./UpdateLink";

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
        <UpdateLink
          linkHref={`/platforms/${normalizedId}-${normalizedPlatformOwner}-${normalizedPlatform}/update-platform`}
        />

        <DeletePlatformButton
          platformId={normalizedId}
          platformName={platformName}
        />
      </div>
    </div>
  );
}

export default PlatformFullCard;
