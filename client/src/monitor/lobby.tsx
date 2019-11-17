import * as React from 'react';
import { Question } from '../../../common/types';
import * as Socket from 'socket.io-client';
import { MONITOR, SERVER } from '../../../common/events';
import { BrowserRouter, Route } from 'react-router-dom';
import { ROUTES } from '../routes';
import { getRoomIdFromUrl } from '../../../server/util/generate';
import { Room } from '../../../server/room';

type StateType = {
    id: string,
    room: Room,
}
export class Lobby extends React.PureComponent<{}, StateType> {
    socket: SocketIOClient.Socket;

    constructor(props: {}) {
        super(props);
        this.state = {
            id: getRoomIdFromUrl(),
            room: undefined,
        }

        this.socket = Socket();

        this.socket.on(SERVER.ROOM, (room: Room) => {
            console.log("ROOM UPDATE", room);
            this.setState({ room: room });
        });

        this.socket.emit(MONITOR.JOIN, this.state.id);
    }

    startGame = () => {
        this.socket.emit(MONITOR.START, this.state.id);
    }

    render = () => (
        <div>
            Lobby for {this.state.id}
            {this.state.room &&
                <>
                    <ul>
                        {this.state.room.clients.map((p) => <li key={p.id}>{p.name}</li>)}
                    </ul>
                    <button onClick={this.startGame}>Start game</button>
                </>
            }

        </div>
    );
}