//////Start game
startGame();
// This function generates a password from the passwordBank array for the user to crack.
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
// This function populates the jumbled up password letters onto the key of the keypad
function populateKeys(){
  let pass = localStorage.getItem("publicpass");                            //Get the public password from local storage.
  let len = pass.length;                                                    //Retrieve the length of the password
  let letters = 0, keyId = 0;                                               //Let variables 'letters' and the 'keyId' start at 0
  for(let i = 0; i < pass.length; i++){                                     //loop through each id and only assign the keys the same ammount of letters that are in the password
    let name = "key-" + keyId;
    document.getElementById(name).innerText = pass[letters];                //Populate the keys with the necessary letters.
    keyId++;
    letters++;
}
// This function creates and Populate password entry boxes with 'x'
setTimeout(() => {
  for(let j=0; j < pass.length; j++){
    document.getElementById('password-boxes').insertAdjacentHTML('beforebegin', `<div class="charBoxes text-center" tabindex=${j} id="char-box-${j}">X</div>`); //The syntax for this command was found at https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
}
}, 4000);// Wait 4s
}
// This fucntion sets the difficuly based on the age of the participant and updates the initial ammount of attempts
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
/* This is the start game function it does the following
   1.Listens for a click on the start button, once clicked it runs the functions setDifficulty, generatePassword, populateKeys and stopgame.
   2.Bottom 3 rules change various styles on buttons and divs to enhance game play.*/
  function startGame(){
  document.getElementById("start").onclick = function() {
  setDifficulty();
  generatePassword();
  document.querySelector("#start").innerHTML = "Abort!";                              //Changes the start button text to abort
  document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:1;"; //Changes the start button to yellow with black text
  document.getElementById("instructions-container").style.cssText = "animation: fadeout 2s forwards;"; // Fades out the instruction text once you hit start
  setTimeout(() => {
  document.getElementsByClassName("outer-screen-border")[0].style.cssText = "background-color: green; animation: fadein 1s forwards; color: #fafafa;";
  document.getElementsByClassName("mainframe-heading")[0].style.cssText = "display: contents;";       //Shows mainframe heading
  document.getElementById("player-progress").style.cssText = "display: contents;";    //Shows the Spy badges and remaining attempts.
}, 3000);                                                                             // Wait 3s to display the password boxes and to debounce the click for the start/abort button
  populateKeys();                                                                     //Populates the empty keys with the the letters from the chosen password.
  document.getElementById("start").onclick = function() {                             //Once the Start button changes to 'Abort', this waits for the button to be pressed so it can end the game if needed.
  stopGame();
  }
};
}
// This function targets all elements with a class of  "charBoxes"
$(document).on('click', '.charBoxes', function(){                 //Jquery not binding to newly added Dom elements, this post helped me out > https://stackoverflow.com/questions/6537323/jquery-function-not-binding-to-newly-added-dom-elements
     let boxid = ($(this).attr('id'));                            //Get id of the password box that was clicked on
     localStorage.setItem("character", boxid);                    //Commit the value of the password boxes id to local storage
     let boxanswer =($(this).text());                             //Pulls the value of the innertext from the clicked div
     localStorage.setItem("whatthebox", boxanswer);               //Updates the locally stored 'letters variable to the latest choice'
     checkanswer();                                               //Calls the check answer function
  });
// This function targets all elements with a class of  "keyboard-keys"
  $(".keyboard-keys").click(function(){
     let letters =($(this).text());                               //Sets letters = to the associated text inside the div.
     let z = localStorage.getItem("character");                   //Pulls the 'id' value from local storage.
     localStorage.setItem("whatthekey", letters);                 //Stores the value of the key in the letters variable.
     document.getElementById(z).innerText = letters;              //Retrieves the locally stored id of the Password box and sets the innertext to the chosen value from the key.
     localStorage.setItem("whatthebox", letters);                 //Updates the locally stored 'letters variable to the latest choice'
     checkanswer();                                               //Calls the check answer function
  });

var correctanswer = 0;                                            //Declaring correctanswer globally (not a fan of global variables but sometimes implementation makes the code simplier)
var attemptsleft = localStorage.getItem("attempts");              //Declaring attemptsleft to local storage.

