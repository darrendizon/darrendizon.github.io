document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const contrastToggle = document.querySelector('.contrast-toggle');
  const body = document.body;

  // Guard Clauses
  if (!menuToggle || !menuClose || !mobileMenu || !contrastToggle) {
    console.warn('One or more navigation elements are missing.');
    return;
  }

  // Menu Logic
  function openMenu() {
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.focus(); // Accessibility focus management
  }

  function closeMenu() {
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus(); // Return focus
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
      closeMenu();
    }
  });

  // Contrast / Text Size Toggle Logic
  // Toggles between: Normal -> Large Text -> Dark Mode -> Normal
  const modes = ['light-mode', 'large-text', 'dark-mode'];
  let currentModeIndex = 0;

  contrastToggle.addEventListener('click', () => {
    // Remove current mode class
    body.classList.remove(modes[currentModeIndex]);

    // Increment index
    currentModeIndex = (currentModeIndex + 1) % modes.length;

    // Add new mode class
    body.classList.add(modes[currentModeIndex]);

    console.log(`Switched to ${modes[currentModeIndex]}`);
  });

  // Optional: Play button placeholder logic (just an alert for now)
  const playButtons = document.querySelectorAll('.play-button');
  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('This is a placeholder for the video player.');
    });
  });

  // Navigation Links Active State (Optimized with Event Delegation)
  const currentSpan = document.createElement('span');
  currentSpan.className = 'current-indicator';
  currentSpan.textContent = ' (Current)';
  currentSpan.style.display = 'none'; // Hidden by default
  document.body.appendChild(currentSpan); // Append to body initially

  // Optimized updateMenu using event delegation
  function updateMenu(e) {
    // Check if the clicked element is a link inside a navigation list
    const clickedLink = e.target.closest('.nav-list a, .nav-list-secondary a');

    if (clickedLink) {
      // Optional: Check if the link is actually inside the intended container if needed
      // But closest() with specific selectors handles most cases

      currentSpan.style.display = 'inline';
      clickedLink.appendChild(currentSpan);
    }
  }

  // Attach a single click event listener to the document (or a common parent like mobileMenu)
  document.addEventListener('click', updateMenu);
});

  // Carousel Logic
  const track = document.getElementById('track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-nav-btn.next');
    const prevButton = document.querySelector('.carousel-nav-btn.prev');
    const trackContainer = document.querySelector('.track-container');

    // Only proceed if all required elements exist
    if (slides.length > 0 && nextButton && prevButton && trackContainer) {

      let currentSlideIndex = 0;

      // Function to update slide visibility
      const updateSlides = (index) => {
        // Hide all slides
        slides.forEach(slide => {
          slide.setAttribute('aria-hidden', 'true');
          slide.style.display = 'none';
        });

        // Show current slide
        const currentSlide = slides[index];
        currentSlide.setAttribute('aria-hidden', 'false');
        currentSlide.style.display = 'block';

        // Ensure accessibility focus logic if needed
        // currentSlide.querySelector('h2').focus();
      };

      // Initialize
      updateSlides(currentSlideIndex);

      // Next Button
      nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides(currentSlideIndex);
      });

      // Prev Button
      prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlides(currentSlideIndex);
      });
    }
  }
