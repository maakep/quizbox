import { CLIENT, SERVER } from '../../../common/events';
import { Client } from '../../../common/types';
import { rooms, joinRoom, leaveRoom } from '../../room';

const registerEventsForClient = (socket: SocketIO.Socket) => {
  socket.on(CLIENT.JOIN, (client: Client) => {
    const c: Client = {
      name: client.name,
      room: client.room,
      score: client.score || 0,
      id: socket.id,
    };
    if (rooms[c.room] === undefined) {
      // wrong code
      return;
    }
    const existingUser = rooms[c.room].clients.find(u => u.id == c.id);

    if (existingUser === undefined) joinRoom(c);

    socket.join(c.room);
    socket.to(c.room).emit(SERVER.ROOM, rooms[c.room]);
  });

  socket.on('disconnect', () => {
    const room = leaveRoom(socket.id);
    if (room) {
      socket.to(room.id).emit(SERVER.ROOM, room);
    }
  });
};

export default registerEventsForClient;
