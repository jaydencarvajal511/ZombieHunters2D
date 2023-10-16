//////////////////* VARIABLES */////////////////////

//image variables
let shotgunImg;
let exitImg;
let gameLogo;
let gearImg;
let notesImg;
let guideImg;
let medkitImg;
let coinImg;
let teleportImg;
let musketImg;
let bombTexture;
let grenadeImg;
let minigunImg;
let dirt;

//audio variables
let pistolShot;
let reloadPistol;
let drawKnife;
let swingKnife;
let drawRevolver;
let musketShot;
let shotgunShot;
let minigunFiring = false;

// audio levels
if (localStorage.getItem("shotgunSoundFX") !== null) {
  shotgunSoundFXVolume = Number(localStorage.getItem("shotgunSoundFX")) / 100;
} else {
  shotgunSoundFXVolume = 1;
}
if (localStorage.getItem("revolverSoundFX") !== null) {
  revolverSoundFXVolume = Number(localStorage.getItem("revolverSoundFX")) / 100;
} else {
  revolverSoundFXVolume = 1;
}
if (localStorage.getItem("musketSoundFX") !== null) {
  musketSoundFXVolume = Number(localStorage.getItem("musketSoundFX")) / 100;
} else {
  musketSoundFXVolume = 1;
}
if (localStorage.getItem("knifeSoundFX") !== null) {
  knifeSoundFXVolume = Number(localStorage.getItem("knifeSoundFX")) / 100;
} else {
  knifeSoundFXVolume = 1;
}
if (localStorage.getItem("shotgunEquipSoundFX") !== null) {
  shotgunEquipSoundFXVolume = Number(localStorage.getItem("shotgunEquipSoundFX")) / 100;
} else {
  shotgunEquipSoundFXVolume = 1;
}
if (localStorage.getItem("revolverEquipSoundFX") !== null) {
  revolverEquipSoundFXVolume = Number(localStorage.getItem("revolverEquipSoundFX")) / 100;
} else {
  revolverEquipSoundFXVolume = 1;
}
if (localStorage.getItem("knifeEquipSoundFX") !== null) {
  knifeEquipSoundFXVolume = Number(localStorage.getItem("knifeEquipSoundFX")) / 100;
} else {
  knifeEquipSoundFXVolume = 1;
}
if (localStorage.getItem("musketEquipSoundFX") !== null) {
  musketEquipSoundFXVolume = Number(localStorage.getItem("musketEquipSoundFX")) / 100;
} else {
  musketEquipSoundFXVolume = 1;
}
if (localStorage.getItem("reloadSoundFX") !== null) {
  reloadSoundFXVolume = Number(localStorage.getItem("reloadSoundFX")) / 100;
} else {
  reloadSoundFXVolume = 1;
}
if (localStorage.getItem("zombieHitSoundFX") !== null) {
  zombieHitSoundFXVolume = Number(localStorage.getItem("zombieHitSoundFX")) / 100;
} else {
  zombieHitSoundFXVolume = 1;
}

//declaring arrays
let zombies = [];
let crates = [];
let particles = [];

//declaring variables
let drawGrenade;
let grenadeHurt;
let grenadeX;
let grenadeY;
let shotDist;
let person;
let pauseSettings;
let firstMinigunShot = true;

//changeable variables
let r = 30;
let weapon = "revolver";
let gamePhase = "start";
let coins = 0;
let zombieRound = 1;
let numOfZombies = 1;
let shotgunShells = 5;
let revolverBarrel = 6;
let shotgunDamage;
let posX = 350;
let posY = 350;
let health = 100;
let cooldownReady = true;
let medkits = 0;
let teleports = 0;
let grenades = 0;
let musketAmmo = 8;
let musketBought = false;
let minigunTimer = 15;

//keybinds
if (localStorage.getItem("forwardKeybind") !== null) {
  forwardKeybind = Number(localStorage.getItem("forwardKeybind"));
} else {
  forwardKeybind = 87;
}
if (localStorage.getItem("backwardsKeybind") !== null) {
  backwardsKeybind = Number(localStorage.getItem("backwardsKeybind"));
} else {
  backwardsKeybind = 83;
}
if (localStorage.getItem("leftKeybind") !== null) {
  leftKeybind = Number(localStorage.getItem("leftKeybind"));
} else {
  leftKeybind = 65;
}
if (localStorage.getItem("rightKeybind") !== null) {
  rightKeybind = Number(localStorage.getItem("rightKeybind"));
} else {
  rightKeybind = 68;
}
if (localStorage.getItem("toggleKeybind") !== null) {
  toggleKeybind = Number(localStorage.getItem("toggleKeybind"));
} else {
  toggleKeybind = 81;
}
if (localStorage.getItem("ammoKeybind") !== null) {
  ammoKeybind = Number(localStorage.getItem("ammoKeybind"));
} else {
  ammoKeybind = 69;
}
if (localStorage.getItem("knifeKeybind") !== null) {
  knifeKeybind = Number(localStorage.getItem("knifeKeybind"));
} else {
  knifeKeybind = 32;
}
if (localStorage.getItem("medkitKeybind") !== null) {
  medkitKeybind = Number(localStorage.getItem("medkitKeybind"));
} else {
  medkitKeybind = 49;
}
if (localStorage.getItem("teleportKeybind") !== null) {
  teleportKeybind = Number(localStorage.getItem("teleportKeybind"));
} else {
  teleportKeybind = 50;
}
if (localStorage.getItem("grenadeKeybind") !== null) {
  grenadeKeybind = Number(localStorage.getItem("grenadeKeybind"));
} else {
  grenadeKeybind = 51;
}
if (localStorage.getItem("musketKeybind") !== null) {
  musketKeybind = Number(localStorage.getItem("musketKeybind"));
} else {
  musketKeybind = 52;
}
