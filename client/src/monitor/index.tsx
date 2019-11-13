import * as React from 'react';
import { Question } from '../../../common/types';
import * as Socket from 'socket.io-client';
import { MONITOR, SERVER } from '../../../common/events';


const mockQuestions: Question[] = [
    {
        question: 'Best food?',
        correct: 1,
        incorrect: ['Taco', 'Pizza', 'Meatball', 'Falafel'],
    }
];

type StateType = {
    players: string[],
    id: string,
}
export class Create extends React.PureComponent<{}, StateType> {
    socket: SocketIOClient.Socket;


    constructor(props: {}) {
        super(props);

        this.state = {
            players: [],
            id: undefined,
        }

        this.socket = Socket();

        this.socket.on(SERVER.GENERATE, (id: string) => {
            this.setState({ id });
        });

        this.socket.on(SERVER.JOINED, (name: string) => {
            this.setState({ players: [...this.state.players, name] });
        });

        this.socket.emit(MONITOR.CREATE, mockQuestions);
    }

    render = () => (
        this.state.id ? (
            <div>
                {this.state.id}
                <ul>
                    {this.state.players.map((p) => <li key={p}>{p}</li>)}
                </ul>
            </div>
        ) : (
                <div>
                    Loading...
                </div>
            )
    );
}