import * as express from 'express';
import * as Http from 'http';
import * as path from 'path';
import * as SocketIO from 'socket.io';
import registerEventsForMonitor from './socket-events/monitor';
import registerEventsForClient from './socket-events/client';
import registerEventsForServer from './socket-events/server';

const port = process.env.port || 8084;
const root = { root: path.dirname("../") };

const app = express();
const server = Http.createServer(app);
const socket = SocketIO(server);


socket.on('connection', (socket) => {

    registerEventsForMonitor(socket);
    registerEventsForClient(socket)
    registerEventsForServer(socket);

    console.log("Socket connected!");
});

app.get('/', (req, res) => {
    res.sendFile('index.html', root)
});
app.get('/game/:room', (req, res) => {
    res.sendFile('index.html', root)
});
app.get('/monitor/(:room)?', (req, res) => {
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

** Create mock json for questions

** Monitor create game

** Client join the created room (registerEventsForMonitor)

Don't join same game multiple times, only rejoin.

Monitor start game & game loop

{
    Add UI for creating quiz (json)
    remove mocked questions & replace with user created quiz
}


*/