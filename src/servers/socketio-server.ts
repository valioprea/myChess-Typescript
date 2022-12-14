import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameLogic } from "../components/GameLogic";
import { Piece } from "../components/Piece";
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

        //Connected to the play page
        this.socketServer.on("connection", (socket) => {
            
            //A new connection has been made, a new gameLogic will be born.
            //Squares and pieces will be initialized in the game logic class
            let gameLogic: GameLogic = new GameLogic();
            gameLogic.initializeSquares();
            gameLogic.initializePieces();
            gameLogic.initializeGameMechanics();


            //The game starts, the front end board will be populated with the pieces
            socket.on("startGame", () => {
                console.log("Game Starts");           
                let allPieces: Piece[] = gameLogic.getKinematics().getAllPieces( gameLogic.getAllSquares());
                socket.emit( "drawPieces", JSON.stringify(allPieces) );
            })


            //A piece was selected on the front end
            socket.on("selectPiece", (frontEndPosition) => {
                let {rowPosition, colPosition} = JSON.parse(frontEndPosition);
                let initialPosition: Position = new Position(rowPosition,colPosition);
                
                gameLogic.grabPiece(initialPosition);
                socket.emit("validMoves", JSON.stringify( gameLogic.getMovesForThisPiece(gameLogic.getSelectedPiece()!, gameLogic.getAllSquares())) );
            })

            //A piece was placed on the front end, on a target square
            socket.on("placedPiece", (targetPosition) => {
                let {rowPosition, colPosition} = JSON.parse(targetPosition);
                gameLogic.placePiece(new Position(rowPosition,colPosition));
                
                let allPieces: Piece[] = gameLogic.getKinematics().getAllPieces( gameLogic.getAllSquares());
                socket.emit( "drawPieces", JSON.stringify(allPieces) );

                socket.emit("showWinner", JSON.stringify( gameLogic.getWinner() ));
            })

            socket.on("chosenPiece", (value) => {
                gameLogic.setChosenPiece(value as number);
            })

            //FOR DEVELOPMENT PURPOSES SANITY CHECK
            socket.on("sanityCheck", () => {
                gameLogic.sanityCheck();
            })
            
        })
    }

    
}