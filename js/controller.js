// Global variables.
var timeMult = 60;
var gameHour = 12;
var gameNextHour = (timeMult * 20);
var gameLevel = 0;
var gameWin = false;
var gameLose = false;
var gameRoom = [];
var gameSelect = 0;
var gamePreMiss = 0;
var gameMiss = 0;
var gamePassFirstDay = false;
var gameLeave = 0;
var gameMaid;
var menuDisplay = -1;
var menuName = -1;
var menuRoom = -1;
var mouseClick = false;
var mouseX = 0;
var mouseY = 0;
var tempList = [];

// Special guests.
var specialGuest = [0, 0, 0];

// Gameplay.
function controlGameplay() {
	// Time's a tickin'.
	if (gameNextHour < (timeMult * 25)) gameNextHour++;
	else {
		gameNextHour = 0;
		if (gameHour < 24) gameHour++;
		else {
			gameHour = 1;
			gamePreMiss = gameMiss;
			gameMiss = 0;
			gamePassFirstDay = true;
			resetSpecial();
		}
		if (gameHour == 13) {
			tempFreeRoom = -1;
			tempLeaving = false;
			for (i = 0; i < gameRoom.length; i++) {
				if (tempFreeRoom == -1 && gameRoom[i].roomGuest == null) tempFreeRoom = i;
				if (gameRoom[i].roomGuest != null) {
					if (gameRoom[i].roomGuest.careMiss >= 3) tempLeaving = true;
				}
			}
			if (!tempLeaving && tempFreeRoom == -1) {
				gameWin = true;
				snd_game_win.play();
			}
			else newGuest(tempFreeRoom);
		}
	}
}

// Setting up rooms.
function setRooms() {
	gameMaid = new objMaid();
	gameRoom.push(new objRoom(34, 146, 0));
	gameRoom.push(new objRoom(228, 146, 1));
	gameRoom.push(new objRoom(422, 146, 0));
	gameRoom.push(new objRoom(34, 314, 1));
	gameRoom.push(new objRoom(228, 314, 0));
	gameRoom.push(new objRoom(422, 314, 1));
}

// Reset game.
function resetGame() {
	gameHour = 12;
	gameNextHour = (timeMult * 12.5);
	gameLevel = 0;
	gameWin = false;
	gameLose = false;
	gamePreMiss = 0;
	gameMiss = 0;
	gameLeave = 0;
	gamePassFirstDay = false;
	resetSpecialReplay();
	for (i = 0; i < gameRoom.length; i++) {
		gameRoom[i].roomEmpty();
	}
}

// New guest.
function newGuest(toRoom) {
	// Deciding on guest.
	tempGuest = -1;
	tempList = [];
	console.log("Previous day care misses: " + gamePreMiss);

	// Initial Mero.
	if (!gamePassFirstDay) tempGuest = 0;
	
	// Other guests.
	else {
		// Special guests.
		if (specialGuest[0] < 2 && !checkForGuest(18) && checkForGuest(0) && gamePreMiss == 0) tempList.push(18);
		if (specialGuest[1] < 2 && !checkForGuest(19) && checkForGuest(12) && gamePreMiss == 0) tempList.push(19);
		if (specialGuest[2] < 2 && !checkForGuest(20) && checkForGuest(15) && gamePreMiss == 0) tempList.push(20);
		if (gameLevel > 1 && tempList.length > 0) {
			console.log("Possible guests: " + tempList);
			tempSel = Math.round(Math.random() * (tempList.length - 1));
			tempGuest = tempList[tempSel];
		}
		
		// Care-based.
		else {
			if (gamePreMiss == 0) tJ = 0;
			else if (gamePreMiss == 1) tJ = 6;
			else tJ = 12;
			for (j = tJ; j < tJ + 6; j++) {
				if (!checkForGuest(j)) tempList.push(j);
			}
			console.log("Possible guests: " + tempList);
			tempSel = Math.round(Math.random() * (tempList.length - 1));
			tempGuest = tempList[tempSel];
		}
	}
	
	// Adding guest.
	console.log("Guest joined: " + tempGuest);
	gameRoom[toRoom].roomGuest = new objGuest(gameRoom[toRoom], tempGuest);
	gameRoom[toRoom].stateDoor = timeMult;
	snd_guest_enter.play();
}

// Check rooms for a guest.
function checkForGuest(toGuest) {
	tempRe = false;
	for (i = 0; i < gameRoom.length; i++) {
		if (gameRoom[i].roomGuest != null) {
			if (gameRoom[i].roomGuest.guestId == toGuest) tempRe = true;
		}
	}
	return(tempRe);
}

// Check lose.
function checkLose() {
	if (gameLeave >= 3) gameLose = true;
	else {
		tempGuest = 0;
		for (i = 0; i < gameRoom.length; i++) {
			if (gameRoom[i].roomGuest != null) tempGuest++;
		}
		if (tempGuest == 0) gameLose = true;
	}
	if (gameLose) snd_game_lose.play();
}

// Getting relative time.
function getTime() {
	return(gameHour + Math.min(gameNextHour / (timeMult * 25), .99));
}

// Reset special guest conditions.
function resetSpecial() {
	for (i = 0; i < specialGuest.length; i++) {
		if (specialGuest[i] == 3 || specialGuest[i] == 1) specialGuest[i] = 2;
		else specialGuest[i] = 0;
	}
}

// Reset special guest conditions (replay).
function resetSpecialReplay() {
	for (i = 0; i < specialGuest.length; i++) {
		specialGuest[i] = 0;
	}
}

// Disabling a special guest.
function disableSpecial(tG) {
	if (specialGuest[tG] == 0) specialGuest[tG] = 1;
	else if (specialGuest[tG] == 2) specialGuest[tG] = 3;
}