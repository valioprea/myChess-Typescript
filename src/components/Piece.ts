import { Position } from "./Position";

export class Piece {
    private name: string;
    private canBeMoved: boolean;
    private color: string;
    private piecePosition: Position;

    constructor(name: string, canBeMoved: boolean, color: string, piecePosition: Position){
        this.name = name;
        this.canBeMoved = canBeMoved;
        this.color = color;
        this.piecePosition = piecePosition;
    }

    public getName(): string{
        return this.name;
    }

    public getCanBeMoved(): boolean{
        return this.canBeMoved;
    }

    public setCanBeMoved(canBeMoved: boolean) {
        this.canBeMoved = this.canBeMoved;
    }

    public getColor(): string {
        return this.color;
    }

    public getPiecePosition(): Position{
        return this.piecePosition;
    }

    public setPiecePosition(newPosition: Position) {
        this.piecePosition = newPosition;
    }

}