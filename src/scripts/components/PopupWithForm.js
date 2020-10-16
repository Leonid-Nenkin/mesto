import Popup from './Popup.js';
import {formProfileNameSelector, formProfileDescSelector, formSubmitButton,
   inputFieldSelector, formFieldSelector} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(cardSelector, submitCallBack) {
    super(cardSelector);
    this._submitCallBack = submitCallBack;
    this._submitButton = formSubmitButton;
  }

  setFieldsValues(data) {
    this._element.querySelectorAll(formFieldSelector).forEach((item, i)=>{
      item.querySelector(inputFieldSelector).value= data[i];
    });

    const inputEvent = new Event('input');
    this._element.querySelector(formProfileNameSelector).dispatchEvent(inputEvent); 
    this._element.querySelector(formProfileDescSelector).dispatchEvent(inputEvent);
  }

  _getInputValues() {
    const data = [];
    this._element.querySelectorAll(formFieldSelector).forEach((item, i)=>{
      data[i] = item.querySelector(inputFieldSelector).value;
    });
    return data;
  }

  setEventListeners(){
    super.setEventListeners();
    this._element.addEventListener("submit", this._submitCallBack);
  }

  open() {
    super.open();
  }
}

export {PopupWithForm};