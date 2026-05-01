"use client";
import { TileProps } from "./types";
import { useState } from "react";
import { MdOutlineGroup } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";

const Tile: React.FC<TileProps> = ({
  title = "",
  value = "",
  available = "",
  limit = "",
  link = "",
  icon = <MdOutlineGroup className="text-gray-800 size-6 dark:text-white/90" />,
  borderColor = "border-brand-200",
  borderLeftColor = "",
}) => {
  const [copyStatus, setCopyStatus] = useState<string>("");

  const handleCopyClick = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatus("Failed to copy!");
    }
  };

  return (
    <div
      className={`flex justify-between rounded-2xl border ${borderColor} ${borderLeftColor ? `border-l-4 border-l-${borderLeftColor}` : ""
        } bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6`}
    >
      <div className="flex items-start justify-between ">
        <div>
          <span className="text-md text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-semibold text-gray-800 text-xl dark:text-white/90">
            {available && limit ? (
              <>
                <span className="block text-sm">
                  {available}
                </span>
                <span className="block text-sm">
                  {limit}
                </span>
              </>
            ) : link ? (
              <span className="text-lg font-normal flex items-center gap-1">
                {link}
                <IoCopyOutline
                  onClick={() => handleCopyClick(link)}
                  className="cursor-pointer active:scale-110"
                />
                {copyStatus && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {copyStatus}
                  </p>
                )}
              </span>
            ) : (
              value
            )}
          </h4>
        </div>
      </div>
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {icon}
        </div>
      )}
    </div>
  );
};
export default Tile;
