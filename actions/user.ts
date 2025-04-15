"use server";

import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import { generateAIInsights } from "./dashboard";
import { currentUser } from "@clerk/nextjs/server";

export async function updateUser(data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Start a transaction to handle both operations
    // revalidatePath("/");
    // return result.user;
  } catch (error: any) {
    console.error("Error updating user and industry:", error);
    throw new Error("Failed to update profile", error);
  }
}

export async function getUserOnboardingStatus() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/users/get-by-email", {
      method: "POST",
      body: JSON.stringify({ email: user?.emailAddresses[0]?.emailAddress }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data?.onboardingCompleted) return true;
    
    return false;
  } catch (error: any) {
    console.log(error.message);
  }
}
