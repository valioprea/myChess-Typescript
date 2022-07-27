export class Position {
    private rowPosition: number;
    private colPosition: number;

    constructor(rowPosition: number, colPosition: number) {
        this.rowPosition = rowPosition;
        this.colPosition = colPosition;
    }

    public getRowPosition(): number{
        return this.rowPosition;
    }

    public getColPosition(): number{
        return this.colPosition;
    }

    public equals(otherPosition: Position): boolean {
        if (this.getRowPosition() === otherPosition.getRowPosition() && this.getColPosition() === otherPosition.getColPosition()){
            return true;
        } else {
            return false;
        }
    }
}