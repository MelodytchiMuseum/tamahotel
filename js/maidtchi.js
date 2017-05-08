// Maidtchi.
function objMaid() {
	// Variables.
	this.x = 640;
	this.y = 0;
	this.roomGoal = -1;
	this.carryObj = -1;
	this.animFrame = 0;
	this.animTick = 0;
	this.animNext = 0;
	this.animFlip = false;
	this.runSpeed = 6;
	this.defaultTime = timeMult;
	this.serveLast = 0;
	this.serveQuick = 0;
	
	// Acting.
	this.maidRun = function() {
		// Quick service timeout.
		if (this.serveLast > 0) {
			this.serveLast -= (timeMultDef / timeMult);
			if (this.serveLast <= 0) this.serveQuick = 0;
		}
	
		// Pausing.
		if (this.animFrame == 6) {
			if (this.animTick > 0) this.animTick--;
			else {
				this.roomGoal = -1;
				if (this.carryObj == 10) this.animFrame = 3;
				else this.animFrame = 0;
				this.animFlip = false;
			}
		}
	
		// Running to room.
		else if (this.roomGoal > -1) {
			if (gameRoom[this.roomGoal].roomGuest.careMiss >= 3) {
				this.roomGoal = -1;
				this.animFlip = false;
			}
			else {
				if (this.x > gameRoom[this.roomGoal].x + 65) {
					this.runAnim();
					this.x -= Math.round(this.runSpeed * (this.defaultTime / timeMult));
					if (this.x < gameRoom[this.roomGoal].x + 65) this.x = gameRoom[this.roomGoal].x + 65;
				}
				else {
					this.animTick = Math.round((1/3) * timeMult);
					this.animFrame = 6;
					this.animFlip = false;
					if (this.carryObj == -1) {
						if (gameRoom[this.roomGoal].stateTrash > 0) this.quickService();
						gameRoom[this.roomGoal].stateTrash = 0;
						this.carryObj = 10;
						snd_maid_clean.play();
					}
					else if (this.carryObj == 21) {
						if (gameRoom[this.roomGoal].stateBed != 1) this.quickService();
						if (gameRoom[this.roomGoal].stateBed == 0) this.carryObj = -1;
						gameRoom[this.roomGoal].stateBed = 1;
						snd_maid_clean.play();
					}
					else {
						gameRoom[this.roomGoal].roomGuest.foodReceive(this.carryObj);
						if (gameRoom[this.roomGoal].roomGuest.foodWant) this.quickService();
						this.carryObj = -1;
						snd_maid_food.play();
					}
				}
			}
		}
		
		// Running back.
		else {
			if (this.x < 640) {
				this.runAnim();
				this.x += Math.round(this.runSpeed * (this.defaultTime / timeMult));
			}
		}
	}
	
	// Running animation.
	this.runAnim = function() {
		if (this.animTick > 0) this.animTick--;
		else {
			if (this.carryObj > -1) this.animFrame -= 3;
			if (this.animFrame == 0) this.animFrame = this.animNext + 1;
			else {
				this.animFrame = 0;
				this.animNext = !this.animNext;
				snd_maid_step.play();
			}
			if (this.carryObj > -1) this.animFrame += 3;
			this.animTick = Math.round(.025 * timeMult);
		}
	}
	
	// Quick service.
	this.quickService = function() {
		this.serveLast = 5 * timeMult;
		this.serveQuick++;
		if (this.serveQuick >= 3 && specialGuest[15] == 0) specialGuest[15] = 1;
	}
	
	// Draw.
	this.drawMaid = function() {
		if (gameLevel > 0 && !gameWin && !gameLose) this.maidRun();
		gameCanvas.context.drawImage(spr_shadow, this.x + 12, this.y + 58);
		gameCanvas.context.drawImage(spr_maidtchi, 62 * this.animFrame, 64 * this.animFlip, 62, 64, this.x, this.y, 62, 64);
		if (this.carryObj > -1 && this.animFrame != 6) {
			if (this.animFlip) tempX = this.x - 16;
			else tempX = this.x + 44;
			gameCanvas.context.drawImage(spr_item[0], 34 * this.carryObj, 0, 34, 34, tempX, this.y + 24, 34, 34);
		}
	}
}