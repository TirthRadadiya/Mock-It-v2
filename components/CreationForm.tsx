"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useState, useEffect } from "react";

const formSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  experience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, "Experience cannot be negative"),
  interviewType: z.enum(["technical", "behavioral"]),
  technologies: z.string().optional(),
  jobDescription: z.string().min(1, "Job description is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateInterviewProps {
  submitUrl: string;
}

export default function CreateInterview({ submitUrl }: CreateInterviewProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      experience: 0,
      interviewType: "technical",
      technologies: "",
      jobDescription: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const interviewType = watch("interviewType");

  const isSmartJob = submitUrl.includes("/smart-jobs");

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted to:", submitUrl);
    console.log("Form data:", data);
    setIsSubmitted(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  };

  return (
    <div className="h-full w-full min-h-screen p-4">
      <h1 className="text-center pt-20 text-3xl font-semibold">
        {isSmartJob
          ? "AI-Powered Smart Job Report"
          : "Ace your Interview - Let's start Practice"}
      </h1>

      {isSubmitted ? (
        <div className="max-w-xl mx-auto mt-16 space-y-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {isSmartJob
              ? "Analyzing your job data..."
              : "Preparing your mock interview..."}
          </h2>

          <p className="text-gray-600">
            {isSmartJob
              ? "We are generating a detailed report based on your experience, job title, and description. This might take a moment."
              : "Your details have been received. We are generating questions based on your job title, experience, and selected type of interview. Please wait a moment."}
          </p>

          <ul className="text-left list-disc pl-6 text-gray-500 text-sm">
            {isSmartJob ? (
              <>
                <li>
                  You’ll receive insights tailored to your role and skills.
                </li>
                <li>Reports will help identify key improvement areas.</li>
                <li>Use this data to improve your interview success rate.</li>
              </>
            ) : (
              <>
                <li>Ensure your mic is working if it's a voice interview.</li>
                <li>Answer questions as naturally and clearly as possible.</li>
                <li>
                  Once you click the button, your mock interview will begin
                  immediately.
                </li>
              </>
            )}
          </ul>

          <Button disabled={!isReady}>
            {isReady
              ? isSmartJob
                ? "View Report"
                : "Start Interview"
              : isSmartJob
              ? "Generating Report..."
              : "Generating Interview..."}
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-md md:w-[350px] w-fit mx-auto mt-10"
        >
          <div>
            <Label className="mb-2">Job Title</Label>
            <Input {...register("jobTitle")} placeholder="Frontend Engineer" />
            {errors.jobTitle && (
              <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Years of Experience</Label>
            <Input
              type="number"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-sm text-red-500">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Interview Type</Label>
            <Controller
              control={control}
              name="interviewType"
              render={({ field }) => (
                <RadioGroup
                  defaultValue="technical"
                  onValueChange={field.onChange}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="technical" id="technical" />
                    <Label htmlFor="technical">Technical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="behavioral" id="behavioral" />
                    <Label htmlFor="behavioral">Behavioral</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.interviewType && (
              <p className="text-sm text-red-500">
                {errors.interviewType.message}
              </p>
            )}
          </div>

          {interviewType === "technical" && (
            <div>
              <Label className="mb-2">Technologies</Label>
              <Input
                {...register("technologies")}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
          )}

          <div>
            <Label className="mb-2">Job Description</Label>
            <Textarea
              {...register("jobDescription")}
              rows={4}
              placeholder="Describe the job..."
            />
            {errors.jobDescription && (
              <p className="text-sm text-red-500">
                {errors.jobDescription.message}
              </p>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
}
