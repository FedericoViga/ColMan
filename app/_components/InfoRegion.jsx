import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function InfoRegion({ onOpenClose }) {
  // rimuove lo scroll quando è aperto il componente
  useEffect(() => {
    if (onOpenClose) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [onOpenClose]);

  function closeRegionInfo(e) {
    e.preventDefault();
    onOpenClose(false);
  }

  return (
    <div className="bg-line/25 fixed top-0 right-0 bottom-0 left-0 z-10 container flex items-center justify-center backdrop-blur-md">
      <div className="border-accent bg-surface relative flex min-w-full flex-col justify-center gap-4 rounded-lg border-2 px-4 py-6">
        <button
          onClick={(e) => closeRegionInfo(e)}
          className="absolute top-2 right-2"
        >
          <XMarkIcon className="text-foreground h-6 w-6" />
        </button>

        <ul className="*:flex *:flex-col *:py-2">
          <li>
            <span>ITA 🇮🇹</span>
            <span className="text-subtle-surface">
              Copertina solo in italiano.
            </span>
          </li>
          <li>
            <span>PAL-ITA 🇪🇺🇮🇹</span>
            <span className="text-subtle-surface">
              Copertina con almeno una lingua europea e l'italiano.
            </span>
          </li>
          <li>
            <span>PAL 🇪🇺</span>
            <span className="text-subtle-surface">
              Copertina con una o più lingue europee, senza l'italiano.
            </span>
          </li>
          <li>
            <span>NTSC-U 🇺🇸</span>
            <span className="text-subtle-surface">
              Nord America e Sud America
            </span>
          </li>
          <li>
            <span>NTSC-J 🇯🇵</span>
            <span className="text-subtle-surface">
              Asia (Giappone, Cina, Corea del Sud ecc.)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoRegion;
