let gameEvent;

function showPrompt() {
  $('#prompt').css('visibility', 'visible')
  setTimeout(function (){
    $('#prompt').css('visibility', 'hidden');
  }, 3000);
}

function keyListen(e) {
  if (e.keyCode == 32) {
    document.getElementById(gameEvent).innerText = 'SPACE'
    console.log(`Key "${e.key}" released [event: keyup]`);
  } else {
    document.getElementById(gameEvent).innerText = e.key
    console.log(`Key "${e.key}" released [event: keyup]`);
  }

  localStorage.setItem(gameEvent + "Keybind", e.keyCode)
}

function bind() {
  document.body.addEventListener('keyup', keyListen)
  setTimeout(function() {
  document.body.removeEventListener('keyup', keyListen)
  }, 3000)

}

$(document).ready(function(){
  if (localStorage.getItem('forwardKeybind') !== null) {
    console.log(localStorage.getItem('forwardKeybind'))
    document.getElementById('forward').innerText = String.fromCharCode(localStorage.getItem("forwardKeybind")).toLowerCase()
  }
  if (localStorage.getItem('backwardsKeybind') !== null) {
    console.log(localStorage.getItem('backwardsKeybind'))
    document.getElementById('backwards').innerText = String.fromCharCode(localStorage.getItem("backwardsKeybind")).toLowerCase()
  }
  if (localStorage.getItem('leftKeybind') !== null) {
    console.log(localStorage.getItem('leftKeybind'))
    document.getElementById('left').innerText = String.fromCharCode(localStorage.getItem("leftKeybind")).toLowerCase()
  }
  if (localStorage.getItem('rightKeybind') !== null) {
    console.log(localStorage.getItem('rightKeybind'))
    document.getElementById('left').innerText = String.fromCharCode(localStorage.getItem("rightKeybind")).toLowerCase()
  }
  if (localStorage.getItem('toggleKeybind') !== null) {
    console.log(localStorage.getItem('toggleKeybind'))
    document.getElementById('toggle').innerText = String.fromCharCode(localStorage.getItem("toggleKeybind")).toLowerCase()
  }
  if (localStorage.getItem('ammoKeybind') !== null) {
    console.log(localStorage.getItem('ammoKeybind'))
    document.getElementById('ammo').innerText = String.fromCharCode(localStorage.getItem("ammoKeybind")).toLowerCase()
  }
  if (localStorage.getItem('knifeKeybind') !== null) {
    console.log(localStorage.getItem('knifeKeybind'))
    document.getElementById('knife').innerText = String.fromCharCode(localStorage.getItem("knifeKeybind")).toLowerCase()
  }
  if (localStorage.getItem('medkitKeybind') !== null) {
    console.log(localStorage.getItem('medkitKeybind'))
    document.getElementById('medkit').innerText = String.fromCharCode(localStorage.getItem("medkitKeybind")).toLowerCase()
  }
  if (localStorage.getItem('teleportKeybind') !== null) {
    console.log(localStorage.getItem('teleportKeybind'))
    document.getElementById('teleport').innerText = String.fromCharCode(localStorage.getItem("teleportKeybind")).toLowerCase()
  }
  if (localStorage.getItem('grenadeKeybind') !== null) {
    console.log(localStorage.getItem('grenadeKeybind'))
    document.getElementById('grenade').innerText = String.fromCharCode(localStorage.getItem("grenadeKeybind")).toLowerCase()
  }
  if (localStorage.getItem('musketKeybind') !== null) {
    console.log(localStorage.getItem('musketKeybind'))
    document.getElementById('musket').innerText = String.fromCharCode(localStorage.getItem("musketKeybind")).toLowerCase()
  }

  if (localStorage.getItem('shotgunSoundFX') !== null) {
    console.log(localStorage.getItem('shotgunSoundFX'))
    document.getElementById('shotgunSoundFX').value = localStorage.getItem("shotgunSoundFX")
  }
  if (localStorage.getItem('revolverSoundFX') !== null) {
    console.log(localStorage.getItem('revolverSoundFX'))
    document.getElementById('revolverSoundFX').value = localStorage.getItem("revolverSoundFX")
  }
  if (localStorage.getItem('musketSoundFX') !== null) {
    console.log(localStorage.getItem('musketSoundFX'))
    document.getElementById('musketSoundFX').value = localStorage.getItem("musketSoundFX")
  }
  if (localStorage.getItem('knifeSoundFX') !== null) {
    console.log(localStorage.getItem('knifeSoundFX'))
    document.getElementById('knifeSoundFX').value = localStorage.getItem("knifeSoundFX")
  }
  if (localStorage.getItem('shotgunEquipSoundFX') !== null) {
    console.log(localStorage.getItem('shotgunEquipSoundFX'))
    document.getElementById('shotgunEquipSoundFX').value = localStorage.getItem("shotgunEquipSoundFX")
  }
  if (localStorage.getItem('revolverEquipSoundFX') !== null) {
    console.log(localStorage.getItem('revolverEquipSoundFX'))
    document.getElementById('revolverEquipSoundFX').value = localStorage.getItem("revolverEquipSoundFX")
  }
  if (localStorage.getItem('knifeEquipSoundFX') !== null) {
    console.log(localStorage.getItem('knifeEquipSoundFX'))
    document.getElementById('knifeEquipSoundFX').value = localStorage.getItem("knifeEquipSoundFX")
  }
  if (localStorage.getItem('musketEquipSoundFX') !== null) {
    console.log(localStorage.getItem('musketEquipSoundFX'))
    document.getElementById('musketEquipSoundFX').value = localStorage.getItem("musketEquipSoundFX")
  }
  if (localStorage.getItem('reloadSoundFX') !== null) {
    console.log(localStorage.getItem('reloadSoundFX'))
    document.getElementById('reloadSoundFX').value = localStorage.getItem("reloadSoundFX")
  }
  if (localStorage.getItem('zombieHitSoundFX') !== null) {
    console.log(localStorage.getItem('zombieHitSoundFX'))
    document.getElementById('zombieHitSoundFX').value = localStorage.getItem("zombieHitSoundFX")
  }


  $("#forward").click(function(){
    showPrompt()
    gameEvent = "forward"
    bind()
  });
  $("#backwards").click(function(){
    showPrompt()
    gameEvent = "backwards"
    bind()
  });
  $("#left").click(function(){
    showPrompt()
    gameEvent = "left"
    bind()
  });
  $("#right").click(function(){
    showPrompt()
    gameEvent = "right"
    bind()
  });
  $("#toggle").click(function(){
    showPrompt()
    gameEvent = "toggle"
    bind()
  });
  $("#ammo").click(function(){
    showPrompt()
    gameEvent = "ammo"
    bind()
  });
  $("#knife").click(function(){
    showPrompt()
    gameEvent = "knife"
    bind()
  });
  $("#medkit").click(function(){
    showPrompt()
    gameEvent = "medkit"
    bind()
  });
  $("#teleport").click(function(){
    showPrompt()
    gameEvent = "teleport"
    bind()
  });
  $("#grenade").click(function(){
    showPrompt()
    gameEvent = "grenade"
    bind()
  });
  $("#musket").click(function(){
    showPrompt()
    gameEvent = "musket"
    bind()
  });


  $("input").click(function(){
    localStorage.setItem(this.id, this.value)
  });
});