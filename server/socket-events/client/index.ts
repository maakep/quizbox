import { CLIENT } from "../../../common/socket-event-ids";
import { Client, FrontendClient } from "../../../common/types";
import { rooms } from "../../room";

const registerEventsForClient = (socket: SocketIO.Socket) => {
    const client = (id: keyof typeof CLIENT | string, payload: any) => {

    }

    socket.on(CLIENT.JOIN, (client: FrontendClient) => {
        const c: Client = {
            name: client.name,
            room: client.room,
            score: 0,
            socket: socket,
        }

        const existingUser = rooms[client.room].clients.find(u => u.name == c.name);

        if (existingUser === undefined)
            rooms[client.room].clients.push(c);

        socket.join(client.room);
    });

}

export default registerEventsForClient