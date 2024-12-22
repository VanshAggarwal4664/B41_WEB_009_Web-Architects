//Reward crousal for crousing the div
const carousel = document.getElementById('carousel');
const totalItems = document.querySelectorAll('.carousel-item').length;
const visibleItems = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
const slideWidth = 100 / visibleItems; // Width for each slide
let index = 0;
let autoSlideInterval;

function updateCarousel() {
    const offset = -(index * slideWidth);
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    if (index < totalItems - visibleItems) {
        index++;
    } else {
        index = 0; // Back to first slide
    }
    updateCarousel();
}

function prevSlide() {
    if (index > 0) {
        index--;
    } else {
        index = totalItems - visibleItems; // Go to the last set of slides
    }
    updateCarousel();
}

// Automatic Slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Slide every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Hover Events to Stop/Start Auto Slide
carousel.addEventListener('mouseover', stopAutoSlide);
carousel.addEventListener('mouseout', startAutoSlide);

// Start Auto Slide on Page Load
startAutoSlide();