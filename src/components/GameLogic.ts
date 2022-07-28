import { Rook } from "./individualPieces/Rook";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { Square } from "./Square";

export class GameLogic{
    
    public allSquares: Square[][] = new Array();
    public selectedPiece: Piece | null = null; //not sure about the ? thing

    public getSelectedPiece(): Piece | null{
        return this.selectedPiece;
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

        //black pieces
        this.allSquares[1][1].setPiece(new Rook("rook", false, "black", new Position(1,1)));
        this.allSquares[1][8].setPiece(new Rook("rook", false, "black", new Position(1,8)));
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
        console.log("GAMELOGIC: this is the position at which I select the piece: ",this.selectedPiece);
        this.selectedPiece = this.allSquares[position.getRowPosition()][position.getColPosition()].getPiece();
        console.log("GAMELOGIC: this is the selected piece: ",this.selectedPiece);
    }

    public ungrabPiece() {
        this.selectedPiece = null;
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
        
        this.ungrabPiece();
        

    }

    //COMPUTATIONAL FUNCTIONS
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

    public getBishopPosition(currentBishop: Piece, currentConfiguration: Square[][]){
        // let targets: Position
    }










    //DEVELOPMENT FUNCTIONS
    public sanityCheck(){

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