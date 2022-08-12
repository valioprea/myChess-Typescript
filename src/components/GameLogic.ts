import { Bishop } from "./individualPieces/Bishop";
import { King } from "./individualPieces/King";
import { Knight } from "./individualPieces/Knight";
import { Pawn } from "./individualPieces/Pawn";
import { Queen } from "./individualPieces/Queen";
import { Rook } from "./individualPieces/Rook";
import { Kinematics } from "./Kinematics";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { Square } from "./Square";
const _ = require('lodash');

export class GameLogic{

    public kinematics: Kinematics = new Kinematics();
    public allSquares: Square[][] = new Array();
    public selectedPiece: Piece | null = null; //not sure about the ? thing.
    public gameTurn: String | null = null;

    public getSelectedPiece(): Piece | null{
        return this.selectedPiece;
    }

    public setGameTurn(gameTurn: String){
        this.gameTurn = gameTurn;
    }

    public getGameTurn(): String {
        return this.gameTurn!;
    }

    //This function generates the whole board made out of Square objects
    public initializeSquares(){
        for( let i=1; i<=8; i++){
            this.allSquares[i] = [];
            for( let j=1; j<=8; j++){
                // console.log("vali");
                this.allSquares[i][j] = new Square(new Position(i,j));
            }
        }
    }

    //This function returns all squares with or without pieces on them
    public getAllSquares(): Square[][] {
        return this.allSquares;
    }

    //This function will initialize pieces on start position
    public initializePieces() {
        //white pieces
        this.allSquares[8][1].setPiece(new Rook("rook", true, "white", new Position(8,1)));
        this.allSquares[8][8].setPiece(new Rook("rook", true, "white", new Position(8,8)));
        this.allSquares[8][2].setPiece(new Knight("knight", true, "white", new Position(8,2)));
        this.allSquares[8][7].setPiece(new Knight("knight", true, "white", new Position(8,7)));
        this.allSquares[8][3].setPiece(new Bishop("bishop", true, "white", new Position(8,3)));
        this.allSquares[8][6].setPiece(new Bishop("bishop", true, "white", new Position(8,6)));
        this.allSquares[8][4].setPiece(new Queen("queen", true, "white", new Position(8,4)));
        this.allSquares[8][5].setPiece(new King("king", true, "white", new Position(8,5)));
        for(let i=1; i<=8; i++){
            this.allSquares[7][i].setPiece(new Pawn("pawn", true, "white", new Position(7,i)));
        }

        

        //black pieces
        this.allSquares[1][1].setPiece(new Rook("rook", false, "black", new Position(1,1)));
        this.allSquares[1][8].setPiece(new Rook("rook", false, "black", new Position(1,8)));
        this.allSquares[1][2].setPiece(new Knight("knight", false, "black", new Position(1,2)));
        this.allSquares[1][7].setPiece(new Knight("knight", false, "black", new Position(1,7)));
        this.allSquares[1][3].setPiece(new Bishop("bishop", false, "black", new Position(1,3)));
        this.allSquares[1][6].setPiece(new Bishop("bishop", false, "black", new Position(1,6)));
        this.allSquares[1][4].setPiece(new Queen("queen", false, "black", new Position(1,4)));
        this.allSquares[1][5].setPiece(new King("king", false, "black", new Position(1,5)));
        for(let i=1; i<=8; i++){
            this.allSquares[2][i].setPiece(new Pawn("pawn", false, "black", new Position(2,i)));
        }
    }

    //This function should deal with game turn
    //In the future: FEN / notations / timer / score ?
    public initializeGameMechanics() {
        this.setGameTurn("white");
    }

    
    //Function that will return all pieces from the board, at a given point in time
    public getAllPieces(currentConfiguration: Square[][]): Piece[]{
        let allPieces: Piece[] = new Array();
        for(let i = 1; i<=8; i++){
            for(let j = 1; j<=8; j++){
                //Does this square contain a piece ?
                if (  currentConfiguration[i][j].getPiece() != null){
                    //Attach that piece to this list:
                    allPieces.push(currentConfiguration[i][j].getPiece()!);
                
                }
            }
        }
        return allPieces;
    }


    public grabPiece(position: Position){
        console.log("GAMELOGIC -> grabPiece -> position from FE: ", position)
        console.log("GAMELOGIC -> grabPiece -> square at position from FE: ",this.allSquares[position.getRowPosition()][position.getColPosition()])
        this.selectedPiece = this.allSquares[position.getRowPosition()][position.getColPosition()].getPiece()!;
        console.log("GAMELOGIC: this is the position at which I selected the piece: ",this.selectedPiece?.getPiecePosition());
        console.log("GAMELOGIC: this is the selected piece: ",this.selectedPiece);
    }

    public ungrabPiece() {
        this.selectedPiece = null;
    }

