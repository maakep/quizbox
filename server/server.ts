import * as express from "express";
import * as Http from "http";
import * as path from "path";
import * as SocketIO from "socket.io";
import registerEventsForMonitor from "./socket-events/monitor";
import registerEventsForClient from "./socket-events/client";
import { Question } from "../common/types";
import { addRoom, rooms } from "./room";
import { generateId } from "./util/generate";

const port = process.env.port || 8084;
const root = { root: path.dirname("../") };

const app = express();
app.use(express.json());
const server = Http.createServer(app);
const socketServer = SocketIO(server);

socketServer.on("connection", socket => {
  registerEventsForMonitor(socket);
  registerEventsForClient(socket);

  console.log("Socket connected!");
});

app.get("/", (req, res) => {
  res.sendFile("index.html", root);
});

app.get("/game/:room", (req, res) => {
  if (rooms[req.params.room] === undefined) {
    res.sendStatus(404);
  } else {
    res.sendFile("index.html", root);
  }
});
app.get("/monitor/:room", (req, res) => {
  if (rooms[req.params.room] === undefined) {
    res.sendStatus(404);
  } else {
    res.sendFile("index.html", root);
  }
});

app.get("/*.js", (req, res) => {
  res.sendFile(req.url, root);
});

app.post("/new-game", (req, res) => {
  const questions: Question[] = req.body;
  const id = generateId();
  addRoom(id, questions);

  res.status(200).send({ room: id });
});

server.listen(port, () => {
  console.log(`Listening to *:${port}`);
});

/*

TODO:

Monitor start game & game loop

{
    Add UI for creating quiz (json)
    remove mocked questions & replace with user created quiz
}


*/
