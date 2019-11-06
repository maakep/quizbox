import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './game';
import { useState } from 'react';

const Start = () => {
    const [isDone, setIsDone] = useState<boolean>(false);
    const [name, setName] = useState<string>(localStorage.getItem('previousName'));

    return (
        isDone
            ? <Game name={name} />
            : <input
                type="text"
                autoFocus
                value={name}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        localStorage.setItem('previousName', name)
                        setIsDone(true)
                    }
                }}
                onChange={e => setName(e.currentTarget.value)}
            />
    )
}


ReactDOM.render(
    <Start />,
    document.getElementById('root')
)