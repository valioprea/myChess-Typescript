
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
    let index = 100; //not to have common ids with divs
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
                pic.draggable = true; //TODO: de scos de peste tot
                pic.addEventListener("dragstart", drag);
                // pic.addEventListener("dragend", dragend)
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
                pic.dataset.hasMoved = false;
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
                pic.dataset.hasMoved = false;
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
function placePiece(pieceId, targetSquare, pieceName, color, hasMoved){

    //get square id
    targetSquareID = targetSquare.id;
    //get square position (from div)
    rowPosition = parseInt(String(targetSquareID)[0]);
    colPosition = parseInt(String(targetSquareID)[1]);

    console.log("THE TARGET SQUARE IS: ",rowPosition,colPosition)
    

    //Is the player moving enPassant ?
    if ( pieceName === "pawn" ){
        let colPositionOfPiece = parseInt(document.getElementById(pieceId).dataset.colPosition);
        let opponentID = document.getElementById(pieceId).dataset.rowPosition +""+ colPosition;
        //Is the target square eastern and does not contain a piece?
        if( colPosition === colPositionOfPiece + 1  && document.getElementById(targetSquareID).innerHTML === "" ) {
            //eliminate opponent's pawn
            document.getElementById(opponentID).innerHTML = "";
        }
        //Is the target square western and does not contain a piece?
        if( colPosition === colPositionOfPiece - 1  && document.getElementById(targetSquareID).innerHTML === "" ) {
            //eliminate opponent's pawn
            document.getElementById(opponentID).innerHTML = "";
        }
    }

    //eliminate enemy (if any)
    targetSquare.innerHTML = "";
    //place piece on that square
    targetSquare.appendChild(document.getElementById(pieceId));
    //assign piece new coordinates
    document.getElementById(pieceId).dataset.rowPosition = rowPosition;
    document.getElementById(pieceId).dataset.colPosition = colPosition;

    //Is the player castling ?
    if ( pieceName === "king" && hasMoved === "false"){
        // console.log(typeof(hasMoved));
        //If king is white
        if ( color === "white" ) {
            //PLACE EASTERN ROOK
            if( rowPosition === 8 && colPosition === 7 ) {
                document.getElementById(86).appendChild( document.getElementById(88).querySelector("IMG") ); //assign rook image
                document.getElementById(86).querySelector("IMG").dataset.rowPosition = 8;
                document.getElementById(86).querySelector("IMG").dataset.colPosition = 6;
                document.getElementById(87).querySelector("IMG").dataset.hasMoved = "true";
            }
            //PLACE WESTERN ROOK
            if( rowPosition === 8 && colPosition === 3 ) {
                document.getElementById(84).appendChild( document.getElementById(81).querySelector("IMG") ) //assign rook image
                document.getElementById(84).querySelector("IMG").dataset.rowPosition = 8;
                document.getElementById(84).querySelector("IMG").dataset.colPosition = 4;
                document.getElementById(83).querySelector("IMG").dataset.hasMoved = "true";
            }
        } else if (color === "black") {
            //PLACE EASTERN ROOK
            if( rowPosition === 1 && colPosition === 7 ) {
                document.getElementById(16).appendChild( document.getElementById(18).querySelector("IMG") ); //assign rook image
                document.getElementById(16).querySelector("IMG").dataset.rowPosition = 1;
                document.getElementById(16).querySelector("IMG").dataset.colPosition = 6;
                document.getElementById(17).querySelector("IMG").dataset.hasMoved = "true";
            }
            //PLACE WESTERN ROOK
            if( rowPosition === 1 && colPosition === 3 ) {
                document.getElementById(14).appendChild( document.getElementById(11).querySelector("IMG") ) //assign rook image
                document.getElementById(14).querySelector("IMG").dataset.rowPosition = 1;
                document.getElementById(14).querySelector("IMG").dataset.colPosition = 4;
                document.getElementById(13).querySelector("IMG").dataset.hasMoved = "true";
            }
        }

    }

    //Need to set has moved for IMGs
    if (pieceName === "pawn"){
        document.getElementById(pieceId).dataset.hasMoved = "true";
    } else if (pieceName === "king") {
        document.getElementById(pieceId).dataset.hasMoved = "true";
    } else if (pieceName === "rook") {
        document.getElementById(pieceId).dataset.hasMoved = "true";
    }

    //Is the player queening ?
    if ( pieceName === "pawn"){
        //for White
        if( rowPosition === 1 ) {
            let choice = prompt("Choose a piece: 1 - Queen, 2 - Bishop, 3 - Knight, 4 - Rook","");
            switch(choice){
                case "1": initializeQueen(rowPosition, colPosition, targetSquare, color);
                break;
                case "2": initializeBishop(rowPosition, colPosition, targetSquare, color);;
                break;
                case "3": initializeKnight(rowPosition, colPosition, targetSquare, color);
                break;
                case "4": initializeRook(rowPosition, colPosition, targetSquare, color);
                break;
                default:
                    console.log("y u do dis");
            }
        }

        //for black
        if (rowPosition === 8 ) {
            let choice = prompt("Choose a piece: 1 - Queen, 2 - Bishop, 3 - Knight, 4 - Rook","");
            switch(choice){
                case "1": initializeQueen(rowPosition, colPosition, targetSquare, color);
                break;
                case "2": initializeBishop(rowPosition, colPosition, targetSquare, color);;
                break;
                case "3": initializeKnight(rowPosition, colPosition, targetSquare, color);
                break;
                case "4": initializeRook(rowPosition, colPosition, targetSquare, color);
                break;
                default:
                    console.log("y u do dis");
            }
        }
    }
}


