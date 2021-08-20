//////Start game
startGame();


function generatePassword(){
//Password Bank in a nested array to choose a word from.
let passwordBank = [['T','R','I','U','M','P','H','A','N','T','L','Y'], ['C','O','M','B','I','N','A','T','I','O','N'], ['S','T','R','E','N','G','T','H','E','N','I','N','G'], ['G','R','A','T','E','F','U','L','N','E','S','S'], ['C','O','M','P','U','T','E','R','L','E','S','S'], ['M','I','C','R','O','M','A','C','H','I','N','E','S'], ['S','E','C','R','E','T','I','V','E','L','Y'], ['P','R','I','V','A','T','E','L','Y'], ['A','V','A','L','A','N','C','H','E','S'], ['F','O','O','L','P','R','O','O','F','E','D'],['S','T','R','O','N','G','H','O','L','D'], ['I','M','P','O','S','S','I','B','L','E'], ['C','O','N','C','E','N','T','R','A','T','E'], ['C','L','A','S','S','I','F','I','E','D'], ['U','N','D','E','R','C','O','V','E','R'], ['A','B','R','A','C','A','D','A','B','R','A'], ['C','A','M','O','F','L','A','G','E','D'], ['M','A','S','T','E','R','P','L','A','N'], ['F','A','C','E','L','E','S','S','N','E','S','S','E','S'], ['C','R','A','C','K','A','B','L','E'], ['H','A','C','K','A','B','I','L','I','T','Y'], ['M','I','L','L','I','O','N','A','I','R','E','S'], ['C','R','Y','P','T','O','G','R','A','P','H','Y'], ['M','E','S','S','E','N','G','E','R','S'], ['D','E','P','E','N','D','A','B','L','E'], ['V','A','C','C','I','N','A','T','I','O','N'], ['K','A','L','E','I','D','O','S','C','O','P','E'], ['A','E','R','O','D','Y','N','A','M','I','C'], ['L','A','N','D','F','O','R','T','R','E','S','S'], ['A','B','O','V','E','G','R','O','U','N','D'], ['T','A','S','K','M','A','S','T','E','R'], ['A','E','R','O','P','L','A','N','E','S'],['A','D','V','E','N','T','U','R','E'],['U','L','T','R','A','C','A','R','E','F','U','L','L'],['T','A','N','G','E','R','I','N','E','S']]

let x = (Math.floor(Math.random() * passwordBank.length));                   //Store a random number of < array length from the password bank to variable 'x'.
let passLength = passwordBank[x].length;                                     //Find out the length of the password to be used for later displaying hints.
var privatePassword = passwordBank[x];                                       //Assign privatePassword the output from passwordBank.
let publicPassword = Array.from(privatePassword).sort().reverse().join("");  //Clone the privatePassword value so it doesnt alter the orginal, alphabetaically sort then reverse to make it mor difficult to guess, also remove the commas from the word.
localStorage.setItem("passlength", JSON.stringify(passLength));              //Stores the length of the guessed password in local storage.
localStorage.setItem("privatepassword", [privatePassword]);                  //Stores the length of the password to be guessed into local storage.
localStorage.setItem("publicpass", [publicPassword]);                        //Stores the length of the jumbled up version of the actual password in local storage.
}


function populateKeys(){
  let pass = localStorage.getItem("publicpass");                            //Get the public password from local storage.
  let len = pass.length;                                                    //Retrieve the length of the password
  let letters = 0, keyId = 0;                                               //Let variables 'letters' and the 'keyId' start at 0
  for(let i = 0; i < pass.length; i++){                                     //loop through each id and only assign the keys the same ammount of letters that are in the password
    let name = "key-" + keyId;
    document.getElementById(name).innerText = pass[letters]; //Populate the keys with the necessary letters.
    keyId++;
    letters++;
    }
// Create and Populate password entry boxes with 'x'///
setTimeout(() => {
  for(let j=0; j < pass.length; j++){
    document.getElementById('password-boxes').insertAdjacentHTML('beforebegin', `<div class="charBoxes text-center" tabindex=${j} id="char-box-${j}">X</div>`); //The syntax for this command was found at https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp



}
}, 4000);/* Wait 4s to display the abort/loose message */

}

