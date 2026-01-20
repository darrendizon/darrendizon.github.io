function sayHello() {
  alert("Hello! Thanks for clicking around my website.");
}

function clickedName(event) {
  alert("You clicked on the creator, Darren Dizon!");
}

const myHeading = document.getElementById("main-heading");
if (myHeading) {
  myHeading.addEventListener("click", sayHello);
}

const myNameLink = document.querySelector('a[href*="linktr.ee"]');
if (myNameLink) {
  myNameLink.addEventListener("click", clickedName);
}
