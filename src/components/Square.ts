import { Piece } from "./Piece";
import { Position } from "./Position";

export class Square{
    private squarePosition: Position;
    private piece: Piece | null;

    constructor(squarePosition: Position){
        this.squarePosition = squarePosition;
        this.piece = null;
    }

    public setSquarePosition(squarePosition: Position) {
        this.squarePosition = squarePosition;
    }

    public getPiece(): Piece{
        if (this.piece == null) {
            return null;
        } else {
            return this.piece;
        }
    }

    public setPiece(piece: Piece) {
        this.piece = piece;
    }

    public eliminatePiece(piece: Piece) {
        this.piece = null;
    }

    public getSquarePosition(): Position{
        return this.squarePosition;
    }

}