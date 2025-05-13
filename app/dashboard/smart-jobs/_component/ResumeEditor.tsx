// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

// Load Markdown dynamically
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function ResumeEditor() {
  const [markdown, setMarkdown] = useState<string>(defaultResume);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const pdfEl = pdfRef.current;
    if (!pdfEl) return;

    // Switch to light mode before export
    pdfEl.classList.remove("bg-black", "text-white");
    pdfEl.classList.add("bg-white", "text-black");

    html2pdf()
      .set({
        margin: 0.5,
        filename: "Tirth_Resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(pdfEl)
      .save()
      .finally(() => {
        // Revert to dark mode after export
        pdfEl.classList.remove("bg-white", "text-black");
        pdfEl.classList.add("bg-black", "text-white");
      });
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4">
      {/* Markdown Editor */}
      <div className="w-full md:w-1/2 scrollbar-custom">
        <h3 className="text-lg font-semibold mb-2">Edit Resume (Markdown)</h3>
        <textarea
          className="w-full h-[600px] p-4 border rounded-md bg-background text-foreground resize-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>

      {/* Markdown Preview */}
      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Preview (Dark Mode)</h3>
        <div className="h-[600px] overflow-auto border rounded-md">
          <div
            ref={pdfRef}
            className="min-h-full bg-black text-white shadow p-8 prose prose-lg max-w-none"
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>

        <Button className="mt-4" onClick={handleDownload}>
          Download PDF
        </Button>
      </div>
    </div>
  );
}

const defaultResume = `# Tirth Radadiya

**Senior React Developer**  
TCS Gandhinagar, India  
[GitHub](https://github.com/TirthRadadiya) • [LinkedIn](https://linkedin.com/in/tirthradadiya) • tirth@example.com

---

## 🧠 Summary

Experienced React developer with a strong background in building performant, scalable, and accessible front-end systems. Currently managing and optimizing a portfolio of **149+ websites** at TCS, leading the migration from Vue to React.

---

## 🧰 Skills

- **Frontend**: React, Next.js, TypeScript, Tailwind, ShadCN, Redux, Zustand  
- **Backend**: Node.js, Express, Python (for AI/LLM backend)  
- **Databases**: MongoDB, Firebase  
- **Tools**: GitHub Actions, Figma, Postman, Vercel, Docker  
- **Soft Skills**: Team Leadership, Mentorship, Communication

---

## 🧑‍💼 Experience

### Lead React Developer — TCS Gandhinagar  
*Jan 2021 – Present*

- Led frontend development for 149+ enterprise websites
- Designed scalable React templates and migrated entire systems from Vue to React
- Created internal tools for performance testing and SEO optimization
- Mentored 5+ engineers and onboarded new devs to the React ecosystem

---

## 🚀 Projects

### Meta-Clone  
A full-featured Meta.com UI clone with dark mode, routing, and dynamic feeds.  
🔗 [github.com/TirthRadadiya/Meta-Clone](https://github.com/TirthRadadiya/Meta-Clone)

### AI Interview Platform (In Progress)  
AI-powered system for job seekers to take live mock interviews via voice or text, powered by Next.js and Python backend.  
Includes: Real-time STT, AI prompts, MongoDB user tracking.

---

## 📚 Education

**Bachelor of Engineering in Information Technology**  
Gujarat Technological University – 2020

---

## 🏆 Achievements

- Created 5+ npm packages and internal UI kits
- Top contributor in internal AI prototype initiative
- Delivered 98% SLA-compliant project deliveries

---

## 📞 Contact

📧 tirth@example.com  
🌐 [tirthradadiya.dev](https://tirthradadiya.dev)
`;
