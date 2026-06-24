"use client";
import { useCallback, useMemo, useState } from "react";

import { MdCurrencyRupee, MdVerifiedUser } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiGrid41 } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import useSidebar from "@/hooks/useSidebar";
type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <CiGrid41 />,
    name: "dashboard",
    path: "/",
  },
  {
    icon: <MdCurrencyRupee />,
    name: "profile",
    path: "/profile",
  },
  {
    icon: <MdVerifiedUser />,
    name: "member",
    path: "/member-management",
  },
  {
    icon: <MdCurrencyRupee />,
    name: "locations",
    subItems: [
      { name: "approved", path: "/locations/approved" },
      { name: "requests", path: "/locations/requests" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } =
    useSidebar() ?? {};
  const pathname = usePathname();

  const routeSubmenuIndex = useMemo(() => {
    const index = navItems.findIndex((nav) =>
      nav.subItems?.some((subItem) => pathname === subItem.path),
    );
    return index >= 0 ? index : null;
  }, [pathname]);

  const [submenuOverride, setSubmenuOverride] = useState<{
    pathname: string;
    index: number | null;
  } | null>(null);

  const openSubmenu =
    submenuOverride?.pathname === pathname
      ? submenuOverride.index
      : routeSubmenuIndex;

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const handleSubmenuToggle = (index: number) => {
    setSubmenuOverride((prev) => {
      const current =
        prev?.pathname === pathname ? prev.index : routeSubmenuIndex;
      return {
        pathname,
        index: current === index ? null : index,
      };
    });
  };

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <IoChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu === index ? "rotate-180 text-brand-500" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                openSubmenu === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <ul className="mt-2 space-y-1 ml-9 overflow-hidden">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered && setIsHovered(true)}
      onMouseLeave={() => setIsHovered && setIsHovered(false)}
    >
      <div
        className={`pt-4 pb-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      ></div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">{renderMenuItems(navItems)}</div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
