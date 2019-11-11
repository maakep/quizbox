import * as express from 'express';
import * as Http from 'http';
import * as path from 'path';
import * as SocketIO from 'socket.io';
import { CLIENT, SERVER, MONITOR } from '../common/socket-event-ids'
import registerEventsForMonitor from './socket-events/monitor';
import registerEventsForClient from './socket-events/client';
import registerEventsForServer from './socket-events/server';
import { FrontendClient, Client } from '../common/types';

const port = process.env.port || 8084;
const root = { root: path.dirname("../") };

const app = express();
const server = Http.createServer(app);
const socket = SocketIO(server);

export type Room = {
    id: string,
    clients: Client[],
}

export type Rooms = {
    [id: string]: Room;
};


let rooms: Rooms = {};

export const addRoom = (id: string) => {
    rooms = {
        ...rooms,
        [id]: {
            id: id,
            clients: [],
        }
    };
}

socket.on('connection', (socket) => {

    registerEventsForMonitor(socket, rooms);
    registerEventsForClient(socket, rooms)
    registerEventsForServer(socket, rooms);

    console.log("Socket connected!");
});

app.get('/:room', (req, res) => {
    res.sendFile('index.html', root)
});

app.get('/*.js', (req, res) => {
    res.sendFile(req.url, root);
});


server.listen(port, () => {
    console.log(`Listening to *:${port}`);
});

/*

TODO:

Create mock json for questions

Monitor create game

** Client join the created room (registerEventsForMonitor)

Monitor start game & game loop

{
    Add UI for creating quiz (json)
    remove mocked questions & replace with user created quiz
}


*/