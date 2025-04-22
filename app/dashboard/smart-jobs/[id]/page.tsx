"use client";

import React from "react";
import { useParams } from "next/navigation";
import StatsOverview from "../_component/StatesOverview";
import TextShowcase from "../_component/TextShowcase";
import ResumeEditor from "../_component/ResumeEditor";

const SingleSmartJob = () => {
  const params = useParams();

  return (
    <div className="flex flex-col">
      <StatsOverview />
      <TextShowcase />
      <TextShowcase />
      <ResumeEditor />
      <TextShowcase />
    </div>
  );
};

export default SingleSmartJob;
