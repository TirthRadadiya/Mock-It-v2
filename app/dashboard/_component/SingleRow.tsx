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

      <div
        className={`
          flex gap-4 pb-4 w-fit
          ${
            scrollable
              ? "overflow-x-auto flex-nowrap hide-scrollbar"
              : "flex-wrap"
          }
        `}
      >
        {data?.map((card: any) => (
          <Link href={`/dashboard/smart-jobs/${card?._id}`} key={card?._id}>
            <Card className="min-w-[350px] lg:w-100 max-w-sm h-[260px] flex-shrink-0 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white relative overflow-hidden transition-transform duration-300 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-purple-500/30 before:blur-xl before:opacity-0 hover:before:opacity-100">
              <CardHeader className="p-6 pb-3">
                <CardTitle>
                  <div className="flex justify-between items-center mb-3 text-lg font-semibold">
                    <span className="truncate max-w-[230px]">
                      {card?.jobTitle}
                    </span>
                    <span className="text-sm bg-white/80 text-black px-2 py-0.5 rounded-full">
                      {card?.jobScore}%
                    </span>
                  </div>
                  <p className="text-sm opacity-90 line-clamp-2 max-h-[50px]">
                    {card?.jobDescription}
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pt-2 pb-4 flex justify-between gap-4 text-sm">
                <div className="w-1/2">
                  <p className="font-semibold mb-1">Matched Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {card?.matchedSkills.map((skill: string) => (
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
                  <p className="font-semibold mb-1">Missing Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {card?.missingSkills.map((skill: string) => (
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
        ))}
      </div>
    </div>
  );
};

export default SingleRow;
