import { MONITOR, SERVER } from "../../../common/events";
import { Question } from "../../../common/types";
import { rooms } from "../../room";

const registerEventsForMonitor = (socket: SocketIO.Socket) => {
    socket.on(MONITOR.JOIN, (roomId: string) => {
        socket.join(roomId);
        socket.emit(SERVER.ROOM, rooms[roomId]);
    });

}

export default registerEventsForMonitor;