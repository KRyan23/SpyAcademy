//Start
document.getElementById("big-red-button").onclick = function() {   //This function waits for the player to click the Big Red button then runs startGame
startGame();
}

function startGame(){                                              //1. Start Game calls hideContent to clear the screen for the main game.
  hideContent();                                                   //2. Calls hideContent which hides the front page.
  setlevel();                                                      //3. Calls setlevel which calculate the allowed time based on age, this is then passed to function 'countdown'
  unhideContent();                                                 //4. Calls unhideContent which displays the contents of the main game.
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

function stopGame(interval){

localStorage.setItem('secs', 0); // Sets the Display seconds 0 - 59 If condition to 0 to stop it counting.
console.log("Game ran out of time");

}

//This function sets the allowed time based on age
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

function countdown(seconds) {
  let counter = seconds;
  let minutes;
  let x = 60;
  let y = 0;
  localStorage.setItem('secs', 59);

  let interval = setInterval(() => {

    let seconds = localStorage.getItem('secs');
    counter--;
    x--;
    //Display minutes 4 - 0
    if (counter < 242 && counter >= 182){minutes = 3;}
    else if (counter < 182 && counter >= 122){
      minutes = 2;}
    else if (counter < 122 && counter >= 62){
      minutes = 1;
          document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.85;"; //Changes the text to orange to signify < 2mins left
          document.getElementById("flashing-bomb-text").style.cssText = "color:orange; animation:flashdiv 1s infinite; opacity:0.85;"; //Changes the color of the Bomb! text to orange and flashes it every 1s
        }else{ minutes = 0;
          document.getElementById("time-remaining").style.cssText = "color:red; opacity:1;";   //Changes the text to red to signify < 1mins left
          document.getElementById("flashing-bomb-text").style.cssText = "color:red; animation:flashdiv 500ms infinite; opacity:1;"; //Changes the color of the Bomb! text to red and flashes it every 0.5s
        }
    //Display seconds 0 - 59
    if(x < 0){x = seconds;}
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
    }else if (counter == 1 && winflag == 0){
        stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }


},1000); //1000ms
}
