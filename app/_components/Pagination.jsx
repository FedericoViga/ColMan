"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { PAGE_SIZE } from "../_lib/constants";

function Pagination({ count }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next);
    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return params;
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", prev);
    router.push(`?${params.toString()}`, { scroll: false });
    return params;
  }

  if (pageCount <= 1) return null;

  return (
    <div className="border-primary flex items-center justify-between border-t py-3 tracking-wider">
      <p>
        <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span>-
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        di <span className="font-bold">{count}</span> risultati
      </p>
      <div>
        <div className="flex gap-6">
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className="disabled:text-primary flex items-center justify-center"
          >
            <ChevronLeftIcon
              className={`${currentPage === 1 && "text-primary"} text-accent h-4 w-4`}
            />
            <span>Indietro</span>
          </button>

          <button
            disabled={currentPage === pageCount}
            onClick={nextPage}
            className="disabled:text-primary flex items-center justify-center"
          >
            <span>Avanti</span>
            <ChevronRightIcon
              className={`${currentPage === pageCount && "text-primary"} text-accent h-4 w-4`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
