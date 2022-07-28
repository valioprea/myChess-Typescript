import { Piece } from "../Piece";
import { Position } from "../Position";

export class Bishop extends Piece{
    constructor (name: string, canBeMoved: boolean, color: string, piecePosition: Position){
        super(name, canBeMoved, color, piecePosition);
    }
}