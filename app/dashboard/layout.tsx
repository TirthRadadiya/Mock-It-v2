"use client";

import { useState, Suspense, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AppWindow,
  NotebookPen,
  Brain,
  List,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { usePathname } from "next/navigation";

export default function Layout({ children }: any) {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const showLabels = expandSidebar || isLargeScreen;

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <AppWindow size={20} /> },
    {
      label: "Smart Jobs",
      href: "/dashboard/smart-jobs",
      icon: <NotebookPen size={20} />,
    },
    {
      label: "Mock Interviews",
      href: "/dashboard/mock-interviews",
      icon: <Brain size={20} />,
    },
    { label: "Quizzes", href: "/dashboard/quizes", icon: <List size={20} /> },
  ];

  return (
    <div className="flex h-screen md:h-[92vh] w-full bg-black text-white overflow-hidden mt-15 relative">
      {/* Sidebar */}
      <div
        className={cn(
          "max-h-screen text-white pt-10",
          "transition-all duration-300 ease-in-out",
          "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 shadow-xl",
          showLabels ? "w-56" : "w-16"
        )}
      >
        {/* Mobile Toggle Button */}
        {!isLargeScreen && (
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpandSidebar(!expandSidebar)}
            >
              {expandSidebar ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4 space-y-3 px-2">
          {navItems.map(({ label, href, icon }) => {
            const isActive = pathname === href;

            return (
              <Link key={label} href={href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg my-5 cursor-pointer transition-all",
                    "bg-gradient-to-r from-[#7F5FFF] to-[#A85FFF]",
                    isActive ? "border-2 border-white" : "border-none",
                    {
                      "text-white": isActive,
                      "text-zinc-200": !isActive,
                      "justify-center": !showLabels,
                      "justify-start": showLabels,
                    }
                  )}
                >
                  <span
                    className="text-lg text-zinc-200"
                  >
                    {icon}
                  </span>
                  {showLabels && (
                    <span
                      className="text-lg text-zinc-200"
                    >
                      {label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {showLabels && (
          <div className="absolute bottom-4 left-4 text-xs text-gray-400">
            © 2025 SensAi
          </div>
        )}
      </div>

      {/* Main Content */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        <div className="flex-1 overflow-y-auto px-4 pt-4 hide-scrollbar">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
