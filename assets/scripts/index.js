

/* This function:
1.Displays the age above the slider
2.Calls brb_active
3.Stores the age variable in local storage so we can access it,
from another js later.
*/
function show_slider_age(x){
  document.getElementById("age-slider").innerHTML=x;
  brb_active();
localStorage.setItem("age", x);
}

/* This function:
1.Removes the button-not-active class from the BRB to make the link active.
2.Stop the background on the slider bar from flashing once an age is chosen.
3.Makes the Big Red Button flash once an age is chosen.
*/
function brb_active(){
  var x = document.getElementById("link-for-brb");
  x.classList.remove("button-not-active");

  var y = document.getElementById("pulsing-background");
  y.classList.remove("main-page-text-age");

  var z = document.getElementById("big-red-button");
    z.classList.add("main-button-active");

}

//End of file
