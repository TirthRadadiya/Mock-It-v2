// import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import Sidebar from "./_component/Sidebar";
// import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const [res1, res2] = await Promise.all([
    fetch(
      "http://127.0.0.1:8000/smart-jobs/d339b447e3dd444083d29bd3/smart_job/?page=1&limit=10"
    ),
    fetch(
      "http://127.0.0.1:8000/mock-interviews/ed9476e94787426d9c8167b1/mock_interview/?page=1&limit=10"
    ),
    // fetch('https://api.example.com/endpoint2'),
    // fetch('https://api.example.com/endpoint3'),
  ]);

  const [data1, data2] = await Promise.all([
    res1.json(),
    res2.json(),
    // res3.json(),
  ]);

  const isOnboarded = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  // if (!isOnboarded) {
  //  redirect("/onboarding");
  // }

  // const insights = await getIndustryInsights();

  return <Sidebar smartjobs={data1} mockInterview={data2} />;
}
