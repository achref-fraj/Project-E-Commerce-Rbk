///////////////////////////////////////// Carousel ///////////////////////////////////////////

let currentIndex = 0;

const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
  updateCarousel();
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

function updateCarousel() {
  const carouselWidth = images[0].clientWidth;
  document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * carouselWidth}px)`;
}

setInterval(() => {
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}, 3000); 
