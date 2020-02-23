import * as React from 'react';
import * as Socket from 'socket.io-client';
import { CLIENT, SERVER } from '../../../common/events';
import { Client, Question, Results, Answer } from '../../../common/types';
import { sleep } from '../../../server/util/generate';

type Props = {
  name: string;
  room: string;
};

type State = {
  hasAnswered: boolean;
  previousAnswer: string;
  question: Question;
  countdown: number;
  showAnswer: boolean;
};

export default class extends React.PureComponent<Props, State> {
  socket: SocketIOClient.Socket;
  client: Client;

  constructor(props: Props) {
    super(props);
    this.state = {
      question: undefined,
      hasAnswered: false,
      previousAnswer: '-',
      countdown: 0,
      showAnswer: false,
    };

    const { name, room } = props;
    const socket = Socket();
    this.socket = socket;

    this.client = {
      name,
      room,
    };

    socket.emit(CLIENT.JOIN, this.client);

    socket.on(SERVER.NEW_QUESTION, async (q: Question) => {
      this.setState({ showAnswer: true, countdown: 5 });

      await sleep(5000);

      this.setState({
        question: q,
        hasAnswered: false,
        countdown: 25,
        previousAnswer: '-',
        showAnswer: false,
      });
    });

    socket.on(SERVER.DONE, (results: Results) => {
      console.log('No more questions :) Take me to result.tsx', results);
    });

    setInterval(() => {
      const prev = this.state.countdown;
      if (prev !== 0) this.setState({ countdown: prev - 1 });
    }, 1000);
  }

  answer = (num: number) => {
    this.setState({ hasAnswered: true, previousAnswer: this.state.question.answers[num] });
    const answer: Answer = { client: this.client, answerId: num, roomId: this.props.room };
    this.socket.emit(CLIENT.ANSWER, answer);

    if (this.state.question.correct == num) {
      console.log('Correct answer');
    }
  };

  render = () => {
    const { question, hasAnswered, previousAnswer, showAnswer, countdown } = this.state;
    const { room } = this.props;

    const AnswerRecorded = () => (
      <div>
        <div>Your answer has been recorded, please wait for the others to answer.</div>
        <div>{question.question}: </div>
        <div>{previousAnswer}</div>
      </div>
    );

    const WaitingForStart = () => (
      <div>You have joined the room: {room}. Waiting for game to start.</div>
    );

    const Question = () => (
      <div>
        <div>{countdown}</div>
        <br />
        {question.question}
        <ul>
          {question.answers.map((a, i) => (
            <li onClick={() => this.answer(i)} key={a}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    );

    const ShowAnswer = () => {
      if (!question) {
        return <div>Game starting soon... {countdown}</div>;
      }
      const clientWasCorrect = previousAnswer === question.answers[question.correct];
      return (
        <div style={{ color: clientWasCorrect ? 'green' : 'red' }}>
          Correct answer: {question.answers[question.correct]}
        </div>
      );
    };

    if (showAnswer) return ShowAnswer();
    if (!question) return WaitingForStart();
    if (hasAnswered) return AnswerRecorded();
    else return Question();
  };
}
