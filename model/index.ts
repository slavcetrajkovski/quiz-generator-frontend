export type Quiz = {
    id: number;
    title: string;
    document: Document;
}

export type Document = {
    id: number;
    filePath: string;
    processed: boolean;
}

export type Question = {
    question_id?: number;
    questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
    questionText: string;
    answers: string[];
    correctAnswer: string;
  };