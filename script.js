// Function 1: Alert for the Heading
function sayHello() {
  alert("Hello! Thanks for clicking around my website.");
}

// Function 2: Alert for the Name Link
function clickedName(event) {
  // Uncomment the line below if you want to stop the link from opening
  // event.preventDefault();
  
  alert("You clicked on the creator, Darren Dizon!");
}

// --- Connect the logic ---

// 1. Connect the Main Heading
const myHeading = document.getElementById("main-heading");

if (myHeading) {
  myHeading.addEventListener("click", sayHello);
}

// 2. Connect the Name Link
// We look for any <a> tag that contains 'linktr.ee' in the href
const myNameLink = document.querySelector('a[href*="linktr.ee"]');

if (myNameLink) {
  myNameLink.addEventListener("click", clickedName);
}

console.log("JavaScript connected successfully.");
