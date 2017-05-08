// Global variables.
var timeMultDef = 60;
var timeMult = timeMultDef;
var gameHour = 12;
var gameNextHour = (timeMultDef * 20);
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
var noMiss = false;
var forceGuest = -1;

// Special guests.
var specialCred = [false, false, false, false, false];
var specialGuest = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var specialType = [0, 0, 0, -1, 1, 1, 0, -1, 1, -1, 0, 0, 1, 1, 1, 1, 1]; // 0: Food based - 1: Total based
var specialPre = specialGuest.slice();

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

	// Forcing a guest.
	if (forceGuest > -1) {
		tempGuest = forceGuest;
		forceGuest = -1;
	}
	
	// Initial Mero.
	else if (!gamePassFirstDay) tempGuest = 0;
	
	// Other guests.
	else {
		// Special guests.
		if (specialGuest[0] < 2 && !checkForGuest(18) && checkForGuest(0)) tempList.push(18); // Nano Mero
		if (specialGuest[1] < 2 && !checkForGuest(19) && checkForGuest(12)) tempList.push(19); // US Nyorotchi
		if (specialGuest[2] < 2 && !checkForGuest(20) && checkForGuest(15)) tempList.push(20); // Aka Gozarutchi
		if (checkGoodGuest() == 5 && gameLeave == 0 && gameLevel == 3 && !checkForGuest(21)) tempList.push(21); // My Friend
		if (specialPre[4] >= timeMultDef * timeMultDef && !checkForGuest(22)) tempList.push(22); // Investigator Mero
		if (specialGuest[5] < 2 && !checkForGuest(23) && checkForGuest(1)) tempList.push(23); // Jigoku Queen
		if (checkForGuest(6) && checkGuests() == 4 && !checkForGuest(24)) tempList.push(24); // Super Chama Girl
		if (specialPre[7] > 0 && !checkForGuest(25)) tempList.push(25); // Watawata Kaguya Hime
		if (specialPre[8] >= 5 && !checkForGuest(26)) tempList.push(26); // Kusatchi
		if (checkForGuest(15) && !checkForGuest(27)) tempList.push(27); // Masktchi
		if (specialGuest[10] < 2 && !checkForGuest(28) && checkForGuest(9)) tempList.push(28); // Young Androtchi
		if (specialGuest[11] < 2 && !checkForGuest(29) && checkForGuest(13)) tempList.push(29); // Ura Memetchi
		if (specialPre[12] >= 5 && !checkForGuest(30)) tempList.push(30); // Peridot
		if (specialPre[13] >= 5 && !checkForGuest(31)) tempList.push(31); // Foo Fighters
		if (specialPre[14] >= 3 && !checkForGuest(32)) tempList.push(32); // Meiko
		if (specialPre[15] > 0 && !checkForGuest(33)) tempList.push(33); // Probe
		if (specialPre[16] >= (timeMultDef * 2) * timeMultDef && !checkForGuest(34)) tempList.push(34); // R.Suzuki
		if (gameLevel > 1 && tempList.length > 0 && gamePreMiss == 0) {
			console.log("Possible guests: " + tempList);
			tempSel = Math.round(Math.random() * (tempList.length - 1));
			tempGuest = tempList[tempSel];
			if (tempGuest == 30 && !specialCred[tempGuest - 30]) updateOwner("<br>Peridot is owned by Cartoon Network.");
			else if (tempGuest == 31 && !specialCred[tempGuest - 30]) updateOwner("<br>Foo Fighters is owned by Hirohiko Araki.");
			else if (tempGuest == 32 && !specialCred[tempGuest - 30]) updateOwner("<br>Meiko is owned by Crypton Future Media.");
			else if (tempGuest == 33 && !specialCred[tempGuest - 30]) updateOwner("<br>Probe is owned by Blizzard Entertainment.");
			else if (tempGuest == 34 && !specialCred[tempGuest - 30]) updateOwner("<br>R.Suzuki is owned by Sony Interactive Entertainment.");
			if (tempGuest >= 30) specialCred[tempGuest - 30] = true;
		}
		
		// Care-based.
		else {
			tempList = [];
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

// Checking amount of guests.
function checkGuests() {
	tempRe = 0;
	for (i = 0; i < gameRoom.length; i++) {
		if (gameRoom[i].roomGuest != null) tempRe++;
	}
	return(tempRe);
}

// Finding guest's room.
function checkGuestRoom(toGuest) {
	tempRe = -1;
	for (i = 0; i < gameRoom.length; i++) {
		if (gameRoom[i].roomGuest != null) {
			if (gameRoom[i].roomGuest.guestId == toGuest) tempRe = i;
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
	specialPre = specialGuest.slice();
	for (i = 0; i < specialGuest.length; i++) {
		if (specialType[i] == 0) {
			if (specialGuest[i] == 3 || specialGuest[i] == 1) specialGuest[i] = 2;
			else specialGuest[i] = 0;
		}
		else if (specialType[i] == 1) specialGuest[i] = 0;
	}
}

// Reset special guest conditions (replay).
function resetSpecialReplay() {
	for (i = 0; i < specialGuest.length; i++) {
		specialGuest[i] = 0;
	}
	specialPre = specialGuest.slice();
}

// Disabling a special guest.
function disableSpecial(tG) {
	if (specialGuest[tG] == 0) specialGuest[tG] = 1;
	else if (specialGuest[tG] == 2) specialGuest[tG] = 3;
}

// Get time multiplier.
function getTimeMult() {
	return(timeMult / timeMultDef);
}

// Update ownership.
function updateOwner(addStr) {
	document.getElementById("credits").innerHTML += addStr;
}

// Check for the amount of good care guests.
function checkGoodGuest() {
	tRe = 0;
	for (T = 0; T < 6; T++) {
		if (checkForGuest(T)) tRe++;
	}
	for (T = 18; T < 35; T++) {
		if (checkForGuest(T)) tRe++;
	}
	return(tRe);
}

/////////////////
// DEBUG STUFF //
/////////////////

// Checking stats.
function check() {
	console.log("Today's special guest requirements: " + specialGuest);
	console.log("Yesterday's special guest requirements: " + specialPre);
	return("Check complete.");
}

// Setting hour.
function hour(T) {
	gameHour = T;
	gameNextHour = 0;
	return("Time set.");
}

// Forcing guest.
function force(T) {
	forceGuest = T;
	return("Forced guest.");
}

// Restart game.
function reset() {
	resetGame();
	return("Reset game.");
}