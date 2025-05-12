"use client";

import React, { useEffect, useState } from "react";
import {
  generateQuestions,
  saveQuestions,
  fetchQuestions,
} from "@/service/question-service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, QuestionType } from "@/model";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface QuizQuestionsProps {
  quizId: number;
}

const QuizQuestions = ({ quizId }: QuizQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const existing = await fetchQuestions(quizId);
        setQuestions(existing);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setInitialLoad(false);
      }
    };

    loadQuestions();
  }, [quizId]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateQuestions(quizId);
      setQuestions(generated);
      setHasChanges(false);
      toast.success("Questions successfully generated");
    } catch (err) {
      toast.error("There was an error generating your questions");
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveQuestions(quizId, questions);
      setHasChanges(false);
      toast.success("Questions successfully updated");
      router.refresh();
    } catch (err) {
      toast.error("There was an error updating your questions");
      console.error("Saving failed", err);
    }
  };

  const handleChange = (qIdx: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    (updated[qIdx] as any)[field] = value;
    setQuestions(updated);
    setHasChanges(true);
  };

  const handleAnswerChange = (qIdx: number, aIdx: number, value: string) => {
    const updated = [...questions];
    updated[qIdx].answers[aIdx] = value;
    setQuestions(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {initialLoad ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">
            You currently haven't generated any questions for this quiz. Would
            you like to start?
          </p>
          <Button onClick={handleGenerate} disabled={loading} variant="blue">
            {loading ? "Generating..." : "Generate Questions"}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="border p-4 rounded-lg shadow-sm bg-white space-y-4"
              >
                <div>
                  <label className="block font-medium mb-1">
                    Question Text
                  </label>
                  <Textarea
                    value={q.questionText}
                    onChange={(e) =>
                      handleChange(qIdx, "questionText", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Question Type
                  </label>
                  <Select
                    value={q.questionType}
                    onValueChange={(val) =>
                      handleChange(qIdx, "questionType", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(QuestionType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type
                            .replace("_", " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {q.questionType === "MULTIPLE_CHOICE" && (
                  <>
                    <label className="block font-medium mb-2">Answers</label>
                    {q.answers.map((ans, aIdx) => (
                      <Input
                        key={aIdx}
                        value={ans}
                        onChange={(e) =>
                          handleAnswerChange(qIdx, aIdx, e.target.value)
                        }
                        className="mb-2"
                        placeholder={`Answer ${aIdx + 1}`}
                      />
                    ))}
                    <label className="block font-medium mb-1">
                      Correct Answer
                    </label>
                    <Input
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleChange(qIdx, "correctAnswer", e.target.value)
                      }
                      placeholder="Type the correct answer"
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleGenerate} variant="pink" disabled={loading}>
              {loading ? "Regenerating..." : "Regenerate Questions"}
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges} variant="blue">
              Save Changes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizQuestions;
