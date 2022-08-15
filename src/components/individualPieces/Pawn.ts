import { Piece } from "../Piece";
import { Position } from "../Position";

export class Pawn extends Piece {

    private wasMoved: boolean; //this is for the basic movement
    private numberOfSquaresMovedLast: number;

    constructor (name: string, canBeMoved: boolean, color: string, piecePosition: Position){
        super(name, canBeMoved, color, piecePosition);
        this.wasMoved = false;
        this.numberOfSquaresMovedLast = 0;
    }

    public getWasMoved(): boolean{
        return this.wasMoved;
    }

    public hasMoved() {
        this.wasMoved = true;
    }

    public getNumberOfSquaresMovedLast(): number {
        return this.numberOfSquaresMovedLast;
    }

    public setNumberOfSquaresMovedLast( diff: number ) {
        this.numberOfSquaresMovedLast = diff;
    }

}