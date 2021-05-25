

function show_value(x)
{
 document.getElementById("age-slider").innerHTML=x;
 karl();
 karl2();
}

/*
function buttonActive(){
If (x >= 6){
 var element = document.getElementById("myDIV");
 element.classList.remove("game-active");
}
*/
function karl(){
  var element = document.getElementById("link-for-brb");
  element.classList.remove("button-not-active");
}


function karl2(){
  var element = document.getElementById("big-red-button");
    element.classList.add("main-button-active");
}
