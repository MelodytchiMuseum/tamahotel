// Guest.
function objGuest(room, id) {
	// Variables.
	this.x = room.x + 125;
	this.y = room.y + 97;
	this.targetX = this.x - 8;
	this.targetY = this.y + 24;
	this.nextWalk = (2 * timeMult) + Math.round((Math.random() * 3) * timeMult);
	this.animFrame = 0;
	this.animTick = 0;
	this.animFlip = false;
	this.animNext = 0;
	this.room = room;
	this.careMiss = 0;
	this.mad = 0;
	this.guestId = id;
	this.sleeping = false;
	this.sleepStart = [];
	this.sleepEnd = [];
	this.sleepTimer = 0;
	this.sleepFrame = 0;
	this.foodCarry = -1;
	this.foodState = 0;
	this.foodEat = false;
	this.foodWant = false;
	this.frameWidth = spr_guest[this.guestId].width / 8;
	this.frameHeight = spr_guest[this.guestId].height / 2;
	
	// Food stuff.
	this.previousMeal = 2;
	this.lossDessert = 0;
	this.previousMidsnack = true;
	this.previousDessert = false;
	this.callType = -1;
	this.callTime = 0;
	this.mealLoss = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	
	// Setting sleep times (sorry this is long).
	this.sleepStart.push(22); this.sleepEnd.push(7); // Melodytchi
	this.sleepStart.push(22.5); this.sleepEnd.push(8); // Makiko
	this.sleepStart.push(20); this.sleepEnd.push(6.5); // Kiramotchi
	this.sleepStart.push(21); this.sleepEnd.push(7); // Pianitchi
	this.sleepStart.push(19.5); this.sleepEnd.push(6); // Decoratchi
	this.sleepStart.push(23); this.sleepEnd.push(10); // Kuromametchi
	this.sleepStart.push(20); this.sleepEnd.push(6.5); // Chamametchi
	this.sleepStart.push(21.5); this.sleepEnd.push(8.5); // Watawatatchi
	this.sleepStart.push(20.5); this.sleepEnd.push(8.25); // Imotchi
	this.sleepStart.push(23.5); this.sleepEnd.push(11); // Androtchi
	this.sleepStart.push(21.25); this.sleepEnd.push(7.75); // Coffretchi
	this.sleepStart.push(23); this.sleepEnd.push(7); // Anemoriritchi
	this.sleepStart.push(24); this.sleepEnd.push(11); // Nyorotchi
	this.sleepStart.push(21); this.sleepEnd.push(8.5); // Memetchi
	this.sleepStart.push(22.75); this.sleepEnd.push(9.25); // Yukinkotchi
	this.sleepStart.push(23.25); this.sleepEnd.push(9.25); // Gozarutchi
	this.sleepStart.push(23); this.sleepEnd.push(8.75); // Uwasatchi
	this.sleepStart.push(23); this.sleepEnd.push(7); // Black Hat
	this.sleepStart.push(22); this.sleepEnd.push(7); // Nano Melodytchi
	this.sleepStart.push(24); this.sleepEnd.push(11); // USA Nyorotchi
	this.sleepStart.push(23.25); this.sleepEnd.push(9.25); // Aka Gozarutchi
	this.sleepStart.push(22); this.sleepEnd.push(7); // My Friend
	this.sleepStart.push(22); this.sleepEnd.push(7); // Investigator Mero
	this.sleepStart.push(22.5); this.sleepEnd.push(8); // Jigoku Queen
	this.sleepStart.push(20); this.sleepEnd.push(6.5); // Super Chama Girl
	this.sleepStart.push(21.5); this.sleepEnd.push(8.5); // Watawata Kaguya Hime
	this.sleepStart.push(24); this.sleepEnd.push(11); // Kusatchi
	this.sleepStart.push(23); this.sleepEnd.push(9); // Masktchi
	this.sleepStart.push(20.5); this.sleepEnd.push(7); // Young Androtchi
	this.sleepStart.push(21); this.sleepEnd.push(8.5); // Ura Memetchi
	this.sleepStart.push(24); this.sleepEnd.push(1); // Peridot
	this.sleepStart.push(23); this.sleepEnd.push(6); // Foo Fighters
	this.sleepStart.push(22); this.sleepEnd.push(7); // Meiko
	this.sleepStart.push(24); this.sleepEnd.push(1); // Probe
	this.sleepStart.push(20); this.sleepEnd.push(6); // R.Suzuki
	
	// Doing stuff.
	this.guestAct = function() {
		// Not sleeping.
		if (this.sleeping) {
			snd_light_switch.play();
			this.previousMeal = 0;
			this.previousMidsnack = false;
			this.previousDessert = false;
			for (g = 0; g < 6; g++) {
				if (this.mealLoss[g] > 0) this.mealLoss[g]--;
			}
		}
		this.sleeping = false;
		this.sleepTimer = 0;
		
		// Mad.
		if (this.guestMad > 0) this.guestMad--;
		
		// Calling for service.
		if (this.callType == -1 && this.careMiss < 3 && !this.foodEat) {
			this.tempInt = (this.sleepStart[this.guestId] - this.sleepEnd[this.guestId]) / 6;
			if (this.previousMeal < 1 && getTime() >= this.sleepEnd[this.guestId] + (this.tempInt * 1) && gameLevel > 1) {this.serviceCall(0); this.previousMeal = 1;}
			else if (this.previousMeal < 2 && getTime() >= this.sleepEnd[this.guestId] + (this.tempInt * 2) && gameLevel == 3) {this.serviceCall(0); this.previousMeal = 2;}
			else if (!this.previousMidsnack && getTime() >= this.sleepEnd[this.guestId] + (this.tempInt * 3) && gameLevel == 3) {this.serviceCall(1); this.previousMidsnack = true;}
			else if (this.previousMeal < 3 && getTime() >= this.sleepEnd[this.guestId] + (this.tempInt * 4)) {this.serviceCall(0); this.previousMeal = 3;}
			else if (!this.previousDessert && getTime() >= this.sleepEnd[this.guestId] + (this.tempInt * 5)) {this.serviceCall(1); this.previousDessert = true;}
			else if (this.lossDessert > 0 && this.foodCarry == -1) {
				this.lossDessert--;
				if (this.lossDessert <= 0) this.serviceCall(1);
			}
		}
		
		// Service call timing out.
		if (this.callType > -1) {
			if (this.callTime > 0) this.callTime--;
			else {
				this.callType = -1;
				if (!noMiss) this.getCareMiss();
			}
		}
		
		// Eating.
		if (this.foodEat) {
			if (this.animFrame != 3 && this.animFrame != 4) {
				this.animTick = Math.round(timeMult * 1);
				this.animFrame = 3;
			}
			else {
				if (this.animTick > 0) this.animTick--;
				else {
					if (this.animFrame == 3) {
						if (this.foodWant && this.foodState < 2) {
							if (this.foodState < 2) {
								this.animFrame = 4;
								this.animTick = Math.round(timeMult * .25);
								this.foodState++;
								snd_guest_eat.play();
							}
						}
						else {
							this.animTick = 0;
							this.targetX = this.room.x + 96;
							this.targetY = this.room.y + 106;
							this.foodEat = false;
							if (!this.foodWant) this.mad = 2.5 * timeMult;
						}
					}
					else {
						this.animFrame = 3;
						this.animTick = Math.round(timeMult * .25);
					}
				}
			}
		}
		
		// Walking.
		else if (this.x != this.targetX || this.y != this.targetY) {
			// Animation.
			if (this.targetX < this.x) this.animFlip = true;
			else if (this.targetX > this.x) this.animFlip = false;
			if (this.animTick > 0) this.animTick--;
			else {
				if (this.guestMad > 0 || this.careMiss >= 3) this.animFrame -= 5;
				if (this.animFrame == 0) this.animFrame = this.animNext + 1;
				else {
					this.animFrame = 0;
					this.animNext = !this.animNext;
				}
				if (this.guestMad > 0 || this.careMiss >= 3) this.animFrame += 5;
				this.animTick = .05 * timeMult;
			}
			
			// Movement.
			tempDiv = Math.abs(this.targetX - this.x) + Math.abs(this.targetY - this.y);
			this.x += ((this.targetX - this.x) / tempDiv) / (1.5 * getTimeMult());
			this.y += ((this.targetY - this.y) / tempDiv) / (1.5 * getTimeMult());
			
			// Snapping.
			if (Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2)) < 1 / getTimeMult()) {
				this.targetX = this.x;
				this.targetY = this.y;
				if (this.careMiss >= 3) {
					snd_guest_leave.play();
					gameLeave++;
					this.room.roomEmpty();
					checkLose();
				}
				else if (this.foodCarry > -1) this.trashFood();
			}
		}
		
		// Standing around.
		else {
			this.animTick = 0;
			if (this.guestMad > 0 || this.careMiss >= 3) this.animFrame = 5;
			else this.animFrame = 0;
			if (this.nextWalk > 0) this.nextWalk--;
			else if (this.careMiss < 3) {
				this.targetX = this.room.x + 64 + Math.round(Math.random() * 94);
				this.targetY = this.room.y + 106 + Math.round(Math.random() * 20);
				this.nextWalk = (2 * timeMult) + Math.round((Math.random() * 3) * timeMult);
			}
		}
	}
	
	// Issuing a care miss.
	this.getCareMiss = function() {
		this.careMiss++;
		this.guestMad = timeMult * 10;
		snd_care_miss.play();
		gameMiss++;
		if (this.careMiss >= 3) {
			this.foodCarry = -1;
			this.room.stateDoor = 99 * timeMult;
			this.targetX = this.room.x + 125;
			this.targetY = this.room.y + 97;
		}
	}
	
	// Calling for service.
	this.serviceCall = function(callType) {
		this.callType = callType;
		this.callTime = (25 - (gameLevel * 5)) * timeMult;
		snd_guest_call.play();
	}
	
	// Receiving food.
	this.foodReceive = function(foodGet) {
		this.foodCarry = foodGet;
		this.foodState = 0;
		this.foodEat = true;
		if (this.mealLoss[foodGet] >= 3) {
			this.foodWant = false;
			this.lossDessert = 5 * timeMult;
		}
		else this.foodWant = true;
		if (this.callType == -1) this.foodWant = false;
		else if ((foodGet < 10 && this.callType == 0) || (foodGet > 10 && this.callType == 1)) this.callType = -1;
		else this.foodWant = false;
		if (foodGet < 10 && this.foodWant) this.mealLoss[foodGet]++;
		this.specialFood();
	}
	
	// Throwing garbage away.
	this.trashFood = function() {
		snd_guest_trash.play();
		this.room.stateTrash++;
		if (this.room.stateTrash > 5) this.getCareMiss();
		this.foodCarry = -1;
	}
	
	// Special guests enabled by food.
	this.specialFood = function() {
		if (this.guestId == 0 && this.foodCarry != 0 && this.foodCarry != 11) disableSpecial(0);
		if (this.guestId == 12 && this.foodCarry != 4 && this.foodCarry != 5 && this.foodCarry < 10) disableSpecial(1);
		if (this.guestId == 15 && this.foodCarry != 12 && this.foodCarry > 10) disableSpecial(2);
		if (this.guestId == 1 && this.foodCarry != 1 && this.foodCarry < 10) disableSpecial(5);
		if (this.foodCarry == 4 && this.foodWant) specialGuest[8]++;
		if (this.guestId == 9 && this.foodCarry != 9 && this.foodCarry < 10) disableSpecial(10);
		if (this.guestId == 13 && this.foodCarry != 14 && this.foodCarry != 17 && this.foodCarry > 10) disableSpecial(11);
		if (this.foodCarry == 8 && this.foodWant) specialGuest[12]++;
		if (this.foodCarry == 6 && this.foodWant) specialGuest[13]++;
		if (this.foodCarry == 12 && this.foodWant) specialGuest[14]++;
	}
	
	// Draw.
	this.drawGuest = function() {
		// Asleep.
		if ((getTime() >= this.sleepStart[this.guestId] || getTime() < this.sleepEnd[this.guestId]) && this.careMiss < 3 && this.foodCarry == -1 && gameRoom[gameMaid.roomGoal] != this.room) {
			// Bedsheets.
			if (!this.sleeping) {
				if (this.room.stateBed == 1) this.room.stateBed = 2;
				else if (!noMiss) this.getCareMiss();
			}
		
			// Dark.
			if (this.careMiss < 3) {
				if (!this.sleeping) snd_light_switch.play();
				gameCanvas.context.drawImage(spr_hotel_room, 384, 0, 192, 128, this.room.x, this.room.y, 192, 128);
				this.sleeping = true;
				this.sleepTimer++;
			}
			
			// Z.
			if (this.sleepTimer / timeMult >= 3) {
				gameCanvas.context.drawImage(spr_hotel_sleep, 24 * this.sleepFrame, 0, 24, 24, this.room.x + 66, this.room.y + 52, 24, 24);
				if (this.sleepTimer / timeMult >= 4) {
					this.sleepTimer = timeMult * 3;
					this.sleepFrame = !this.sleepFrame;
					this.x = this.room.x + 64;
					this.y = this.room.y + 112;
					this.targetX = this.x + 16 + Math.round(Math.random() * 64);
					this.targetY = this.y + 2 + Math.round(Math.random() * 8);
				}
			}
		}
		
		// Awake.
		else {
			// Self.
			if (gameLevel > 0 && !gameWin && !gameLose) this.guestAct();
			gameCanvas.context.drawImage(spr_shadow, this.x - 19, this.y - 6);
			gameCanvas.context.drawImage(spr_guest[this.guestId], this.frameWidth * this.animFrame, this.frameHeight * this.animFlip, this.frameWidth, this.frameHeight, this.x - (this.frameWidth / 2), this.y - this.frameHeight, this.frameWidth, this.frameHeight);
			if (this.foodCarry > -1) {
				if (this.animFlip) tempX = this.x - (this.frameWidth / 5) - 32;
				else tempX = this.x + (this.frameWidth / 5) - 2;
				gameCanvas.context.drawImage(spr_item[this.foodState], 34 * this.foodCarry, 0, 34, 34, tempX, this.y - 34, 34, 34);
			}
			
			// Service calls.
			if (this.callType > -1) gameCanvas.context.drawImage(spr_hotel_call, 56 * this.callType, 0, 56, 30, this.room.x + 68, this.room.y, 56, 30);
			else if (gameLevel == 1) {
				if (this.room.stateTrash >= 4) gameCanvas.context.drawImage(spr_hotel_call, 112, 0, 56, 30, this.room.x + 68, this.room.y, 56, 30);
				else if (this.room.stateBed != 1) gameCanvas.context.drawImage(spr_hotel_call, 168, 0, 56, 30, this.room.x + 68, this.room.y, 56, 30);
			}
		}
	}
}