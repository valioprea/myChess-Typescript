import { ExpressServer } from './servers/express-server';
import { SocketIoServer } from './servers/socketio-server';


//3000 can be taken from .env file!
//nw dirname is src
const expressServer = new ExpressServer(3000, __dirname);

const socketServer = new SocketIoServer(expressServer.start());