// Listen for a click on the start button, once clicked it runs the function setlevel.
// Once the start button is clicked, change the text from Start to Abort! and change the background from green to red.
  document.getElementById("start").onclick = function() {
  setlevel();
  document.querySelector("#start").innerHTML = "Abort!";
  document.getElementById("start").style.backgroundColor = "red";
  }
// Retrieves the age variable from local storage "age".
// Sets the difficulty level by age based on time allowed "time".
// Ages 6-8yrs get 6 minutes, 9-12yrs get 5mins and 13+ get just a 4 minute allowance.
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

// Countdown function to time the games based on seconds.
// Variables seconds and minutes are used to update the html content on screen.
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
      }
    //This code handles aborting the game and gives the user the option to return to the home page
        function stopGame(){
        clearInterval(interval); //Stops the timer by clearing it.

        let x = document.getElementsByClassName("combination-outline-controls");
        let i;
        for (i = 0; i < x.length; i++) {x[i].style.display = "none";}
   //Uses the class name "combination-outline-controls" to hide the game once the abort button is pressed.

        document.getElementById("game-instructions").style.display = "none";
  // hides the instructions text just like it does with the game above

        document.getElementById("abort-message-show").removeAttribute("style");
  /* Displays or unhides the Abort message when a user want to leave a game,
    also it is displayed when the counter reaches 0 seconds and the user has not
   successfully completed the game. */

    }

},1000); //1000ms or 1 second.
}
