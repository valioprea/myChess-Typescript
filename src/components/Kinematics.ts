import { King } from "./individualPieces/King";
import { Pawn } from "./individualPieces/Pawn";
import { Rook } from "./individualPieces/Rook";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { Square } from "./Square";

export class Kinematics {


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
                for(let j=1;j<=8;j++){
                    //Does this square contain a piece?
                    if( currentConfiguration[i][j].getPiece() !== null ) {
                        //Is this piece the opponent king?
                        if( currentConfiguration[i][j].getPiece()!.getColor() !== currentKing.getColor() 
                        && currentConfiguration[i][j].getPiece()!.getName() === "king" ){
                            opponentKing = currentConfiguration[i][j].getPiece();
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
    
        public getPawnPositions(currentPawn: Pawn, currentConfiguration: Square[][], lastPieceMoved: Piece){
            let targets: Position[] = new Array();
    
            let aboveRow = -1;
            let aboveAboveRow = -1;
            let aboveWestCol = currentPawn.getPiecePosition().getColPosition()-1;
            let aboveEastCol = currentPawn.getPiecePosition().getColPosition()+1;
    
            //THE GENERAL MOVEMENT LOGIC
            // "above" is a relative term. Refers to the pawn direction
            if (currentPawn.getColor() == "white") {
                aboveRow = currentPawn.getPiecePosition().getRowPosition()-1;
                aboveAboveRow = currentPawn.getPiecePosition().getRowPosition()-2;
            } else {
                aboveRow = currentPawn.getPiecePosition().getRowPosition()+1;
                aboveAboveRow = currentPawn.getPiecePosition().getRowPosition()+2;
            }
    
            //Is the above row available?
            if ( aboveRow >= 1 && aboveRow <=8 ) {
                
                //Is the next square empty? Straight ahead, first square.
                if ( currentConfiguration[aboveRow][currentPawn.getPiecePosition().getColPosition()!].getPiece() === null ) {
                    //That square is empty, that is a valid move
                    targets.push( new Position(aboveRow, currentPawn.getPiecePosition().getColPosition()) );
                }
    
                //Is there a piece on aboveWest ?
                if(aboveWestCol>=1){
                    if ( currentConfiguration[aboveRow][aboveWestCol].getPiece() !== null ){
                        //Is that piece an enemy?
                        if ( currentConfiguration[aboveRow][aboveWestCol].getPiece()!.getColor() !== currentPawn.getColor()){
                            targets.push( new Position(aboveRow, aboveWestCol) );
                        }
                    }
                }
                
    
                //Is there a piece on aboveEast ?
                if (aboveEastCol <= 8){
                    if ( currentConfiguration[aboveRow][aboveEastCol].getPiece() !== null ){
                        //Is that piece an enemy?
                        if ( currentConfiguration[aboveRow][aboveEastCol].getPiece()!.getColor() !== currentPawn.getColor()){
                            targets.push( new Position(aboveRow, aboveEastCol) );
                        }
                    }
                }
                
                
                //Can I move the pawn two squares?
                //Was the pawn moved?
                if ( currentPawn.getWasMoved() === false ) {
                    //Are both squares in front of the pawn empty?
                    if ( 
                        currentConfiguration[aboveRow][currentPawn.getPiecePosition().getColPosition()].getPiece() === null &&
                        currentConfiguration[aboveAboveRow][currentPawn.getPiecePosition().getColPosition()].getPiece() === null
                     ) {
                        targets.push( new Position(aboveAboveRow, currentPawn.getPiecePosition().getColPosition()) );
                     }
                }            
            }

            //EN PASSANT LOGIC
            //Avoid the game start
            if ( lastPieceMoved !== undefined ) {
                
                //Is the last moved piece a pawn?
                if ( lastPieceMoved.getName() === "pawn" ) {
                    let attackablePawn = lastPieceMoved as Pawn;

                    //Is this pawn on the same row with the attackable?
                    if( currentPawn.getPiecePosition().getRowPosition() === lastPieceMoved.getPiecePosition().getRowPosition() ){

                        //Did the attackable move two squares ?
                        if( attackablePawn.getNumberOfSquaresMovedLast() === 2 ) {

                            //Is the attackable to the east ?
                            if( attackablePawn.getPiecePosition().getColPosition() === currentPawn.getPiecePosition().getColPosition() + 1 ) {
                                targets.push( new Position( aboveRow, currentPawn.getPiecePosition().getColPosition() + 1 ) )
                            }
                            //Is the attackable to the west ?
                            if( attackablePawn.getPiecePosition().getColPosition() === currentPawn.getPiecePosition().getColPosition() -1  ) {
                                targets.push( new Position( aboveRow, currentPawn.getPiecePosition().getColPosition() - 1 ) )
                            }
                        }
                    }
                }
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
    
        public getAllAttackedSquaresByOpponent(currentConfiguration: Square[][], opponentColor: string) : Position[] {


            //Extra logic, finding the last moved piece
            let lastPieceMoved: Piece | null;
            for (let piece of this.getAllPieces(currentConfiguration)){
                if( piece.getLastPieceMoved() === true ) {
                    lastPieceMoved = piece;
                }
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
                } else if (piece.getName() == "pawn") {
                    
                    //I am grabbing the attacked positions of this piece, at its own position!
                    for(let position of this.getPawnPositions(piece as Pawn, currentConfiguration, lastPieceMoved!)){
                        allOpponentPossibleAttacks.push(position);
                    }
                }
            }
    
            //This list could contain duplicates
            return allOpponentPossibleAttacks;
        }
        // *******END  COMPUTATIONAL FUNCTIONS - KINEMATIC PURPOSES **************************



    //*** SPECIAL MOVES */

    //CASTLING
    public getAvailableCastlingPositions(currentKing: King, currentConfiguration: Square[][], oppositeColor: string): Position[]{
        let validCastleMoves: Position[] = new Array();

            //Is the king white or black?
            if ( currentKing.getColor() === "white" ){
                //ALGORITHM AUX CASTLING
                let availableCastlingPositions = this.algorithm_auxCastling(currentConfiguration, currentKing, oppositeColor, 8);
                for ( let pos of availableCastlingPositions ) {
                    validCastleMoves.push(pos);
                }
            } else {
                //The king is black
                //ALGORITHM AUX CASTLING
                let availableCastlingPositions = this.algorithm_auxCastling(currentConfiguration, currentKing, oppositeColor, 1);
                for ( let pos of availableCastlingPositions ) {
                    validCastleMoves.push(pos);
                }
            }
        return validCastleMoves;
    }
    //auxiliary function
    public algorithm_auxCastling(currentConfiguration: Square[][], currentKing: Piece, oppositeColor: string, rowIndex: number) {
        let castlingPositions: Position[] = new Array();
        //TODO: to rethink this

        // EAST
        //Does the eastern square contain a piece?
        if ( currentConfiguration[rowIndex][8].getPiece() !== null ) {

            // Is that piece a rook AND of the same color ?
            if( currentConfiguration[rowIndex][8].getPiece()!.getName() === "rook" && currentConfiguration[rowIndex][8].getPiece()!.getColor() === currentKing.getColor() ) {
                let easternRook = currentConfiguration[rowIndex][8].getPiece() as Rook;

                //Did the rook move?
                if (easternRook.getWasMoved() === false) {

                    //Are those two squares empty ?
                    if ( currentConfiguration[rowIndex][6].getPiece() === null && currentConfiguration[rowIndex][7].getPiece() === null ) {

                        //Are those two squares attacked by opponent ?
                        let dangerZone: Position[] = this.getAllAttackedSquaresByOpponent(currentConfiguration, oppositeColor);
                        let index1 = 0;
                        for ( let dangerPosition of dangerZone ) {
                            if ( currentConfiguration[rowIndex][6].getSquarePosition().equals(dangerPosition) ) {
                                index1 ++;
                            }
                        }
                        let index2 = 0;
                        for ( let dangerPosition of dangerZone ) {
                            if ( currentConfiguration[rowIndex][7].getSquarePosition().equals(dangerPosition) ) {
                                index2 ++;
                            }
                        }
                        if (index1 === 0 && index2 === 0) {
                            castlingPositions.push( new Position(rowIndex,7));
                        }
                    }
                    
                }

            }
        }
        
        // WEST
        //Does the western square contain a piece?
        if ( currentConfiguration[rowIndex][1].getPiece() !== null ) {

            // Is that piece a rook AND of the same color ?
            if( currentConfiguration[rowIndex][1].getPiece()!.getName() === "rook" && currentConfiguration[rowIndex][1].getPiece()!.getColor() === currentKing.getColor() ) {
                let westernRook = currentConfiguration[rowIndex][1].getPiece() as Rook;

                //Did the rook move?
                if (westernRook.getWasMoved() === false) {

                    //Are those three squares empty ?
                    if ( currentConfiguration[rowIndex][4].getPiece() === null && currentConfiguration[rowIndex][3].getPiece() === null && currentConfiguration[rowIndex][2].getPiece() === null ) {
                        //Are those three squares attacked by opponent ?
                        let dangerZone: Position[] = this.getAllAttackedSquaresByOpponent(currentConfiguration, oppositeColor);
                        let index1 = 0;
                        for ( let dangerPosition of dangerZone ) {
                            if ( currentConfiguration[rowIndex][4].getSquarePosition().equals(dangerPosition) ) {
                                index1 ++;
                            }
                        }
                        let index2 = 0;
                        for ( let dangerPosition of dangerZone ) {
                            if ( currentConfiguration[rowIndex][3].getSquarePosition().equals(dangerPosition) ) {
                                index2 ++;
                            }
                        }
                        let index3 = 0;
                        for ( let dangerPosition of dangerZone ) {
                            if ( currentConfiguration[rowIndex][2].getSquarePosition().equals(dangerPosition) ) {
                                index3 ++;
                            }
                        }
                        if (index1 === 0 && index2 === 0 && index3 === 0) {
                            castlingPositions.push( new Position(rowIndex,3));
                        }

                    }
                    
                }

            }
        }



        return castlingPositions;
    }
}