import * as React from 'react';
import * as Socket from 'socket.io-client';
import { CLIENT } from '../../../common/events';
import { Client } from '../../../common/types';

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

    const client: Client = {
        name,
        room,
    }
    socket.emit(CLIENT.JOIN, client);

    return (
        <div>
            You have joined the room: {room}
        </div>
    )
}