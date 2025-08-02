"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import DeletePlatformButton from "./DeletePlatformButton";
import GoogleLogoIcon from "./GoogleLogoIcon";
import UpdateLink from "./UpdateLink";
import EbayLogoIcon from "./EbayLogoIcon";

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

      <div className="mt-3 flex items-center gap-3">
        <span className="text-primary">Cercala su</span>
        <div className="flex items-center gap-3">
          <a
            href={`https://www.google.com/search?q=site%3A+it.m.wikipedia.org ${platformOwner} ${platformName}`}
            className="flex items-center gap-1 text-lg"
            target="_blank"
          >
            <GoogleLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>

          <span className="text-primary w-0.5" aria-hidden="true">
            |
          </span>

          <a
            href={`https://www.ebay.it/sch/i.html?_nkw=${platformOwner.replaceAll(" ", "+")}+${platformName.replaceAll(" ", "+")}&_sacat=0&_from=R40&rt=nc&LH_PrefLoc=1`}
            className="flex items-center gap-1"
            target="_blank"
          >
            <EbayLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>
        </div>
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
