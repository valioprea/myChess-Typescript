import { Piece } from "../Piece";
import { Position } from "../Position";

export class Rook extends Piece{

    private wasMoved: boolean;

    constructor (name: string, canBeMoved: boolean, color: string, piecePosition: Position){
        super(name, canBeMoved, color, piecePosition);
        this.wasMoved = false;
    }

    public getWasMoved(): boolean{
        return this.wasMoved;
    }

    public hasMoved() {
        this.wasMoved = true;
    }
}