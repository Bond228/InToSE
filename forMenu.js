var audio = new Audio();
audio.autoplay = false;

function soundClick() {
	if(audio.autoplay != true){
  		audio.src = 'startMusic.mp3'; 
  		audio.autoplay = true; 
	}
	else if (audio.autoplay){
		audio.autoplay = false;
		audio.pause();
	}
}

