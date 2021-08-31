var wiresarray = [1,2,3,4,5,6,7,8];
var interval;

//This is the main function that runs the game sequence
function startGame(){
  hideContent();
  unhideContent();
  assignButtonColours();
  generateDiffuseOrder();
  clearInterval(interval);
  setlevel();
  countdown(localStorage.getItem("theTime"));
  listeningForClick();
}
//This function applies a css rule to hide all elements with class 'hide-after-start'
function hideContent(){
  for(var i=0;i<4;i++){
    document.getElementsByClassName("hide-after-start")[i].style.cssText = "display:none;";
  }
}
//This function unhides the main game content
function unhideContent(){
  for(var j=0;j<4;j++){
    document.getElementsByClassName("show-after-start")[j].style.cssText = "display:contents;";
    document.getElementsByClassName("show-after-start")[j].style.cssText = "animation: fadein 1s;";
    }

}
// This function displays the 'Unsuccessful' message when either the player runs out of time or hits the 'abort' button
function stopGame(){
for(var z=0;z<4;z++){
  document.getElementsByClassName("show-after-start")[z].style.cssText = "display:none;";
}
 document.getElementsByClassName("outer-screen-border")[0].style.cssText = "display:none;";
 document.getElementsByClassName("game-heading")[0].style.cssText = "display:none;";
 document.getElementById("abort-message-show").style.cssText = "display:contents;";
}

//This function sets the allowed time based on age
function setlevel(){
var level = localStorage.getItem("age");
var time;
if (level >= 6 && level <= 8){
  time = 1242; // 20 minutes
}else if (level >= 9 && level <= 12) {
  time = 1122; // 18 minutes
}else{
  time = 1062; // 17 minutes
}
localStorage.setItem("theTime", time);
}
/* This is the main timer function */
function countdown(seconds) {
  var counter = seconds;
  var minutes;
  var x = 60;
  var y = 0;
  interval = setInterval(() => {
    counter--;
    x--;
    //Display minutes 20 - 0
    if (counter < 1242 && counter >= 1182){
      minutes = 20;}
    else if (counter < 1182 && counter >= 1122){
      minutes = 19;}
    else if (counter < 1122 && counter >= 1062){
      minutes = 18;}
    else if (counter < 1062 && counter >= 1002){
      minutes = 17;}
    else if (counter < 1002 && counter >= 962){
      minutes = 16;}
    else if (counter < 962 && counter >= 902){
      minutes = 15;}
    else if (counter < 902 && counter >= 842){
      minutes = 14;}
    else if (counter < 842 && counter >= 782){
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
          timeLessThanTwo();
        }else{
      minutes = 0;
        timeLessThanOne();
        }
    if (x < 0 ){
      x = 59;
    }
    if (x < 10){
      document.getElementById("time-remaining").innerHTML =  minutes + ":" + y + x;
    }
    else{
      document.getElementById("time-remaining").innerHTML =  minutes + ":" + x;
    }
    if (counter == 1 ){
        stopGame();
      document.getElementById("abort-message-show").removeAttribute("style");
    }
      document.getElementsByClassName("outer-clock-border")[0].style.cssText = "border-color:grey;";
},1000);
}

/* This function applies styles when the timer is < 2 minutes remaining */
function timeLessThanTwo(){
  document.getElementById("time-remaining").style.cssText = "color:orange; opacity:0.85;";
  document.getElementById("flashing-bomb-text").style.cssText = "color:orange; animation:flashdiv 2s infinite; opacity:0.85;";
  document.getElementsByClassName("bomb")[0].style.cssText = "border:9px double orange;";
}
/* This function applies styles when the timer is < 1 minutes remaining */
function timeLessThanOne(){
document.getElementById("time-remaining").style.cssText = "color:red; opacity:1;";
document.getElementById("flashing-bomb-text").style.cssText = "color:red; animation:flashdiv 500ms infinite; opacity:1;";
document.getElementsByClassName("bomb")[0].style.cssText = "border:12px double red;";
}
/* This function assigns the same colours to the 'wires'/buttons each time the game is started rather than using individual classes */
function assignButtonColours(){
  var colorChoice= ["blue","brown","silver","green","black","red","purple","orange"];
  for(var i=0;i<colorChoice.length;i++){
    document.getElementsByClassName("wires")[i].style.cssText = `background-color:${colorChoice[i]};`;
  }
}
// Start of the fisherYates function///////////////////////////////////////////////////////////////////////////////////////////
 /*This function is not my code it uses the fisherYates method to jumble up the contents of an array in this case numbers 1 - 8
 https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function generateDiffuseOrder(){
 var count = wiresarray.length,
     randomnumber,
     temp;
 while( count ){
  randomnumber = Math.random() * count-- | 0;
  temp = wiresarray[count];
  wiresarray[count] = wiresarray[randomnumber];
  wiresarray[randomnumber] = temp;
 }
}
// End of the fisherYates function//////////////////////////////////////////////////////////////////////////////////////////////

//This function listens for a click event on anything with a class of 'wires'
function listeningForClick(){
$(document).on('click', '.wires', function(){
       var wire = ($(this).attr('id'));
       localStorage.setItem("wireId", wire);
       checkAnswers();
    });
}
// This function compares the correct sequence chosen by the user to the sequence in the array.
function checkAnswers(){
  var theWiresId = localStorage.getItem("wireId");
  var indexNumber;
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
if(indexNumber == wiresarray[0]){
  wiresarray.shift();
  document.getElementById(theWiresId).style.cssText = "animation:flashdiv 0.1s 10; background-color: white; color: #00FF00; font-size: 95%;";
  document.getElementById(theWiresId).innerText = "Correct!";
  document.getElementsByClassName("outer-clock-border")[0].style.cssText = "animation:flashdiv 0.2s 12;border-color:green;";
}else{
  document.getElementsByClassName("outer-clock-border")[0].style.cssText = "animation:flashdiv 0.1s 2;border-color:red;";
  var wronganswer = localStorage.getItem("theTime");
  wronganswer = (wronganswer -60);
  localStorage.setItem("theTime", wronganswer);
  clearInterval(interval);
  countdown(localStorage.getItem("theTime"));
}
if(wronganswer <= 0){
  stopGame();
}
finishGame();
}


/* This function finishes up the game and displays the success message */
function finishGame(){
  if (wiresarray.length === 0) {
  for(var k=0;k<4;k++){
    document.getElementsByClassName("show-after-start")[k].style.cssText = "display:none;";
    document.getElementsByClassName("outer-screen-border")[0].style.cssText = "display:none;";
    document.getElementsByClassName("game-heading")[0].style.cssText = "display:none;";
}
   document.getElementById("game3-success").style.cssText = "display:contents;";
}
}
//This function waits for the player to click the Big Red button then runs startGame
function waitingForBigRedButton(){
document.getElementById("big-red-button").onclick = function() {
startGame();
};
}
waitingForBigRedButton();
