import * as React from 'react';
import * as Socket from 'socket.io-client';
import { CLIENT } from '../../common/socket-event-ids';
import { FrontendClient } from '../../common/types';

type Props = {
    name: string;
    room: string;
}

type Question = {
    title: string;
    question: string;
    rightAnswer: string;
    wrongAnswers: string[];
}

export default (props: Props) => {
    const socket = Socket();
    const { name, room } = props;
    const client: FrontendClient = {
        name,
        room,
    }
    socket.emit(CLIENT.JOIN, client);

    socket.on('message', (message: any) => {
        console.log(message);
    });

    return (
        <div>
            tmp
        </div>
    )
}