const socket = io("ws://localhost:3000");

//TODO: DELETE THIS
// // ## Use this to allow all square to be moved to
// let items = document.querySelectorAll(".square");
// items.forEach(function (item) {
// 	item.addEventListener("dragover", allowDrop);
// 	item.addEventListener("drop", drop);
// });


// function testThingsOut(event){
//     console.log("I have been clicked");
//     console.log(event.target) //GET CLICKED PIECE

    
//     console.log(JSON.stringify(position))

//     socket.emit("testClick", JSON.stringify(position))
    
// }

socket.on("validMoves", (allValidMovesBackend)=>{
    JSON.parse(allValidMovesBackend).forEach((position) => {
        let square = document.getElementsByClassName( position.rowPosition )[0].children[position.colPosition-1];
        square.addEventListener("dragover", allowDrop);
        square.addEventListener("drop", drop);
        square.classList.add("attacked"); //change color
    })
    // changeSquareColor(allValidMovesBackend);
})


//Initialize visual pieces
socket.on("initializePieces", (allBackendPieces) => {
    let allPieces = JSON.parse(allBackendPieces);
    initializePieces(allPieces);
})


//DRAG EVENT
function drag(event) {
	event.dataTransfer.setData("pieceIdThatIsMoved", event.target.id); //temporary assign pieceIdThatIsMoved property with value of piece id
    //Send to backend the selected piece
    document.getElementById(event.target.id);
    let position = {
        rowPosition: event.target.dataset.rowPosition,
        colPosition: event.target.dataset.colPosition
    };
    // console.log("Dragging from position: ",JSON.stringify(position))
    socket.emit("selectPiece", JSON.stringify(position));
}


//ALLOW DROP
function allowDrop(event){
    event.preventDefault(); 
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
	let id = event.dataTransfer.getData("pieceIdThatIsMoved"); //get transferred piece ID

    //Place visual piece
    placePiece(id, square); //id of piece & square to place on

    //remove event listeners from all squares
    let items = document.querySelectorAll(".square");
    items.forEach(function (item) {
        item.removeEventListener("dragover", allowDrop);
        item.removeEventListener("drop", drop);
        item.classList.remove("attacked");
    });

    //Transmit to server what is the target position on which the piece was dropped
    //get square id
    targetSquareID = square.id;
    //get square position (from div)
    rowPosition = parseInt(String(targetSquareID)[0]);
    colPosition = parseInt(String(targetSquareID)[1]);
    let targetPosition = {rowPosition, colPosition};
    
    socket.emit("placedPiece", JSON.stringify(targetPosition));
}



//Hey server, would you start the game?
function startGame(){
    socket.emit("startGame");
}


//Sanity checks - development purposes
function checkSanity(){
    socket.emit("sanityCheck");
}




