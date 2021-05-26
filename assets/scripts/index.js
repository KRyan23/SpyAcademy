

// To display the age chosen above the slider
function show_slider_age(x){
  document.getElementById("age-slider").innerHTML=x;
  brb_active();

}

// Make the BRB flash and activate the link
function brb_active(){
  var x = document.getElementById("link-for-brb");
  x.classList.remove("button-not-active");

  var y = document.getElementById("pulsing-background");
  y.classList.remove("main-page-text-age");

  var z = document.getElementById("big-red-button");
    z.classList.add("main-button-active");

}

//End of file
