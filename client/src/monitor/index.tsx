import * as React from 'react';
import { useHistory } from 'react-router';
import { ROUTES, routeWithId } from '../routes';
import { Question } from '../../../common/types';


const mockQuestions: Question[] = [
    {
        question: 'Best food?',
        correct: 1,
        answers: ['Taco', 'Pizza', 'Meatball', 'Falafel'],
    }
];

export const Create = React.memo(() => {
    const history = useHistory();
    fetch('/new-game', {
        method: 'POST',
        body: JSON.stringify(mockQuestions),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()
        .then(res => {

            history.replace(routeWithId(ROUTES.MONITOR_GAME, res.room));
        })
    );

    // TODO: This screen. A transition could be neat
    return <>Spinner or transition or something</>
});