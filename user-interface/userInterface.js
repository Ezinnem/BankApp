function navbar() {
  var bar = document.getElementById("myTopnav");
  if (bar.className === "topnav") {
    bar.className += " responsive";
  } else {
    bar.className = "topnav";
  }
}