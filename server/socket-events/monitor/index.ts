import { MONITOR } from "../../../common/socket-event-ids";
import { generateId } from "../../util/generate";
import { Question } from "../../../common/types";
import { rooms, addRoom } from "../../room";

const registerEventsForMonitor = (socket: SocketIO.Socket) => {
    const monitor = (id: keyof typeof MONITOR | string, payload: any) => {

    }

    socket.on(MONITOR.CREATE, (questions: Question[]) => {
        const id = generateId(rooms);
        addRoom(id);
    })

}

export default registerEventsForMonitor;