export type Question = {
    question: string,
    correct: number,
    incorrect: [string, string, string, string],
}

export type FrontendClient = {
    name: string;
    room: string;
};

export type Client = FrontendClient & {
    score: number;
    socket: SocketIO.Socket;
}