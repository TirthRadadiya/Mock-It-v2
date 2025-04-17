// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSocket } from "@/context/SocketProvider";
import { Menu} from "lucide-react";
import React, { useState } from "react";

const LeftSidebar = () => {
  const { setMenuOpen } = useSocket();
  return (
    // <div className="flex h-screen w-full overflow-hidden">
    <>
      {/* Sidebar */}
      {/* <div
        className={cn(
          "bg-gray-900 text-white p-4 space-y-6 transition-all duration-300 shadow-lg",
          "lg:block lg:w-1/6",
          menuOpen ? "block absolute w-3/5 h-full z-50" : "hidden"
        )}
      >
         Close Button for Mobile 
        <div className="lg:hidden flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
          >
            <X className="text-white" />
          </Button>
        </div>

        <nav className="space-y-3 mt-2">
          <div className="text-sm uppercase text-gray-400">Navigation</div>
          <ul className="space-y-2 font-medium list-none">
            <li className="hover:text-primary cursor-pointer p-3">
              <Link href="/dashboard" className="flex">
                <span className="mr-3">
                  <AppWindow className="text-white" />
                </span>
                Dashboard
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3">
              <Link href="/smart-jobs" className="flex">
                <span className="mr-3">
                  <NotebookPen className="text-white" />
                </span>
                Smart Jobs
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3">
              <Link href="/mock-interviews" className="flex">
                <span className="mr-3">
                  <Brain className="text-white" />
                </span>
                Mock Interviews
              </Link>
            </li>
            <li className="hover:text-primary cursor-pointer flex p-3">
              <Link href="/quizes" className="flex">
                <span className="mr-3">
                  <List className="text-white" />
                </span>
                Quizes
              </Link>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* Main content */}
      <div className="flex-1 w-full lg:w-4/6 flex flex-col max-h-screen overflow-y-scroll hide-scrollbar">
        {/* Hamburger */}
        <div className="lg:hidden p-4">
          <Button
            variant="outline"
            onClick={() => setMenuOpen((prev: any) => !prev)}
          >
            <Menu />
          </Button>
        </div>

        {/* Rows */}
        {[1, 2, 3, 4, 5, 6].map((row) => (
          <div key={row} className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Section {row}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
                <Card
                  key={card}
                  className="min-w-[200px] flex-shrink-0 shadow-md rounded-2xl"
                >
                  <CardContent className="p-4">Card {card}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftSidebar;
