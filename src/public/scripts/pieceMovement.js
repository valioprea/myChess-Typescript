//TODO: To rethink the way id's are distributed in order for them to be unique
//This function draws pieces from BE to their corresponding places on the board
function drawPieces(allPieces){
    /*
    What do i need for a piece?
    - id = index
    - name
    - color
    - picture
    - row position
    - column position
    - event listener on drag
    - event listener on click

    After a piece is initialized, I can add it to the square
    */    

    //Clean the board first
    for (let i=1; i<=8;i++){
        for (let j=1;j<=8;j++){
            let square = document.getElementsByClassName( i )[0].children[j-1];
            square.innerHTML = "";
        }
    }

    let index = 100; //not to have common ids with divs
    for(let piece of allPieces){
        let square = document.getElementsByClassName( piece.piecePosition.rowPosition )[0].children[piece.piecePosition.colPosition-1];
        let pic = document.createElement("img"); //pic is the actual object of the piece

        if(piece.name == "rook"){
            //logic for rook
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wR.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bR.png";
                auxDraw(pic, piece, square, index);
            }

        } else if(piece.name == "knight") {
            //logic for knight
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wN.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bN.png";
                auxDraw(pic, piece, square, index);
            }
        } else if(piece.name == "bishop") {
            //logic for bishop
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wB.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bB.png";
                auxDraw(pic, piece, square, index);
            }
        } else if(piece.name == "queen") {
            //logic for queen
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wQ.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bQ.png";
                auxDraw(pic, piece, square, index);
            }
        } else if(piece.name == "king") {
            //logic for king
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wK.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bK.png";
                auxDraw(pic, piece, square, index);
            }
        } else if(piece.name == "pawn") {
            //logic for pawn
            if(piece.color == "white") {
                pic.dataset.color = "white";
                pic.src = "../static/pics/wP.png";
                auxDraw(pic, piece, square, index);
            } else {
                pic.dataset.color = "black";
                pic.src = "../static/pics/bP.png";
                auxDraw(pic, piece, square, index);
            }
        }
        index++;
    }
}

//auxiliary drawing function
function auxDraw(pic, piece, square, index) {
    pic.id = index;
    pic.dataset.pieceName = piece.name;
    pic.dataset.rowPosition = piece.piecePosition.rowPosition;
    pic.dataset.colPosition = piece.piecePosition.colPosition;
    if ( piece.canBeMoved === true ) {
        pic.addEventListener("dragstart", drag);
    }
    square.append(pic);
}


function isPlayerQueening(rowPosition){
    if( rowPosition === 1 || rowPosition === 8) {
        let choice = prompt("Choose a piece: 1 - Queen, 2 - Bishop, 3 - Knight, 4 - Rook","");
        switch(choice){
            case "1": chosenPiece = 1;
            break;
            case "2": chosenPiece = 2;
            break;
            case "3": chosenPiece = 3;
            break;
            case "4": chosenPiece = 4;
            break;
            default:
                chosenPiece = 1;
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
