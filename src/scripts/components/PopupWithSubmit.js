import Popup from './Popup.js';
import {formSubmitButton} from '../utils/constants.js';

export default class PopupWithSubmit extends Popup {
  constructor(cardSelector, submitCallBack) {
    super(cardSelector);
    this._submitCallBack = submitCallBack;
    this._submitButton = this._element.querySelector(formSubmitButton);
    this._submitButton.addEventListener('click', this._submitCallBack);
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', this._submitCallBack);
  }

  setCallBack(callback) {
    this._submitCallBack = callback;
    this._element.addEventListener('submit', this._submitCallBack);
    this._submitButton.addEventListener('click', this._submitCallBack);
  }
}