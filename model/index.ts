export type Quiz = {
    id: number;
    title: string;
    document: Document;
    questions: Question[];
}

export type Document = {
    id: number;
    filePath: string;
    processed: boolean;
}

export type Question = {
    id: number;
    questionType: QuestionType;
    questionText: string;
    answers: string[];
    correctAnswer: string;
  };

  export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SHORT_ANSWER = "SHORT_ANSWER"
}