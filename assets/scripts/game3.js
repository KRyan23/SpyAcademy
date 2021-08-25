//Start
//This function waits for the player to click the Big Red button then runs startGame
document.getElementById("big-red-button").onclick = function() {
startGame();
}
//This function handles the player to clicking eitheer the Start or Abort fucntions of the button
document.getElementById("start-abort").onclick = function() {
let quitGame = document.querySelector('#start-abort').innerHTML;         //Queries the text of the button if it matches 'Abort', then it runs stopGame.
if(quitGame=="Abort!"){
  console.log(quitGame);
  stopGame();
}
setlevel();                                                             //Calls setlevel which calculate the allowed time based on age, this is then passed to function 'countdown'
countdown(localStorage.getItem("theTime"));                             //Calls the countdown function using the variable stored in 'theTime'
document.querySelector("#start-abort").innerText = "Abort!";            //Changes the start button text to abort
document.getElementById("start-abort").style.cssText = "background:black; color:yellow; opacity:1;"; //Changes the start button to yellow with black tex
}
//This is the main function that runs the game sequence
function startGame(){
  hideContent();                                                        //1. Calls hideContent which hides the front page.
  unhideContent();                                                      //2. Calls unhideContent which displays the contents of the main game.
  assignButtonColours();                                                //3. Assigns the 'Wire' colors as opposed to using inline styling or multiple classes.
  generateDiffuseOrder()                                                //4. This function randomises the number 1 - 8 in an array.

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
// This function displays the 'Unsuccessful' message when either the player runs out of time or hits the 'abort' button
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
  time = 842; // 242 - 4minutes
}else if (level >= 9 && level <= 12) {
  time = 742; // 182 - 3minutes
}else{
  time = 682; // 242 - 2minutes
}
localStorage.setItem("theTime", time);
console.log(localStorage.getItem("theTime"));
//countdown(time); //Calls the timer function to run for example (180 times), countdown(180)
}
var interval;
/* Countdown  */
function countdown(seconds) {
  let counter = seconds;
  let minutes;
  let x = 60;
  let y = 0;


  interval = setInterval(() => {
    counter--;
    x--;
    //Display minutes 4 - 0
    if (counter < 842 && counter >= 782){
      minutes = 13;}
    else if (counter < 782 && counter >= 722){
      minutes = 12;}
    else if (counter < 722 && counter >= 662){
      minutes = 11;}
    else if (counter < 662 && counter >= 602){
      minutes = 10;}
    else if (counter < 602 && counter >= 542){
      minutes = 9;}
    else if (counter < 542 && counter >= 482){
      minutes = 8;}
    else if (counter < 482 && counter >= 422){
      minutes = 7;}
    else if (counter < 422 && counter >= 362){
      minutes = 6;}
    else if (counter < 362 && counter >= 302){
      minutes = 5;}
    else if (counter < 302 && counter >= 242){
      minutes = 4;}
    else if (counter < 242 && counter >= 182){
      minutes = 3;}
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
    if(x < 0 ){x = 59;}
    //This condition pads the number with a "0" if the seconds are < 10.
    if (x < 10){document.getElementById("time-remaining").innerHTML = "0" + minutes + ":" + y + x;}
    //This condition does not pad the number with a "0" if the seconds are > 10.
    else{document.getElementById("time-remaining").innerHTML =  minutes + ":" + x;}
    //Terminate the game when counter reaches 1 second left and when winflags value is set to "1"
    if(counter == 1){
      stopGame();
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
// Start of the fisherYates function///////////////////////////////////////////////////////////////////////////////////////////
 /*This function is not my code it uses the fisherYates method to jumble up the contents of an array in this case numbers 1 - 8
 https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
var wiresarray = [1,2,3,4,5,6,7,8];
// Use an array to store the numbers 1 - 8
function generateDiffuseOrder(){
 var count = wiresarray.length,
     randomnumber,
     temp;
 while( count ){
  randomnumber = Math.random() * count-- | 0;
  temp = wiresarray[count];
  wiresarray[count] = wiresarray[randomnumber];
  wiresarray[randomnumber] = temp
 }
}
// End of the fisherYates function//////////////////////////////////////////////////////////////////////////////////////////////

//This function listens for a click event on anything with a class of 'wires'
$(document).on('click', '.wires', function(){
       let wire = ($(this).attr('id'));                            //Get id of the password box that was clicked on
       localStorage.setItem("wireId", wire);                       //Commit the value of the password boxes id to local storage
       checkanswers();                                             //Calls the check answers function
    });

// This function compares the correct sequence chosen by the user to the sequence in the array.
function checkanswers(){
  let theWiresId = localStorage.getItem("wireId");                 //Assigns the current value of local store to the variable theWiresId
  let indexNumber;
  console.log(theWiresId);                                         //This section updates the variable indexNumber depending on which id value is chosen
  if(theWiresId == 'wire-1'){
     indexNumber = 1;
  }else if(theWiresId == 'wire-2'){
     indexNumber = 2;
  }else if(theWiresId == 'wire-3'){
     indexNumber = 3;
  }else if(theWiresId == 'wire-4'){
     indexNumber = 4;
  }else if(theWiresId == 'wire-5'){
     indexNumber = 5;
  }else if(theWiresId == 'wire-6'){
     indexNumber = 6;
  }else if(theWiresId == 'wire-7'){
     indexNumber = 7;
  }else if(theWiresId == 'wire-8'){
     indexNumber = 8;
  }else{
    console.log('Invalid Choice');
  }

if(indexNumber == wiresarray[0]){                                       // Check if index number is equal to the 1st number in the array
  wiresarray.shift();                                                   // Delete the 1st entry in the array is correctly guessed.
  document.getElementById(theWiresId).style.cssText = "animation:flashdiv 0.1s 10; background-color: white; color: #00FF00; padding:0 1% 0 1%; font-size: 95%;";
  document.getElementById(theWiresId).innerText = "Correct!";      //Apply styling and change text on the button after a successful choice
}else{
  console.log("you loose time");
  let wronganswer = localStorage.getItem("theTime");
  wronganswer = (wronganswer -60);
  localStorage.setItem("theTime", wronganswer);
  //console.log(localStorage.getItem("theTime"));
  console.log(wronganswer);
  clearInterval(interval);
  countdown(localStorage.getItem("theTime"));
} //////////////Left off here just need to figure out a way of stopping the current counter before calling an new instance
}

//--------------------------------End Of File--------------------------------------------------
