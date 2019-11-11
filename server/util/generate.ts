import { Rooms } from "../room";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';

export const generateId = (occupied: Rooms): string => {
    let name = '';

    for (var i = 0; i < 4; i++)
        name += alphabet[(Math.floor(Math.random() * alphabet.length - 1))];

    if (occupied[name] !== undefined)
        return generateId(occupied);

    return name;
}