"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

type Question = {
  id: string;
  question: string;
  explanation: string;
  aiExplanation: string;
  isCorrect: boolean;
};

const sampleQuestions: Question[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i + 1}`,
  question: `Sample Question ${i + 1}`,
  explanation:
    i % 2 === 0
      ? "This is a correct explanation by the user."
      : "This explanation is incorrect and misses some details.",
  aiExplanation:
    i % 2 === 0
      ? `✅ The concept is correct. Here's more detail:\n\n- Closures are created every time a function is created.\n- They allow referencing outer scope variables even after execution.\n\n\`function outer() { let x = 10; return () => x; }\``
      : `❌ This explanation is not quite right.\n\nYou should consider:\n- Event delegation **relies on bubbling**.\n- Only attach listeners where needed.\n\nExample:\n\`\`\`js\ndocument.body.addEventListener('click', (e) => {\n  if (e.target.matches('button')) {\n    console.log('Clicked a button')\n  }\n})\n\`\`\``,
  isCorrect: i % 2 === 0,
}));

export default function FeedbackAccordion() {
  const [openItems, setOpenItems] = useState<string[]>(["1"]);

  const allOpen = openItems.length === sampleQuestions.length;

  const toggleAll = () => {
    if (allOpen) {
      setOpenItems([]);
    } else {
      setOpenItems(sampleQuestions.map((q) => q.id));
    }
  };

  return (
    <div className="mx-auto space-y-6 p-4 md:p-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={toggleAll}>
          {allOpen ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-3 w-full"
      >
        {sampleQuestions.map((q) => (
          <AccordionItem
            value={q.id}
            key={q.id}
            className="rounded-xl border border-muted shadow-sm w-full"
          >
            <AccordionTrigger className="text-left text-base font-semibold p-4">
              {q.question}
            </AccordionTrigger>

            <AccordionContent className="space-y-4 px-4 pb-4 pt-2">
              <div
                className={clsx(
                  "rounded-xl p-4 border text-sm",
                  q.isCorrect
                    ? "border-green-500 bg-green-100/40"
                    : "border-red-500 bg-red-100/40"
                )}
              >
                <p className="font-medium mb-1 text-sm text-muted-foreground">
                  Your explanation
                </p>
                <p className="text-base">{q.explanation}</p>
              </div>

              <div className="rounded-xl p-4 border border-muted bg-muted/30 text-sm">
                <p className="font-medium mb-1 text-sm text-muted-foreground">
                  AI explanation
                </p>
                <div className="prose prose-sm prose-neutral max-w-none">
                  <ReactMarkdown>{q.aiExplanation}</ReactMarkdown>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
