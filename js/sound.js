// Current music.
var musicCurrentlyPlaying;

// Sound class.
function Sound(src) {
	// Initialization.
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	
	// Playing sound.
	this.play = function() {
		this.sound.currentTime = 0;
		this.sound.play();
	}
	
	// Stopping sound.
	this.stop = function() {
		this.sound.currentTime = 0;
		this.sound.pause();
	}
}

// Music class.
function Music(src) {
	// Initialization.
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	
	// Loop listener.
	this.sound.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	
	// Playing music.
	this.play = function() {
		this.sound.currentTime = 0;
		this.sound.play();
	}
	
	// Stopping music.
	this.stop = function() {
		this.sound.currentTime = 0;
		this.sound.pause();
	}
}

// Playing new music.
function playMusic(newMusic) {
	if (musicCurrentlyPlaying !== undefined) {musicCurrentlyPlaying.stop();}
	musicCurrentlyPlaying = newMusic;
	if (musicCurrentlyPlaying !== undefined) {musicCurrentlyPlaying.play();}
}