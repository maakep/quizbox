import { Client } from "../common/types";

export type Room = {
    id: string,
    clients: Client[],
}

export type Rooms = {
    [id: string]: Room;
};

export let rooms: Rooms = {};

export const addRoom = (id: string) => {
    rooms = {
        ...rooms,
        [id]: {
            id: id,
            clients: [],
        }
    };
    console.log(rooms);
}