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

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string;
  aiExplanation: string;
};

const quizQuestions: QuizQuestion[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `${i + 1}`,
  question: `What does JSX stand for? [Q${i + 1}]`,
  options: [
    "JavaScript XML",
    "Java Syntax Extension",
    "JavaScript Syntax Extra",
    "Just Syntax Xperience",
  ],
  correctAnswer: "JavaScript XML",
  userAnswer: i % 2 === 0 ? "JavaScript XML" : "Java Syntax Extension",
  aiExplanation: `JSX stands for **JavaScript XML**.\n\nIt allows writing HTML-like syntax inside JavaScript files. Babel compiles it into \`React.createElement()\` calls internally.\n\nExample:\n\`\`\`jsx\nconst element = <h1>Hello JSX</h1>\n\`\`\``,
}));

export default function QuizFeedbackAccordion() {
  const [openItems, setOpenItems] = useState<string[]>(["1"]);
  const allOpen = openItems.length === quizQuestions.length;

  const toggleAll = () => {
    setOpenItems(allOpen ? [] : quizQuestions.map((q) => q.id));
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
        {quizQuestions.map((q) => {
          const isCorrect = q.userAnswer === q.correctAnswer;

          return (
            <AccordionItem
              value={q.id}
              key={q.id}
              className="rounded-xl border border-muted shadow-sm w-full"
            >
              <AccordionTrigger className="text-left text-base font-semibold p-4">
                {q.question}
              </AccordionTrigger>

              <AccordionContent className="space-y-4 px-4 pb-4 pt-2">
                <div className="space-y-2">
                  {q.options.map((option) => {
                    const isUserAnswer = option === q.userAnswer;
                    const isCorrectAnswer = option === q.correctAnswer;

                    const borderColor = clsx({
                      "border-green-600 bg-green-50 text-green-900":
                        isCorrectAnswer,
                      "border-red-600 bg-red-50 text-red-900":
                        isUserAnswer && !isCorrectAnswer,
                      "border-muted": !isUserAnswer && !isCorrectAnswer,
                    });

                    return (
                      <div
                        key={option}
                        className={clsx(
                          "rounded-lg p-3 border text-sm",
                          borderColor
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          <span className="text-xs text-muted-foreground">
                            {isUserAnswer &&
                              isCorrectAnswer &&
                              "✅ You (Correct)"}
                            {isUserAnswer && !isCorrectAnswer && "❌ You"}
                            {!isUserAnswer && isCorrectAnswer && "✅ Correct"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl p-4 border border-muted bg-muted/30 text-sm">
                  <p className="font-medium mb-1 text-muted-foreground">
                    AI explanation
                  </p>
                  <div className="prose prose-sm prose-neutral max-w-none">
                    <ReactMarkdown>{q.aiExplanation}</ReactMarkdown>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
