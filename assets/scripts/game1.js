var winflag;
var trys;
var combo = [];
var correctGuess = "background:green; color:white; opacity:0.75";
var i;

/* Waits for abort button to be clicked */
function waitingForStartButton() {
  document.getElementById("big-red-button").onclick = function() {
    startGame();
  };
}
/* Waits for abort button to be clicked */
function waitingForAbortButton() {
  document.getElementById("abort-button").onclick = function() {
    stopGame();
  };
}
/* This is the main function tha runs the sequence of the game */
function startGame() {
  hideIntroContent();
  unhideGameContent();
  setLevel();
  setDifficulty();
  generateCombination();
  waitingForAbortButton();
}
/* This function hides the intro content */
function hideIntroContent() {
  for (var i = 0; i < 4; i++) {
    document.getElementsByClassName("hide-after-start")[i].style.cssText = "display:none;";
  }
}
/* This function unhides the game content */
function unhideGameContent() {
  for (var j = 0; j < 5; j++) {
    document.getElementsByClassName("show-after-start")[j].style.cssText = "display:contents;";
  }
  document.getElementsByClassName("outer-screen-border")[0].style.background = "gray";
  document.getElementsByClassName("outer-screen-border")[0].style.width = "95vw";
}
/* This function hides the game content */
function hideGameContent() {
  document.getElementById("abort-message-show").style.cssText = "display:contents;";
  for (var j = 0; j < 2; j++) {
    document.getElementsByClassName("hide-game-content")[j].style.cssText = "display:none;";
  }
}
/* This function stops the game and hides the game content */
function stopGame(interval) {
  clearInterval(interval);
  localStorage.setItem("age", 0);
  hideGameContent();
}
/* This function takes the age entered earlier and gives the player a certain ammount of time to play the game*/
function setLevel() {
  var level = localStorage.getItem("age");
  var time;
  if (level >= 6 && level <= 8) {
    time = 242;
  } else if (level >= 9 && level <= 12) {
    time = 182;
  } else {
    time = 122;
  }
  countdown(time);
}
/* This function controls the timing of the game */
var interval;
function countdown(seconds) {
  var counter = seconds;
  var minutes;
  var x = 60;
  var y = 0;
  interval = setInterval(() => {
    counter--;
    x--;
    if (counter < 242 && counter >= 182) {
      minutes = 3;
    } else if (counter < 182 && counter >= 122) {
      minutes = 2;
    } else if (counter < 122 && counter >= 62) {
      minutes = 1;
      document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.75;";
    } else {
      minutes = 0;
      document.getElementById("time-remaining").style.cssText = "color:red; opacity:0.75;";
    }
    if (x < 0) {
      x = 59;
    }
    if (x < 10) {
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x;
    } else {
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + x;
    }
    if (counter == 1) {
      stopGame();
    } else if (counter == 1 && winflag == 0) {
      stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }
  }, 1000);
}
/* This function checks the combination of the 'barrels' each time and sets various styles depending on the outcome */
function tryCombination() {
  trys--;
  if (trys == 0) {
    stopGame();
    document.getElementById("abort-message-show").removeAttribute("style");
  } else if (trys < 20 && trys > 10) {
    document.getElementById("attempts").innerHTML = "00" + trys;
    document.getElementById("attempts").style.cssText = "color:orange; opacity: 0.75";
  } else if (trys < 10) {
    document.getElementById("attempts").innerHTML = "000" + trys;
    document.getElementById("attempts").style.cssText = "color:red; opacity: 0.85";
  } else {
    document.getElementById("attempts").innerHTML = "00" + trys;
  }
  if (combo[0] === combo[6] && combo[1] === combo[7] && combo[2] === combo[8] && combo[3] === combo[9] && combo[4] === combo[10] && combo[5] === combo[11]) {
    winflag = 1;
    nextGame();
  } else {
    winflag = 0;
  }
}
/* Sets the difficuly based on the age of the participant*/
function setDifficulty() {
  var level = localStorage.getItem("age");
  if (level >= 6 && level <= 8) {
    trys = 51;
  } else if (level >= 9 && level <= 12) {
    trys = 46;
  } else if (level > 12) {
    trys = 42;
  } else {
    alert(level + "is not a valid age");
  }
}
/* Here we generate 12 random numbers that are from 0 - 9, the first 6 numbers are the private combination and the second 6 are what is visible to the user initially*/
function generateCombination() {
  for (var x = 0; x < 12; x++) {
    combo.push(Math.floor(Math.random() * 10));
  }
  var publicNumber = 5,
    barrelId = 0;
  for (var i = 0; i < 6; i++) {
    var name = "barrel-" + barrelId;
    barrelId++;
    publicNumber++;
    document.getElementById(name).innerHTML = combo[publicNumber];
  }
}
/* This function target the '+' and '-' elements and compares the public numbers that the users enters vs the private numbers of the combination */
function incrementDecrement(i) {
  var upAndDown = i.id;
  switch (upAndDown) {
    case 'barrel-0-plus':
      checkBarrel0Plus();
      tryCombination();
      break;
    case 'barrel-1-plus':
      checkBarrel1Plus();
      tryCombination();
      break;
    case 'barrel-2-plus':
      checkBarrel2Plus();
      tryCombination();
      break;
    case 'barrel-3-plus':
      checkBarrel3Plus();
      tryCombination();
      break;
    case 'barrel-4-plus':
      checkBarrel4Plus();
      tryCombination();
      break;
    case 'barrel-5-plus':
      checkBarrel5Plus();
      tryCombination();
      break;
    case 'barrel-0-minus':
      checkBarrel0Minus();
      tryCombination();
      break;
    case 'barrel-1-minus':
      checkBarrel1Minus();
      tryCombination();
      break;
    case 'barrel-2-minus':
      checkBarrel2Minus();
      tryCombination();
      break;
    case 'barrel-3-minus':
      checkBarrel3Minus();
      tryCombination();
      break;
    case 'barrel-4-minus':
      checkBarrel4Minus();
      tryCombination();
      break;
    case 'barrel-5-minus':
      checkBarrel5Minus();
      tryCombination();
      break;
    default:
  }
}

