"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Question } from "@/model";

interface QuizQuestionsProps {
  quizId: number;
  filePath: string;
}

const QuizQuestions = ({ quizId, filePath }: QuizQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      try {
        const res = await axios.post("/api/quiz/generate-from-pdf", null, {
          params: { quizId, filePath },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to generate questions", err);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [quizId, filePath]);

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex] = value;
    setQuestions(updated);
  };

  if (loading) return <p>Generating questions...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Generated Questions</h2>
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="border rounded-lg p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">Question Text</label>
            <Textarea
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(qIdx, "questionText", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Question Type</label>
            <Select
              value={q.questionType}
              onValueChange={(val) =>
                handleQuestionChange(qIdx, "questionType", val)
              }
            >
              <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
              <SelectItem value="TRUE_FALSE">True/False</SelectItem>
              <SelectItem value="SHORT_ANSWER">Short Answer</SelectItem>
            </Select>
          </div>

          {q.questionType === "MULTIPLE_CHOICE" && (
            <div>
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
            </div>
          )}

          {q.questionType === "MULTIPLE_CHOICE" && (
            <div>
              <label className="block font-medium mb-1">Correct Answer</label>
              <Input
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIdx, "correctAnswer", e.target.value)
                }
                placeholder="Type the correct answer"
              />
            </div>
          )}
        </div>
      ))}
      <Button variant="blue" className="mt-4">
        Save All
      </Button>
    </div>
  );
};

export default QuizQuestions;
