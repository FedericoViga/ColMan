import { useEffect } from "react";

function PlatformSelectorButton({ onOpenFilters, isExpanded, filterName }) {
  useEffect(() => {
    if (isExpanded) {
      window.scrollTo(0, 0);
    }
  }, [isExpanded]);

  return (
    <button
      onClick={() => onOpenFilters((isExp) => !isExp)}
      className={`text-primary cursor-pointer rounded-lg border-2 border-slate-600 px-2 py-1 text-sm ${isExpanded || (filterName !== "Tutte" && filterName !== "---") ? "!text-foreground border-2 !border-blue-500" : "border-primary border"}`}
    >
      {filterName === "---" ? "Tutte" : filterName}
    </button>
  );
}

export default PlatformSelectorButton;
