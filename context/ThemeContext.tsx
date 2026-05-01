"use client";
import { createContext } from "react";
import { ThemeContextTypes } from "./types/ThemeContextType";

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export default ThemeContext;