/* This sets the difficuly based on the age of the participant and updates the initial ammount of attempts*/
function setDifficulty(){
let level = localStorage.getItem("age");
  var trys;
  if (level >= 6 && level <= 8){
    trys = 30; //  30 attempts after 1st click
  }else if (level >= 9 && level <= 12) {
    trys = 25; //  25 attempts after 1st click
  }else if (level => 12){
     trys = 20; //  20 attempts after 1st click
  }else{
    alert("You did not choose an age");
  }

  localStorage.setItem("attempts",trys)

  document.getElementById("attempts").innerHTML = "00" + trys; // Sets the attempt ammount based on age.
}


////////////////////////Start Game////////////////////////////////////////////////////////
/* Listens for a click on the start button, once clicked it runs the functions
   setDifficulty, generatePassword, populateKeys and stopgame.
   Bottom 3 rules change various styles on buttons and divs to enhance game play.*/
  function startGame(){
  document.getElementById("start").onclick = function() {
  setDifficulty();
  generatePassword();
  document.querySelector("#start").innerHTML = "Abort!";   //Changes the start button text to abort
  document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:1;"; //Changes the start button to yellow with black text
  document.getElementById("instructions-container").style.cssText = "animation: fadeout 2s forwards;"; // Fades out the instruction text once you hit start
  setTimeout(() => {
  document.getElementsByClassName("outer-screen-border")[0].style.cssText = "background-color: #384242; animation: fadein 1s forwards; color: #fafafa;";
  document.getElementsByClassName("spy-lives-container")[0].style.cssText = "display: contents;";       //Shows mainframe heading
  document.getElementById("player-progress").style.cssText = "display: contents;";     //Shows the Spy badges and remaining attempts.
}, 3000);                                                                             // Wait 3s to display the password boxes and to debounce the click for the start/abort button
  populateKeys(); //Populates the empty keys with the the letters from the chosen password.

  document.getElementById("start").onclick = function() { //Once the Start button changes to 'Abort', this waits for the button to be pressed so it can end the game if needed.
  stopGame();
  }
};
  }


//////////////////////////Set Level///////////////////////////////////////////////////
/* Retrieves the age variable from local storage "age".
   Sets the difficulty level by age based on time allowed "time".
   Ages 6-8yrs get 4 minutes, 9-12yrs get 3mins and 13+ get just a 2 minute allowance.*/
function setlevel(){
let level = localStorage.getItem("age");
let time;
if (level >= 6 && level <= 8){
  time = 242; // 242 - 4minutes
}else if (level >= 9 && level <= 12) {
  time = 182; // 182 - 3minutes
}else{
  time = 122; // 242 - 2minutes
}
countdown(time); //Calls the timer function to run for example (180 times), countdown(180)
}

/////////////////////////////////Stop Game/////////////////////////////////////////////////////////////
//This code handles aborting the game and gives the user the option to return to the home page
    function stopGame(interval){
    clearInterval(interval); //Stops the timer by clearing it.

    let x = document.getElementsByClassName("combination-outline-controls");
    let i;
    for (i = 0; i < x.length; i++) {x[i].style.display = "none";}
//Uses the class name "combination-outline-controls" to hide the game once the abort button is pressed.
}



function nextGame() {
  setTimeout(() => {
  document.getElementById("game1-success").style.cssText = "display:contents;"; //shows the success message

  let x = document.getElementsByClassName("combination-outline-controls"); //hides the main game
  let i;
  for (i = 0; i < x.length; i++) {x[i].style.display = "none";}

}, 2000);/* Wait 2 seconds to display success message*/

}
//
///////////// nice jquery transistion effect for one of the other games
//$(".fa-plus").click(function() {
  //    $( this ).slideUp();});
//}