function checkBarrel0Plus() {
  if (combo[6] === 9) {
    combo[6] = 9;
  } else {
    combo[6]++;
  }
  document.getElementById("barrel-0").innerHTML = combo[6];
  if (combo[0] === combo[6]) {
    document.getElementById("a").style.cssText = correctGuess;
    document.getElementById('barrel-0-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel1Plus() {
  if (combo[7] === 9) {
    combo[7] = 9;
  } else {
    combo[7]++;
  }
  document.getElementById("barrel-1").innerHTML = combo[7];
  if (combo[1] === combo[7]) {
    document.getElementById("b").style.cssText = correctGuess;
    document.getElementById('barrel-1-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel2Plus() {
  if (combo[8] === 9) {
    combo[8] = 9;
  } else {
    combo[8]++;
  }
  document.getElementById("barrel-2").innerHTML = combo[8];
  if (combo[2] === combo[8]) {
    document.getElementById("c").style.cssText = correctGuess;
    document.getElementById('barrel-2-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel3Plus() {
  if (combo[9] === 9) {
    combo[9] = 9;
  } else {
    combo[9]++;
  }
  document.getElementById("barrel-3").innerHTML = combo[9];
  if (combo[3] === combo[9]) {
    document.getElementById("d").style.cssText = correctGuess;
    document.getElementById('barrel-3-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel4Plus() {
  if (combo[10] === 9) {
    combo[10] = 9;
  } else {
    combo[10]++;
  }
  document.getElementById("barrel-4").innerHTML = combo[10];
  if (combo[4] === combo[10]) {
    document.getElementById("e").style.cssText = correctGuess;
    document.getElementById('barrel-4-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel5Plus() {
  if (combo[11] === 9) {
    combo[11] = 9;
  } else {
    combo[11]++;
  }
  document.getElementById("barrel-5").innerHTML = combo[11];
  if (combo[5] === combo[11]) {
    document.getElementById("f").style.cssText = correctGuess;
    document.getElementById('barrel-5-plus').setAttribute('id', 'inactive');
  }
}

function checkBarrel0Minus() {
  if (combo[6] === 0) {
    combo[6] = 0;
  } else {
    combo[6]--;
  }
  document.getElementById("barrel-0").innerHTML = combo[6];
  if (combo[0] === combo[6]) {
    document.getElementById("a").style.cssText = correctGuess;
    document.getElementById('barrel-0-minus').setAttribute('id', 'inactive');
  }
}

function checkBarrel1Minus() {
  if (combo[7] === 0) {
    combo[7] = 0;
  } else {
    combo[7]--;
  }
  document.getElementById("barrel-1").innerHTML = combo[7];
  if (combo[1] === combo[7]) {
    document.getElementById("b").style.cssText = correctGuess;
    document.getElementById('barrel-1-minus').setAttribute('id', 'inactive');
  }
}

function checkBarrel2Minus() {
  if (combo[8] === 0) {
    combo[8] = 0;
  } else {
    combo[8]--;
  }
  document.getElementById("barrel-2").innerHTML = combo[8];
  if (combo[2] === combo[8]) {
    document.getElementById("c").style.cssText = correctGuess;
    document.getElementById('barrel-2-minus').setAttribute('id', 'inactive');
  }
}

function checkBarrel3Minus() {
  if (combo[9] === 0) {
    combo[9] = 0;
  } else {
    combo[9]--;
  }
  document.getElementById("barrel-3").innerHTML = combo[9];
  if (combo[3] === combo[9]) {
    document.getElementById("d").style.cssText = correctGuess;
    document.getElementById('barrel-3-minus').setAttribute('id', 'inactive');
  }
}

function checkBarrel4Minus() {
  if (combo[10] === 0) {
    combo[10] = 0;
  } else {
    combo[10]--;
  }
  document.getElementById("barrel-4").innerHTML = combo[10];
  if (combo[4] === combo[10]) {
    document.getElementById("e").style.cssText = correctGuess;
    document.getElementById('barrel-4-minus').setAttribute('id', 'inactive');
  }
}

function checkBarrel5Minus() {
  if (combo[11] === 0) {
    combo[11] = 0;
  } else {
    combo[11]--;
  }
  document.getElementById("barrel-5").innerHTML = combo[11];
  if (combo[5] === combo[11]) {
    document.getElementById("f").style.cssText = correctGuess;
    document.getElementById('barrel-5-minus').setAttribute('id', 'inactive');
  }
}
/* This Function next game brings the player to the success screen on completion of the game */
function nextGame() {
  clearInterval(interval);
  setTimeout(() => {
    var remstyles = ["game-heading-mobile", "abort-button", "timer-spy-lives", "spy-container", "heading-for-barrels", "game-barrels"];
    for (var s = 0; s < 6; s++) {
      document.getElementById(remstyles[s]).style.cssText = "display:none;";
    }
    document.getElementById("game1-success").style.cssText = "display:contents;";
  }, 1000);
}

waitingForStartButton();
