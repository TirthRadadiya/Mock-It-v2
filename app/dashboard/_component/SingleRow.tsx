// when user has created interview but has not taken interview, that case needs to be handled.

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const SingleRow = ({
  title = "",
  data,
  scrollable = false,
}: {
  title?: string;
  data: any;
  scrollable?: boolean;
}) => {
  return (
    <div className="p-4 space-y-4">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}

      <div className="relative">
        <div
          className={`
            flex gap-4 pb-4
            ${
              scrollable
                ? "overflow-x-auto flex-nowrap hide-scrollbar"
                : "flex-wrap"
            }
          `}
          style={{ maxWidth: "100%" }}
        >
          {data?.map((card: any) => {
            let link =
              title === "Smart Jobs"
                ? "/dashboard/smart-jobs/"
                : title === "Mock Interviews"
                ? "/dashboard/mock-interviews/"
                : "/dashboard/quizes/";
            if (title !== "Smart Jobs" && card?.feedback !== null) {
              link = link + card?._id + "/feedback";
            } else link = link + card?._id;

            return (
              <Link href={link} key={card?._id}>
                <Card className="min-w-[350px] lg:w-100 max-w-sm h-[260px] flex-shrink-0 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white relative overflow-hidden transition-transform duration-300 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-purple-500/30 before:blur-xl before:opacity-0 hover:before:opacity-100">
                  <CardHeader className="p-6 pb-3">
                    <CardTitle>
                      <div className="flex justify-between items-center mb-3 text-lg font-semibold">
                        <span className="truncate max-w-[230px]">
                          {title === "Smart Jobs"
                            ? card?.jobTitle
                            : title === "Mock Interviews"
                            ? card?.interviewType
                            : "Quiz Score"}
                        </span>
                        <span className="text-sm bg-white/80 text-black px-2 py-0.5 rounded-full">
                          {title === "Smart Jobs"
                            ? card?.jobScore
                            : title === "Mock Interviews"
                            ? card?.feedback?.overallScore
                            : "Quiz Score"}
                          %
                        </span>
                      </div>
                      {title !== "Quizes" && (
                        <p className="text-sm opacity-90 line-clamp-2 max-h-[50px]">
                          {title === "Smart Jobs"
                            ? card?.jobDescription
                            : card?.feedback?.suggestions
                                .join(", ")
                                .slice(0, 100) + " ..."}
                        </p>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pt-2 pb-4 flex justify-between gap-4 text-sm">
                    <div className="w-1/2">
                      <p className="font-semibold mb-1">
                        {title === "Smart Jobs"
                          ? "Matched Skills"
                          : title === "Mock Interviews"
                          ? "Strengths"
                          : "Matched Skills"}
                        :
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {title === "Smart Jobs"
                          ? card?.matchedSkills?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-green-400 bg-green-500/10 text-green-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))
                          : title === "Mock Interviews"
                          ? card?.feedback?.strengths?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-green-400 bg-green-500/10 text-green-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))
                          : card?.matchedSkills?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-green-400 bg-green-500/10 text-green-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <p className="font-semibold mb-1">
                        {title === "Smart Jobs"
                          ? "Missing Skills"
                          : title === "Mock Interviews"
                          ? "Weaknesses"
                          : "Missing Skills"}
                        :
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {title === "Smart Jobs"
                          ? card?.missingSkills?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-red-400 bg-red-500/10 text-red-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))
                          : title === "Mock Interviews"
                          ? card?.feedback?.weaknesses?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-red-400 bg-red-500/10 text-red-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))
                          : card?.missingSkills?.map((skill: string) => (
                              <span
                                key={skill}
                                className="border border-red-400 bg-red-500/10 text-red-200 px-2 py-0.5 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleRow;
