import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import GoogleLogoIcon from "./icons/GoogleLogoIcon";
import EbayLogoIcon from "./icons/EbayLogoIcon";
import DoesItPlayLogoIcon from "./icons/DoesItPlayLogoIcon";

function ExternalSearchLinks({
  googleUrl,
  ebayUrl,
  doesItPlayUrl,
  isGameCard = true,
}) {
  return (
    <>
      <span className="text-primary mt-4">Cerca su:</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Google */}
          <a
            href={googleUrl}
            className="flex items-center gap-1 text-lg"
            target="_blank"
          >
            <GoogleLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>

          <span className="text-primary w-0.5" aria-hidden="true">
            |
          </span>

          {/* Ebay */}
          <a href={ebayUrl} className="flex items-center gap-1" target="_blank">
            <EbayLogoIcon />
            <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
          </a>

          {/* DoesItPlay */}
          {isGameCard && (
            <>
              <span className="text-primary w-0.5" aria-hidden="true">
                |
              </span>

              <a
                href={doesItPlayUrl}
                target="_blank"
                className="text-foreground flex items-center gap-1 text-lg font-semibold"
              >
                <DoesItPlayLogoIcon />
                <span>DoesItPlay?</span>
                <ArrowTopRightOnSquareIcon className="text-primary h-3 w-3" />
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ExternalSearchLinks;
