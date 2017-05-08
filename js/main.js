// Actually starting the game.
function startGame() {
	gameCanvas.start();
	setRooms();
	resetSpecial();
}

// Creating game canvas.
var gameCanvas = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 640;
		this.canvas.height = 588;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(gameInterval, 1000/60);
		window.addEventListener('mousemove', function (e) {
            mouseX = e.pageX - 12;
            mouseY = e.pageY - 12;
        })
		window.addEventListener('mousedown', function (e) {
            mouseClick = 2;
        })
        window.addEventListener('mouseup', function (e) {
            mouseClick = 0;
        })
        window.addEventListener('touchstart', function (e) {
			mouseX = e.pageX - 12;
            mouseY = e.pageY - 12;
            mouseClick = 2;
        })
        window.addEventListener('touchend', function (e) {
            mouseClick = 0;
        })
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}