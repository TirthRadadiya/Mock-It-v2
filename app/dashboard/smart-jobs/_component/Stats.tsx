"use client";

export default function StatsPanel() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/2 flex flex-col gap-6 p-4">
        {/* Part 1: Positive Skills */}
        <div className="bg-white dark:bg-muted border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-3 text-foreground">
            🎯 You're doing great in
          </h3>
          <div className="flex flex-wrap gap-3">
            {["React", "Next.js", "MongoDB"].map((tag) => (
              <span
                key={tag}
                className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm px-4 py-1.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Part 2: Resume Score */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
          <h3 className="text-sm uppercase tracking-wider font-medium opacity-80 text-center">
            Matching Score
          </h3>
          <div className="text-center text-6xl font-extrabold tracking-tight mt-2 drop-shadow-md">
            92<span className="text-3xl align-top">%</span>
          </div>
        </div>

        {/* Part 3: Improve Skills */}
        <div className="bg-white dark:bg-muted border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-3 text-foreground">
            📌 You can improve in
          </h3>
          <div className="flex flex-wrap gap-3">
            {["TypeScript", "Storybook", "Testing"].map((tag) => (
              <span
                key={tag}
                className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm px-4 py-1.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 bg-white dark:bg-muted border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 text-foreground">
          🧠 Recommended Tools & Tech for You
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Zod",
            "TailwindCSS",
            "Shadcn/ui",
            "TanStack Query",
            "Vite",
            "Cypress",
          ].map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm px-4 py-1.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// {/* Left Section */}
// <div className="w-full md:w-1/2 flex flex-col gap-4">
// {/* Top: Tags Block */}
// <div className="bg-muted rounded-2xl p-4 shadow-sm">
//   <h3 className="text-base font-semibold mb-2 text-foreground">
//     You're doing great in
//   </h3>
//   <div className="flex flex-wrap gap-2">
//     {["React", "Next.js", "MongoDB"].map((tag) => (
//       <span
//         key={tag}
//         className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
//       >
//         {tag}
//       </span>
//     ))}
//   </div>
// </div>

// {/* Middle: Score */}
// <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg text-center">
//   <h3 className="text-sm font-medium tracking-wide mb-2 opacity-90">
//     Resume Score
//   </h3>
//   <div className="text-5xl font-extrabold tracking-tight">92%</div>
// </div>

// {/* Bottom: Tags Block */}
// <div className="bg-muted rounded-2xl p-4 shadow-sm">
//   <h3 className="text-base font-semibold mb-2 text-foreground">
//     You can improve in
//   </h3>
//   <div className="flex flex-wrap gap-2">
//     {["TypeScript", "Storybook", "Testing"].map((tag) => (
//       <span
//         key={tag}
//         className="bg-destructive/10 text-destructive text-sm px-3 py-1 rounded-full"
//       >
//         {tag}
//       </span>
//     ))}
//   </div>
// </div>
// </div>
