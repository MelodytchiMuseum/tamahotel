// Function for more convenient sprite loading.
function loadSpr(file) {
	this.tempRe = new Image();
	this.tempRe.src = "spr/" + file + ".png";
	return (tempRe);
}

// Hotel.
var spr_hotel_full = loadSpr("hotel_full");
var spr_hotel_room = loadSpr("hotel_room");
var spr_hotel_bed = loadSpr("hotel_bed");
var spr_hotel_opendoor = loadSpr("hotel_opendoor");
var spr_hotel_trash = loadSpr("hotel_trash");
var spr_hotel_sleep = loadSpr("hotel_sleep");
var spr_hotel_call = loadSpr("hotel_call");

// Sky.
var spr_sky_day = loadSpr("sky_day");
var spr_sky_eve = loadSpr("sky_evening");
var spr_sky_night = loadSpr("sky_night");

// Menus.
var spr_menu_level = loadSpr("menu_level");
var spr_menu_name = loadSpr("menu_name");
var spr_menu_bottom = loadSpr("menu_bottom");
var spr_menu_icon = loadSpr("menu_icon");
var spr_menu_guest = loadSpr("menu_guest");
var spr_menu_action = loadSpr("menu_action");
var spr_menu_time = loadSpr("menu_time");
var spr_menu_lose = loadSpr("menu_lose");
var spr_menu_win = loadSpr("menu_win");

// Guests.
var spr_guest = [];
spr_guest.push(loadSpr("guest_mero"));
spr_guest.push(loadSpr("guest_makiko"));
spr_guest.push(loadSpr("guest_kira"));
spr_guest.push(loadSpr("guest_piani"));
spr_guest.push(loadSpr("guest_decora"));
spr_guest.push(loadSpr("guest_kuro"));
spr_guest.push(loadSpr("guest_chama"));
spr_guest.push(loadSpr("guest_wata"));
spr_guest.push(loadSpr("guest_imo"));
spr_guest.push(loadSpr("guest_andro"));
spr_guest.push(loadSpr("guest_coffre"));
spr_guest.push(loadSpr("guest_ane"));
spr_guest.push(loadSpr("guest_nyoro"));
spr_guest.push(loadSpr("guest_meme"));
spr_guest.push(loadSpr("guest_yuki"));
spr_guest.push(loadSpr("guest_gozaru"));
spr_guest.push(loadSpr("guest_uwasa"));
spr_guest.push(loadSpr("guest_black"));
spr_guest.push(loadSpr("guest_nanomero"));
spr_guest.push(loadSpr("guest_usnyoro"));
spr_guest.push(loadSpr("guest_akagozaru"));

// Items.
var spr_item = [];
spr_item.push(loadSpr("item_form1"));
spr_item.push(loadSpr("item_form2"));
spr_item.push(loadSpr("item_form3"));

// Maidtchi.
var spr_maidtchi = loadSpr("maidtchi");