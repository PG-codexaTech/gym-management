"use client";
import { ReactNode, Suspense } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import useSidebar from "@/hooks/useSidebar";
import AppSidebar from "./Appsidebar";
import Backdrop from "./Backdrop";

interface Props {
  children: ReactNode;
}

const LayoutContent: React.FC<Props> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar() ?? {};
  return (
    <>
      <div className="min-h-screen flex">
        <div>
          <AppSidebar />
          <Backdrop />
        </div>

        <div
          className={`flex-1 overflow-x-hidden transition-all duration-300 ease-in-out flex flex-col ${
            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
        >
          <AppHeader />

          <div className="flex-grow p-4 mx-auto w-full max-w-[--breakpoint-2xl] md:p-6">
            <Suspense>{children}</Suspense>
          </div>

          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default LayoutContent;
