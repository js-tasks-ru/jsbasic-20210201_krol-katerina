import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.createRibbonMenu();
    this.addScroll();
    this.chooseCategory();
  }

  createRibbonMenu() {
    let ribbonWrapper = `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
    this.elem = createElement(ribbonWrapper);

    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    for(let item of this.categories) {
      let ribbonContent = `
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `;
      ribbonInner.insertAdjacentHTML('beforeend', ribbonContent);
    }
  }

  addScroll() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner'),
      ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right'),
      ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });
    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonArrowLeft.classList.remove('ribbon__arrow_visible'); // левая стрелка скрыта по умолчанию
    ribbonInner.addEventListener('scroll', () => {
      if(ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth == 0) {// скрываем правую при достижении 0
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } else if(ribbonInner.scrollLeft < 1) {// скрываем левую при достижении 0
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
        ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      }
    });
  }

  chooseCategory() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner'),
      ribbonItemCollention = this.elem.querySelectorAll('.ribbon__item');
    ribbonInner.addEventListener('click', (event) => {
      let target = event.target;
      if(target.classList.contains('ribbon__item')) {
        for(let i = 0; i < ribbonItemCollention.length; i++) {
          ribbonItemCollention[i].classList.remove('ribbon__item_active');
        }
        target.classList.add('ribbon__item_active');
      }
      let currentribbonItemID = target.getAttribute('data-id'); //получаем уникальный идентификатора категории из выбранного объекта
      target.dispatchEvent(new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
        detail: currentribbonItemID, // уникальный идентификатора категории из её объекта
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      }));
    });
  }
}
