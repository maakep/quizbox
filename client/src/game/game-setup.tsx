import * as React from 'react';
import Game from './game';
import { useState } from 'react';

export const ClientRoot = () => {
    const [isDone, setIsDone] = useState<boolean>(false);
    const [name, setName] = useState<string>(localStorage.getItem('previousName'));
    const room = window.location.pathname.split('/').pop();

    return (
        isDone
            ? <Game name={name} room={room} />
            : <>
                Joining room {room}
                <br />
                <input
                    type="text"
                    autoFocus
                    value={name}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            localStorage.setItem('previousName', name)
                            setIsDone(true)
                        }
                    }}
                    onChange={e => setName(e.currentTarget.value)}
                />
            </>
    )
}
