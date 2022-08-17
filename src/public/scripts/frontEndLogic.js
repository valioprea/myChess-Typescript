const socket = io("ws://localhost:3000");

//Hey server, would you start the game?
function startGame(){
    socket.emit("startGame");
}

//Draw pieces
socket.on("drawPieces", (allBackendPieces) => {
    let allPieces = JSON.parse(allBackendPieces);
    drawPieces(allPieces);
})


//Get valid moves of selected piece and color the squares accordingly
socket.on("validMoves", (allValidMovesBackend)=>{
    JSON.parse(allValidMovesBackend).forEach((position) => {
        let square = document.getElementsByClassName( position.rowPosition )[0].children[position.colPosition-1];
        square.addEventListener("dragover", allowDrop);
        square.addEventListener("drop", drop);
        square.classList.add("attacked"); //change color
    })
})

//Display winner
socket.on("showWinner", (data) => {
    console.log(data)
    document.getElementById("winner").innerHTML = data;
})


//DRAG EVENT
function drag(event) {

	event.dataTransfer.setData("pieceIdThatIsMoved", event.target.id); //temporary assign pieceIdThatIsMoved property with value of piece id
    event.dataTransfer.setData("pieceName", event.target.dataset.pieceName);
    event.dataTransfer.setData("pieceColor", event.target.dataset.color);
    event.dataTransfer.setData("rowPos", event.target.dataset.rowPosition);
    event.dataTransfer.setData("colPos", event.target.dataset.colPosition);
    event.dataTransfer.setData("hasMoved", event.target.dataset.hasMoved);

    //Send to backend the selected piece
    document.getElementById(event.target.id); //TODO: I need to be careful with the ID here!!
    let position = {
        rowPosition: event.target.dataset.rowPosition,
        colPosition: event.target.dataset.colPosition
    };
    // console.log("Dragging from position: ",JSON.stringify(position))
    socket.emit("selectPiece", JSON.stringify(position));
}

//DROP EVENT
//This function applies only to the square on which you drop the piece
function drop(event) {

    if( event.target.nodeName === "IMG" ) {
        square = event.target.parentNode;
    } else {
        square = event.target;
    }
    event.preventDefault();

    //To transmit to server what is the target position on which the piece was dropped
    //get square id
    targetSquareID = square.id;
    //get square position (from div)
    rowPosition = parseInt(String(targetSquareID)[0]);
    colPosition = parseInt(String(targetSquareID)[1]);
    let targetPosition = {rowPosition, colPosition};
    
    let pieceName = event.dataTransfer.getData("pieceName");
    let color = event.dataTransfer.getData("pieceColor");

    //Is player queening?
    if ( pieceName === "pawn" ) {
        isPlayerQueening(rowPosition, colPosition, square, color);
    }

    //remove event listeners from all squares
    let items = document.querySelectorAll(".square");
    items.forEach(function (item) {
        item.removeEventListener("dragover", allowDrop);
        item.removeEventListener("drop", drop);
        item.classList.remove("attacked");
    });
    
    //Check if the last move wasn't actually a queening move
    let checkValue = getChosenPiece();
    if ( checkValue !== null ) {
        socket.emit("chosenPiece", checkValue );
        resetChosenPiece();
    }
    socket.emit("placedPiece", JSON.stringify(targetPosition));
}


//ALLOW DROP
function allowDrop(event){
    event.preventDefault(); 
}

//Sanity checks - development purposes
function checkSanity(){
    socket.emit("sanityCheck");
}




