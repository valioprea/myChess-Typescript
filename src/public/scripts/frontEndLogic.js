const socket = io("ws://localhost:3000");

// ## Use this to allow all square to be moved to
let items = document.querySelectorAll(".square");
items.forEach(function (item) {
	item.addEventListener("dragover", allowDrop);
	item.addEventListener("drop", drop);
});

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





