"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserQuizResults } from "@/model";
import QuizResultCard from "./quiz-results-card";

export default function RecentQuizResults({
  results,
  loading,
  error,
}: {
  results: UserQuizResults[];
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-8">
        To review your recent quiz results, you must be logged in!
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Recent Quiz Results</h2>
        {/* {results.length > 0 && (
          <Button variant="outline" asChild>
            <Link href="/quiz/results/all">View All</Link>
          </Button>
        )} */}
      </div>

      {results.length === 0 ? (
        <div className="bg-card rounded-lg border p-8 text-center">
          <p className="text-muted-foreground mb-4">
            You don't have any quiz results yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <QuizResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </>
  );
}
