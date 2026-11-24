
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider');
const container = document.querySelector('.container-images');

const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;

function updateSlider() {

    // Descobre o tamanho real de cada imagem
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Descobre o espaço entre as imagens
    const gap = parseFloat(getComputedStyle(track).gap);

    // Descobre quantas imagens cabem na tela
    const visibleSlides = Math.max(
        1,
        Math.floor((container.clientWidth + gap) / (slideWidth + gap))
    );

    // Calcula o limite do carrossel
    const maxIndex = Math.max(0, slides.length - visibleSlides);

    // Impede que o carrossel ultrapasse o limite
    currentSlide = Math.min(currentSlide, maxIndex);

    // Move as imagens
    track.style.transform =
        `translateX(-${currentSlide * (slideWidth + gap)}px)`;

    return maxIndex;
}

function nextSlider() {

    const maxIndex = updateSlider();

    if (currentSlide >= maxIndex) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    updateSlider();
}

function prevSlider() {

    const maxIndex = updateSlider();

    if (currentSlide <= 0) {
        currentSlide = maxIndex;
    } else {
        currentSlide--;
    }

    updateSlider();
}

btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);

window.addEventListener('resize', updateSlider);

// Atualiza quando a página carregar
window.addEventListener('load', updateSlider);
