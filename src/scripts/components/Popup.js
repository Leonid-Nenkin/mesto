import {popupCloseButtonSelector, popupOverlaySelector, popupOpenClass} from '../utils/constants.js';

export default class Popup {
  constructor (cardSelector) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._closeButton = this._element.querySelector(popupCloseButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector);
    return template;
  }

  _handleEscClose(evt) {
    if (evt.key==="Escape") {
      this.close();
    }
  }

  open() {
    this._element.classList.add(popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove(popupOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
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