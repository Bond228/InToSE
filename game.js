var canvas;
var map;
let player;

document.addEventListener('keydown', movePlayer);



function movePlayer(){
    console.log(event.keyCode);
if ((event.keyCode == 37 || event.keyCode == 65) && player.x > 0) {
    player.x -= 6;
} else if((event.keyCode == 39 || event.keyCode == 68) && player.x < 320){
    player.x += 6;
}
draw();
}


function draw(){
    map.clearRect(0,0,600,600);
    map.drawImage(player.img, player.x, player.y, 80, 80);
}



class Player{
    constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

} 

class Bot{
    constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function startGame(){
    
}

window.onload = function animation(){
	var img = document.getElementById("p1");
    player = new Player(160, 500, img);

	canvas = document.getElementById("player");
	map = canvas.getContext("2d");
	map.drawImage(player.img, player.x, player.y, 80, 80);
    startGame();
}







