import { Bishop } from "./individualPieces/Bishop";
import { King } from "./individualPieces/King";
import { Knight } from "./individualPieces/Knight";
import { Queen } from "./individualPieces/Queen";
import { Rook } from "./individualPieces/Rook";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { Square } from "./Square";

export class GameLogic{
    
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

        //black pieces
        this.allSquares[1][1].setPiece(new Rook("rook", false, "black", new Position(1,1)));
        this.allSquares[1][8].setPiece(new Rook("rook", false, "black", new Position(1,8)));
        this.allSquares[1][2].setPiece(new Knight("knight", false, "black", new Position(1,2)));
        this.allSquares[1][7].setPiece(new Knight("knight", false, "black", new Position(1,7)));
        this.allSquares[1][3].setPiece(new Bishop("bishop", false, "black", new Position(1,3)));
        this.allSquares[1][6].setPiece(new Bishop("bishop", false, "black", new Position(1,6)));
        this.allSquares[1][4].setPiece(new Queen("queen", false, "black", new Position(1,4)));
        this.allSquares[1][5].setPiece(new King("king", false, "black", new Position(1,5)));
    }

    //This function should deal with game turn
    //In the future: FEN / notations / timer / score ?
    public initializeGameMechanics() {
        this.setGameTurn("white");
    }

    //Function that will return either all white / black pieces.
    //Params: color (to know what team to return) & current config which refers to all squares at a given point in time
    public getAllPiecesOfThisColor(color: string, currentConfiguration: Square[][]): Piece[] {
        let allWhitePieces: Piece[] = new Array();
        let allBlackPieces: Piece[] = new Array();

        for(let i = 1; i<=8; i++){
            for(let j = 1; j<=8; j++){
                //Does this square contain a piece ?
                if (  currentConfiguration[i][j].getPiece() !== null){
                    //Is the color white ?
                    if (currentConfiguration[i][j].getPiece()!.getColor() == "white"){ //not sure about the ! thing
                        //Attach that piece to this list:
                        allWhitePieces.push(currentConfiguration[i][j]!.getPiece()!);
                    } else {
                        allBlackPieces.push(currentConfiguration[i][j]!.getPiece()!);
                    }
                }
            }
        }
        if(color == "white"){
            return allWhitePieces;
        } else {
            return allBlackPieces;
        }
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
        this.selectedPiece = this.allSquares[position.getRowPosition()][position.getColPosition()].getPiece();
        console.log("GAMELOGIC: this is the position at which I select the piece: ",this.selectedPiece?.getPiecePosition());
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
            for(let piece of this.getAllPiecesOfThisColor("white", this.getAllSquares()) ){
                piece.setCanBeMoved(false);
            }
            for(let piece of this.getAllPiecesOfThisColor("black", this.getAllSquares()) ){
                piece.setCanBeMoved(true);
            }
            this.setGameTurn("black"); //-> black is next
            console.log("Black moves now ->");
        } else {
            //black finished the turn
            //deactivate black pieces + activate white pieces
            for(let piece of this.getAllPiecesOfThisColor("black", this.getAllSquares()) ){
                piece.setCanBeMoved(false);
            }
            for(let piece of this.getAllPiecesOfThisColor("white", this.getAllSquares()) ){
                piece.setCanBeMoved(true);
            }
            this.setGameTurn("white"); //-> white is next
            console.log("White moves now ->");
        }
    }

    // Function that places piece x on position y
    public placePiece(targetPosition: Position) {
        console.log("GAMELOGIC: place piece here: ", targetPosition)        
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
        
        this.finishTurn();
        this.ungrabPiece();
        

    }


    // **********  COMPUTATIONAL FUNCTIONS - KINEMATIC PURPOSES **************************
    public getRookPositions(currentRook: Piece, currentConfiguration: Square[][]){
        let currentPosition: Position = currentRook.getPiecePosition();
        let targets: Position[] = new Array();

        //Compute horizontally negative (left)
        let horizontalNegative = currentPosition.getColPosition()-1;
        while (horizontalNegative >= 1 ) {
            //IS THERE A PIECE?
            if( currentConfiguration[currentPosition.getRowPosition()][horizontalNegative].getPiece() != null) {
                //IS THE EXISTING PIECE SAME COLOR AS MINE ?
                if( currentConfiguration[currentPosition.getRowPosition()][horizontalNegative].getPiece()!.getColor() == currentRook.getColor() ) {
                    break;
                } else {
                    //I just encountered an enemy
                    targets.push(new Position(currentPosition.getRowPosition(), horizontalNegative));
                    break;
                }
            } else {
                //The square is empty
                targets.push(new Position(currentPosition.getRowPosition(), horizontalNegative));
            }
            horizontalNegative--;
        }

        //Compute horizontally negative (right)
        let horizontalPositive = currentPosition.getColPosition()+1;
        while (horizontalPositive <= 8 ) {
            //IS THERE A PIECE?
            if( currentConfiguration[currentPosition.getRowPosition()][horizontalPositive].getPiece() != null ) {
                //IS THE EXISTING PIECE SAME COLOR AS MINE ?
                if( currentConfiguration[currentPosition.getRowPosition()][horizontalPositive].getPiece()!.getColor() == currentRook.getColor() ) {
                    break;
                } else {
                    //I just encountered an enemy
                    targets.push(new Position(currentPosition.getRowPosition(), horizontalPositive));
                    break;
                }
            } else {
                //The square is empty
                targets.push(new Position(currentPosition.getRowPosition(), horizontalPositive));
            }
            horizontalPositive++;
        }

        //Compute vertically positive (down)
        let verticalPositive = currentPosition.getRowPosition()+1;
        while (verticalPositive <= 8 ) {
            //IS THERE A PIECE?
            if( currentConfiguration[verticalPositive][currentPosition.getColPosition()].getPiece() != null ) {
                //IS THE EXISTING PIECE SAME COLOR AS MINE ?
                if( currentConfiguration[verticalPositive][currentPosition.getColPosition()].getPiece()!.getColor() == currentRook.getColor() ) {
                    break;
                } else {
                    //I just encountered an enemy
                    targets.push(new Position(verticalPositive, currentPosition.getColPosition()));
                    break;
                }
            } else {
                //The square is empty
                targets.push(new Position(verticalPositive, currentPosition.getColPosition()));
            }
            verticalPositive++;
        }

        //Compute vertically NEGATIVE (UP)
        let verticalNegative = currentPosition.getRowPosition()-1;
        while (verticalNegative >= 1 ) {
            //IS THERE A PIECE?
            if( currentConfiguration[verticalNegative][currentPosition.getColPosition()].getPiece() != null ) {
                //IS THE EXISTING PIECE SAME COLOR AS MINE ?
                if( currentConfiguration[verticalNegative][currentPosition.getColPosition()].getPiece()!.getColor() == currentRook.getColor() ) {
                    break;
                } else {
                    //I just encountered an enemy
                    targets.push(new Position(verticalNegative, currentPosition.getColPosition()));
                    break;
                }
            } else {
                //The square is empty
                targets.push(new Position(verticalNegative, currentPosition.getColPosition()));
            }
            verticalNegative--;
        }

        return targets;
    }

    public getKnightPositions(currentKnight: Piece, currentConfiguration: Square[][]){
        let targets: Position[] = new Array();
        let currentRowPosition = currentKnight.getPiecePosition().getRowPosition();
        let currentColumnPosition = currentKnight.getPiecePosition().getColPosition();

        //IS THE TARGET SQUARE REACHABLE FOR THE KNIGHT ?
        if( currentRowPosition-2 >= 1 && currentColumnPosition-1 >=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 2][currentColumnPosition - 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if (  currentConfiguration[currentRowPosition-2][currentColumnPosition-1].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition-2,currentColumnPosition-1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-2,currentColumnPosition-1));
            }
        }

        if( currentRowPosition-2 >= 1 && currentColumnPosition+1 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 2][currentColumnPosition + 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if (  currentConfiguration[currentRowPosition-2][currentColumnPosition+1].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition-2,currentColumnPosition+1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-2,currentColumnPosition+1));
            }
        }

        if( currentRowPosition-1 >= 1 && currentColumnPosition+2 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 1][currentColumnPosition + 2].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition-1][currentColumnPosition+2].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition-1,currentColumnPosition+2));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-1,currentColumnPosition+2));
            }
        }

        if( currentRowPosition+1 <= 8 && currentColumnPosition+2 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 1][currentColumnPosition + 2].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+1][currentColumnPosition+2].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition+1,currentColumnPosition+2));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+1,currentColumnPosition+2));
            }
        }

        if( currentRowPosition+2 <= 8 && currentColumnPosition+1 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 2][currentColumnPosition + 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+2][currentColumnPosition+1].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition+2,currentColumnPosition+1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+2,currentColumnPosition+1));
            }
        }

        if( currentRowPosition+2 <= 8 && currentColumnPosition-1 >=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 2][currentColumnPosition - 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+2][currentColumnPosition-1].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition+2,currentColumnPosition-1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+2,currentColumnPosition-1));
            }
        }

        if( currentRowPosition+1 <= 8 && currentColumnPosition-2 >=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 1][currentColumnPosition - 2].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+1][currentColumnPosition-2].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition+1,currentColumnPosition-2));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+1,currentColumnPosition-2));
            }
        }

        if( currentRowPosition-1 >= 1 && currentColumnPosition-2 >=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 1][currentColumnPosition - 2].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition-1][currentColumnPosition-2].getPiece()!.getColor() != currentKnight.getColor() ){
                    targets.push(new Position(currentRowPosition-1,currentColumnPosition-2));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-1,currentColumnPosition-2));
            }
        }
        return targets;
    }

    public getBishopPositions(currentBishop: Piece, currentConfiguration: Square[][]){
        let targets: Position[] = new Array();
        let currentRowPosition = currentBishop.getPiecePosition().getRowPosition();
        let currentColumnPosition = currentBishop.getPiecePosition().getColPosition();

        //LOOK NORTH EAST
        let ner = currentRowPosition-1; //ner= north-east row
        let nec = currentColumnPosition+1; //nec= north-east column
        while( ner>=1 && nec <=8 ){
            //IS THERE A PIECE?
            if(currentConfiguration[ner][nec].getPiece() != null ){
                //IS THAT PIECE SAME COLOR AS THE ONE IN MY HAND ?
                if( currentConfiguration[ner][nec].getPiece()!.getColor() == currentBishop.getColor() ){
                    break;
                } else {
                    //i just encountered an enemy
                    targets.push(new Position(ner, nec));
                    break;
                }
            } else {
                //there is no piece, then
                targets.push(new Position(ner, nec));
            }
            ner--;
            nec++;
        }

        //LOOK SOUTH EAST
        let ser = currentRowPosition+1;
        let sec = currentColumnPosition+1;
        while( ser<=8 && sec <=8 ){
            //IS THERE A PIECE?
            if(currentConfiguration[ser][sec].getPiece() != null){
                //IS THAT PIECE SAME COLOR AS THE ONE IN MY HAND ?
                if( currentConfiguration[ser][sec].getPiece()!.getColor() == currentBishop.getColor() ){
                    break;
                } else {
                    //i just encountered an enemy
                    targets.push(new Position(ser,sec));
                    break;
                }
            } else {
                //there is no piece, then
                targets.push(new Position(ser,sec));
            }
            ser++;
            sec++;
        }

        //LOOK SOUTH WEST
        let swr = currentRowPosition+1;
        let swc = currentColumnPosition-1;
        while( swr<=8 && swc >=1 ){
            //IS THERE A PIECE?
            if(currentConfiguration[swr][swc].getPiece() != null){
                //IS THAT PIECE SAME COLOR AS THE ONE IN MY HAND ?
                if( currentConfiguration[swr][swc].getPiece()!.getColor() == currentBishop.getColor() ){
                    break;
                } else {
                    //i just encountered an enemy
                    targets.push(new Position(swr,swc));
                    break;
                }
            } else {
                //there is no piece, then
                targets.push(new Position(swr,swc));
            }
            swr++;
            swc--;
        }

        //LOOK NORTH WEST
        let nwr = currentRowPosition-1;
        let nwc = currentColumnPosition-1;
        while( nwr>=1 && nwc >=1 ){
            //IS THERE A PIECE?
            if(currentConfiguration[nwr][nwc].getPiece() != null){
                //IS THAT PIECE SAME COLOR AS THE ONE IN MY HAND ?
                if( currentConfiguration[nwr][nwc].getPiece()!.getColor() == currentBishop.getColor() ){
                    break;
                } else {
                    //i just encountered an enemy
                    targets.push(new Position(nwr,nwc));
                    break;
                }
            } else {
                //there is no piece, then
                targets.push(new Position(nwr,nwc));
            }
            nwr--;
            nwc--;
        }
        return targets;

    }

    public getQueenPositions(currentQueen: Piece, currentConfiguration: Square[][]) {
        let targetsAsRook: Position[] = this.getRookPositions(currentQueen, currentConfiguration);
        let targetsAsBishop: Position[] = this.getBishopPositions(currentQueen, currentConfiguration);
        let queenTargets: Position[] = new Array();
        for (let target of targetsAsRook){
            queenTargets.push(target);
        }
        for (let target of targetsAsBishop){
            queenTargets.push(target);
        }
        return queenTargets;
    }

    public getKingPositionsRelativeToPieces(currentKing: Piece, currentConfiguration: Square[][]) {
        let targets: Position[] = new Array();
        let currentRowPosition = currentKing.getPiecePosition().getRowPosition();
        let currentColumnPosition = currentKing.getPiecePosition().getColPosition();

        //IS THE TARGET SQUARE REACHABLE FOR THE King ?
        if( 8 >= currentRowPosition -1 && currentRowPosition -1 >= 1 && currentColumnPosition-1 >=1 && currentColumnPosition-1<=8){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 1][currentColumnPosition - 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if (  currentConfiguration[currentRowPosition-1][currentColumnPosition-1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition-1,currentColumnPosition-1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-1,currentColumnPosition-1));
            }
        }

        if( 8>= currentRowPosition-1 && currentRowPosition-1 >= 1 && currentColumnPosition <=8 && currentColumnPosition>=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition-1 ][currentColumnPosition ].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if (  currentConfiguration[currentRowPosition-1][currentColumnPosition].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition-1,currentColumnPosition));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-1,currentColumnPosition));
            }
        }

        if( 8>= currentRowPosition-1 && currentRowPosition-1 >= 1 && currentColumnPosition+1 <=8 && currentColumnPosition+1>=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition - 1][currentColumnPosition + 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition-1][currentColumnPosition+1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition-1,currentColumnPosition+1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition-1,currentColumnPosition+1));
            }
        }

        if( currentRowPosition <= 8 && currentColumnPosition-1 <=8 && currentColumnPosition-1>=1){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition][currentColumnPosition -1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition][currentColumnPosition-1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition,currentColumnPosition-1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition,currentColumnPosition-1));
            }
        }

        if( currentRowPosition <= 8 && currentColumnPosition+1 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition][currentColumnPosition + 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition][currentColumnPosition+1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition,currentColumnPosition+1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition,currentColumnPosition+1));
            }
        }

        if(currentRowPosition+1 <= 8 && currentColumnPosition-1 >=1 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition+1][currentColumnPosition - 1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+1][currentColumnPosition-1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition+1,currentColumnPosition-1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+1,currentColumnPosition-1));
            }
        }

        if(  currentRowPosition+1 <= 8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 1][currentColumnPosition ].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+1][currentColumnPosition].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition+1,currentColumnPosition));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+1,currentColumnPosition));
            }
        }

        if( currentRowPosition+1 <=8 && currentColumnPosition+1 <=8 ){
            //Is there a piece ?
            if (currentConfiguration[currentRowPosition + 1][currentColumnPosition +1].getPiece() !== null ) {
                //Is that piece a different color compared to the one in my hand ?
                if ( currentConfiguration[currentRowPosition+1][currentColumnPosition+1].getPiece()!.getColor() != currentKing.getColor() ){
                    targets.push(new Position(currentRowPosition+1,currentColumnPosition+1));
                }
            } else {
                //the square was empty
                targets.push(new Position(currentRowPosition+1,currentColumnPosition+1));
            }
        }
        return targets;
    }

    public getKingPositions(currentKing: Piece, currentConfiguration: Square[][]){
        
        //Get possible positions for my king relative to all pieces
        let myKingPositionsRelativeToPieces: Position[] = this.getKingPositionsRelativeToPieces(currentKing, currentConfiguration);
        
        //Find opponent's king
        let opponentKing: Piece | null = null;
        for(let i=1;i<=8;i++){
            for(let j=1;j<8;j++){
                //Does this square contain a piece?
                if( this.allSquares[i][j].getPiece() !== null ) {
                    //Is this piece the opponent king?
                    if( this.allSquares[i][j].getPiece()!.getColor() !== currentKing.getColor() 
                    && this.allSquares[i][j].getPiece()!.getName() === "king" ){
                        opponentKing = this.allSquares[i][j].getPiece();
                    }
                }
            }
        }
        
        //Get possible positions for the opponent's king
        let opponentKingPositionsRelativeToPieces: Position[] = this.getKingPositionsRelativeToPieces(opponentKing!, currentConfiguration);
        
        //Get squares attacked by both kings
        let commonAttackedPositions: Position[] = new Array();
        for(let myPosition of myKingPositionsRelativeToPieces){
            for(let opponentPosition of opponentKingPositionsRelativeToPieces){
                if ( myPosition.equals(opponentPosition)){
                    commonAttackedPositions.push(myPosition);
                }
            }
        }
        
        // //Remove common attacked squares by both king from my possibilities of positions
        let targets: Position[] = new Array();
        
        let diff = this.getDifference(myKingPositionsRelativeToPieces,commonAttackedPositions);


        for(let target of diff){
            targets.push(target);
        }

        return targets;
    }

    //Get a difference between two groups / arrays
    //CAREFUL! only one way approach
    //Source: https://bobbyhadz.com/blog/typescript-difference-between-two-arrays
    public getDifference<T>(a: T[], b: T[]): T[] {
        return a.filter((element) => {
          return !b.includes(element);
        });
    }

    public getAllAttackedSquaresByOpponent(currentConfiguration: Square[][]) : Position[] {
        //Aux transformation
        let opponentColor: string | null = null;
        if( this.getGameTurn() == "white"){
            opponentColor = "black";
        } else {
            opponentColor = "white";
        }

        let allOpponentPieces: Piece[] = this.getAllPiecesOfThisColor(opponentColor, currentConfiguration);
        let allOpponentPossibleAttacks: Position[] = new Array();

        for (let piece of allOpponentPieces){

            if( piece.getName() == "rook" ){

                //I am grabbing the attacked positions of this piece, at its own position!
                for(let position of this.getRookPositions(piece,currentConfiguration)){
                    allOpponentPossibleAttacks.push(position);
                }

            } else if (piece.getName() == "knight") {

                //I am grabbing the attacked positions of this piece, at its own position!
                for(let position of this.getKnightPositions(piece,currentConfiguration)){
                    allOpponentPossibleAttacks.push(position);
                }

            } else if (piece.getName() == "bishop") {

                //I am grabbing the attacked positions of this piece, at its own position!
                for(let position of this.getBishopPositions(piece,currentConfiguration)){
                    allOpponentPossibleAttacks.push(position);
                }

            } else if (piece.getName() == "queen") {

                //I am grabbing the attacked positions of this piece, at its own position!
                for(let position of this.getQueenPositions(piece,currentConfiguration)){
                    allOpponentPossibleAttacks.push(position);
                }
            } else if (piece.getName() == "king") {

                //I am grabbing the attacked positions of this piece, at its own position!
                for(let position of this.getKingPositions(piece,currentConfiguration)){
                    allOpponentPossibleAttacks.push(position);
                }
            }
        }

        //This list could contain duplicates
        return allOpponentPossibleAttacks;
    }
    // *******END  COMPUTATIONAL FUNCTIONS - KINEMATIC PURPOSES **************************











    
    public getMovesForThisPiece(currentPiece: Piece, currentConfiguration: Square[][]){

        let kinematicMoves: Position[] = new Array();

        if (currentPiece.getName() === "rook"){
            kinematicMoves = this.getRookPositions(currentPiece,currentConfiguration);
        } else if (currentPiece.getName() === "knight") {
            kinematicMoves = this.getKnightPositions(currentPiece,currentConfiguration);
        } else if (currentPiece.getName() === "bishop") {
            kinematicMoves = this.getBishopPositions(currentPiece,currentConfiguration);
        } else if (currentPiece.getName() === "queen") {
            kinematicMoves = this.getQueenPositions(currentPiece,currentConfiguration);
        } else if (currentPiece.getName() === "king") {
            kinematicMoves = this.getKingPositions(currentPiece,currentConfiguration);
        } else if (currentPiece.getName() === "pawn") {
            
        }
        return kinematicMoves;
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