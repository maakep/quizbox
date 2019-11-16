export type Question = {
    question: string,
    correct: number,
    answers: [string, string, string, string],
}

export type Client = {
    name: string;
    room: string;
    score?: number;
    id?: string;
};
