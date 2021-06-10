//////Start game
startGame();




/*tryCombination only executes after the start game function is
   running this is to ensure the Try Combination button is not active.*/
//tryCombination();
  function tryCombination(){
    //document.getElementById("try").onclick = function (){
    trys--;
    console.log(trys);
    if (trys == 0){
      stopGame();
    }else if(trys <20 && trys >10){
      document.getElementById("attempts").innerHTML = "00" + trys;
      document.getElementById("attempts").style.cssText = "color:orange; opacity: 0.75";
    }else if(trys <10){
      document.getElementById("attempts").innerHTML = "000" + trys;
      document.getElementById("attempts").style.cssText = "color:red; opacity: 0.85";
    }else{
      document.getElementById("attempts").innerHTML = "00" + trys;
    }

}
var trys;
/* Sets the difficuly based on the age of the participant and calls the tryCombination
function that monitors the remaining attempts, if the attempts reach 0 it calls stopGame.*/
function setDifficulty(){
let level = localStorage.getItem("age");

  if (level >= 6 && level <= 8){
    trys = 51; // 36 attempts after 1st click
  }else if (level >= 9 && level <= 12) {
    trys = 46; // 30 attempts after 1st click
  }else if (level > 12){
     trys = 40; // 24 attempts after 1st click
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
  generateCombination();

  //incrementDecrement(i);
  document.querySelector("#start").innerHTML = "Abort!";
  document.getElementById("start").style.cssText = "background:yellow; color:black; opacity:0.6";
  document.getElementsByClassName("combination-outline-game")[0].style.cssText = "border: 3px solid green; opacity:1";
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
    //Display minutes
    if (counter < 242 && counter >= 182){minutes = 3;}
    else if (counter < 182 && counter >= 122){
      minutes = 2;}
    else if (counter < 122 && counter >= 62){
      minutes = 1;
          document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.75;";
    }else{ minutes = 0;
          document.getElementById("time-remaining").style.cssText = "color:red; opacity:0.75;";
        }
    //Display seconds
    if(x < 0){x = 59;}
    //Update the time on the page, the first condition pads the number with a "0" if the seconds are < 10.
    if (x < 10){
      document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x;

    }
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
/* Target the font awesome <i> elements as a means to get the ids to determine which button was clicked
*/


function incrementDecrement(i){

  let upAndDown = i.id;

  console.log(combo);
  switch (upAndDown) {
    case 'barrel-0-plus':                                         //Barrel 0 "+" increment
    tryCombination();
    if(combo[6] === 9){combo[6] = 9;}else{combo[6]++;}            //If number is > 9 freeze it at 9
    document.getElementById("barrel-0").innerHTML = combo[6];     //Set innerhtml to the contents of combo[6]
    if (combo[0] === combo[6]){                                   //if the first entry in the array matches the 6th set he background to green and the text to white.
    document.getElementById("a").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-0-plus').setAttribute('id', 'inactive');};
    break
    case 'barrel-1-plus':                  //Barrel 1 "+" increment
    tryCombination();
    if(combo[7] === 9){combo[7] = 9;}else{combo[7]++;}
    document.getElementById("barrel-1").innerHTML = combo[7];
    if (combo[1] === combo[7]){
      document.getElementById("b").style.cssText = "background:green; color:white; opacity:0.75;"
      document.getElementById('barrel-1-plus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-2-plus':                  //Barrel 2 "+" increment
    tryCombination();
    if(combo[8] === 9){combo[8] = 9;}else{combo[8]++;}
    document.getElementById("barrel-2").innerHTML = combo[8];
    if (combo[2] === combo[8]){
    document.getElementById("c").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-2-plus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-3-plus':                  //Barrel 3 "+" increment
    tryCombination();
    if(combo[9] === 9){combo[9] = 9;}else{combo[9]++;}
    document.getElementById("barrel-3").innerHTML = combo[9];
    if (combo[3] === combo[9]){
    document.getElementById("d").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-3-plus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-4-plus':                  //Barrel 4 "+" increment
    tryCombination();
    if(combo[10] === 9){combo[10] = 9;}else{combo[10]++;}
    document.getElementById("barrel-4").innerHTML = combo[10];
    if (combo[4] === combo[10]){
    document.getElementById("e").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-4-plus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-5-plus':                 //Barrel 5 "+" increment
    tryCombination();
    if(combo[11] === 9){combo[11] = 9;}else{combo[11]++;}
    document.getElementById("barrel-5").innerHTML = combo[11];
    if (combo[5] === combo[11]){
    document.getElementById("f").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-5-plus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-0-minus':                //Barrel 0 "-" decrement
    tryCombination();
    if(combo[6] === 0){combo[6] = 0;}else{combo[6]--;}
    document.getElementById("barrel-0").innerHTML = combo[6];
    if (combo[0] === combo[6]){
    document.getElementById("a").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-0-minus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-1-minus':                 //Barrel 1 "-" decrement
    tryCombination();
    if(combo[7] === 0){combo[7] = 0;}else{combo[7]--;}
    document.getElementById("barrel-1").innerHTML = combo[7];
    if (combo[1] === combo[7]){
      document.getElementById("b").style.cssText = "background:green; color:white; opacity:0.75;"
      document.getElementById('barrel-1-minus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-2-minus':                 //Barrel 2 "-" decrement
    tryCombination();
    if(combo[8] === 0){combo[8] = 0;}else{combo[8]--;}
    document.getElementById("barrel-2").innerHTML = combo[8];
    if (combo[2] === combo[8]){
      document.getElementById("c").style.cssText = "background:green; color:white; opacity:0.75;"
      document.getElementById('barrel-2-minus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-3-minus':                 //Barrel 3 "-" decrement
    tryCombination();
    if(combo[9] === 0){combo[9] = 0;}else{combo[9]--;}
    document.getElementById("barrel-3").innerHTML = combo[9];
    if (combo[3] === combo[9]){
      document.getElementById("d").style.cssText = "background:green; color:white; opacity:0.75;"
      document.getElementById('barrel-3-minus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-4-minus':                 //Barrel 4 "-" decrement
    tryCombination();
    if(combo[10] === 0){combo[10] = 0;}else{combo[10]--;}
    document.getElementById("barrel-4").innerHTML = combo[10];
    if (combo[4] === combo[10]){
    document.getElementById("e").style.cssText = "background:green; color:white; opacity:0.75;"
    document.getElementById('barrel-4-minus').setAttribute('id', 'inactive');};
    break;
    case 'barrel-5-minus':                 //Barrel 5 "-" decrement
    tryCombination();
    if(combo[11] === 0){combo[11] = 0;}else{combo[11]--;}
    document.getElementById("barrel-5").innerHTML = combo[11];
    if (combo[5] === combo[11]){
      document.getElementById("f").style.cssText = "background:green; color:white; opacity:0.75;"
      document.getElementById('barrel-5-minus').setAttribute('id', 'inactive');};
    break;
    default:

    return false;

  }

  }



/*
function compareCombinations(){
      console.log("before check" + combo);
    if (combo[0] === combo[6]){
      document.getElementById("barrel-div-0").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if (combo[1] === combo[7]){
      document.getElementById("barrel-div-1").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if(combo[2] === combo[8]){
      document.getElementById("barrel-div-2").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if(combo[3] === combo[9]){
      document.getElementById("barrel-div-3").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if(combo[4] === combo[10]){
      document.getElementById("barrel-div-4").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if(combo[5] === combo[11]){
      document.getElementById("barrel-div-5").style.cssText = "background:green; color:white; opacity:0.75";
      console.log("success we have a match");
      console.log("After check" + combo);
    }else if(combo[0] === combo[6] && combo[1] == combo[7] && combo[2] == combo[8] && combo[3] == combo[9] && combo[4] == combo[10] && combo[5] == combo[11]){
        console.log("success............................................................");
    }else{
      console.log("no match");
    }

    }

*/





//
///////////// nice jquery transistion effect for one of the other games
//$(".fa-plus").click(function() {
  //    $( this ).slideUp();});
//}
