// --- Original functionality ---
function sayHello() {
  alert("Hello! Thanks for clicking around my website.");
}

function clickedName(event) {
  alert("You clicked on the creator, Darren Dizon!");
}

const myHeading = document.getElementById("main-heading");
// Added check to make sure element exists before adding listener
if (myHeading) {
  myHeading.addEventListener("click", sayHello);
}

const myNameLink = document.querySelector('a[href*="linktr.ee"]');
if (myNameLink) {
  myNameLink.addEventListener("click", clickedName);
}

// --- NEW: Accessible Menu Logic ---
const navLinks = document.querySelectorAll('.nav-link');

function updateMenu(event) {
  // 1. Remove active state from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    
    // Remove the hidden "Current Page" text span if it exists
    const span = link.querySelector('.sr-only');
    if (span) {
      span.remove();
    }
  });

  // 2. Add active state to the clicked link
  const clickedLink = event.currentTarget;
  clickedLink.classList.add('active');
  clickedLink.setAttribute('aria-current', 'page');

  // 3. Add the hidden text for Screen Readers
  const currentSpan = document.createElement('span');
  currentSpan.className = 'sr-only';
  currentSpan.textContent = '(Current Page)';
  clickedLink.appendChild(currentSpan);
}

// Attach click event to all menu links
navLinks.forEach(link => {
  link.addEventListener('click', updateMenu);
});
