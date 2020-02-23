import { Client, Question } from '../common/types';

export type Room = {
  id: string;
  clients: Client[];
  questions: Question[];
};

export type Rooms = {
  [id: string]: Room;
};

export let rooms: Rooms = {};

export const addRoom = (id: string, questions: Question[]) => {
  rooms = {
    ...rooms,
    [id]: {
      id: id,
      clients: [],
      questions: questions,
    },
  };
};

export const joinRoom = (c: Client) => {
  rooms[c.room].clients.push(c);
};

export const leaveRoom = (sId: string): Room => {
  for (const room in rooms) {
    var found = rooms[room].clients.find(c => c.id === sId);

    if (found) {
      rooms[room].clients = rooms[room].clients.filter(c => c.id !== found.id);
      return rooms[room];
    }
  }
};

export const answer = (client: Client, answerId: number): boolean => {
  const room = rooms[client.room];
  const answersLength = room.questions[0].clientAnswers.push({
    client: client,
    answerId: answerId,
    roomId: client.room,
  });

  console.log('Answers length', answersLength);
  const answersLeft = room.clients.length - answersLength;
  console.log('Answers left', answersLeft);

  const isFinalAnswer = answersLeft === 0;
  return isFinalAnswer;
};
