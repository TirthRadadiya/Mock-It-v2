// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSocket } from "@/context/SocketProvider";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import SingleRow from "./SingleRow";
import { SmartJobs } from "@/data/dashboad";

const LeftSidebar = ({ smartjobs, mockInterview }: any) => {
  return (
    <>
      {/* Main content */}
      <div className="flex-1 w-full flex flex-col overflow-y-scroll hide-scrollbar">
        {/* Rows */}
        <SingleRow title="Smart Jobs" data={smartjobs} scrollable />
        <SingleRow title="Mock Interviews" data={mockInterview} scrollable />
        <SingleRow title="Quizes" data={SmartJobs} scrollable />
      </div>
    </>
  );
};

export default LeftSidebar;