    public finishTurn() {
        //Who did finish the turn ?
        if( this.selectedPiece!.getColor() == "white" ){
            //white finished the turn
            //deactivate white pieces + activate black pieces
            for(let piece of this.kinematics.getAllPiecesOfThisColor("white", this.getAllSquares()) ){
                piece.setCanBeMoved(false);
            }
            for(let piece of this.kinematics.getAllPiecesOfThisColor("black", this.getAllSquares()) ){
                piece.setCanBeMoved(true);
            }
            this.setGameTurn("black"); //-> black is next
            console.log("Black moves now ->");
        } else {
            //black finished the turn
            //deactivate black pieces + activate white pieces
            for(let piece of this.kinematics.getAllPiecesOfThisColor("black", this.getAllSquares()) ){
                piece.setCanBeMoved(false);
            }
            for(let piece of this.kinematics.getAllPiecesOfThisColor("white", this.getAllSquares()) ){
                piece.setCanBeMoved(true);
            }
            this.setGameTurn("white"); //-> white is next
            console.log("White moves now ->");
        }
        this.ungrabPiece();
    }

    // Function that places piece x on position y
    public placePiece(targetPosition: Position) {
        
        //Here i don't need to ask myself if I am hovering over a friendly piece since I am setting event triggers on valid squares only.

        //Eliminate selected piece from previous square
        this.allSquares[this.selectedPiece!.getPiecePosition().getRowPosition()][this.selectedPiece!.getPiecePosition().getColPosition()].eliminatePiece(this.selectedPiece!);

        //If there is a foe on target square, eliminate the foe!
        if(this.allSquares[targetPosition.getRowPosition()][targetPosition.getColPosition()].getPiece() !== null ){
            this.allSquares[targetPosition.getRowPosition()][targetPosition.getColPosition()]
            .eliminatePiece(this.allSquares[targetPosition.getRowPosition()][targetPosition.getColPosition()].getPiece()!);
        }

        //Assign selected piece to new square
        this.getAllSquares()[targetPosition.getRowPosition()][targetPosition.getColPosition()].setPiece(this.selectedPiece!);

        //Assign new coordinates for the recently placed piece
        this.selectedPiece!.setPiecePosition(new Position(targetPosition.getRowPosition(), targetPosition.getColPosition()));

        //Was that piece a pawn?
        if (this.selectedPiece!.getName() === "pawn"){
            let currentPawn: Pawn | null = this.selectedPiece as Pawn;
            currentPawn.hasMoved(); //->that pawn has moved.
            currentPawn = null;
        } else if (this.selectedPiece!.getName() === "king") {
            let currentKing: King | null = this.selectedPiece as King;
            currentKing.hasMoved();
            currentKing = null;
        } else if (this.selectedPiece!.getName() === "rook") {
            let currentRook: Rook | null = this.selectedPiece as Rook;
            currentRook.hasMoved();
            currentRook = null;
        }

        this.finishTurn();
    }

    
    public getMovesForThisPiece(currentPiece: Piece, currentConfiguration: Square[][]){

        let kinematicMoves: Position[] = new Array();
        let results: Position[] = new Array();

        if (currentPiece.getName() === "rook"){
            
            kinematicMoves = this.kinematics.getRookPositions(currentPiece,currentConfiguration);
            
        } else if (currentPiece.getName() === "knight") {
            
            kinematicMoves = this.kinematics.getKnightPositions(currentPiece,currentConfiguration);
            
        } else if (currentPiece.getName() === "bishop") {
            
            kinematicMoves = this.kinematics.getBishopPositions(currentPiece,currentConfiguration);
            
        } else if (currentPiece.getName() === "queen") {
            
            kinematicMoves = this.kinematics.getQueenPositions(currentPiece,currentConfiguration);
            
        } else if (currentPiece.getName() === "king") {
            
            kinematicMoves = this.kinematics.getKingPositions(currentPiece,currentConfiguration);
            
        } else if (currentPiece.getName() === "pawn") {
            
            kinematicMoves = this.kinematics.getPawnPositions(currentPiece as Pawn,currentConfiguration);

        }
        results = this.algorithm_legalMovesOfThisPiece(currentPiece, kinematicMoves);
        return results;
    }

