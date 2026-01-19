// Simple script to log a welcome message
console.log("Welcome to Darren's website!");

// Adds a fun hover effect to the main title
const title = document.querySelector('h1');

if (title) {
    title.addEventListener('mouseover', () => {
        title.style.transform = "scale(1.1)";
        title.style.transition = "transform 0.3s ease";
    });

    title.addEventListener('mouseout', () => {
        title.style.transform = "scale(1)";
    });
}