//This Function checkanswers deals with all aspects of checking if the answer is correct/incorrect and updating scores.
  function checkanswer(){
  let privatePassword = localStorage.getItem("privatepassword");  //Retrieves the privatepassword from local storage
  let keyboardkey = localStorage.getItem("whatthekey");           //Gets the value of the current keybaord key from local storage
  let boxcontents = localStorage.getItem("whatthebox");           //gets the value of the contents of the password box from local storage
  let theidof = localStorage.getItem("character");                //get the selected 'id' from local storage.
  let passlength = localStorage.getItem("passlength");            //retrives the length of the password from local storage.
// This nested Function is to replace the character boxes class with the winning class if correctly guessed
 function setCharacterBox(){
   document.getElementById(theidof).setAttribute("class", "charBoxes-correct"); //Removes existing classes rather than appending
 }
// This nested Function  keeps a tally of the correct answers and the attempts left.
function progress(){
  correctanswer++;                  //Keeps a tally of the correct answers
  attemptsleft=attemptsleft+2;      //Player earns back 2 attempts for a correctly guess square
}
//This nested Function decrements the attempts score for each incorrect guess.
function keepscore(){               //Updates the score for the player
attemptsleft--;                     //decrements the attemptsleft variable on an incorrect answer.
document.getElementById("attempts").innerText = "00"+attemptsleft;  //Updates the score on screen
}
//This nested Function is to append the id of each password box once a correct choice it entered this prevents further changes
function lockidvalue(){
  var changeTheId = document.getElementById(theidof);    //Assigns the currently slected id to the variable changeTheId
  changeTheId.id = theidof+"-correct";                   //Changes a 'correct password boxes' id so further changes cant be made.
}
//If statements to capture the correct/incorrect guesses on each box
  if (boxcontents.includes(privatePassword[0])&&theidof.includes("char-box-0")) {
      progress();
      setCharacterBox();
      lockidvalue();
  }else{
}
  if (boxcontents.includes(privatePassword[2])&&theidof.includes("char-box-1")) {
    progress();
    setCharacterBox();
    lockidvalue();
  }else{
}
  if (boxcontents.includes(privatePassword[4])&&theidof.includes("char-box-2")) {
    progress();
    setCharacterBox();
    lockidvalue();
  }else{
}
  if (boxcontents.includes(privatePassword[6])&&theidof.includes("char-box-3")) {
    progress();
    setCharacterBox();
    lockidvalue();
  }else{
}
  if (boxcontents.includes(privatePassword[8])&&theidof.includes("char-box-4")) {
   progress();
   setCharacterBox();
   lockidvalue();
  }else{
}
  if (boxcontents.includes(privatePassword[10])&&theidof.includes("char-box-5")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[12])&&theidof.includes("char-box-6")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[14])&&theidof.includes("char-box-7")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[16])&&theidof.includes("char-box-8")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[18])&&theidof.includes("char-box-9")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[20])&&theidof.includes("char-box-10")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}

  if (boxcontents.includes(privatePassword[22])&&theidof.includes("char-box-11")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[24])&&theidof.includes("char-box-12")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
  if (boxcontents.includes(privatePassword[26])&&theidof.includes("char-box-13")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}

  if (boxcontents.includes(privatePassword[28])&&theidof.includes("char-box-14")) {
   progress();
   setCharacterBox();
   lockidvalue();
 }else{
}
keepscore();                                                                    // Calls the keepscore function to update the score and keep track of the correct answers

if(correctanswer == passlength){                                                //Once the player has chosen the correct ammount of letters, compare it to the passwords actual length
  document.getElementsByClassName("outer-screen-border")[0].style.cssText = "animation: fadeout 5s forwards; background-color: #fafafa; "; //Fades out and changes the background color on sucessful completion
  document.getElementById("second-badge").style.cssText = "opacity:1;";         //Makes the second spy badge visible once you have passed the level
nextGame();                                                                     //Brings the player to the next game.
}
if(attemptsleft <= 0){                                                          //Stop the game once attempts reach '0'
  stopGame();
}
}
// This Function handles aborting the game and gives the user the option to return to the home page
    function stopGame(){
        document.getElementById("abort-message-show").removeAttribute("style");
        let x = document.getElementsByClassName("hide-after-abort"); //Hides the game heading
        let i;
        for (i = 0; i < x.length; i++) {x[i].style.display = "none";}
        let y = document.getElementsByClassName("outer-screen-border"); //Hides the screen section
        for (i = 0; i < y.length; i++) {y[i].style.display = "none";}
        document.getElementsByClassName("abort-message")[0].style.cssText = "animation: fadein 5s forwards;"; //Fades in the message on screen
}
// This Function brings the user to the next game
  function nextGame() {
  setTimeout(() => {
  document.getElementById("game2-success").style.cssText = "display:contents;";         //shows the success message
  document.getElementById("success-first-badge").style.cssText = "opacity:1;";          //Makes the first spy badge visible once youve passed the level
  document.getElementById("success-second-badge").style.cssText = "opacity:1;";         //Makes the second spy badge visible once youve passed the level
  let x = document.getElementsByClassName("hide-after-abort");                          //hides the main game
  let i;
  for (i = 0; i < x.length; i++) {x[i].style.display = "none";}
}, 2000);
}
// End of file
