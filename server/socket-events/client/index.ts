import { CLIENT, SERVER } from "../../../common/events";
import { Client, FrontendClient } from "../../../common/types";
import { rooms } from "../../room";

const registerEventsForClient = (socket: SocketIO.Socket) => {

    socket.on(CLIENT.JOIN, (client: FrontendClient) => {
        const c: Client = {
            name: client.name,
            room: client.room,
            score: 0,
            socket: socket,
        }
        if (rooms[client.room] === undefined) {
            // wrong code
            return;
        }
        const existingUser = rooms[client.room].clients.find(u => u.name == c.name);

        if (existingUser === undefined)
            rooms[client.room].clients.push(c);

        socket.join(client.room);
        socket.to(client.room).emit(SERVER.JOINED, c.name);
    });

    socket.on("disconnect", (s: SocketIO.Socket) => {
        socket.emit(SERVER.LEFT, s.id)
    });

}

export default registerEventsForClient