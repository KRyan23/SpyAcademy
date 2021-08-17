//Start
document.getElementById("big-red-button").onclick = function() {   //This function waits for the player to click the Big Red button then runs startGame
startGame();
}
//Abort game
document.getElementById("abort-button").onclick = function() {   //This function waits for the player to click the 'Abort' button then runs stopGame
stopGame();
}


function startGame(){
  hideIntroContent();                                                   //1. Start Game calls hideContent to clear the screen for the main game.
  unhideGameContent();                                                  //2. Calls unhideContent to display main elements of the game.
  setLevel();                                                           //3. Calls setlevel to clear the screen for the main game.
  setDifficulty();
  generateCombination();

}


function hideIntroContent(){                                           //This function applies a css style to all elements with class 'hide-after-start'
  for(i=0;i<4;i++){
    document.getElementsByClassName("hide-after-start")[i].style.cssText = "display:none;";
  }
}

function unhideGameContent(){
  for(j=0;j<4;j++){
    document.getElementsByClassName("show-after-start")[j].style.cssText = "display:contents;";         //Makes all elements with this class visible
    }
    document.getElementsByClassName("outer-screen-border")[0].style.background = "gray";                //Changes the background color
    document.getElementsByClassName("outer-screen-border")[0].style.width = "95vw";                     //Widens the container
}

function hideGameContent(){
  document.getElementById("abort-message-show").style.cssText = "display:contents;";                    //Show abort message
  for(j=0;j<2;j++){
    document.getElementsByClassName("hide-game-content")[j].style.cssText = "display:none;";             //Hides all elements with this class
}
  //  document.getElementsByClassName("outer-screen-border")[0].style.cssText = "display:none;";
}

function stopGame(interval){
clearInterval(interval);                                                                              //Stops the timer by clearing it.
console.log("Game Stopped :-) ");                                                                     //Just for testing!
hideGameContent();
}

var winflag;                                                                                          // Dont like using global variables but necessary in this case.


/* Setlevel takes the age entered earlier and gives the player a certain ammount of time to play the game*/
function setLevel(){
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
console.log("seconds=" + time);
}


/* Countdown  */
function countdown(seconds) {
  let counter = seconds;
  let minutes;
  let x = 60;
  let y = 0;
  let interval = setInterval(() => {
    counter--;
    x--;
    //Display minutes 4 - 0
    if (counter < 242 && counter >= 182){minutes = 3;}
    else if (counter < 182 && counter >= 122){
      minutes = 2;}
    else if (counter < 122 && counter >= 62){
      minutes = 1;
          document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.75;"; //Changes the text to orange to signify < 2mins left
    }else{ minutes = 0;
          document.getElementById("time-remaining").style.cssText = "color:red; opacity:0.75;";   //Changes the text to red to signify < 1mins left
        }
    //Display seconds 0 - 59
    if(x < 0){x = 59;}
    //This condition pads the number with a "0" if the seconds are < 10.
    if (x < 10){
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x;
      }
    //This condition does not pads the number with a "0" if the seconds are > 10.
    else{
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + x;}
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "1"
    if(counter == 1){
      stopGame();
      //nextGame();
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "0", then display the abort/loose message.
    }else if (counter == 1 && winflag == 0){
        stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }
    //This function waits for the Abort button to be clicked before running the stopGame().

},1000); //1000ms
}


/*tryCombination only executes after the startGame function is running */
  function tryCombination(){
    trys--;
    if (trys == 0){
      stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }else if(trys <20 && trys >10){
      document.getElementById("attempts").innerHTML = "00" + trys; //Pads the start with 2 zeros for effect
      document.getElementById("attempts").style.cssText = "color:orange; opacity: 0.75"; //sets to orange for running low warning
    }else if(trys <10){
      document.getElementById("attempts").innerHTML = "000" + trys; //Pads the start with 3 zeros when trys < 10
      document.getElementById("attempts").style.cssText = "color:red; opacity: 0.85"; //sets to red for < 10 try left warning
    }else{
      document.getElementById("attempts").innerHTML = "00" + trys;
    }

    if(combo[0] === combo[6] && combo[1] === combo[7] && combo[2] === combo[8] && combo[3] === combo[9] && combo[4] === combo[10] && combo[5] === combo[11]){
      winflag = 1;                                                  //Sets the winflag to 1 to be quiered by the setInterval function
      nextGame();                                                   //Ends game if sucessfull calls the nextGame function.
          }else{
      winflag = 0;
    }
}

