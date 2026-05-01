"use client";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

export const useTheme = () => {
  const cntx = useContext(ThemeContext);
  return cntx;
};
