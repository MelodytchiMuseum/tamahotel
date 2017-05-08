// General method.
function mouseAct() {
	// Difficulty menu.
	if (gameLevel == 0 && mouseClick == 2 && mouseX <= 140) {
		if (mouseY >= 76 && mouseY <= 127) gameLevel = 1;
		else if (mouseY >= 144 && mouseY <= 195) gameLevel = 2;
		else if (mouseY >= 212 && mouseY <= 263) gameLevel = 3;
		if (gameLevel > 0) snd_menu_confirm.play();
	}
	
	// Lose menu retry.
	if (gameLose && mouseClick == 2 && mouseX < 142 && mouseY >= 32 && mouseY < 84) {
		snd_menu_confirm.play();
		resetGame();
	}
	
	// Win menu retry.
	if (gameWin && mouseClick == 2 && mouseX >= 498 && mouseY >= 64 && mouseY < 116) resetGame();
	
	// Viewing menu items.
	if (gameLevel > 0 && mouseY >= 484) {
		if (mouseY < 534) {
			for (i = 0; i < 11; i++) {
				if (mouseX >= 2 + (i * 58) && mouseX < 56 + (i * 58)) menuDisplay = i;
			}
		}
		else if (mouseY >= 538) {
			for (i = 0; i < 11; i++) {
				if (mouseX >= 2 + (i * 58) && mouseX < 56 + (i * 58)) menuDisplay = i + 11;
			}
		}
	}
	
	// Viewing rooms.
	else if (gameLevel > 0 && mouseY < 484) {
		for (i = 0; i < gameRoom.length; i++) {
			if (mouseX >= gameRoom[i].x && mouseX < gameRoom[i].x + 192 && mouseY >= gameRoom[i].y && mouseY < gameRoom[i].y + 128 && gameRoom[i].roomGuest != null) {
				menuName = gameRoom[i].roomGuest.guestId;
				menuRoom = i;
			}
		}
	}
	
	// Selecting menu items.
	if (menuDisplay > -1 && mouseClick == 2 && gameLevel > 0 && !gameWin && !gameLose) {
		snd_menu_select.play();
		gameSelect = menuDisplay;
	}
	
	// Selecting a room.
	else if (menuName > -1 && mouseClick == 2 && gameLevel > 0 && !gameWin && !gameLose) {
		if (gameRoom[menuRoom].roomGuest.sleeping || (gameRoom[menuRoom].roomGuest.foodCarry > -1 && gameSelect != 10 && gameSelect != 21) || gameMaid.roomGoal > -1 || gameMaid.x < 640 || gameRoom[menuRoom].roomGuest.careMiss >= 3) snd_menu_invalid.play();
		else {
			snd_menu_confirm.play();
			if (menuRoom < 3) gameMaid.y = 228;
			else gameMaid.y = 396;
			gameMaid.roomGoal = menuRoom;
			gameMaid.animFlip = true;
			gameMaid.x = 640;
			if (gameSelect != 10) {
				gameMaid.carryObj = gameSelect;
				gameMaid.animFrame = 3;
			}
			else {
				gameMaid.carryObj = -1;
				gameMaid.animFrame = 0;
			}
		}
	}
	
	// Special guest requirements.
	if (menuName == 0 && menuDisplay == -1) specialGuest[4] += (timeMultDef / timeMult);
	else if (mouseY < 96 && mouseClick == 2 && specialGuest[7] == 0) {
		tWR = checkGuestRoom(7);
		if (tWR > -1) {
			if (gameRoom[tWR].roomGuest.sleeping) {
				snd_menu_confirm.play();
				specialGuest[7] = 1;
			}
		}
	}
	else if (menuName == -1 && menuDisplay > -1) specialGuest[16] += (timeMultDef / timeMult);
	
	// Lift click.
	if (mouseClick == 2) mouseClick = 1;
}