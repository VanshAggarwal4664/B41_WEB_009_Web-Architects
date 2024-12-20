//Crousal for trending and new to sale section
const Trendcarousel = document.querySelector('.Trendingcarousel');
const Trenditems = document.querySelectorAll('.Trenditem');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const itemWidth = Trenditems[0].clientWidth;
let currentIndex = 0;

// Update Carousel Transform
const updateTrendCarousel = () => {
  Trendcarousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
};

// Next Button Click
next.addEventListener('click', () => {
  if (currentIndex < Trenditems.length - 4) {
    currentIndex++;
  } else {
    currentIndex = 0; // Reset to start
  }
  updateTrendCarousel();
});

// Previous Button Click
prev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = Trenditems.length - 4; // Go to last set
  }
  updateTrendCarousel();
});

// Automatic Sliding
setInterval(() => {
  if (currentIndex < Trenditems.length - 10) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateTrendCarousel();
}, 3000); // Change slide every 3 second