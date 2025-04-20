// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSocket } from "@/context/SocketProvider";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import SingleRow from "./SingleRow";
import { SmartJobs } from "@/data/dashboad";

const LeftSidebar = () => {
  const { setMenuOpen } = useSocket();
  return (
    <>
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
        <SingleRow title="Smart Jobs" data={SmartJobs}/>
        <SingleRow title="Mock Interviews" data={SmartJobs}/>
        <SingleRow title="Quizes" data={SmartJobs}/>
        {/* {[1, 2, 3, 4, 5, 6].map((row) => (
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
        ))} */}
      </div>
    </>
  );
};

export default LeftSidebar;
