// import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  // const resume = await getResume();

  const resume: any = {}

  return (
    <div className="container mx-auto p-6 mt-15">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
