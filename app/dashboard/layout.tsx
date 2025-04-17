// @ts-nocheck
"use client";

import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppWindow, Brain, List, Menu, NotebookPen, X } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { useSocket } from "@/context/SocketProvider";

export default function Layout({ children }: any) {
  // const [menuOpen, setMenuOpen] = useState(false);
  const { menuOpen, setMenuOpen } = useSocket();
  return (
    <div className="px-5 mt-25 flex max-h-screen w-full">
      {/* <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title"></h1>
      </div> */}

      <div
        className={cn(
          "text-white p-4 pt-0 space-y-6 transition-all duration-300 shadow-lg",
          "lg:block lg:w-1/6",
          menuOpen ? "block absolute w-3/5 h-full z-50" : "hidden"
        )}
      >
        {/* Close Button for Mobile */}
        <div className="lg:hidden flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
          >
            <X className="text-white" />
          </Button>
        </div>

        <nav className="space-y-0">
          <div className="text-sm uppercase text-gray-400 mb-5">Navigation</div>
          <ul className="space-y-2 font-medium list-none">
            <li className="hover:text-primary cursor-pointer p-3 bg-gray-900 rounded-lg">
              <Link href="/dashboard" className="flex">
                <span className="mr-3">
                  <AppWindow className="text-white" />
                </span>
                Dashboard
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3 bg-gray-900 rounded-lg">
              <Link href="/dashboard/smart-jobs" className="flex">
                <span className="mr-3">
                  <NotebookPen className="text-white" />
                </span>
                Smart Jobs
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3 bg-gray-900 rounded-lg">
              <Link href="/dashboard/mock-interviews" className="flex">
                <span className="mr-3">
                  <Brain className="text-white" />
                </span>
                Mock Interviews
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3 bg-gray-900 rounded-lg">
              <Link href="/dashboard/quizes" className="flex">
                <span className="mr-3">
                  <List className="text-white" />
                </span>
                Quizes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
}
