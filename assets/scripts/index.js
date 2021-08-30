/* This function updates the age placeholder */
function show_slider_age(x) {
  document.getElementById("age-slider").innerHTML = x;
  enterButtonActive();
  localStorage.setItem("age", x);
}
/* This function changes styles on the Enter button */
function enterButtonActive() {
  var x = document.getElementById("link-for-brb");
  x.classList.remove("button-not-active");
  var y = document.getElementById("pulsing-background");
  y.classList.remove("main-page-text-age");
  var z = document.getElementById("big-red-button");
  z.classList.add("main-button-active");
}
