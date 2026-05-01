"use client";
import SidebarContext from "@/context/SidebarContext";
import { useContext } from "react";

const useSidebar = () => {
  const sidebarContext = useContext(SidebarContext);
  return sidebarContext;
};

export default useSidebar;
