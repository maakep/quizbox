import * as React from 'react';
import { Question } from '../../../common/types';
import * as Socket from 'socket.io-client';
import { MONITOR, SERVER } from '../../../common/socket-event-ids';

export const Create = () => {

    const mockQuestions: Question[] = [
        {
            question: 'Best food?',
            correct: 1,
            incorrect: ['Taco', 'Pizza', 'Meatball', 'Falafel'],
        },
    ];

    const [id, setId] = React.useState<string>(undefined);

    const socket = Socket();
    socket.on(SERVER.GENERATE, (id: string) => {
        setId(id);
    });
    socket.emit(MONITOR.CREATE, mockQuestions);


    return (
        id ? (
            <div>
                {id}
            </div>
        ) : (
                <div>
                    Loading...
                </div>
            )
    );
}