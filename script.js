// This function runs when the user clicks the main heading
function sayHello() {
  alert("Hello! Thanks for clicking around my website.");
}

// 1. Find the element with the ID 'main-heading'
const myHeading = document.getElementById("main-heading");

// 2. Listen for a 'click' on that element, then run the 'sayHello' function
if (myHeading) {
  myHeading.addEventListener("click", sayHello);
}

// This logs a message to the browser console (hidden from users, seen by developers)
console.log("The JavaScript file is connected successfully!");
