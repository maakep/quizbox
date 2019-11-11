import { CLIENT, SERVER } from "../../../common/socket-event-ids";

const registerEventsForServer = (socket: SocketIO.Socket) => {
    const server = (id: keyof typeof SERVER | string, payload: any) => {

    }
}

export default registerEventsForServer;