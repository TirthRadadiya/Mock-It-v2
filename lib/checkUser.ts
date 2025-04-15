'use client'

// import { currentUser } from "@clerk/nextjs/server";
// // import { db } from "./prisma";

// export const checkUser = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return null;
//   }

//   try {
//     const res = await fetch("http://127.0.0.1:8000/users/get-by-email", {
//       method: "POST",
//       body: JSON.stringify({ email: user?.emailAddresses[0]?.emailAddress }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json()

//     return data;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

export const checkUser = async () => {
  // const user = await currentUser();
}