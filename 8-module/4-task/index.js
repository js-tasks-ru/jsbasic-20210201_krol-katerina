import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(item => item.product.id == product.id);
    if(cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;
    if(cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if(this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((total, item) => total + item.count, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((total, item) => total + item.count * item.product.price, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalBody = document.createElement('div');

    for(let item of this.cartItems) {
      this.modalBody.append(this.renderProduct(item.product, item.count));
    }
    this.modalBody.append(this.renderOrderForm());

    let counterButtons = this.modalBody.querySelectorAll('.cart-counter__button');
    for (let button of counterButtons) {
      button.addEventListener('click', (event) => {
        let productCart = event.target.closest('.cart-product');
        if (button.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(productCart.getAttribute('data-product-id'), 1);
        } else {
          this.updateProductCount(productCart.getAttribute('data-product-id'), -1);
        }
      })

    }

    let cartForm = this.modalBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

    this.modal.setBody(this.modalBody);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      if (this.getTotalCount() < 1) {
        this.modal.close();
        return;
      } else if (cartItem.count == 0) {
        this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
      } else {
        this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count;
        this.modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
        this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    let submitButton = this.modalBody.querySelector(`button[type='submit']`);
    submitButton.classList.add('is-loading');

    let cartForm = this.modalBody.querySelector('.cart-form');
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm)
    })

    if(response.ok) {
      this.modal.setTitle('Success!');
      let modalBodySuccess = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;
      this.modal.setBody(createElement(modalBodySuccess));
      this.cartItems = [];
    }

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

