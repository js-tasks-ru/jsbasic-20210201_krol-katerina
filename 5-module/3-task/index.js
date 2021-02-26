function initCarousel() {
  let arrowRight = document.querySelector('.carousel__arrow_right'); //правая стрелка
  let arrowLeft = document.querySelector('.carousel__arrow_left'); //левая стрелка
  let carouselContainer = document.querySelector('.carousel'); //контейнер, внутри которого двигаем иннер
  let carouselInner = document.querySelector('.carousel__inner'); //иннер, который будем двигать
  let carouselSlides = document.querySelectorAll('.carousel__slide'); //выбираем все слайды
  let transform = 0;
  let slideWidth = carouselInner.offsetWidth;
  arrowLeft.style.display = 'none'; //левая кнопка скрыта по умолчанию

  function arrowMoveRight() {
    transform -= slideWidth;
    carouselInner.style.transform = `translateX(${transform}px)`;
    if(transform > -slideWidth * (carouselSlides.length - 1)) {
      arrowRight.style.display = '';
      arrowLeft.style.display = '';
    } else {
      arrowRight.style.display = 'none';
    };
  };

  function arrowMoveLeft() {
    transform += slideWidth;
    carouselInner.style.transform = `translateX(${transform}px)`;
    arrowRight.style.display = ''; //возращаем правую стрелку
    if(transform == 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    };
  };

  arrowRight.addEventListener('click', arrowMoveRight);
  arrowLeft.addEventListener('click', arrowMoveLeft);
}
