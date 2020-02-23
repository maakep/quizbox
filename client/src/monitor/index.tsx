import * as React from 'react';
import { useHistory } from 'react-router';
import { ROUTES, routeWithId } from '../routes';
import { Question } from '../../../common/types';

const mockQuestions: Question[] = [
  {
    question: 'Best food?',
    correct: 1,
    answers: ['Taco', 'Pizza', 'Meatball', 'Falafel'],
    clientAnswers: [],
  },
  {
    question: 'Best name?',
    correct: 3,
    answers: ['Fred', 'Freddie', 'Frederick', 'Fredrik'],
    clientAnswers: [],
  },
  {
    question: "What's the capital of Sweden?",
    correct: 0,
    answers: ['Stockholm', 'Tokholm', 'Stackenholm', 'Göttlabörg'],
    clientAnswers: [],
  },
  {
    question: 'What does garlic taste like?',
    correct: 1,
    answers: ['Cheese', 'Garlic', 'Red', 'Grass'],
    clientAnswers: [],
  },
  {
    question: 'When are you most likely to get a heart attack?',
    correct: 0,
    answers: ['Monday', 'Tuesday', 'Friday', 'Saturday'],
    clientAnswers: [],
  },
  {
    question: "What color was Napoleon's white horse?",
    correct: 3,
    answers: ['Transparent', 'Silver', 'Black', 'White'],
    clientAnswers: [],
  },
  {
    question: 'Finish the sentence: "Hello _____',
    correct: 0,
    answers: ['World', 'Hello', 'There', 'darkness my old friend'],
    clientAnswers: [],
  },
];

export const Create = React.memo(() => {
  const history = useHistory();
  fetch('/new-game', {
    method: 'POST',
    body: JSON.stringify(mockQuestions),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res =>
    res.json().then(res => {
      history.replace(routeWithId(ROUTES.MONITOR_GAME, res.room));
    })
  );

  // TODO: This screen. A transition could be neat
  return <>Spinner or transition or something</>;
});
