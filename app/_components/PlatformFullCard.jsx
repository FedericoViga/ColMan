import DeletePlatformButton from "./DeletePlatformButton";
import UpdateLink from "./UpdateLink";
import Link from "next/link";
import ExternalSearchLinks from "./ExternalSearchLinks";
import { countGamesByPlatform } from "../_lib/data-service";

async function PlatformFullCard({ platformDetails }) {
  const { id, platformName, platformOwner } = platformDetails;
  const numGamesByPlatform = await countGamesByPlatform(platformName);

  const normalizedId = id.toString().startsWith("-") ? id.slice(1) : id;
  const normalizedPlatform = platformName.toLowerCase().replaceAll(" ", "-");
  const normalizedPlatformOwner = platformOwner.toLowerCase();

  return (
    <div className="mt-3 mb-10 flex flex-col gap-4">
      <h1 className="text-center text-2xl">Dettagli piattaforma</h1>

      <p className="text-primary mt-2 text-center text-lg">
        Hai{" "}
        <Link
          href={`/games?platform=${platformName}&page=1`}
          className="decoration-accent underline decoration-1 underline-offset-3"
        >
          <span className="text-foreground">
            {numGamesByPlatform}
            {numGamesByPlatform === 1 ? " gioco" : " giochi"}
          </span>
        </Link>
        &nbsp;per {platformName}
      </p>

      <div>
        <p className="text-primary text-lg">Piattaforma</p>
        <p className="font rounded border border-slate-800 bg-slate-900 p-1.5 text-lg">
          {platformName}
        </p>
      </div>

      <div>
        <p className="text-primary text-lg">Produttore</p>
        <p className="rounded border border-slate-800 bg-slate-900 p-1.5 text-lg">
          {platformOwner}
        </p>
      </div>

      <ExternalSearchLinks
        googleUrl={`https://www.google.com/search?q=site%3A+it.m.wikipedia.org ${platformOwner} ${platformName}`}
        ebayUrl={`https://www.ebay.it/sch/i.html?_nkw=${platformOwner.replaceAll(" ", "+")}+${platformName.replaceAll(" ", "+")}&_sacat=0&_from=R40&rt=nc&LH_PrefLoc=1`}
        isGameCard={false}
      />

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
