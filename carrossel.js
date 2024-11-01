const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const slideIndicators = document.getElementById("slideIndicators");

let slidesPerView = getSlidesPerView();
let currentSlide = 0;
const totalSlides = carousel.children.length;

// Função para determinar quantos slides mostrar baseado no tamanho da tela
function getSlidesPerView() {
    if (window.innerWidth < 640) { // Mobile
        return 1;
    } else if (window.innerWidth < 1024) { // Tablet
        return 2;
    } else { // Desktop
        return 3;
    }
}

// Função para calcular o número máximo de posições do slide
function getMaxSlidePosition() {
    return Math.max(0, totalSlides - slidesPerView);
}

// Função para atualizar o carrossel
function updateCarousel() {
    const slides = carousel.children;
    const slideWidth = 100 / slidesPerView;
    const maxTranslate = -(getMaxSlidePosition() * slideWidth);
    const offset = -currentSlide * slideWidth;
    
    // Atualizar a largura de cada slide
    Array.from(slides).forEach(slide => {
        slide.style.width = `${slideWidth}%`;
    });
    
    // Garantir que o offset não ultrapasse o limite máximo
    carousel.style.transform = `translateX(${Math.max(maxTranslate, offset)}%)`;
    updateIndicators();
}

// Função para criar indicadores
function createIndicators() {
    slideIndicators.innerHTML = '';
    const totalIndicators = Math.ceil(totalSlides / slidesPerView);
    
    for (let i = 0; i < totalIndicators; i++) {
        const indicator = document.createElement('button');
        indicator.className = `w-3 h-3 rounded-full transition-colors duration-300 ${
            i === Math.floor(currentSlide / slidesPerView) ? 'bg-[#F3603C]' : 'bg-gray-300'
        }`;
        indicator.addEventListener('click', () => {
            currentSlide = i * slidesPerView;
            if (currentSlide > getMaxSlidePosition()) {
                currentSlide = getMaxSlidePosition();
            }
            updateCarousel();
        });
        slideIndicators.appendChild(indicator);
    }
}

// Função para atualizar indicadores
function updateIndicators() {
    const indicators = slideIndicators.children;
    const currentIndicator = Math.floor(currentSlide / slidesPerView);
    
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].className = `w-3 h-3 rounded-full transition-colors duration-300 ${
            i === currentIndicator ? 'bg-[#F3603C]' : 'bg-gray-300'
        }`;
    }
}

// Event Listeners para botões de navegação
prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

nextButton.addEventListener("click", () => {
    if (currentSlide < getMaxSlidePosition()) {
        currentSlide++;
        updateCarousel();
    }
});

// Atualizar em caso de redimensionamento da janela
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            // Ajustar a posição atual se necessário
            if (currentSlide > getMaxSlidePosition()) {
                currentSlide = getMaxSlidePosition();
            }
            createIndicators();
            updateCarousel();
        }
    }, 250);
});

// Suporte a touch para dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < getMaxSlidePosition()) {
            nextButton.click();
        } else if (diff < 0 && currentSlide > 0) {
            prevButton.click();
        }
    }
}

// Inicialização
window.addEventListener('load', () => {
    createIndicators();
    updateCarousel();
});

// Opcional: Auto-play
function startAutoPlay(interval = 5000) {
    return setInterval(() => {
        if (currentSlide < getMaxSlidePosition()) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
    }, interval);
}

// Descomente a linha abaixo se quiser ativar o auto-play
 const autoPlayInterval = startAutoPlay();