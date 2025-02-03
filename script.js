let currentSlide = 0;
const slides = document.querySelectorAll('.slider .slide');

// Функція для зміни активного слайда
function changeSlide() {
  // Зняти клас "active" з поточного слайда
  slides[currentSlide].classList.remove('active');
  
  // Перейти до наступного слайда (або повернутися на перший)
  currentSlide = (currentSlide + 1) % slides.length;

  // Додати клас "active" до нового слайда
  slides[currentSlide].classList.add('active');
}

// Запустити слайдер з інтервалом у 6 секунд
setInterval(changeSlide, 6000);



// Отримуємо навігаційне меню
const navbar = document.querySelector('.navbar');

// Змінні для відстеження стану
let isShrunk = false;
let isAnimating = false;

// Функція зміни класу з debounce
const handleScroll = () => {
  if (isAnimating) return; // Запобігаємо зайвим викликам

  isAnimating = true;
  requestAnimationFrame(() => {
    const scrollPosition = Math.round(window.scrollY); // Округлюємо, щоб уникнути коливань

    if (scrollPosition > 320 && !isShrunk) {
      navbar.classList.add('shrink');
      isShrunk = true;
    } else if (scrollPosition < 280 && isShrunk) {
      navbar.classList.remove('shrink');
      isShrunk = false;
    }

    isAnimating = false;
  });
};

// Додаємо слухач події прокрутки
window.addEventListener('scroll', handleScroll);















  

