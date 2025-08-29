import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import EbayLogoIcon from "./EbayLogoIcon";
import GoogleLogoIcon from "./GoogleLogoIcon";

function ExternalSearchLinks({ googleUrl, ebayUrl }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <span className="text-primary">Cerca su</span>

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
      </div>
    </div>
  );
}

export default ExternalSearchLinks;
