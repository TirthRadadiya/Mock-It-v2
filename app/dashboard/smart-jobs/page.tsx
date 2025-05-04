import SingleScreen from "@/components/SingleScreen";
import React from "react";
import { SmartJobs as jobs } from "@/data/dashboad";

const SmartJobs = async () => {
  const res = await fetch(
    "http://127.0.0.1:8000/smart-jobs/d339b447e3dd444083d29bd3/smart_job/?page=1&limit=10"
  );
  const smartjobs = await res.json();

  return (
    <>
      <SingleScreen items={smartjobs} />
    </>
  );
};

export default SmartJobs;
