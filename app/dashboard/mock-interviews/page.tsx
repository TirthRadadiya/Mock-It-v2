import React from "react";
import { SmartJobs as jobs } from "@/data/dashboad";
import SingleScreen from "@/components/SingleScreen";

const MockInterviews = () => {
  return (
    <>
      <SingleScreen items={jobs} />
    </>
  );
};

export default MockInterviews;
