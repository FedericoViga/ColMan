import { useSearchParams } from "next/navigation";

function PlatformSelectorButton({ onOpenFilters, filter, isExpanded }) {
  const searchParams = useSearchParams();

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
