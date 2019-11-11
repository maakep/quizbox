import { MONITOR } from "../../../common/socket-event-ids";
import { Rooms, addRoom } from "../../server";
import { generateId } from "../../util/generate";
import { Question } from "../../../common/types";

const registerEventsForMonitor = (socket: SocketIO.Socket, rooms: Rooms) => {
    const monitor = (id: keyof typeof MONITOR | string, payload: any) => {

    }

    socket.on(MONITOR.CREATE, (questions: Question[]) => {
        const id = generateId(rooms);
        addRoom(id);
    })

}

export default registerEventsForMonitor;