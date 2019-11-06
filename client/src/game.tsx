import * as React from 'react';
import * as Socket from 'socket.io-client';

type Props = {
    name: string;
}

type Question = {
    title: string;
    question: string;
    rightAnswer: string;
    wrongAnswers: string[];
}

export default (props: Props) => {
    const socket = Socket();

    socket.on('message', (message: any) => {
        console.log(message);
    });

    return (
        <div>
            tmp
        </div>
    )
}