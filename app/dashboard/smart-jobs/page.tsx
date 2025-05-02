import SingleScreen from "@/components/SingleScreen";
import React from "react";
import { SmartJobs as jobs } from "@/data/dashboad";

const SmartJobs = () => {
  return (
    <>
      <SingleScreen items={jobs}/>
    </>
  );
};

export default SmartJobs;
