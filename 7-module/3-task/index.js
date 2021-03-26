import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.slider;
    this.steps = steps;
    this.value = value;
    this.createSlider();
    this.changeSliderValue();
  }

  createSlider() {
    this.sliderCover = `
      <div class="slider">
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps">
        </div>
      </div>
    `;
    this.slider = createElement(this.sliderCover);
    document.querySelector('.container').appendChild(this.slider);

    this.sliderSteps = this.slider.querySelector('.slider__steps');
    for(let i = 0; i < this.steps; i++) {
      let sliderInner = (`<span value = '${i}'></span>`);
      this.sliderSteps.insertAdjacentHTML('beforeend', sliderInner);
    }
    this.sliderSteps.firstElementChild.classList.add('slider__step-active');

    //добавляем слайдер
    this.elem = this.slider;
  }

  changeSliderValue() {
    this.slider.addEventListener('click', (event) => {
      let left = event.clientX - this.slider.getBoundingClientRect().left;//определим расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика
      let leftRelative = left / this.slider.offsetWidth;//рассчитаем относительное значение, взяв за основу ширину слайдера
      //нужно получить конкретное значение слайдера
      let segments = this.steps - 1;
      let approximateValue = Math.round(leftRelative * segments);
      //получить значение в процентах для перемещения ползунка
      let valuePercents = approximateValue / segments * 100;
      //перемещение ползунка
      let thumb = this.slider.querySelector('.slider__thumb');
      let progress = this.slider.querySelector('.slider__progress');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      //новое значение slider value
      let sliderValue = this.slider.querySelector('.slider__value');
      sliderValue.innerHTML = approximateValue;
      let sliderSteps = this.slider.querySelector('.slider__steps');

      //подсвечиваем выбранный шаг
      for(let i = 0; i < sliderSteps.children.length; i++) {
        sliderSteps.children[i].classList.remove('slider__step-active');
      }
      sliderSteps.children[approximateValue].classList.add('slider__step-active');

      //всплытие
      let value = +sliderSteps.children[approximateValue].getAttribute('value');
      event.target.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      }));
    });
  }
}
