import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 25, 50, 100]
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  // Calculate row metadata positions
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Logic to generate smart page numbers with truncation array [...]
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="w-full flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 bg-white px-6 py-4 select-none">
      
      {/* LEFT: METADATA & DATA DENSITY CONTROLS */}
      <div className="flex sm:hidden flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
        {/* Rows Per Page Selector */}
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1); // Safely reset to page 1 on scale change
              }}
              className="h-8 px-2 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 outline-none focus:border-slate-300 font-sans cursor-pointer"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Separator Line */}
        {onItemsPerPageChange && <div className="h-4 w-px bg-slate-200 hidden sm:block" />}

        {/* Dynamic Entry Summary Text */}
        <div>
          Showing <span className="font-bold text-slate-800">{startItem}</span> to{" "}
          <span className="font-bold text-slate-800">{endItem}</span> of{" "}
          <span className="font-bold text-slate-800">{totalItems}</span> entries
        </div>
      </div>

      {/* RIGHT: INTERACTIVE PAGINATION NAVIGATION TRACKS */}
      <div className="flex items-center justify-center gap-1.5">
        
        {/* Jump to First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Step Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Dynamic Number Sequence Nodes */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span 
                  key={`dots-${index}`} 
                  className="size-8 flex items-end justify-center text-slate-400 text-xs font-bold pb-2 tracking-tighter"
                >
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`size-8 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-slate-900 text-white shadow-3xs"
                    : "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Step Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Next Page"
        >
          <ChevronRight size={14} />
        </button>

        {/* Jump to Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight size={14} />
        </button>

      </div>
    </div>
  );
}