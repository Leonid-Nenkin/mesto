import Popup from './Popup.js';
import {imageSelector, imagePopupCaption} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open(data) {
    super.open();
    this._image = this._element.querySelector(imageSelector);
    this._element.querySelector(imagePopupCaption).textContent = data.text;
    this._image.alt = data.text;
    this._image.src = data.link;
  }
}