//TO SEND TO BACKEND
let chosenPiece = null;
function getChosenPiece(){
    return chosenPiece;
}
function resetChosenPiece() {
    chosenPiece = null;
}

function initializeQueen(rowPos, colPos, targetSquare, color){
    let numbering = 5000;
    //Eliminate the pawn
    targetSquare.innerHTML = "";
    let square = document.getElementsByClassName( rowPos )[0].children[colPos-1];
    let pic = document.createElement("img"); //pic is the actual object of the piece
    pic.id = numbering;
    pic.dataset.pieceName = "queen";
    if (color === "white"){
        pic.dataset.color = "white";
        pic.src = "../static/pics/wQ.png";
    } else if (color === "black") {
        pic.dataset.color = "black";
        pic.src = "../static/pics/bQ.png";
    }
    pic.dataset.rowPosition = rowPos;
    pic.dataset.colPosition = colPos;
    pic.draggable = true;
    pic.addEventListener("dragstart", drag);
    // pic.addEventListener("click", testThingsOut);
    square.append(pic);
    chosenPiece = 1;
    numbering++;
}

function initializeBishop(rowPos, colPos, targetSquare, color){
    let numbering = 6000;
    //Eliminate the pawn
    targetSquare.innerHTML = "";
    let square = document.getElementsByClassName( rowPos )[0].children[colPos-1];
    let pic = document.createElement("img"); //pic is the actual object of the piece
    pic.id = numbering;
    pic.dataset.pieceName = "bishop";
    if (color === "white"){
        pic.dataset.color = "white";
        pic.src = "../static/pics/wB.png";
    } else if (color === "black") {
        pic.dataset.color = "black";
        pic.src = "../static/pics/bB.png";
    }
    pic.dataset.rowPosition = rowPos;
    pic.dataset.colPosition = colPos;
    pic.draggable = true;
    pic.addEventListener("dragstart", drag);
    // pic.addEventListener("click", testThingsOut);
    square.append(pic);
    chosenPiece = 2;
    numbering++;
}

function initializeKnight(rowPos, colPos, targetSquare, color){
    let numbering = 7000;
    //Eliminate the pawn
    targetSquare.innerHTML = "";
    let square = document.getElementsByClassName( rowPos )[0].children[colPos-1];
    let pic = document.createElement("img"); //pic is the actual object of the piece
    pic.id = numbering;
    pic.dataset.pieceName = "knight";
    if (color === "white"){
        pic.dataset.color = "white";
        pic.src = "../static/pics/wN.png";
    } else if (color === "black") {
        pic.dataset.color = "black";
        pic.src = "../static/pics/bN.png";
    }
    pic.dataset.rowPosition = rowPos;
    pic.dataset.colPosition = colPos;
    pic.draggable = true;
    pic.addEventListener("dragstart", drag);
    // pic.addEventListener("click", testThingsOut);
    square.append(pic);
    chosenPiece = 3;
    numbering++;
}

function initializeRook(rowPos, colPos, targetSquare, color){
    let numbering = 8000;
    //Eliminate the pawn
    targetSquare.innerHTML = "";
    let square = document.getElementsByClassName( rowPos )[0].children[colPos-1];
    let pic = document.createElement("img"); //pic is the actual object of the piece
    pic.id = numbering;
    pic.dataset.pieceName = "rook";
    if (color === "white"){
        pic.dataset.color = "white";
        pic.src = "../static/pics/wR.png";
    } else if (color === "black") {
        pic.dataset.color = "black";
        pic.src = "../static/pics/bR.png";
    }
    pic.dataset.rowPosition = rowPos;
    pic.dataset.colPosition = colPos;
    pic.draggable = true;
    pic.addEventListener("dragstart", drag);
    // pic.addEventListener("click", testThingsOut);
    square.append(pic);
    chosenPiece = 4;
    numbering++;
}