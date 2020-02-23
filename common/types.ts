export type Answer = {
  client: Client;
  answerId: number;
  roomId: string;
};

export type Question = {
  question: string;
  correct: number;
  answers: [string, string, string, string];
  clientAnswers?: Answer[];
};

export type Client = {
  name: string;
  room: string;
  score?: number;
  id?: string;
};

export type Results = {
  Scores: { client: Client; points: number }[];
};
