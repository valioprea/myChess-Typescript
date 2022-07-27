const socket = io("ws://localhost:3000");

// ## Use this to allow all square to be moved to
let items = document.querySelectorAll(".square");
items.forEach(function (item) {
	item.addEventListener("dragover", allowDrop);
	item.addEventListener("drop", drop);
    item.addEventListener("click", testThingsOut); //TODO: need to find a way to get the clicked square or piece
});


function testThingsOut(event){
    console.log("I have been clicked");
    console.log(event.getData.JSON) //TODO: need to find a way to get the clicked square or piece
}


//ascult daca serverul zice ceva 
socket.on("altu", (data) => {

    let object = JSON.parse(data);

    let square = document.getElementsByClassName( object.piecePosition.rowPosition )[0].children[object.piecePosition.colPosition-1]; //TODO: ceva nu e bine aici
    // square.style = "background-color: red";
    
    let pic = document.createElement("img");
    pic.src = "../static/pics/wR.png";

    pic.draggable = true;
    // pic.ondragstart = drag(event);
    pic.addEventListener("dragstart", drag);
    pic.id = 1;
    square.append(pic);

    // alert(data);
})


socket.on("initializePieces", (allBackendPieces) => {
    let allPieces = JSON.parse(allBackendPieces);
    let index = 1;
    for(let piece of allPieces){
        let square = document.getElementsByClassName( piece.piecePosition.rowPosition )[0].children[piece.piecePosition.colPosition-1]; //TODO: ceva nu e bine aici
        let pic = document.createElement("img");

        // if(piece.)
        // console.log(piece)

        if(piece.name == "rook"){

            if(piece.color == "white") {
                pic.src = "../static/pics/wR.png";
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                pic.id = index;
                square.append(pic);
            } else {
                pic.src = "../static/pics/bR.png";
                pic.draggable = true;
                pic.addEventListener("dragstart", drag);
                pic.id = index;
                square.append(pic);
            }

        } else if(piece.name == "knight") {
            //logic for knight
        }



        index++;
    }
})


function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
}
function allowDrop(event){
    event.preventDefault(); 
}
function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));
}



//Hey server, would you start the game?
function startGame(){
    socket.emit("startGame");
}


//emitere catre server
function test(){
    // alert("salut");
    socket.emit("eventStart", "vali a emis");
}





