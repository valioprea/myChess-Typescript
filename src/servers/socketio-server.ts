import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameLogic } from "../components/GameLogic";
import { Position } from "../components/Position";



export class SocketIoServer {

    private socketServer: Server<DefaultEventsMap, DefaultEventsMap> ;

    constructor(expressServer: any){
        this.socketServer = new Server(expressServer);
        this.getEvents();
    }

    //These events are being fired when something happens on the front end.
    //Also, server responds with info through socket.emit
    private getEvents(){

        this.socketServer.on("connection", (socket) => {
            
            //A new connection has been made, a new gameLogic will be born
            let gameLogic: GameLogic = new GameLogic();
            gameLogic.initializeSquares();
            gameLogic.initializePieces();


            socket.on("eventStart", (data) => {
                console.log(data)


                // console.log(g.getAllSquares()[8][1].getPiece());

                // console.log("Pozitia este: ", new Position(3,4))

                // socket.emit("altu", "daniel");
                // socket.emit("altu", JSON.stringify(g.getAllSquares()[8][1].getPiece()));
            })


            socket.on("startGame", () => {
                console.log("game starts");
                
            })
            
        })
    }

    
}