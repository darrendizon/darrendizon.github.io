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

      // Performance Optimization: Cache DOM queries
      const slidesData = slides.map(slide => ({
        element: slide,
        heading: slide.querySelector('h2'),
        interactiveElements: slide.querySelectorAll('a, button')
      }));

      let currentSlideIndex = 0;

      // Debounce utility function
      const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
          const context = this;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), wait);
        };
      };

      // Function to update slide visibility
      const updateSlides = (index, shouldFocus = false) => {
        // Iterate over cached data instead of querying DOM
        slidesData.forEach((data, i) => {
          if (i === index) {
             // Show current slide
            data.element.setAttribute('aria-hidden', 'false');
            data.element.style.display = 'block';

            // Restore tabindex for interactive elements
            data.interactiveElements.forEach(el => el.removeAttribute('tabindex'));

            // Accessibility focus logic
            if (shouldFocus && data.heading) {
              data.heading.focus();
            }
          } else {
            // Hide other slides
            data.element.setAttribute('aria-hidden', 'true');
            data.element.style.display = 'none';

             // Remove from tab order
            data.interactiveElements.forEach(el => el.setAttribute('tabindex', '-1'));
          }
        });
      };

      // Handle Resize (Debounced)
      const debouncedUpdate = debounce(() => {
        updateSlides(currentSlideIndex);
      }, 250);

      window.addEventListener('resize', debouncedUpdate);

      // Initialize
      updateSlides(currentSlideIndex);

      // Next Button
      nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides(currentSlideIndex, true); // Pass true to focus heading
      });

      // Prev Button
      prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlides(currentSlideIndex, true); // Pass true to focus heading
      });
    }
  }
