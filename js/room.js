// Room.
function objRoom(x, y, color) {
	// Variables.
	this.x = x;
	this.y = y;
	this.roomColor = color;
	this.roomGuest = null;
	this.stateBed = 0;
	this.stateTrash = 0;
	this.stateDoor = 0;
	
	// Reset.
	this.roomEmpty = function() {
		this.roomGuest = null;
		this.stateBed = 0;
		this.stateTrash = 0;
		this.stateDoor = 0;
	}
	
	// Draw.
	this.drawRoom = function() {
		if (this.roomGuest != null) {
			// Room.
			gameCanvas.context.drawImage(spr_hotel_room, 192 * this.roomColor, 0, 192, 128, this.x, this.y, 192, 128);
			if (this.stateBed > 0) gameCanvas.context.drawImage(spr_hotel_bed, 72 * (this.stateBed - 1), 60 * this.roomColor, 72, 60, this.x, this.y + 68, 72, 60);
			if (this.stateTrash > 2) gameCanvas.context.drawImage(spr_hotel_trash, 28 * (this.stateTrash - 2), 0, 28, 38, this.x + 82, this.y + 76, 28, 38);
			if (this.stateDoor > 0) {
				gameCanvas.context.drawImage(spr_hotel_opendoor, this.x + 108, this.y + 34);
				this.stateDoor--;
			}
			
			// Guest.
			this.roomGuest.drawGuest();
		}
	}
}