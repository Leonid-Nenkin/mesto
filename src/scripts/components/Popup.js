import {popupCloseButtonSelector, popupOverlaySelector, popupOpenClass} from '../utils/constants.js';

export default class Popup {
  constructor (cardSelector) {
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    this._closeButton = template.querySelector(popupCloseButtonSelector);
    this._closeButton.addEventListener("click", () => {this.close()});
    return template;
  }

  _handleEscClose(evt) {
    if (evt.key==="Escape") {
      document.querySelector('.popup_opened').classList.remove(popupOpenClass);
    }
  }

  open() {
    this._element = this._getTemplate();
    this._element.classList.add(popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove(popupOpenClass);
  }

  setEventListeners() {
    this._element.querySelector(popupOverlaySelector).addEventListener('click', () => {
      this.close();
    });

    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}