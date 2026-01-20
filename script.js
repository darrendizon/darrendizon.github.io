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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('track');

  // Only initialize carousel if track exists on the page
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-nav-btn.next');
    const prevButton = document.querySelector('.carousel-nav-btn.prev');

    let currentSlideIndex = 0;

    const updateSlide = (index, shouldFocus = false) => {
      // 1. Visual Move (Uses current slide width for responsiveness)
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
  }
});