    public algorithm_legalMovesOfThisPiece(currentPiece: Piece, currentKinematicMoves: Position[]): Position[] {
        
        let color: string;
        let oppositeColor: string;
        if( this.getGameTurn() == "white"){
            color = "white";
            oppositeColor = "black";
        } else {
            color = "black";
            oppositeColor = "white";
        }

        let legalMovesOfThisPiece: Position[] = new Array();

        //For each position of my piece
        for ( let position of currentKinematicMoves ) {

            //Create imaginary board - copy the current physical board with all the pieces
            let imaginaryBoard = _.cloneDeep(this.getAllSquares());

            //GET imaginary piece (the copy of the current piece)
            let imaginaryPiece: Piece = imaginaryBoard[currentPiece.getPiecePosition().getRowPosition()][currentPiece.getPiecePosition().getColPosition()]!.getPiece()!;
            
            //Place imaginary piece on position j on the imaginary board
            this.placeImaginaryPieceOnImaginaryBoard(imaginaryPiece, position, imaginaryBoard);

            // console.log("***TEST***")
            // console.log(imaginaryBoard[imaginaryPiece.getPiecePosition().getRowPosition()][imaginaryPiece.getPiecePosition().getColPosition()])
            // console.log("***END TEST***")

            //GET all attacked positions by opponent - IMAGINARY CONTEXT
            let dangerZone: Position[] = this.kinematics.getAllAttackedSquaresByOpponent(imaginaryBoard, oppositeColor);

            // console.log("***TEST***")
            // console.log(dangerZone)
            // console.log("***END TEST***")

            //GET all my pieces from the imaginary board
            let myImaginaryArrangement: Piece[] = this.kinematics.getAllPiecesOfThisColor(color, imaginaryBoard);

            // console.log("***TEST***")
            // console.log(myImaginaryArrangement)
            // console.log("***END TEST***")

            //Find position of my king in the imaginary board
            let kingImaginaryPosition: Position;
            for ( let thisShouldBeKing of myImaginaryArrangement) {
                if (thisShouldBeKing.getName() === "king"){
                    kingImaginaryPosition = thisShouldBeKing.getPiecePosition();
                }
            }

            // console.log("***TEST***")
            // console.log(kingImaginaryPosition!)
            // console.log("***END TEST***")
            

            //Search algorithm. Is my king in the dangerZone still? aka Is my king in check?
            let index = 0;
            for ( let dangerPosition of dangerZone ) {
                if ( kingImaginaryPosition!.equals(dangerPosition) ) {
                    // legalMovesOfThisPiece.push(position);
                    index ++;
                }
            }
            //If the index is greater than 0 that means the king is in check
            if (index === 0){
                legalMovesOfThisPiece.push(position);
            }
        }
        
            // console.log("***TEST***")
            // console.log(legalMovesOfThisPiece)
            // console.log("***END TEST***")

        return legalMovesOfThisPiece;
    }


    //Function that places the imaginary piece on the imaginary board. Imaginary = copy of real for each kinematic possible position
    public placeImaginaryPieceOnImaginaryBoard(currentImaginaryPiece: Piece, targetImaginaryPosition: Position, imaginaryBoard: Square[][]) {
              
        //Eliminate selected piece from previous square
        imaginaryBoard[currentImaginaryPiece.getPiecePosition().getRowPosition()][currentImaginaryPiece.getPiecePosition().getColPosition()].eliminatePiece(currentImaginaryPiece);

        //If there is a foe on target square, eliminate the foe!
        if(imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()].getPiece() !== null ){
            imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()]
            .eliminatePiece(imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()].getPiece()!);
        }

        //Assign selected piece to new square
        imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()].setPiece(currentImaginaryPiece);

        //Assign new coordinates for the recently placed piece
        currentImaginaryPiece.setPiecePosition(new Position(targetImaginaryPosition.getRowPosition(), targetImaginaryPosition.getColPosition()));

        //Was that piece a pawn?
        if (this.selectedPiece!.getName() === "pawn"){
            let currentPawn: Pawn | null = this.selectedPiece as Pawn;
            currentPawn.hasMoved(); //->that pawn has moved.
            currentPawn = null;
        } else if (this.selectedPiece!.getName() === "king") {
            let currentKing: King | null = this.selectedPiece as King;
            currentKing.hasMoved();
            currentKing = null;
        } else if (this.selectedPiece!.getName() === "rook") {
            let currentRook: Rook | null = this.selectedPiece as Rook;
            currentRook.hasMoved();
            currentRook = null;
        }
    }


    //IS my king in check?
    public isMyKingInCheck(){
        let color: string;
        let oppositeColor: string;
        if( this.getGameTurn() == "white"){
            color = "white";
            oppositeColor = "black";
        } else {
            color = "black";
            oppositeColor = "white";
        }


        
    }


    //DEVELOPMENT FUNCTIONS
    public sanityCheck(){
        //Will print on the console all info that the server board contains.
        console.log("******************** SANITY CHECK BOARD SQUARES AND PIECES ********************************")
        for( let i=1; i<=8; i++){
            for( let j=1; j<=8; j++){
                console.log(this.allSquares[i][j]);
            }
        }
        console.log("*****************END SANITY CHECK BOARD SQUARES AND PIECES ********************************")
        console.log("*******************************************************************************************")
    }
    

}