import {handleKeyPress} from './index.js';

export default class Card {
    constructor (data, cardSelector) {
        this._text = data.text;
        this._image= data.link;
        this._cardSelector = cardSelector;
    }

    _getCardTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

            return cardElement;
    }

    generateCard () {
        this._element = this._getCardTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').style.backgroundImage = "url(" + this._image + ")";
        this._element.querySelector('.card__text').textContent = this._text;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {this._handleLikeClick()});
        this._element.querySelector('.card__trashCan').addEventListener('click', (evt) => {this._handleTrashCanClick(evt)});
        this._element.querySelector('.card__image').addEventListener('click', () => {this._handleImageClick()});
    }
    
    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleTrashCanClick(evt) {
        evt.stopPropagation();
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        const popupReference = document.querySelector('.page__popup_card-image');
        const img = popupReference.querySelector('.popup__image');
        
        img.src = this._image;
        img.alt = this._text;
        popupReference.querySelector('.popup__caption').textContent = this._text;
        this._openPopupHandler(popupReference);
    }

    _openPopupHandler(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', handleKeyPress);
    }
}