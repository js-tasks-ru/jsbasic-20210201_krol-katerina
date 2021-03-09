import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.createCarousel();
    this.initCarouselSwitcher();
    this.addProduct();
  }

  createCarousel() {
    //создаем оболочку слайдера
    let carouselCover = `
      <!--Корневой элемент карусели-->
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
      </div>
    `;
    this.elem = createElement(carouselCover);

    let carouselInner = this.elem.querySelector('.carousel__inner');
    for(let item of this.slides) { //перебираем массив
      let htmlElem = `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `; // содержимое слайда
      carouselInner.insertAdjacentHTML('beforeend', htmlElem); //вставляем содержимое слайда в иннер
    }
  }

  initCarouselSwitcher() {
    let arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let carouselSlides = this.elem.querySelectorAll('.carousel__slide');
    let transform = 0;
    arrowLeft.style.display = 'none'; //левая кнопка скрыта по умолчанию

    arrowRight.addEventListener('click', function() {
      transform -= carouselInner.parentNode.offsetWidth;
      carouselInner.style.transform = `translateX(${transform}px)`;
      if(transform > -carouselInner.parentNode.offsetWidth * (carouselSlides.length - 1)) {
        arrowRight.style.display = '';
        arrowLeft.style.display = '';
      } else {
        arrowRight.style.display = 'none';
      };
    });

    arrowLeft.addEventListener('click', function() {
      transform += carouselInner.parentNode.offsetWidth;
      carouselInner.style.transform = `translateX(${transform}px)`;
      arrowRight.style.display = ''; //возращаем правую кнопку
      if(transform == 0) {
        arrowLeft.style.display = 'none';
      } else {
        arrowLeft.style.display = '';
      };
    });
  }

  addProduct() {
    let addButtonsCollection = this.elem.querySelectorAll('.carousel__button');
    for(let addButton of addButtonsCollection) {
      addButton.addEventListener('click', function() {
        let currentSlideID = addButton.parentNode.parentNode.getAttribute('data-id');
        addButton.dispatchEvent(new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: currentSlideID, // Уникальный идентификатора товара из объекта слайда
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }));
      });
    }
  }
}
