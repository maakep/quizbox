import { CLIENT } from "../../../common/socket-event-ids";
import { Rooms } from "../../server";
import { Client, FrontendClient } from "../../../common/types";

const registerEventsForClient = (socket: SocketIO.Socket, rooms: Rooms) => {
    const client = (id: keyof typeof CLIENT | string, payload: any) => {

    }

    socket.on(CLIENT.JOIN, (client: FrontendClient) => {
        const c: Client = {
            name: client.name,
            room: client.room,
            score: 0,
            socket: socket,
        }

        rooms[client.room].clients.push(c);
        socket.leave
        socket.join(client.room);
    });

}

export default registerEventsForClient