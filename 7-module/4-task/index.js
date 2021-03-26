import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.steps = steps;
    this.value = value;
    this.createSlider();
    this.changeSliderValue();
  }

  createSlider() {
    this.elem.classList.add('slider');
    let sliderCover = `
      <div class="slider__thumb" style="left: 50%;" draggable="true">
        <span class="slider__value">2</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps">
      </div>
    `;
    this.elem.insertAdjacentHTML('beforeend', sliderCover);

    this.sliderSteps = this.elem.querySelector('.slider__steps');
    for(let i = 0; i < this.steps; i++) {
      let sliderInner = (`<span value = '${i}'></span>`);
      this.sliderSteps.insertAdjacentHTML('beforeend', sliderInner);
    }
    this.sliderSteps.firstElementChild.classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb'),
      progress = this.elem.querySelector('.slider__progress'),
      sliderValue = this.elem.querySelector('.slider__value');
    thumb.style.left = '0%';
    progress.style.width = '0%';
    sliderValue.innerHTML = '0';
  }

  changeSliderValue() {
    let sliderSteps = this.elem.querySelector('.slider__steps'),
      thumb = this.elem.querySelector('.slider__thumb'),
      progress = this.elem.querySelector('.slider__progress'),
      sliderValue = this.elem.querySelector('.slider__value');

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = Math.round(leftRelative * segments);
      let valuePercents = approximateValue / segments * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderValue.innerHTML = approximateValue;
      for(let i = 0; i < sliderSteps.children.length; i++) {
        sliderSteps.children[i].classList.remove('slider__step-active');
      }
      sliderSteps.children[approximateValue].classList.add('slider__step-active');

      //всплытие
      let activeStep = this.elem.querySelector('.slider__step-active'),
        value = +activeStep.getAttribute('value');
      event.target.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));
    });

    thumb.addEventListener('pointerdown', () => {
      let slider = this.elem;
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 1000;

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      function onPointerMove(event) {
        slider.classList.add('slider_dragging');
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      }

      function onPointerUp(event) {
        //ставим ползунок к ближайшему шагу
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        let segments = sliderSteps.children.length - 1;
        let approximateValue = Math.round(leftRelative * segments);
        let leftPercents = approximateValue / segments * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        sliderValue.innerHTML = approximateValue;

        //подсвечиваем выбранный шаг
        for(let i = 0; i < sliderSteps.children.length; i++) {
          sliderSteps.children[i].classList.remove('slider__step-active');
        }
        sliderSteps.children[approximateValue].classList.add('slider__step-active');

        document.removeEventListener('pointermove', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
        slider.classList.remove('slider_dragging');

        //всплытие
        let activeStep = slider.querySelector('.slider__step-active'),
          value = +activeStep.getAttribute('value');
        slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        }));
      }

    })

    thumb.ondragstart = function() {
      return false;
    };
  }
}
