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

    private kinematics: Kinematics = new Kinematics();
    public allSquares: Square[][] = new Array();
    public selectedPiece: Piece | null = null; //not sure about the ? thing.
    public gameTurn: string | null = null;
    private winner: string = "";
    private chosenPiece: number = 0;

    // 1-queen, 2-bishop, 3-knight, 4-rook
    public setChosenPiece(value: number) {
        this.chosenPiece = value;
    }

    public getChosenPiece(): number {
        return this.chosenPiece;
    }

    public getWinner(){
        return this.winner;
    }

    public getKinematics(): Kinematics {
        return this.kinematics;
    }

    public getSelectedPiece(): Piece | null{
        return this.selectedPiece;
    }

    public setGameTurn(gameTurn: string){
        this.gameTurn = gameTurn;
    }

    public getGameTurn(): string {
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

    public grabPiece(position: Position){
        // console.log("GAMELOGIC -> grabPiece -> position from FE: ", position)
        // console.log("GAMELOGIC -> grabPiece -> square at position from FE: ",this.allSquares[position.getRowPosition()][position.getColPosition()])
        this.selectedPiece = this.allSquares[position.getRowPosition()][position.getColPosition()].getPiece()!;
        // console.log("GAMELOGIC: this is the position at which I selected the piece: ",this.selectedPiece?.getPiecePosition());
        // console.log("GAMELOGIC: this is the selected piece: ",this.selectedPiece);
    }

    public ungrabPiece() {
        this.selectedPiece = null;
    }

    public finishTurn() {
        let canMove: boolean = false;

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
            canMove = this.canOpponentMoveAnywhere("black");
            this.checkForWinner("black", canMove);
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
            canMove = this.canOpponentMoveAnywhere("white");
            this.checkForWinner("white", canMove);
            console.log("White moves now ->");
        }
        this.ungrabPiece();
    }

    public checkForWinner(opponentColor: string, canOpponentMove: boolean){

        let myColor: string = "";
        if ( opponentColor === "white" ) {
            myColor = "black";
        } else if (opponentColor === "black") {
            myColor = "white";
        }

        //Find opponent king
        let opponentPieces: Piece[] = this.kinematics.getAllPiecesOfThisColor(opponentColor, this.allSquares);
        let opponentKing: King ;
        for( let piece of opponentPieces ) {
            if ( piece.getName() === "king" ) {
                opponentKing = piece as King;
            }
        }
        
        //checkmate = can't move + king in check
        if ( this.isMyKingInCheck( opponentKing! , this.allSquares) === true && canOpponentMove === false ) {
            this.winner = myColor + " WINS THE GAME"

            //stalemate = can't move
        } else if ( this.isMyKingInCheck( opponentKing! , this.allSquares) === false && canOpponentMove === false ) {
            this.winner = myColor + " CREATED A STALEMATE"

            //default case
        } else {
            this.winner = " NO WINNER YET"
        }

    }

    // Function that places piece x on position y
    public placePiece(targetPosition: Position) {
        
        //Was that piece a pawn?
        if (this.selectedPiece!.getName() === "pawn"){
            let currentPawn: Pawn | null = this.selectedPiece as Pawn;

            //En passant logic
            //Is the target square eastern and does not contain a piece ?
            if ( (targetPosition.getColPosition() === currentPawn.getPiecePosition().getColPosition() + 1) &&
                this.allSquares[targetPosition.getRowPosition()][targetPosition.getColPosition()].getPiece() === null ) {
                    //enPassant is happening
                    //Eliminate opponent's pawn
                    this.allSquares[currentPawn.getPiecePosition().getRowPosition()][currentPawn.getPiecePosition().getColPosition() + 1]
                        .eliminatePiece( this.allSquares[currentPawn.getPiecePosition().getRowPosition()][currentPawn.getPiecePosition().getColPosition() + 1].getPiece()! );
                }
            //Is the target square western and does not contain a piece ?
            if ( (targetPosition.getColPosition() === currentPawn.getPiecePosition().getColPosition() - 1) &&
                this.allSquares[targetPosition.getRowPosition()][targetPosition.getColPosition()].getPiece() === null ) {
                    //enPassant is happening
                    //Eliminate opponent's pawn
                    this.allSquares[currentPawn.getPiecePosition().getRowPosition()][currentPawn.getPiecePosition().getColPosition() - 1]
                        .eliminatePiece( this.allSquares[currentPawn.getPiecePosition().getRowPosition()][currentPawn.getPiecePosition().getColPosition() - 1].getPiece()! );
                }

            let rowDiff: number = Math.abs( this.selectedPiece!.getPiecePosition().getRowPosition() - targetPosition.getRowPosition() );
            currentPawn.setNumberOfSquaresMovedLast(rowDiff);


            currentPawn.hasMoved(); //->that pawn has moved.
            currentPawn = null;
        } else if (this.selectedPiece!.getName() === "king") {
            let currentKing: King | null = this.selectedPiece as King;

            //Is the player castling?
            if(currentKing.getWasMoved() === false ){

                if ( targetPosition.getColPosition() === 3 ) {
                    let direction = 3;
                    this.finishCastling(targetPosition, direction);
                } else if ( targetPosition.getColPosition() === 7 ) {
                    let direction = 7;
                    this.finishCastling(targetPosition, direction);
                }
            }

            currentKing.hasMoved();
            currentKing = null;
        } else if (this.selectedPiece!.getName() === "rook") {
            let currentRook: Rook | null = this.selectedPiece as Rook;
            currentRook.hasMoved();
            currentRook = null;
        }


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

        //Set false to last piece moved for all pieces (just to clean)
        for( let piece of this.kinematics.getAllPieces(this.allSquares) ){
            piece.setLastPieceMoved(false);
        }

        //Set true to last moved piece - the selected piece.
        this.selectedPiece!.setLastPieceMoved(true);

        //Queening Logic
        //Is the chosen piece different than zero ? -> that means something was selected on front end
        if( this.getChosenPiece() !== 0 && this.selectedPiece!.getName() === "pawn") {

            //is target row 1 or 8 ?
            if ( targetPosition.getRowPosition() === 1 || targetPosition.getRowPosition() === 8 ) {
                //determine what piece was chosen
                //queen
                if (this.getChosenPiece() === 1){
                    let name: string = "queen";
                    let color: string = this.selectedPiece!.getColor();
                    let row: number = targetPosition.getRowPosition();
                    let col: number = targetPosition.getColPosition();
                    //Eliminate the pawn
                    this.allSquares[row][col].eliminatePiece( this.selectedPiece! );
                    //Initialize new queen
                    this.allSquares[row][col].setPiece( new Queen(name, false, color, new Position(row,col)) );
                    this.setChosenPiece(0);
                } else if ( this.getChosenPiece() === 2 ) {
                    let name: string = "bishop";
                    let color: string = this.selectedPiece!.getColor();
                    let row: number = targetPosition.getRowPosition();
                    let col: number = targetPosition.getColPosition();
                    //Eliminate the pawn
                    this.allSquares[row][col].eliminatePiece( this.selectedPiece! );
                    //Initialize new bishop
                    this.allSquares[row][col].setPiece( new Bishop(name, false, color, new Position(row,col)) );
                    this.setChosenPiece(0);
                } else if ( this.getChosenPiece() === 3 ) {
                    let name: string = "knight";
                    let color: string = this.selectedPiece!.getColor();
                    let row: number = targetPosition.getRowPosition();
                    let col: number = targetPosition.getColPosition();
                    //Eliminate the pawn
                    this.allSquares[row][col].eliminatePiece( this.selectedPiece! );
                    //Initialize new knight
                    this.allSquares[row][col].setPiece( new Knight(name, false, color, new Position(row,col)) );
                    this.setChosenPiece(0);
                } else if ( this.getChosenPiece() === 4 ) {
                    let name: string = "rook";
                    let color: string = this.selectedPiece!.getColor();
                    let row: number = targetPosition.getRowPosition();
                    let col: number = targetPosition.getColPosition();
                    //Eliminate the pawn
                    this.allSquares[row][col].eliminatePiece( this.selectedPiece! );
                    //Initialize new rook
                    this.allSquares[row][col].setPiece( new Rook(name, false, color, new Position(row,col)) );
                    this.setChosenPiece(0);
                }
            }
        }

        this.finishTurn();
    }

    //additional
    public finishCastling(targetPosition: Position, direction: number) {
        let colIndex: number;
        if (direction === 3 ) {
            colIndex = 4;

            //Grab targeted rook
            let targetedRook = this.allSquares[targetPosition.getRowPosition()][1].getPiece() as Rook;

            //Eliminate targeted rook from previous square
            this.allSquares[targetPosition.getRowPosition()][1].eliminatePiece( this.allSquares[targetPosition.getRowPosition()][1].getPiece()! );

            //Assign targeted rook to new square
            this.getAllSquares()[targetPosition.getRowPosition()][colIndex].setPiece(targetedRook!);

            //Assign new coordinates for the recently placed rook
            targetedRook!.setPiecePosition(new Position(targetPosition.getRowPosition(), colIndex ));

            //Rook has moved
            targetedRook!.hasMoved();

        } else {
            colIndex = 6;
            //Grab targeted rook
            let targetedRook = this.allSquares[targetPosition.getRowPosition()][8].getPiece() as Rook;

            //Eliminate targeted rook from previous square
            this.allSquares[targetPosition.getRowPosition()][8].eliminatePiece( this.allSquares[targetPosition.getRowPosition()][8].getPiece()! );

            //Assign targeted rook to new square
            this.getAllSquares()[targetPosition.getRowPosition()][colIndex].setPiece(targetedRook!);

            //Assign new coordinates for the recently placed rook
            targetedRook!.setPiecePosition(new Position(targetPosition.getRowPosition(), colIndex ));

            //Rook has moved
            targetedRook!.hasMoved();
        }
    }

    public getMovesForThisPiece(currentPiece: Piece, currentConfiguration: Square[][]){

        let kinematicMoves: Position[] = new Array();
        let results: Position[] = new Array();

        //Extra logic, finding the last moved piece
        let lastPieceMoved: Piece | null;
        for (let piece of this.kinematics.getAllPieces(currentConfiguration)){
            if( piece.getLastPieceMoved() === true ) {
                lastPieceMoved = piece;
            }
        }

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
            
            kinematicMoves = this.kinematics.getPawnPositions(currentPiece as Pawn, currentConfiguration, lastPieceMoved! );

        }
        results = this.algorithm_legalMovesOfThisPiece(currentPiece, kinematicMoves, currentConfiguration);
        return results;
    }

    public algorithm_legalMovesOfThisPiece(currentPiece: Piece, currentKinematicMoves: Position[], currentConfiguration: Square[][]): Position[] {
        
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

            //GET all attacked positions by opponent - IMAGINARY CONTEXT
            let dangerZone: Position[] = this.kinematics.getAllAttackedSquaresByOpponent(imaginaryBoard, oppositeColor);

            //GET all my pieces from the imaginary board
            let myImaginaryArrangement: Piece[] = this.kinematics.getAllPiecesOfThisColor(color, imaginaryBoard);

            //Find position of my king in the imaginary board
            let kingImaginaryPosition: Position;
            for ( let thisShouldBeKing of myImaginaryArrangement) {
                if (thisShouldBeKing.getName() === "king"){
                    kingImaginaryPosition = thisShouldBeKing.getPiecePosition();
                }
            }

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


        //Special move - king castling
        //Is my piece a king?
        if (currentPiece.getName() === "king" ){
            let currentKing = currentPiece as King;

            // Was the king moved ?
            if(currentKing.getWasMoved() === false){

                //Is the king in check?
                if ( this.isMyKingInCheck(currentKing, currentConfiguration) === false ) {
                    let availableCastlingPositions = this.kinematics.getAvailableCastlingPositions(currentKing, currentConfiguration, oppositeColor);
                    for(let pos of availableCastlingPositions){
                        legalMovesOfThisPiece.push(pos);
                    }
                }
            }
        }
        return legalMovesOfThisPiece;
    }

    //Function that places the imaginary piece on the imaginary board. Imaginary = copy of real for each kinematic possible position
    public placeImaginaryPieceOnImaginaryBoard(currentImaginaryPiece: Piece, targetImaginaryPosition: Position, imaginaryBoard: Square[][]) {
              
        //Was that piece a pawn?
        if (currentImaginaryPiece.getName() === "pawn"){
            let currentPawn: Pawn | null = currentImaginaryPiece as Pawn;

            //En passant logic
            //Is the target square eastern and does not contain a piece ?
            if ( (targetImaginaryPosition.getColPosition() === currentImaginaryPiece.getPiecePosition().getColPosition() + 1) &&
                imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()].getPiece() === null ) {
                    //enPassant is happening
                    //Eliminate opponent's pawn
                    imaginaryBoard[currentImaginaryPiece.getPiecePosition().getRowPosition()][currentImaginaryPiece.getPiecePosition().getColPosition() + 1]
                        .eliminatePiece( imaginaryBoard[currentImaginaryPiece.getPiecePosition().getRowPosition()][currentImaginaryPiece.getPiecePosition().getColPosition() + 1].getPiece()! );
                }
            //Is the target square western and does not contain a piece ?
            if ( (targetImaginaryPosition.getColPosition() === currentImaginaryPiece.getPiecePosition().getColPosition() - 1) &&
                imaginaryBoard[targetImaginaryPosition.getRowPosition()][targetImaginaryPosition.getColPosition()].getPiece() === null ) {
                    //enPassant is happening
                    //Eliminate opponent's pawn
                    imaginaryBoard[currentImaginaryPiece.getPiecePosition().getRowPosition()][currentImaginaryPiece.getPiecePosition().getColPosition() - 1]
                        .eliminatePiece( imaginaryBoard[currentImaginaryPiece.getPiecePosition().getRowPosition()][currentImaginaryPiece.getPiecePosition().getColPosition() - 1].getPiece()! );
                }

            let rowDiff: number = Math.abs( currentImaginaryPiece.getPiecePosition().getRowPosition() - targetImaginaryPosition.getRowPosition() );
            currentPawn.setNumberOfSquaresMovedLast(rowDiff);

            currentPawn.hasMoved(); //->that pawn has moved.
            currentPawn = null;
        } else if (currentImaginaryPiece.getName() === "king") {
            let currentKing: King | null = currentImaginaryPiece as King;
            currentKing.hasMoved();
            currentKing = null;
        } else if (currentImaginaryPiece.getName() === "rook") {
            let currentRook: Rook | null = currentImaginaryPiece as Rook;
            currentRook.hasMoved();
            currentRook = null;
        }

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

        //Set false to last piece moved for all pieces (just to clean)
        for( let piece of this.kinematics.getAllPieces(imaginaryBoard) ){
            piece.setLastPieceMoved(false);
        }

        //Set true to last moved piece - the selected piece.
        currentImaginaryPiece!.setLastPieceMoved(true);


    }

    //IS my king in check?
    public isMyKingInCheck(currentKing: King, currentConfiguration: Square[][]): boolean{
        let color: string;
        let oppositeColor: string;
        if( this.getGameTurn() == "white"){
            color = "white";
            oppositeColor = "black";
        } else {
            color = "black";
            oppositeColor = "white";
        }

        //GET all attacked positions by opponent - REAL CONTEXT
        let dangerZone: Position[] = this.kinematics.getAllAttackedSquaresByOpponent(currentConfiguration, oppositeColor);


        //Search algorithm. Is my king in the dangerZone? aka Is my king in check?
        let index = 0;
        for ( let dangerPosition of dangerZone ) {
            if ( currentKing.getPiecePosition().equals(dangerPosition) ) {
                index ++;
            }
        }
        //If the index is greater than 0 that means the king is in check
        if (index === 0){
            return false;
        } else {
            return true;
        }
    }

    //Can opponent move anywhere?
    public canOpponentMoveAnywhere(color: string): boolean {
        
        let answer: boolean = false;

        let allOpponentPieces: Piece[] = this.kinematics.getAllPiecesOfThisColor(color, this.allSquares);
        let allMoves: Position[] = new Array();

        for (let piece of allOpponentPieces) {
            let pieceMoves: Position[] = this.getMovesForThisPiece(piece, this.allSquares)
            for (let move of pieceMoves) {
                allMoves.push(move);
            }
        }

        if ( allMoves.length !== 0 ){
            answer = true;
        } else {
            answer =  false;
        }

        return answer;
    }


    //DEVELOPMENT FUNCTIONS
    public sanityCheck(){
        //Will print on the console all info that the server board contains.
        console.log("*******************************************************************************************")
        console.log("**                      SANITY CHECK BOARD SQUARES AND PIECES                            **")
        console.log("*******************************************************************************************")
        for( let i=1; i<=8; i++){
            for( let j=1; j<=8; j++){
                console.log(this.allSquares[i][j]);
            }
        }
        console.log("*******************************************************************************************")
        console.log("**                  END SANITY CHECK BOARD SQUARES AND PIECES                            **")
        console.log("*******************************************************************************************")
    }
    

}