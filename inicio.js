// ISSO PARACE HIERÁRQUICO, NÃO ENTENDO MISÉRIA DE 2/3 DISSO

const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;
const visibleSlides = 3; // Quantidade de fotos visíveis
const maxIndex = slides.length - visibleSlides; // Limite para não sobrar espaço vazio no final

function updateSlider() {
  // 390px (nova largura da foto) + 15px (gap) = 405px
  const slideWidth = 390 + 15; 
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlider() {
  if (currentSlide >= maxIndex) {
    currentSlide = 0; // Volta para o início
  } else {
    currentSlide++;
  }
  updateSlider();
}

function prevSlider() {
  if (currentSlide <= 0) {
    currentSlide = maxIndex; // Vai para o final
  } else {
    currentSlide--;
  }
  updateSlider();
}

btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);

// Recalcula a posição caso o usuário redimensione a janela do navegador
window.addEventListener('resize', updateSlider);
