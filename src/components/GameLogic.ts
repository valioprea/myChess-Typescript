import { Rook } from "./individualPieces/Rook";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { Square } from "./Square";

export class GameLogic{
    
    public allSquares: Square[][] = new Array();

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
                if (  currentConfiguration[i][j].getPiece() != null){
                    //Is the color white ?
                    if (currentConfiguration[i][j]!.getPiece()!.getColor() == "white"){ //not sure about the ! thing
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
                    allPieces.push(currentConfiguration[i][j]!.getPiece()!);
                
                }
            }
        }
        return allPieces;
    }

    //Function that places piece x on position y

}