"use client";
import { useState, useRef, useEffect } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  Path,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  setValue?: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
  register?: ReturnType<UseFormRegister<TFieldValues>>;
  errorMessage: string;
  value: string[]; // comes from Controller
  required?: boolean;
}
const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  errorMessage = "",
  required = false,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allOptionValues = options.map((opt) => opt.value);
  const isAllSelected = (value ?? []).length === allOptionValues?.length;

  const handleSelect = (optionValue: string) => {
    let newSelected: string[] = [];
    const currentValue = value ?? [];

    if (optionValue === "__all__") {
      newSelected =
        (value ?? []).length === options.length
          ? []
          : options.map((o) => o.value);
    } else {
      newSelected = currentValue.includes(optionValue)
        ? currentValue.filter((val) => val !== optionValue)
        : [...currentValue, optionValue];
    }

    onChange?.(newSelected); // Controller handles setting value and validation
  };

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const removeOption = (val: string) => {
    onChange?.(value.filter((v) => v !== val));
  };

  const selectedLabels = value?.map(
    (val) => options.find((opt) => opt.value === val)?.label || ""
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className={`relative ${isOpen ? "z-50" : "z-0"}`}>
        <div
          className="flex min-h-11 w-full cursor-pointer flex-wrap items-center rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-9 shadow-theme-xs dark:border-gray-700 dark:bg-gray-900"
          onClick={toggleDropdown}
        >
          {selectedLabels?.length > 0 ? (
            selectedLabels?.map((label, index) => (
              <div
                key={index}
                className="group mb-1 mr-1 flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
              >
                <span className="flex-initial max-w-full">{label}</span>
                <div
                  className="ml-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(value[index]);
                  }}
                >
                  ✕
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Select
            </span>
          )}

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-400 pointer-events-none">
            <svg
              className={`stroke-current transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {errorMessage && (
          <p className="mt-1.5 text-xs text-error-500">{errorMessage}</p>
        )}

        {isOpen && (
          <div
            className="absolute left-0 mt-1 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            style={{ zIndex: 9999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => handleSelect("__all__")}
              className={`cursor-pointer px-4 py-2 text-sm font-medium ${
                isAllSelected ? "bg-brand-100 dark:bg-brand-800/30" : ""
              } hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300`}
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 ${
                  value?.includes(option.value)
                    ? "bg-brand-100 dark:bg-brand-800/30"
                    : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