/* Sets the difficuly based on the age of the participant*/
var trys;
// Dont like using global variables but necessary in this case.
function setDifficulty(){
let level = localStorage.getItem("age");

  if (level >= 6 && level <= 8){
    trys = 51; // 50 attempts after 1st click
  }else if (level >= 9 && level <= 12) {
    trys = 46; // 45 attempts after 1st click
  }else if (level > 12){
     trys = 40; // 40 attempts after 1st click
  }else{

  }
}

/////////////////////////////generateCombination///////////////////////////////////////////////////
/* Here we generate 12 random numbers that are from 0 - 9 into an array called combo.
   The first 6 numbers are the private combination that we want to guess,
   and the second 6 numbers are the public combination thats is shown.
   The second for loop populates the combination lock with the public numbers from the array*/
let combo = []; // Moved the combo array outside the function so its availible to all function

  function generateCombination(){

      for(let x = 0; x < 12; x++){
 combo.push(Math.floor(Math.random() * 10));
  }
    let publicNumber = 5, barrelId = 0;
    for(let i = 0; i < 6; i++){
      let name = "barrel-" + barrelId;
      barrelId++, publicNumber++;
      document.getElementById(name).innerHTML = combo[publicNumber];
  }

}

///////////////////////////////Increment-Decrement/////////////////////////////////////////////////////
/* Target the font awesome <i> + and - elements as a means to get the ids to determine which button was clicked
  Compare the public numbers that the users enters vs the private numbers of the combination and set the div to green if they match.
  */
