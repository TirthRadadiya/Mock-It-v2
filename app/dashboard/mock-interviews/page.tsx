import React from "react";
import { SmartJobs as jobs } from "@/data/dashboad";
import SingleScreen from "@/components/SingleScreen";

const MockInterviews = async () => {
  const res = await fetch(
    "http://127.0.0.1:8000/mock-interviews/d4e33fb097bc4ef382a74d1e/mock_interview/?page=1&limit=9"
  );
  const mockInterviews = await res.json();

  return (
    <>
      <SingleScreen items={mockInterviews?.results} title="Mock Interviews" />
    </>
  );
};

export default MockInterviews;
