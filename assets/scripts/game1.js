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
  unhideIntroContent();                                                 //2. Calls unhideContent to display main elements of the game.
  setLevel();                                                      //3. Calls setlevel to clear the screen for the main game.
}


function hideIntroContent(){                                           //This function applies a css style to all elements with class 'hide-after-start'
  for(i=0;i<4;i++){
    document.getElementsByClassName("hide-after-start")[i].style.cssText = "display:none;";
  }
}

function unhideIntroContent(){

  for(j=0;j<5;j++){
    document.getElementsByClassName("show-after-start")[j].style.cssText = "display:contents;";         //Makes all elements with this class visible
    //document.getElementsByClassName("show-after-start")[j].style.cssText = "animation: fadein 3s;";
    document.getElementsByClassName("outer-screen-border")[0].style.background = "gray";                //Changes the background color
    document.getElementsByClassName("outer-screen-border")[0].style.width = "95vw";                     //Widens the container
}
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
