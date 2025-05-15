export interface Quiz {
    id: number;
    title: string;
    createdAt: string;
    questionCount: number;
}

export const fetchRecentQuizzes = async (): Promise<Quiz[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        { id: 1, title: "JavaScript Basics", createdAt: "2025-04-15T10:30:00Z", questionCount: 10 },
        { id: 2, title: "Intro to AI", createdAt: "2025-05-20T14:45:00Z", questionCount: 8 },
    ];
};