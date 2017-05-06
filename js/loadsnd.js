// Function for more convenient sound loading.
function loadSnd(file, ismusic) {
	if (ismusic) {this.tempRe = new Music("snd/" + file + ".ogg");}
	else {this.tempRe = new Sound("snd/" + file + ".ogg");}
	return (tempRe);
}

// Loading sounds.
var snd_care_miss = loadSnd("care_miss");
var snd_game_lose = loadSnd("game_lose");
var snd_game_win = loadSnd("game_win");
var snd_guest_call = loadSnd("guest_call");
var snd_guest_eat = loadSnd("guest_eat");
var snd_guest_enter = loadSnd("guest_enter");
var snd_guest_leave = loadSnd("guest_leave");
var snd_guest_trash = loadSnd("guest_trash");
var snd_light_switch = loadSnd("light_switch");
var snd_menu_confirm = loadSnd("menu_confirm");
var snd_menu_select = loadSnd("menu_select");
var snd_menu_invalid = loadSnd("menu_invalid");
var snd_maid_step = loadSnd("maid_step");
var snd_maid_food = loadSnd("maid_food");
var snd_maid_clean = loadSnd("maid_clean");