// Interval function.
function gameInterval() {
	// Clearing.
	gameCanvas.clear();
	
	// Mouse stuff.
	menuDisplay = -1;
	menuName = -1;
	menuRoom = -1;
	mouseAct();
	
	// Game control.
	if (gameLevel > 0 && !gameWin && !gameLose) controlGameplay();
	
	// Drawing sky and hotel. 
	if (gameHour <= 4 || gameHour >= 21) gameCanvas.context.drawImage(spr_sky_night, 0, 0);
	else if (gameHour <= 6 || gameHour >= 19) gameCanvas.context.drawImage(spr_sky_eve, 0, 0);
	else gameCanvas.context.drawImage(spr_sky_day, 0, 0);
	gameCanvas.context.drawImage(spr_hotel_full, 0, 96);
	
	// Drawing bottom menu.
	gameCanvas.context.drawImage(spr_menu_bottom, 0, 482);
	if (gameSelect <= 10) gameCanvas.context.drawImage(spr_menu_icon, 34 * gameSelect, 0, 34, 34, 12 + (58 * gameSelect), 484 + ((gameSelect == 10) * 2), 34, 34);
	else gameCanvas.context.drawImage(spr_menu_icon, 34 * (gameSelect - 11), 34, 34, 34, 12 + (58 * (gameSelect - 11)), 554, 34, 34);
	
	// Drawing time.
	if (gameHour < 13) gameCanvas.context.drawImage(spr_menu_time, 84 * (gameHour - 1), 0, 84, 44, 554, 2, 84, 44);
	else gameCanvas.context.drawImage(spr_menu_time, 84 * (gameHour - 13), 44, 84, 44, 554, 2, 84, 44);
	
	// Drawing menu name.
	if (menuDisplay > -1 || menuName > -1) gameCanvas.context.drawImage(spr_menu_name, 2, 2);
	if (menuDisplay > -1) gameCanvas.context.drawImage(spr_menu_action, 0, menuDisplay * 18, 240, 18, 16, 16, 240, 18);
	if (menuName > -1) gameCanvas.context.drawImage(spr_menu_guest, 0, menuName * 18, 240, 18, 16, 16, 240, 18);
	
	// Drawing rooms.
	for (i = 0; i < gameRoom.length; i++) {
		gameRoom[i].drawRoom();
	}
	
	// Drawing Maidtchi.
	gameMaid.drawMaid();
	
	// Drawing intermission menus.
	if (gameLevel == 0) gameCanvas.context.drawImage(spr_menu_level, 0, 0);
	else if (gameLose) gameCanvas.context.drawImage(spr_menu_lose, 0, 0);
	else if (gameWin) gameCanvas.context.drawImage(spr_menu_win, 0, 0);
}