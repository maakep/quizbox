import { MONITOR, SERVER } from "../../../common/events";
import { Question } from "../../../common/types";
import { rooms } from "../../room";

const registerEventsForMonitor = (socket: SocketIO.Socket) => {
    socket.on(MONITOR.JOIN, (roomId: string) => {
        socket.join(roomId);
        socket.emit(SERVER.ROOM, rooms[roomId]);
    });


    socket.on(MONITOR.START, (roomId: string) => {
        const room = rooms[roomId];
        const numOfQuestions = room.questions.length;
        let i = 0;

        const nextQuestion = () => {
            socket.to(roomId).emit(SERVER.NEW_QUESTION, room.questions[i]);
            i++;

            if (i == numOfQuestions) {
                socket.to(roomId).emit(SERVER.DONE);
            } else {
                setTimeout(() => {
                    nextQuestion();
                }, 30 * 1000)
            }
        }

        nextQuestion();
    });


}

export default registerEventsForMonitor;
