"use client";
import { useTheme } from "@/hooks/useTheme";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeButton = () => {
  const themeContext = useTheme();
  const toggleTheme = themeContext?.toggleTheme ?? (() => {});

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      <MdOutlineLightMode className="hidden dark:block text-xl" />
      <MdOutlineDarkMode className="dark:hidden text-xl" />
    </button>
  );
};

export default ThemeButton;
