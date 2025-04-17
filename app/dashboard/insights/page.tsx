import React from "react";
import DashboardView from "../_component/dashboard-view";
import insights from "@/data/insights";

const Insights = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <DashboardView insights={insights} />
    </div>
  );
};

export default Insights;
