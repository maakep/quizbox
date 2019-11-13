import { MONITOR, SERVER } from "../../../common/events";
import { generateId } from "../../util/generate";
import { Question } from "../../../common/types";
import { rooms, addRoom } from "../../room";

const registerEventsForMonitor = (socket: SocketIO.Socket) => {
    socket.on(MONITOR.CREATE, (questions: Question[]) => {
        const id = generateId(rooms);
        addRoom(id, socket);
        socket.join(id);
        socket.emit(SERVER.GENERATE, id);
    });

}

export default registerEventsForMonitor;