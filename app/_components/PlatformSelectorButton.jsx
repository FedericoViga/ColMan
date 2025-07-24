import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function PlatformSelectorButton({ onOpenFilters, filter, isExpanded }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isExpanded) {
      window.scrollTo(0, 0);
    }
  }, [isExpanded]);

  return (
    <button
      onClick={() => onOpenFilters((isExp) => !isExp)}
      className={`text-primary cursor-pointer rounded-lg border-2 border-slate-600 px-2 py-1 text-sm ${isExpanded || (filter !== "Tutte" && filter !== undefined) ? "!text-foreground border-2 !border-blue-500" : "border-primary border"}`}
    >
      {searchParams.get("platform") === "all" || !searchParams.has("platform")
        ? "Tutte"
        : filter}
    </button>
  );
}

export default PlatformSelectorButton;
