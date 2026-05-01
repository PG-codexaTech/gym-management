"use client";

import Link from "next/link";
import { memo } from "react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const ChevronIcon = memo(() => (
  <svg
    className="stroke-current"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

ChevronIcon.displayName = "ChevronIcon";

const PageBreadcrumb = memo(({ items }: BreadcrumbProps) => {
  const lastIndex = items.length - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {items[lastIndex]?.label}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5 text-sm">
              {item.to ? (
                <Link
                  href={item.to}
                  className="text-gray-500 dark:text-gray-400 hover:underline flex items-center gap-1.5"
                >
                  {item.label}
                  {index !== lastIndex && <ChevronIcon />}
                </Link>
              ) : (
                <span className="text-gray-800 dark:text-white/90 flex items-center gap-1.5">
                  {item.label}
                  {index !== lastIndex && <ChevronIcon />}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
});

PageBreadcrumb.displayName = "PageBreadcrumb";

export default PageBreadcrumb;
