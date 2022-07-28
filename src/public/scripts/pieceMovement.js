
//THIS FUNCTION IS ONLY CALLED WHEN THE GAME BEGINS.
//IT PLACES PIECES IN POSITIONS
function initializePieces(allPieces){
/*
What do i need for a piece?
- id = index
- name
- color
- picture
- row position
- column position
- draggable
- event listener on drag
- event listener on click

After a piece is initialized, I can add it to the square
*/    
    let index = 1;
    for(let piece of allPieces){
        let square = document.getElementsByClassName( piece.piecePosition.rowPosition )[0].children[piece.piecePosition.colPosition-1]; //TODO: ceva nu e bine aici
        let pic = document.createElement("img"); //pic is the actual object of the piece

        if(piece.name == "rook"){
            //logic for rook
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wR.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bR.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }

        } else if(piece.name == "knight") {
            //logic for knight
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wN.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bN.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }
        } else if(piece.name == "bishop") {
            //logic for bishop
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wB.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bB.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }
        } else if(piece.name == "queen") {
            //logic for queen
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wQ.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bQ.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }
        } else if(piece.name == "king") {
            //logic for king
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wK.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bK.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }
        } else if(piece.name == "pawn") {
            //logic for pawn
            if(piece.color == "white") {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "white";
                pic.src = "../static/pics/wP.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            } else {
                pic.id = index;
                pic.dataset.pieceName = piece.name;
                pic.dataset.color = "black";
                pic.src = "../static/pics/bP.png";
                pic.dataset.rowPosition = piece.piecePosition.rowPosition;
                pic.dataset.colPosition = piece.piecePosition.colPosition;
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("click", testThingsOut);
                square.append(pic);
            }
        }
        index++;
    }
}

//a square: document.getElementsByClassName( i )[0].children[ j ] where i=row from 1 to 8 and j=column from 0 to 7
//PLACE A PIECE
function placePiece(pieceId, targetSquare){

    //get square id
    targetSquareID = targetSquare.id;
    //get square position (from div)
    rowPosition = parseInt(String(targetSquareID)[0]);
    colPosition = parseInt(String(targetSquareID)[1]);
    
    targetSquare.innerHTML = "";
    targetSquare.appendChild(document.getElementById(pieceId));
    document.getElementById(pieceId).dataset.rowPosition = rowPosition;
    document.getElementById(pieceId).dataset.colPosition = colPosition;
    console.log(document.getElementById(pieceId));
}