import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal;
    this.createModal();
    this.closeModalByX();
    this.closeModalByEsc();
  }
  createModal() {
    let modalWindow = `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
          </div>
          <div class="modal__body">A сюда нужно добавлять содержимое тела модального окна</div>
        </div>
      </div>
    `;
    this.modal = createElement(modalWindow);
    document.body.appendChild(this.modal);
  }

  open() {
    document.body.classList.add('is-modal-open');
    this.modal;
  }

  setTitle(title) {
    this.modalTitle = this.modal.querySelector('.modal__title');
    this.modalTitle.innerHTML = '';
    this.modalTitle.innerHTML = title;
  }

  setBody(node) {
    this.modalBody = this.modal.querySelector('.modal__body');
    this.modalBody.innerHTML = '';
    this.modalBody.appendChild(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }

  closeModalByX() {
    this.modal.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });
  }

  closeModalByEsc() {
    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape') {
        this.close();
      }
    });
  }
}
