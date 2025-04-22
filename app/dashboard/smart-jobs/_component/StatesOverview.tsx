"use client";

import { Card, CardContent } from "@/components/ui/card";

type StatItem = {
  label: string;
  percentage: number;
};

const stats: StatItem[] = [
  { label: "Profile Completion", percentage: 76 },
  { label: "Mock Interviews", percentage: 45 },
  { label: "Quizzes Done", percentage: 89 },
  { label: "AI Calls", percentage: 34 },
  { label: "Tasks Completed", percentage: 68 },
  { label: "Referrals Sent", percentage: 52 },
];

export default function StatsOverview() {
  return (
    <div className="overflow-x-auto w-full px-4 hide-scrollbar">
      <div className="flex space-x-4 min-w-max py-4">
        {stats.map((stat, i) => (
          //   <Card
          //     key={i}
          //     className="min-w-[180px] flex-shrink-0 flex flex-col items-center justify-center py-6"
          //   >
          //     <CardContent className="flex flex-col items-center justify-center">
          <div
            key={i}
            className="min-w-[180px] flex-shrink-0 flex flex-col items-center justify-center py-6"
          >
            <CircularProgress percentage={stat.percentage} />
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold">{stat.percentage}%</p>
            </div>
          </div>
          //     </CardContent>
          //   </Card>
        ))}
      </div>
    </div>
  );
}

type CircularProgressProps = {
  percentage: number;
};

function CircularProgress({ percentage }: CircularProgressProps) {
  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#4f46e5"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm fill-primary"
      >
        {percentage}%
      </text>
    </svg>
  );
}
