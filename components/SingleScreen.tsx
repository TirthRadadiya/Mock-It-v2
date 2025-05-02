"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import SingleRow from "@/app/dashboard/_component/SingleRow";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

// type Item = {
//   id: number
//   title: string
//   description: string
// }

const ITEMS_PER_PAGE = 6;

export default function SingleScreen({ items = [] }: { items: any }) {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const path = usePathname();

  console.log(path);

  const createLink = path.includes("mock-interview")
    ? "/dashboard/mock-interviews/create-interview"
    : path.includes("smart-jobs")
    ? "/dashboard/smart-jobs/create-job"
    : "";

  const totalPages = Math.ceil(items?.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = items.slice(start, end);

  if (!items.length) return;

  return (
    <div className="space-y-6">
      <div className="w-[100%] text-right">
        <Button
          className="py-4 px-10 mr-10 text-right"
          onClick={() => router.push(createLink)}
        >
          Create
        </Button>
      </div>
      <div className="">
        <SingleRow data={currentItems} />
      </div>

      <Pagination>
        <PaginationContent className="list-none flex justify-center items-center gap-2 mt-2">
          <PaginationItem>
            <button
              className="rounded-full p-2 hover:bg-white/10 border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-200
            ${
              currentPage === page
                ? "bg-white text-black font-semibold shadow-inner"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
              >
                {page}
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <button
              className="rounded-full p-2 hover:bg-white/10 border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
