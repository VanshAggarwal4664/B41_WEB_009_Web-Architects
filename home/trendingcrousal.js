//Crousal for trending and new to sale section
function trending(){
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
  if (currentIndex < Trenditems.length - 4) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateTrendCarousel();
}, 1000); // Change slide every 3 second
}
trending();
///NEw to sale box function
function NewtoSale(){
  const Trendcarousel = document.querySelector('.Newtocarousel');
  const Trenditems = document.querySelectorAll('.Newitem');
  const prev = document.querySelector('.Newprev');
  const next = document.querySelector('.Newnext');
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
    if (currentIndex < Trenditems.length - 4) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateTrendCarousel();
  }, 2000); // Change slide every 3 seconds
}
NewtoSale();

function slidingImg(){
  const carousel = document.querySelector('.Slidecarousel');
  const items = [...document.querySelectorAll('.Slidecarousel-item')];
  items.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
  });}
  slidingImg();