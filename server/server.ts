import * as express from 'express';
import * as Http from 'http';
import * as path from 'path';
import * as SocketIO from 'socket.io';

const port = process.env.port || 8084;
const root = { root: path.dirname("../") };

const app = express();
const server = Http.createServer(app);
const socket = SocketIO(server);

socket.on('connection', (socket) => {
    console.log("Socket connected!");
});

app.get('/', (req, res) => {
    res.sendFile('index.html', root)
});

app.get('/*.js', (req, res) => {
    res.sendFile(req.url, root);
});


server.listen(port, () => {
    console.log(`Listening to *:${port}`);
});