function incrementDecrement(i){

 let upAndDown = i.id;
 let correctGuess = "background:green; color:white; opacity:0.75";

   switch (upAndDown) {
   case 'barrel-0-plus':     //Barrel 0 "+" increment

   if(combo[6] === 9){combo[6] = 9;}else{combo[6]++;}
   //If number is > 9 freeze it at 9 else increment it
   document.getElementById("barrel-0").innerHTML = combo[6];
   //Set innerhtml to the contents of combo[6]
   if (combo[0] === combo[6]){
   //If the first entry in the array matches the 6th set
   document.getElementById("a").style.cssText = correctGuess;
   //the background to green and the text to white.
   document.getElementById('barrel-0-plus').setAttribute('id', 'inactive');};
   //Change the id if the barrel goes green to stop wasting any more attempts.
   tryCombination();
   //run the function tryCombination
   break
   case 'barrel-1-plus':     //Barrel 1 "+" increment

   if(combo[7] === 9){combo[7] = 9;}else{combo[7]++;}
   document.getElementById("barrel-1").innerHTML = combo[7];
   if (combo[1] === combo[7]){
     document.getElementById("b").style.cssText = correctGuess;
     document.getElementById('barrel-1-plus').setAttribute('id', 'inactive');};
     tryCombination();
   break;
   case 'barrel-2-plus':     //Barrel 2 "+" increment

   if(combo[8] === 9){combo[8] = 9;}else{combo[8]++;}
   document.getElementById("barrel-2").innerHTML = combo[8];
   if (combo[2] === combo[8]){
   document.getElementById("c").style.cssText = correctGuess;
   document.getElementById('barrel-2-plus').setAttribute('id', 'inactive');};
   tryCombination();
   break;
   case 'barrel-3-plus':     //Barrel 3 "+" increment

   if(combo[9] === 9){combo[9] = 9;}else{combo[9]++;}
   document.getElementById("barrel-3").innerHTML = combo[9];
   if (combo[3] === combo[9]){
   document.getElementById("d").style.cssText = correctGuess;
   document.getElementById('barrel-3-plus').setAttribute('id', 'inactive');};
   tryCombination();
   break;

   case 'barrel-4-plus':     //Barrel 4 "+" increment

   if(combo[10] === 9){combo[10] = 9;}else{combo[10]++;}
   document.getElementById("barrel-4").innerHTML = combo[10];
   if (combo[4] === combo[10]){
   document.getElementById("e").style.cssText = correctGuess;
   document.getElementById('barrel-4-plus').setAttribute('id', 'inactive');};
   tryCombination();
   break;
   case 'barrel-5-plus':     //Barrel 5 "+" increment

   if(combo[11] === 9){combo[11] = 9;}else{combo[11]++;}
   document.getElementById("barrel-5").innerHTML = combo[11];
   if (combo[5] === combo[11]){
   document.getElementById("f").style.cssText = correctGuess;
   document.getElementById('barrel-5-plus').setAttribute('id', 'inactive');};
   tryCombination();
   break;

   case 'barrel-0-minus':      //Barrel 0 "-" decrement

   if(combo[6] === 0){combo[6] = 0;}else{combo[6]--;}
   document.getElementById("barrel-0").innerHTML = combo[6];
   if (combo[0] === combo[6]){
   document.getElementById("a").style.cssText = correctGuess;
   document.getElementById('barrel-0-minus').setAttribute('id', 'inactive');};
   tryCombination();
   break;
   case 'barrel-1-minus':      //Barrel 1 "-" decrement

   if(combo[7] === 0){combo[7] = 0;}else{combo[7]--;}
   document.getElementById("barrel-1").innerHTML = combo[7];
   if (combo[1] === combo[7]){
     document.getElementById("b").style.cssText = correctGuess;
     document.getElementById('barrel-1-minus').setAttribute('id', 'inactive');};
     tryCombination();
   break;
   case 'barrel-2-minus':      //Barrel 2 "-" decrement

   if(combo[8] === 0){combo[8] = 0;}else{combo[8]--;}
   document.getElementById("barrel-2").innerHTML = combo[8];
   if (combo[2] === combo[8]){
     document.getElementById("c").style.cssText = correctGuess;
     document.getElementById('barrel-2-minus').setAttribute('id', 'inactive');};
     tryCombination();
   break;
   case 'barrel-3-minus':      //Barrel 3 "-" decrement

   if(combo[9] === 0){combo[9] = 0;}else{combo[9]--;}
   document.getElementById("barrel-3").innerHTML = combo[9];
   if (combo[3] === combo[9]){
     document.getElementById("d").style.cssText = correctGuess;
     document.getElementById('barrel-3-minus').setAttribute('id', 'inactive');};
     tryCombination();
   break;
   case 'barrel-4-minus':      //Barrel 4 "-" decrement

   if(combo[10] === 0){combo[10] = 0;}else{combo[10]--;}
   document.getElementById("barrel-4").innerHTML = combo[10];
   if (combo[4] === combo[10]){
   document.getElementById("e").style.cssText = correctGuess;
   document.getElementById('barrel-4-minus').setAttribute('id', 'inactive');};
   tryCombination();
   break;
   case 'barrel-5-minus':      //Barrel 5 "-" decrement

   if(combo[11] === 0){combo[11] = 0;}else{combo[11]--;}
   document.getElementById("barrel-5").innerHTML = combo[11];
   if (combo[5] === combo[11]){
     document.getElementById("f").style.cssText = correctGuess;
     document.getElementById('barrel-5-minus').setAttribute('id', 'inactive');};
     tryCombination();
   break;
   default:
   //return false;
  }
 }
/*Function next game brings the player to the sucess screen on completion of the game */
 function nextGame() {

   for(z=0;z<4;z++){
     document.getElementsByClassName("hide-game-content")[z].style.cssText = "display:none;";         //Makes all elements with this class visible
     }
//LEFT OFF HERE NEED TO FIX BUG IN HIDE/DISPLAY SUCCESS MESSSAGE
  // setTimeout(() => {
   document.getElementById("game1-success").style.cssText = "display:contents;"; //shows the success message


// }, 2000);/* Wait 2 seconds to display success message*/

 }
