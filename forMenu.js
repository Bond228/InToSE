//window.addEventListener("load", function(){
//	animation();
//});

var parameter = localStorage.getItem('HS');
console.log(parameter);

var audio = new Audio();
audio.autoplay = false;

function soundClick() {
	if(audio.autoplay != true){
  		audio.src = 'startMusic.mp3'; 
  		audio.autoplay = true; 
  		event.target.src="image/on.png"
	}
	else if (audio.autoplay){
		audio.autoplay = false;
		audio.pause();
		event.target.src="image/off.png"
	}

}

var i = 100;
var side = true;
var rand;
var a;
let arrayBullet = new Array();

class Bullet{

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

}




function animation(){
	var img=document.getElementById("p1");

	var canvas = document.getElementById("player");
	var map = canvas.getContext("2d");
	map.drawImage(img, 100, 170, 80, 80);

	map.clearRect(0,0,400,400);
	map.drawImage(img, i, 170, 80, 80);

	if (i == 220) side = false;
	if (i == 100) side = true;

	if(side) i+=1;	
	else i-=1;

	rand = Math.floor(Math.random() * 100);
	if (rand % 99 == 0){
		let bull = new Bullet(i, 170);
		arrayBullet.push(bull);
	}

	for (bullet = 0; bullet < arrayBullet.length; bullet++) {
		map.beginPath();
    	map.fillRect(arrayBullet[bullet].x+36, arrayBullet[bullet].y-10, 6, 40);
    	if(Math.floor(Math.random() * 100) > 80){
    		map.fillStyle = "#0fffff";
    	}
    	else{
    		map.fillStyle = "#0095DD";
    	}
    	map.fill();
    	map.closePath();
    	arrayBullet[bullet].y -= 10;
	}
	console.log(arrayBullet.length);

}





setInterval(animation, 10);