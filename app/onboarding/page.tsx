import { redirect } from "next/navigation";
import {  techRoles } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  // Check if user is already onboarded
  const  isOnboarded  = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="mt-20">
      <OnboardingForm techRoles={techRoles} />
    </main>
  );
}
