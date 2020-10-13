import Popup from './Popup.js';
import {formProfileNameSelector, formProfileDescSelector, formSubmitButton} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(cardSelector, submitCallBack) {
    super(cardSelector);
    this._submitCallBack = submitCallBack;
  }

  setFieldsValues(first, second) {
    this._element.querySelector(formProfileNameSelector).value = first;
    this._element.querySelector(formProfileDescSelector).value = second;
    
    const inputEvent = new Event('input');
    this._element.querySelector(formProfileNameSelector).dispatchEvent(inputEvent);
    this._element.querySelector(formProfileDescSelector).dispatchEvent(inputEvent);
  }

  _getInputValues() {
    const data = {"firstField": this._element.querySelector(formProfileNameSelector).textContent,
                  "secondField": this._element.querySelector(formProfileDescSelector).textContent};
    return data;
  }

  setEventListeners(){
    super.setEventListeners();
    this._element.querySelector(formSubmitButton).addEventListener("click", this._submitCallBack);
  }

  open() {
    super.open();
  }
}

export {PopupWithForm};