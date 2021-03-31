import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.eventListeners();
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    let response = await fetch('products.json', {
      method: 'GET'
    });
    this.responseFormated = await response.json();
    this.productsGrid = new ProductsGrid(this.responseFormated);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  eventListeners() {
    document.body.addEventListener('product-add', (event) => {
      let productId = event.detail;
      let addedItem = this.responseFormated.find(
        item => item.id === productId
      );
      this.cart.addProduct(addedItem);
    });

    document.body.addEventListener('slider-change', (event) => {
      let value = event.detail;
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      let categoryId = event.detail;
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.addEventListener('change', (event) => {
      let checked = event.target.checked;
      if(event.target.id == 'nuts-checkbox') {
        this.productsGrid.updateFilter({
          noNuts: checked // новое значение чекбокса
        });
      }
      if(event.target.id == 'vegeterian-checkbox') {
        this.productsGrid.updateFilter({
          vegeterianOnly: checked // новое значение чекбокса
        });
      }
    });
  }
}
