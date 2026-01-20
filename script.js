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

// --- Apple Music Carousel Logic (Merged) ---
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');

  // Guard clause: if carousel track doesn't exist (e.g., on home page), stop here
  if (!track) return;

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-nav-btn.next');
  const prevButton = document.querySelector('.carousel-nav-btn.prev');

  let currentSlideIndex = 0;

  const updateSlide = (index, shouldFocus = false) => {
    // 1. Visual Move (Uses current slide width for responsiveness)
    if (slides.length > 0) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const amountToMove = slideWidth * index;
      track.style.transform = 'translateX(-' + amountToMove + 'px)';

      // 2. Accessibility Attributes
      slides.forEach((slide, i) => {
        const heading = slide.querySelector('h2');

        if (i === index) {
          slide.setAttribute('aria-hidden', 'false');
          slide.querySelectorAll('a, button').forEach(el => el.removeAttribute('tabindex'));

          if (shouldFocus && heading) {
            heading.focus({ preventScroll: true });
          }
        } else {
          slide.setAttribute('aria-hidden', 'true');
          slide.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        }
      });
    }
  };

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlide(currentSlideIndex, true);
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSlide(currentSlideIndex, true);
    });
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    updateSlide(currentSlideIndex, false);
  });

  // Initial Load
  updateSlide(0, false);
});
