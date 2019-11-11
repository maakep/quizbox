import { CLIENT, SERVER } from "../../../common/socket-event-ids";
import { Rooms } from "../../server";

const registerEventsForServer = (socket: SocketIO.Socket, rooms: Rooms) => {
    const server = (id: keyof typeof SERVER | string, payload: any) => {

    }
}

export default registerEventsForServer;