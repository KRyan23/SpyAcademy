//Start
//This function waits for the player to click the Big Red button then runs startGame
document.getElementById("big-red-button").onclick = function() {
startGame();
}
//This function waits for the player to click the Start/Abort button then runs setLevel to begin the game
document.getElementById("start-abort").onclick = function() {

let quitGame = document.querySelector('#start-abort').innerHTML;          //Queries the text of the button if it matches 'Abort', then it runs stopGame.
if(quitGame=="Abort!"){
  console.log(quitGame);
  stopGame();
}
setlevel();                                                             //Calls setlevel which calculate the allowed time based on age, this is then passed to function 'countdown'
document.querySelector("#start-abort").innerHTML = "Abort!";            //Changes the start button text to abort
document.getElementById("start-abort").style.cssText = "background:black; color:yellow; opacity:1;"; //Changes the start button to yellow with black tex

}
//This function scan for the text 'abort' and runs stopGame if the button is clicked


function startGame(){                                              //1. Start Game calls hideContent to clear the screen for the main game.
  hideContent();                                                   //2. Calls hideContent which hides the front page.

  unhideContent();                                                 //4. Calls unhideContent which displays the contents of the main game.
  assignButtonColours();                                           //5. Assigns the 'Wire' colors as opposed to using inline styling or multiple classes.
}

//This function applies a css rule to hide all elements with class 'hide-after-start'
function hideContent(){
  for(i=0;i<4;i++){
    document.getElementsByClassName("hide-after-start")[i].style.cssText = "display:none;";
  }
}
//This function unhides the main game content
function unhideContent(){
  for(j=0;j<4;j++){
    document.getElementsByClassName("show-after-start")[j].style.cssText = "display:contents;";
    document.getElementsByClassName("show-after-start")[j].style.cssText = "animation: fadein 1s;";
    }
}
//

/* This function displays the 'Unsuccessful' message when either the player runs out of time or hits the 'abort' button */
function stopGame(){
for(k=0;k<4;k++){
  document.getElementsByClassName("show-after-start")[k].style.cssText = "display:none;";     // This reverses the action of the unhidecontent function and hides all game content when stopGame is called..
}
 document.getElementsByClassName("outer-screen-border")[0].style.cssText = "display:none;";   // Hides the Outer Screen border
 document.getElementsByClassName("game-heading")[0].style.cssText = "display:none;";          // Hides the Game Heading
 document.getElementById("abort-message-show").style.cssText = "display:contents;";           // Shows the abort/unsuccessful message.
}

//This function sets the allowed time based on age
function setlevel(){
let level = localStorage.getItem("age");
let time;

if (level >= 6 && level <= 8){
  time = 302; // 242 - 4minutes
}else if (level >= 9 && level <= 12) {
  time = 242; // 182 - 3minutes
}else{
  time = 182; // 242 - 2minutes
}
countdown(time); //Calls the timer function to run for example (180 times), countdown(180)
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
          document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.85;"; //Changes the text to orange to signify < 2mins left
          document.getElementById("flashing-bomb-text").style.cssText = "color:orange; animation:flashdiv 2s infinite; opacity:0.85;"; //Changes the color of the Bomb! text to orange and flashes it every 1s
          document.getElementsByClassName("bomb")[0].style.cssText = "border:9px double orange;"; //Increase the border size and sets the border the same color as the clock
          }else{ minutes = 0;
          document.getElementById("time-remaining").style.cssText = "color:red; opacity:1;";   //Changes the text to red to signify < 1mins left
          document.getElementById("flashing-bomb-text").style.cssText = "color:red; animation:flashdiv 500ms infinite; opacity:1;"; //Changes the color of the Bomb! text to red and flashes it every 0.5s
          document.getElementsByClassName("bomb")[0].style.cssText = "border:12px double red;"; //Further Increases the border size and sets the border the same color as the clock
        }
    //Display seconds 0 - 59
    if(x < 0 ){
      x = 59;
    }
    //This condition pads the number with a "0" if the seconds are < 10.
    if (x < 10){
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x;
      }
    //This condition does not pad the number with a "0" if the seconds are > 10.
    else{
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + x;}
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "1"
    if(counter == 1){
      stopGame();
      //nextGame();
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "0", then display the abort/loose message.
  }else if (counter == 1 ){
        stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }

},1000); //1000ms
}




function assignButtonColours(){
  let colorChoice= ["blue","brown","gold","green","black","red","purple","orange"];                     //Put the preferred colors in an array called 'colorChoice'
  for(i=0;i<colorChoice.length;i++){
    document.getElementsByClassName("wires")[i].style.cssText = `background-color:${colorChoice[i]};`; // Assign a different colour to the each of the wires.
  }
}
