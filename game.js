var canvas;
var map;
var maxScore = 0;
var score = 0;
var countXP = 3;
let player;
let bot;
var track1Complete = false;
var track2Complete = false;
var track3Complete = false;
let bullet;
var kill = false;
var audio = new Audio();
var intervalTimer;
let arrayBots = new Array();
let arrayBullet = new Array();
let arrayBotsBullet = new Array();


window.onload = function animation(){

    var img = document.getElementById("p1");
    player = new Player(160, 500, img, 80);

    canvas = document.getElementById("player");
    map = canvas.getContext("2d");
    map.drawImage(player.img, player.x, player.y, 80, 80);

    
    map.fillStyle = "#ffffff";
    map.font = "30px monospace";
    map.fillText("Level 1", 140, 250);
    setTimeout(startGame, 2000);
}

class Bullet{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

}

class Player{
    constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
  size = 80;
} 

class Bot{
    constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
  size = 50;
  direction = false;
}


////// ЛИСТНЕРЫ ///////

//document.addEventListener('keydown', movePlayer, true);
//function movePlayer(){
    //clearPerson(player);
    //if ((event.keyCode == 37 || event.keyCode == 65) && player.x > 0) {
        //player.x -= 6;
    //} else if((event.keyCode == 39 || event.keyCode == 68) && player.x < 320){
    //    player.x += 6;
    //}
   // draw(player);
//}

window.addEventListener('mousemove', function (ev) {
    clearPerson(player);
    X=ev.pageX;

    if (X > 610 && X < 920){
        player.x = X-608;
    }

    draw(player);
});

//window.addEventListener('keyup', function (e) {
   // if (e.keyCode == 32) {
       //bullet = new Bullet(player.x + 36, player.y-40);
    //arrayBullet.push(bullet);
    //}
//}, false);

addEventListener("click", function() {
    bullet = new Bullet(player.x + 36, player.y-40);
    arrayBullet.push(bullet);
});

/////




function startGame() {
    map.clearRect(0,0,400,400);
    track1Complete = false;
    track2Complete = false;
    track3Complete = false;
    kill = false;
    generationBotsForTrack1();
    intervalTimer = setInterval(logic, 20);
    
    
}

function logic(){

    if (track1Complete == false){
        track1();
    }
    else if (track2Complete == false) {
        setTimeout(track2, 1000);
    }
    else if (track3Complete == false) {
        setTimeout(track3, 1000);
    }
    else{
        clearInterval(intervalTimer);
        map.fillStyle = "#ffffff";
        map.font = "30px monospace";

        map.clearRect(0,0,600,500);
        map.fillText("Level completed!", 70, 250);
        setTimeout(finalScore, 2000);
        //return;

    }
    checkKill();
    animationBullet();
    animatedBotsBullet();
    //checkKill();

    document.getElementById('score').innerText=score;
}



function animationBullet(){
    for(var i = 0; i < arrayBullet.length; i++){
        map.fillStyle = "#0fffff";
        kill = false;
        if (arrayBullet[i].y < 0) {
            map.clearRect(arrayBullet[i].x, arrayBullet[i].y, 6, 20);
            arrayBullet.splice(i,1);
            break;
        }
        for (var j = 0; j < arrayBots.length; j++){

            if (arrayBullet[i].x >= arrayBots[j].x + 5 && arrayBullet[i].x <= arrayBots[j].x + 45 && arrayBullet[i].y > arrayBots[j].y && arrayBullet[i].y < arrayBots[j].y + 50){
                clearPerson(arrayBots[j]);
                map.clearRect(arrayBullet[i].x, arrayBullet[i].y, 6, 20);
                arrayBots.splice(j, 1);
                arrayBullet.splice(i,1);
                kill = true;
                score+=100;
                break;
            }
        }
        if (!kill){
            map.clearRect(arrayBullet[i].x, arrayBullet[i].y, 6, 20);
            arrayBullet[i].y -=8;
            map.fillRect(arrayBullet[i].x, arrayBullet[i].y, 6, 20);
        }
        
    }    
}

function checkKill(){
    for(var i = 0; i < arrayBots.length; i++){
        if (arrayBots[i].x > player.x + 10 && arrayBots[i].x < player.x + 70 && arrayBots[i].y + 45 >= 500 && arrayBots[i].y <= 550){
            clearInterval(intervalTimer);
            newGame();
        }
    }
}

function newGame(){
    
    map.clearRect(0,0,600,600);
    document.getElementById("xp" + countXP).style.visibility = "hidden";
    if (countXP > 1){
        countXP--;
        map.drawImage(player.img, player.x, player.y, 80, 80);

    
        map.fillStyle = "#ffffff";
        map.font = "30px monospace";
        map.fillText("Level 1", 140, 250);

        arrayBotsBullet.splice(0,arrayBotsBullet.length);
        arrayBots.splice(0, arrayBots.length);
        arrayBullet.splice(0, arrayBullet.length);

        if (score > maxScore){
            maxScore = score;
        }
        score = 0;
        document.getElementById('highScore').innerText=maxScore;

        setTimeout(startGame, 2000);
    }
    else{
        map.clearRect(0,0,600,600);
        map.fillStyle = "#ffffff";
        map.font = "30px monospace";
        map.fillText("GAME OVER!", 140, 250);

        setTimeout(mainMenu, 2000)
    }

    
}






