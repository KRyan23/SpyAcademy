//////Start game
startGame();


//This is the jquery code to toggle the instructions on the game, some css manipulation was needed.
ToggleInstructions();
function ToggleInstructions(){
$( "#game-instructions" ).click(function() {
    $( "#text-instructions" ).toggle();
    let inst = $('#game-instructions').html();
    if (inst == "Instructions"){
      $('#game-instructions').html('Hide Instructions').css("font-size", "1em");
    }else{
      $('#game-instructions').html('Instructions').css("font-size", "1em");
    }
});
}

var winflag;
// Dont like using global variables but necessary in this case.

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

var trys;
// Dont like using global variables but necessary in this case.

/* Sets the difficuly based on the age of the participant and calls the tryCombination
function that monitors the remaining attempts, if the attempts reach 0 it calls stopGame.*/
function setDifficulty(){
let level = localStorage.getItem("age");

  if (level >= 6 && level <= 8){
    trys = 30; // 36 attempts after 1st click
  }else if (level >= 9 && level <= 12) {
    trys = 25; // 30 attempts after 1st click
  }else if (level > 12){
     trys = 20; // 24 attempts after 1st click
  }else{

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

  document.querySelector("#start").innerHTML = "Abort!";   //Changes the start button text to abort
  document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:0.6"; //Changes the start button to yellow with black text
  
  document.getElementsByClassName("time-trys-left")[0].style.cssText = "opacity:1;"; //changes the 'time' and 'attempts' placeholders to normal opacity

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
    if(counter == 1 && winflag == 1){
      stopGame();
      nextGame();
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "0", then display the abort/loose message.
    }else if (counter == 1 && winflag == 0){
        stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }
    //This function waits for the Abort button to be clicked before running the stopGame().
      document.getElementById("start").onclick = function() {

          setTimeout(() => {/* Wait 300ms to display the abort/loose message*/
            stopGame();
          document.getElementById("abort-message-show").removeAttribute("style");
        }, 300);
      /* Displays or unhides the Abort message when a user wants to leave a game */
      };

},1000); //1000ms
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
