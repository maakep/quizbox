import { Client } from "../common/types";

export type Room = {
    id: string,
    clients: Client[],
    socket: SocketIO.Socket,
}

export type Rooms = {
    [id: string]: Room;
};

export let rooms: Rooms = {};

export const addRoom = (id: string, socket: SocketIO.Socket) => {
    rooms = {
        ...rooms,
        [id]: {
            id: id,
            clients: [],
            socket: socket,
        }
    };
}