/////// УРОВНИ /////////


function generationBotsForTrack1(){
    var img = document.getElementById("bot");
    for(var i = 0; i < 10; i++){
        bot = new Bot(400 + i*50, 0 - i*50, img);
        arrayBots.push(bot);
    }
}

function track1(){
    var len = arrayBots.length;
    for(var i = 0; i < len; i++){
        generateBotsBullet(arrayBots[i]);
        clearPerson(arrayBots[i]);
        if(arrayBots[i].x > 50 && arrayBots[i].direction == false){
            arrayBots[i].x -=5;
            arrayBots[i].y +=2; 
        }
        else if (arrayBots[i].x == 50 && arrayBots[i].direction == false){
            arrayBots[i].direction = true;
        }
        if (arrayBots[i].direction == true && arrayBots[i].x < 350){
            arrayBots[i].x +=5;
            arrayBots[i].y +=2;
        }
        else if(arrayBots[i].x == 350 && arrayBots[i].direction == true){
            arrayBots[i].direction = false;
        }
        draw(arrayBots[i]);
    }
    if(arrayBots.length == 0){
        track1Complete = true;
        generationBotsForTrack2();
    }
    else if(arrayBots[len-1].y > 580){
        arrayBots.splice(0, len);
        track1Complete = true;
        generationBotsForTrack2();
    }
}

function generationBotsForTrack2(){
    var img = document.getElementById("bot");
    for(var i = 0; i < 10; i++){
        bot = new Bot(0 - i*50, 300, img);
        arrayBots.push(bot);
    }


}

function track2(){
    var len = arrayBots.length;
    for(var i = 0; i < arrayBots.length; i++){
        generateBotsBullet(arrayBots[i]);
        clearPerson(arrayBots[i]);
        arrayBots[i].x += 5;
        draw(arrayBots[i]);
        
    }

    if(len == 0){
        //arrayBots.splice(0, len);
        track2Complete = true;
        generationBotsForTrack3();
    } else if(arrayBots[len-1].x > 400){
        arrayBots.splice(0, len);
        track2Complete = true;
        generationBotsForTrack3();
    }
}

function generationBotsForTrack3(){
    var img = document.getElementById("bot");
    for(var i = 0; i < 10; i++){
        bot = new Bot(50 - i*50, 0 - i*50, img);
        arrayBots.push(bot);
    }
}

function track3(){
    var len = arrayBots.length;
    for(var i = 0; i < len; i++){
        console.log(len);
        generateBotsBullet(arrayBots[i]);
        clearPerson(arrayBots[i]);

        if (arrayBots[i].x <= 50 && arrayBots[i].direction == false){
            arrayBots[i].direction = true;
        }
        if (arrayBots[i].x >= 350 && arrayBots[i].direction == true){
            arrayBots[i].direction = false;
        }
        if (arrayBots[i].x < 350 && arrayBots[i].direction == true){
            arrayBots[i].x +=5;
            arrayBots[i].y +=2;
        }
        if (arrayBots[i].x > 50 && arrayBots[i].direction == false){
            arrayBots[i].x -=5;
            arrayBots[i].y +=2; 
        }
        
        
        draw(arrayBots[i]);
    }
    var len = arrayBots.length;
    if(len == 0) {
        track3Complete = true;
        
    }
    else if(arrayBots[len - 1].y > 580) {
        track3Complete = true;
        
    }


}




/////// ДОПЫ ///////

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


function clearPerson(person){
    map.clearRect(person.x, person.y, person.size, person.size);
}


function draw(person){
    map.drawImage(person.img, person.x, person.y, person.size, person.size);
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function finalScore(){

    map.clearRect(0,0,600,600);
    score += countXP * 300;
    map.fillStyle = "#ffffff";
    map.font = "30px monospace";
    document.getElementById('score').innerText=score;
    document.getElementById('highScore').innerText=score;
    map.fillText("FINAL SCORE:  " + score, 50, 250);
    setTimeout(mainMenu, 2000);
}

function mainMenu(){
    window.location.href = "menu.html";
    localStorage.setItem('HS', highScore);
}




function animatedBotsBullet(){
    map.fillStyle = "#ff0000";
    for(var i = 0; i < arrayBotsBullet.length; i++){
        var bul = arrayBotsBullet[i];
        map.clearRect(bul.x, bul.y, 6, 20);
        if(bul.x > player.x && bul.x < player.x + 80 && bul.y + 20 > player.y && bul.y < player.y){
            //map.clearRect(bul.x, bul.y, 6, 20);
            //arrayBotsBullet.splice(i, 1);
            clearInterval(intervalTimer);
            newGame();
        }
        //if (bul.y > 500){
            //map.clearRect(bul.x, bul.y, 6, 20);
            //arrayBotsBullet.splice(i, 1);
        //}
        else{
            bul.y += 8;
            map.fillRect(bul.x, bul.y, 6, 20);
        }
    }
}

function generateBotsBullet(bot){
    var x = bot.x;
    var y = bot.y;
    if (getRandomInt(1000) > 995){
        bullet = new Bullet(x, y);
        arrayBotsBullet.push(bullet);
    }
}








