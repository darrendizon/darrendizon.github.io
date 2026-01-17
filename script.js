// Function for clicking the Main Title
function sayHello() {
  alert("Hello! Thanks for clicking around my website.");
}

// Function for clicking 'Darren Dizon'
function clickedName(event) {
  // Optional: Prevent default if you want to stop the link from opening
  // event.preventDefault();
  alert("You clicked on the creator, Darren Dizon!");
}

// 1. Connect the Main Heading
const myHeading = document.getElementById("main-heading");
if (myHeading) {
  myHeading.addEventListener("click", sayHello);
}

// 2. Connect the Name Link
const myNameLink = document.getElementById("my-name-link");
if (myNameLink) {
  myNameLink.addEventListener("click", clickedName);
}
