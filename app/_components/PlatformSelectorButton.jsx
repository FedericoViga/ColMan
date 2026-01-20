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
      className={`rounded-lg border px-2 py-1 text-sm ${isExpanded || (filterName !== "Tutte" && filterName !== "---") ? "text-accent outline-accent outline" : "text-primary border-slate-500"}`}
    >
      {filterName === "---" ? "Tutte" : filterName}
    </button>
  );
}

export default PlatformSelectorButton;
