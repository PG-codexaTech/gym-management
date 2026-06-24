"use client";
import { useState, useMemo } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

export interface Column<T> {
  accessor?: keyof T;
  title: string;
  sortFunction?: (a: T, b: T, direction: "asc" | "desc") => number;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
}

interface CustomDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  striped?: boolean;
  highlightOnHover?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

function Table<T>({
  columns,
  data,
  pageSize: initialPageSize = 10,
  striped = false,
  highlightOnHover = false,
  searchTerm,
  onSearchChange,
}: CustomDataTableProps<T>) {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Sorting logic uses column's sortFunction if provided
  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const column = columns.find((c) => c.accessor === sortBy);

    if (!column) return data;

    const sortFn = column.sortFunction;

    if (sortFn) {
      return [...data].sort((a, b) => sortFn(a, b, sortDirection));
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === "asc" ? -1 : 1;
      if (bValue == null) return sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // fallback string comparison
      const aStr = String(aValue);
      const bStr = String(bValue);

      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortDirection, columns]);

  // Pagination slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  // Sort header click handler
  const handleSort = (accessor: keyof T) => {
    const column = columns.find((col) => col.accessor === accessor);
    if (!column || column.sortable === false) return; // 🚫 skip if not sortable

    if (sortBy === accessor) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(accessor);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Pagination buttons logic with ellipsis and centered current page
  const getPaginationButtons = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      // Show all pages if small number
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // More complex logic for large page counts
      if (currentPage <= 2 || currentPage >= totalPages - 1) {
        pages.push(1, 2, "…", totalPages - 1, totalPages);
      } else {
        pages.push(1, "…", currentPage, "…", totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            Show
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="p-1 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 rounded-md dark:bg-white/[0.03] dark:border-white/[0.05] ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            entries
          </label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="min-w-[141px] rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 placeholder:text-gray-400 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-white/90 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <div className="max-w-full overflow-x-auto">
          {data.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Data not found
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-white dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/[0.05]">
                <tr>
                  {columns.map((col) => {
                    const isSortable =
                      col.accessor !== undefined && col.sortable !== false;
                    const isSorted = sortBy === col.accessor;

                    return (
                      <th
                        key={String(col.accessor ?? col.title)}
                        onClick={() => isSortable && handleSort(col.accessor!)}
                        className={`p-3 font-bold text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize ${
                          isSortable ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <span className="flex items-center gap-0.5">
                          {col.title}
                          {isSortable &&
                            (isSorted ? (
                              sortDirection === "asc" ? (
                                <GoTriangleUp size={20} />
                              ) : (
                                <GoTriangleDown size={20} />
                              )
                            ) : (
                              <span className="inline-flex flex-col">
                                <GoTriangleUp size={16} className="-mb-1" />
                                <GoTriangleDown size={16} className="-mt-1" />
                              </span>
                            ))}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      highlightOnHover
                        ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                        : "cursor-default"
                    } ${
                      striped && rowIndex % 2 === 1
                        ? "bg-gray-100 dark:bg-white/[0.03]"
                        : ""
                    }`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-100"
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : String(row[col.accessor as keyof T] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-white/[0.05]">
          {/* Entries Info */}
          <div className="text-gray-500 text-theme-sm dark:text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, data.length)} of{" "}
            {data.length.toLocaleString()} entries
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 select-none">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`${
                currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
              } text-gray-500 dark:border-white/[0.05] dark:text-gray-400 p-2`}
            >
              Previous
            </button>

            {getPaginationButtons().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    currentPage === page ? "font-bold underline" : "font-normal"
                  } cursor-pointer text-gray-500 dark:border-white/[0.05] dark:text-gray-400 p-2`}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="select-none text-gray-500 dark:border-white/[0.05] dark:text-gray-400"
                >
                  {page}
                </span>
              ),
            )}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`${
                currentPage === totalPages || totalPages === 0
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } text-gray-500 dark:border-white/[0.05] dark:text-gray-400 p-2`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
