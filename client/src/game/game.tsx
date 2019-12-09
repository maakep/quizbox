import * as React from "react";
import * as Socket from "socket.io-client";
import { CLIENT, SERVER } from "../../../common/events";
import { Client, Question } from "../../../common/types";

type Props = {
  name: string;
  room: string;
};

type State = {
  hasAnswered: boolean;
  question: Question;
};

export default class extends React.PureComponent<Props, State> {
  socket: SocketIOClient.Socket;
  constructor(props: Props) {
    super(props);
    this.state = {
      question: undefined,
      hasAnswered: false
    };

    const { name, room } = props;
    const socket = Socket();
    this.socket = socket;

    const client: Client = {
      name,
      room
    };

    socket.emit(CLIENT.JOIN, client);

    socket.on(SERVER.NEW_QUESTION, (q: Question) => {
      this.setState({ question: q, hasAnswered: false });
    });

    socket.on(SERVER.DONE, () => {
      console.log("DONE, the game is over");
    });
  }

  answer = (num: number) => {
    if (this.state.question.correct == num) {
      console.log("Correct answer");
      this.socket.emit(CLIENT.ANSWER);
    }
  };

  render = () => {
    const { question, hasAnswered } = this.state;
    const { room } = this.props;

    return question ? (
      hasAnswered ? (
        <div>
          {question.question}
          <ul>
            {question.answers.map((q, i) => (
              <li onClick={() => this.answer(i)} key={q}>
                {q}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>You have joined the room: {room}. Waiting for game to start.</div>
      )
    ) : (
      ""
    );
  };
}
