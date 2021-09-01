var correctanswer = 0;
var attemptsleft = localStorage.getItem("attempts");

// This function generates a password from the passwordBank array for the user to crack.
function generatePassword() {
  var passwordBank = [
    ['T', 'R', 'I', 'U', 'M', 'P', 'H', 'A', 'N', 'T', 'L', 'Y'],
    ['C', 'O', 'M', 'B', 'I', 'N', 'A', 'T', 'I', 'O', 'N'],
    ['S', 'T', 'R', 'E', 'N', 'G', 'T', 'H', 'E', 'N', 'I', 'N', 'G'],
    ['G', 'R', 'A', 'T', 'E', 'F', 'U', 'L', 'N', 'E', 'S', 'S'],
    ['C', 'O', 'M', 'P', 'U', 'T', 'E', 'R', 'L', 'E', 'S', 'S'],
    ['M', 'I', 'C', 'R', 'O', 'M', 'A', 'C', 'H', 'I', 'N', 'E', 'S'],
    ['S', 'E', 'C', 'R', 'E', 'T', 'I', 'V', 'E', 'L', 'Y'],
    ['P', 'R', 'I', 'V', 'A', 'T', 'E', 'L', 'Y'],
    ['A', 'V', 'A', 'L', 'A', 'N', 'C', 'H', 'E', 'S'],
    ['F', 'O', 'O', 'L', 'P', 'R', 'O', 'O', 'F', 'E', 'D'],
    ['S', 'T', 'R', 'O', 'N', 'G', 'H', 'O', 'L', 'D'],
    ['I', 'M', 'P', 'O', 'S', 'S', 'I', 'B', 'L', 'E'],
    ['C', 'O', 'N', 'C', 'E', 'N', 'T', 'R', 'A', 'T', 'E'],
    ['C', 'L', 'A', 'S', 'S', 'I', 'F', 'I', 'E', 'D'],
    ['U', 'N', 'D', 'E', 'R', 'C', 'O', 'V', 'E', 'R'],
    ['A', 'B', 'R', 'A', 'C', 'A', 'D', 'A', 'B', 'R', 'A'],
    ['C', 'A', 'M', 'O', 'F', 'L', 'A', 'G', 'E', 'D'],
    ['M', 'A', 'S', 'T', 'E', 'R', 'P', 'L', 'A', 'N'],
    ['F', 'A', 'C', 'E', 'L', 'E', 'S', 'S', 'N', 'E', 'S', 'S', 'E', 'S'],
    ['C', 'R', 'A', 'C', 'K', 'A', 'B', 'L', 'E'],
    ['H', 'A', 'C', 'K', 'A', 'B', 'I', 'L', 'I', 'T', 'Y'],
    ['M', 'I', 'L', 'L', 'I', 'O', 'N', 'A', 'I', 'R', 'E', 'S'],
    ['C', 'R', 'Y', 'P', 'T', 'O', 'G', 'R', 'A', 'P', 'H', 'Y'],
    ['M', 'E', 'S', 'S', 'E', 'N', 'G', 'E', 'R', 'S'],
    ['D', 'E', 'P', 'E', 'N', 'D', 'A', 'B', 'L', 'E'],
    ['V', 'A', 'C', 'C', 'I', 'N', 'A', 'T', 'I', 'O', 'N'],
    ['K', 'A', 'L', 'E', 'I', 'D', 'O', 'S', 'C', 'O', 'P', 'E'],
    ['A', 'E', 'R', 'O', 'D', 'Y', 'N', 'A', 'M', 'I', 'C'],
    ['L', 'A', 'N', 'D', 'F', 'O', 'R', 'T', 'R', 'E', 'S', 'S'],
    ['A', 'B', 'O', 'V', 'E', 'G', 'R', 'O', 'U', 'N', 'D'],
    ['T', 'A', 'S', 'K', 'M', 'A', 'S', 'T', 'E', 'R'],
    ['A', 'E', 'R', 'O', 'P', 'L', 'A', 'N', 'E', 'S'],
    ['A', 'D', 'V', 'E', 'N', 'T', 'U', 'R', 'E'],
    ['U', 'L', 'T', 'R', 'A', 'C', 'A', 'R', 'E', 'F', 'U', 'L', 'L'],
    ['T', 'A', 'N', 'G', 'E', 'R', 'I', 'N', 'E', 'S']
  ];

  var x = (Math.floor(Math.random() * passwordBank.length));
  var passLength = passwordBank[x].length;
  var privatePassword = passwordBank[x];
  var publicPassword = Array.from(privatePassword).sort().reverse().join("");
  localStorage.setItem("passlength", JSON.stringify(passLength));
  localStorage.setItem("privatepassword", [privatePassword]);
  localStorage.setItem("publicpass", [publicPassword]);
}
// This function matches the passwrod length to key count on the keyboard
function removeExcessKeys() {
  var pass = localStorage.getItem("publicpass");
  var howManyKeys = pass.length;
  for (var key = howManyKeys; key < 17; key++) {
    $('#key-' + key).remove();
  }
}
// This function populates the jumbled up password letters onto the key of the keypad
function populateKeys() {
  var pass = localStorage.getItem("publicpass");
  var len = pass.length;
  var letters = 0,
    keyId = 0;
  for (var i = 0; i < len; i++) {
    var name = "key-" + keyId;
    document.getElementById(name).innerText = pass[letters];
    keyId++;
    letters++;
  }
  // This function creates and Populate password entry boxes with 'x'
  setTimeout(() => {
    for (var j = 0; j < pass.length; j++) {
      document.getElementById('password-boxes').insertAdjacentHTML('beforebegin', `<div class="charBoxes text-center" tabindex=${j} id="char-box-${j}" aria-label="Key-${j}" title="Key-${j}">X</div>`); //The syntax for this command was found at https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
    }
  }, 4000);
}
// This function sets the difficuly based on the age of the participant and updates the initial ammount of attempts
function setDifficulty() {
  var level = localStorage.getItem("age");
  var trys;
  if (level >= 6 && level <= 8) {
    trys = 30; //  30 attempts after 1st click
  } else if (level >= 9 && level <= 12) {
    trys = 25; //  25 attempts after 1st click
  } else if (level => 12) {
    trys = 20; //  20 attempts after 1st click
  } else {
    alert("You did not choose an age");
  }
  localStorage.setItem("attempts", trys);
  document.getElementById("attempts").innerHTML = "00" + trys;
}
// This function targets all elements with a class of  "charBoxes"
function whatsInTheCharacterBox() {
  $(document).on('click', '.charBoxes', function() {
    var boxid = ($(this).attr('id'));
    localStorage.setItem("character", boxid);
    var boxanswer = ($(this).text());
    localStorage.setItem("whatthebox", boxanswer);
    checkanswer();
  });
}
// This function targets all elements with a class of  "keyboard-keys"
function whatKeyWasPressed() {
  $(".keyboard-keys").click(function() {
    var letters = ($(this).text());
    var z = localStorage.getItem("character");
    localStorage.setItem("whatthekey", letters);
    document.getElementById(z).innerText = letters;
    localStorage.setItem("whatthebox", letters);
    checkanswer();
  });
}
//This Function checkanswers deals with all aspects of checking if the answer is correct/incorrect and updating scores.
function checkanswer() {
  var privatePassword = localStorage.getItem("privatepassword");
  var boxcontents = localStorage.getItem("whatthebox");
  var theidof = localStorage.getItem("character");
  var passlength = localStorage.getItem("passlength");
  // This nested Function is to replace the character boxes class with the winning class if correctly guessed
  function setCharacterBox() {
    document.getElementById(theidof).setAttribute("class", "charBoxes-correct");
  }
  // This nested Function  keeps a tally of the correct answers and the attempts left.
  function correctPlayerScore() {
    correctanswer++;
    attemptsleft = attemptsleft + 2;
  }
  //This nested Function decrements the attempts score for each incorrect guess.
  function incorrectPlayerScore() {
    attemptsleft--;
    document.getElementById("attempts").innerText = "00" + attemptsleft;
  }
  //This nested Function is to append the id of each password box once a correct choice it entered this prevents further changes
  function lockidvalue() {
    var changeTheId = document.getElementById(theidof);
    changeTheId.id = theidof + "-correct";
    alert("Correct! Please Choose another 'X' Box before Clicking a letter!");
  }

  if (boxcontents.includes(privatePassword[0]) && theidof.includes("char-box-0")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[2]) && theidof.includes("char-box-1")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[4]) && theidof.includes("char-box-2")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[6]) && theidof.includes("char-box-3")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[8]) && theidof.includes("char-box-4")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[10]) && theidof.includes("char-box-5")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[12]) && theidof.includes("char-box-6")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[14]) && theidof.includes("char-box-7")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[16]) && theidof.includes("char-box-8")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[18]) && theidof.includes("char-box-9")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[20]) && theidof.includes("char-box-10")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[22]) && theidof.includes("char-box-11")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[24]) && theidof.includes("char-box-12")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[26]) && theidof.includes("char-box-13")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  if (boxcontents.includes(privatePassword[28]) && theidof.includes("char-box-14")) {
    correctPlayerScore();
    setCharacterBox();
    lockidvalue();
  } else {}
  incorrectPlayerScore();
  if (correctanswer == passlength) {
    document.getElementsByClassName("outer-screen-border")[0].style.cssText = "animation: fadeout 5s forwards; background-color: #fafafa; ";
    document.getElementById("second-badge").style.cssText = "opacity:1;";
    nextGame();
  }
  if (attemptsleft <= 0) {
    stopGame();
  }
}
// This Function handles aborting the game and gives the user the option to return to the home page
function stopGame() {
  document.getElementById("abort-message-show").removeAttribute("style");
  var x = document.getElementsByClassName("hide-after-abort");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var y = document.getElementsByClassName("outer-screen-border");
  for (i = 0; i < y.length; i++) {
    y[i].style.display = "none";
  }
  document.getElementsByClassName("abort-message")[0].style.cssText = "animation: fadein 5s forwards;";
}
// This Function brings the user to the next game
function nextGame() {
  setTimeout(() => {
    document.getElementById("game2-success").style.cssText = "display:contents;";
    document.getElementById("success-first-badge").style.cssText = "opacity:1;";
    document.getElementById("success-second-badge").style.cssText = "opacity:1;";
    var x = document.getElementsByClassName("hide-after-abort");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  }, 2000);
}
// This is the start game function which runs the sequence of the game
function startGame() {
  document.getElementById("start").onclick = function() {
    setDifficulty();
    generatePassword();
    removeExcessKeys();
    document.querySelector("#start").innerHTML = "Abort!";
    document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:1;";
    document.getElementById("instructions-container").style.cssText = "animation: fadeout 2s forwards;";
    setTimeout(() => {
      document.getElementsByClassName("outer-screen-border")[0].style.cssText = "background-color: gray; animation: fadein 1s forwards; color: #fafafa;";
      document.getElementsByClassName("mainframe-heading")[0].style.cssText = "display: contents;";
      document.getElementById("player-progress").style.cssText = "display: contents;";
    }, 3000);
    populateKeys();
    whatsInTheCharacterBox();
    whatKeyWasPressed();
    document.getElementById("start").onclick = function() {
      stopGame();
    };
  };
}

startGame();
