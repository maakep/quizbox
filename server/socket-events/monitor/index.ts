import { MONITOR, SERVER, CLIENT } from '../../../common/events';
import { Question, Client, Answer } from '../../../common/types';
import { rooms, answer, Room } from '../../room';
import * as fs from 'fs';

const registerEventsForMonitor = (socket: SocketIO.Socket) => {
  socket.on(MONITOR.JOIN, (roomId: string) => {
    socket.join(roomId);
    socket.emit(SERVER.ROOM, rooms[roomId]);
  });

  let timeout: NodeJS.Timeout = undefined;
  let i = 0;

  const nextQuestion = (room: Room) => {
    socket.to(room.id).emit(SERVER.NEW_QUESTION, room.questions[i]);
    clearTimeout(timeout);
    i++;

    timeout = setTimeout(() => {
      nextQuestion(room);
    }, 30 * 1000);
  };

  socket.on(MONITOR.START, (roomId: string) => {
    nextQuestion(rooms[roomId]);
  });

  socket.on(CLIENT.ANSWER, ({ client, answerId, roomId }: Answer) => {
    const room = rooms[roomId];
    const numOfQuestions = room.questions.length;
    const isFinalAnswer = answer(client, answerId);
    const isFinalQuestion = i === numOfQuestions;
    console.log(i);

    if (isFinalAnswer && isFinalQuestion) {
      console.log('Is final answer & final question');
      socket.to(room.id).emit(SERVER.DONE, room);
    } else if (isFinalAnswer) {
      console.log('Is final answer');
      nextQuestion(room);
    }
  });
};

export default registerEventsForMonitor;
