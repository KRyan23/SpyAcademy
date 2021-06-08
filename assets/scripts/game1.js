//////Start game
startGame();

/* Sets the difficuly based on the age of the participant and calls the tryCombination
function that monitors the remaining attempts, if the attempts reach 0 it calls stopGame.*/
function setDifficulty(){
let level = localStorage.getItem("age");
  let trys;
  if (level >= 6 && level <= 8){
    trys = 37; // 36 attempts after 1st click
  }else if (level >= 9 && level <= 12) {
    trys = 31; // 30 attempts after 1st click
  }else{
    trys = 25; // 24 attempts after 1st click
  }
/*tryCombination only executes after the start game function is
   running this is to ensure the Try Combination button is not active.*/
tryCombination();
  function tryCombination(){
    document.getElementById("try").onclick = function (){
    trys--;
    console.log(trys);
    if (trys == 0){
      stopGame();
    }else if(trys <10){
      document.getElementById("attempts").innerHTML = "000" + trys;
    }else{
      document.getElementById("attempts").innerHTML = "00" + trys;
    }

};
}
}

////////////////////////Start Game/////////////////////////////////////////////////////
/* Listens for a click on the start button, once clicked it runs the function setlevel.
   Runs the setDifficulty function to monitor attempts and end the game when its reaches 0.
   Calls the generate Combination function.
   Bottom 5 rules change various styles on buttons and divs to enhance game play.
   */
  function startGame(){
  document.getElementById("start").onclick = function() {
  setlevel();
  setDifficulty();
  generateCombination();
  //incrementDecrement(i);
  document.querySelector("#start").innerHTML = "Abort!";
  document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:0.6";
  document.getElementById("try").style.cssText = "background:green; color:white; opacity: 1; border: 1px solid white;" ;
  document.getElementsByClassName("combination-outline-game")[0].style.cssText = "border: 7.5px solid white;";
  document.getElementsByClassName("time-trys-left")[0].style.cssText = "opacity:1;";

};
  }


//////////////////////////Set Level///////////////////////////////////////////////////
/* Retrieves the age variable from local storage "age".
   Sets the difficulty level by age based on time allowed "time".
   Ages 6-8yrs get 6 minutes, 9-12yrs get 5mins and 13+ get just a 4 minute allowance.*/
function setlevel(){
let level = localStorage.getItem("age");
let time;
if (level >= 6 && level <= 8){
  time = 362; // 362 - 6minutes
}else if (level >= 9 && level <= 12) {
  time = 302; // 302 - 5minutes
}else{
  time = 242; // 242 - 4minutes
}
countdown(time); //Calls the timer function to run for example (180 times), countdown(180)
}

///////////////////////Countdown/////////////////////////////////////////////////////
/* Countdown function to time the games based on seconds.
   Variables seconds and minutes are used to update the html content on screen.*/
function countdown(seconds) {
  let counter = seconds;
  let minutes;
  let x = 60;
  let y = 0;
  let interval = setInterval(() => {
    counter--;
    x--;
    //Display minutes
    if (counter > 302 && counter <= 361){minutes = 5;}
    else if (counter < 302 && counter >= 242){minutes = 4;}
    else if (counter < 242 && counter >= 182){minutes = 3;}
    else if (counter < 182 && counter >= 122){minutes = 2;}
    else if (counter < 122 && counter >= 62){minutes = 1;}
    else{minutes = 0;}
    //Display seconds
    if(x < 0){x = 59;}
    //Update the time on the page, the first condition pads the number with a "0" if the seconds are < 10.
    if (x < 10){document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x; }
    else{document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + x;}
    //Terminate the game when the counter reaches 0;
    if(counter == 1){stopGame();}
    //This function waits for the Abort button to be clicked before running the stopGame().
      document.getElementById("start").onclick = function() {
          stopGame();
      };

},1000); //1000ms or 1 second.
}

/////////////////////////////////Stop Game/////////////////////////////////////////////////////////////
//This code handles aborting the game and gives the user the option to return to the home page
    function stopGame(interval){
    clearInterval(interval); //Stops the timer by clearing it.

    let x = document.getElementsByClassName("combination-outline-controls");
    let i;
    for (i = 0; i < x.length; i++) {x[i].style.display = "none";}
//Uses the class name "combination-outline-controls" to hide the game once the abort button is pressed.

    document.getElementById("game-instructions").style.display = "none";
// hides the instructions text just like it does with the game above

    document.getElementById("abort-message-show").removeAttribute("style");
/* Displays or unhides the Abort message when a user wants to leave a game,
also it is displayed when the counter reaches 0 seconds and the user has not
successfully completed the game. */
}


/////////////////////////////Random numbers //////////////////////////////////////////////////////////
/* Here we generate 12 random numbers that are from 0 - 9. The first 6 numbers are the private combination
   that we want to guess and the second 6 numbers are the public combination thats is shown.
   The second for loop populates the combination lock with the public numbers from the array*/
let combo = []; /////////////////// Moved the combo array outside the function so its availible to all function

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
/* */

function incrementDecrement(i){

  let y = i.id;
  console.log(y);
  switch (y) {
      case '0':
      //incrementDecrement0(y);   //Barrel 0 "+" increment
      break;
      case '1':                 //Barrel 1 "+" increment
      incrementDecrement1(y);
      break;
      case '2':                 //Barrel 2 "+" increment
      incrementDecrement2(y);
      break;
      case '3':                 //Barrel 3 "+" increment
      incrementDecrement3(y);
      break;
      case '4':                 //Barrel 4 "+" increment
      incrementDecrement4(y);
      break;
      case '5':                 //Barrel 5 "+" increment
      incrementDecrement5(y);
      break;
      case '6':                 //Barrel 0 "-" decrement
      incrementDecrement6(y);
      break;
      case '7':                 //Barrel 1 "-" decrement
      incrementDecrement7(y);
      break;
      case '8':                 //Barrel 2 "-" decrement
      incrementDecrement8(y);
      break;
      case '9':                 //Barrel 3 "-" decrement
      incrementDecrement9(y);
      break;
      case '10':                 //Barrel 4 "-" decrement
      incrementDecrement10(y);
      break;
      case '11':                 //Barrel 5 "-" decrement
      incrementDecrement11(y);
      break;
    default:
    return false;
  }

  }




/*
///////////// nice jquery transistion effect for one of the other games
$(".fa-plus").click(function() {
      $( this ).slideUp();});
}

document.getElementById("barrel-0-plus").onclick = function (){
//  let combo[0];
  console.log("plus 0 clicked");

}

    let y = 0;

    for(i = 0; i < 6; i++){
      document.getElementsByClassName("fa-plus")[y].onclick = function() {
      y++;
      console.log("first +");
    };
    }
*/








//
