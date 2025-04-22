import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { number } from "zod";

const SingleRow = ({ title, data }: { title: string; data: any }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {data?.map((card: any) => (
          <Link href={`/dashboard/smart-jobs/${card?._id}`} key={card?._id}>
            <Card className="min-w-[350px] flex-shrink-0 shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between mb-5">
                    <span>{card?.jobTitle}</span>
                    <span>{card?.jobScore}%</span>
                  </div>
                  <span className="flex h-[50px]">{card?.jobDescription}</span>
                </CardTitle>
                {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
              </CardHeader>
              <CardContent
                className="px-5 flex justify-between
          "
              >
                <span>
                  Matched Skills: <br />{" "}
                  {card?.matchedSkills.map((skill: string) => (
                    <p key={skill}>{skill}</p>
                  ))}
                </span>
                <span>
                  Missing Skills: <br />{" "}
                  {card?.missingSkills.map((skill: string) => (
                    <p key={skill}>{skill}</p>
                  ))}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleRow;
