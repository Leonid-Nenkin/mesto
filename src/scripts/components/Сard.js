
export default class Card {
    constructor (data, cardSelector) {
        this._text = data.text;
        this._image= data.link;
        this._likes = data.likes;
        this.cardId = data.cardId;
        this.ownerId = data.ownerId;
        this._cardSelector = cardSelector;
        this.myId = data.myId;
        
        this._handleCardClick = data.handleCardClick;
        this._handleLikeClickCallBack = data.handleLikeClick;
        this._handleDeleteIconClick = data.handleDeleteIconClick;

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

        const cardImage = this._element.querySelector('.card__image');
        cardImage.style.backgroundImage = "url(" + this._image + ")";
        this._element.querySelector('.card__text').textContent = this._text;
        cardImage.alt = this._text;

        const likesCounter = this._element.querySelector('.card__like-counter');
        likesCounter.textContent = this._likes.length;

        if (this._isLiked()) {
            this.isActiveLike = true;
            this._toggleLike();
        }

        if (this.ownerId !== this.myId) {
            this._element.querySelector('.card__trashCan').style.display = "none";
        }

        return this._element;
    }

    refresh(data) {
        const likesCounter = this._element.querySelector('.card__like-counter');
        likesCounter.textContent = data["likes"].length;
        this.isActiveLike = !this.isActiveLike;
        this._toggleLike();
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {this._handleLikeClick()});
        this._element.querySelector('.card__trashCan').addEventListener('click', (evt) => {this._handleTrashCanClick(evt)});
        this._element.querySelector('.card__image').addEventListener('click', () => {this._handleImageClick()});
    }
    
    _handleLikeClick() {
        this._handleLikeClickCallBack(this);
    }
    
    _isLiked() {
        const likes = this._likes.map(element => {
            return element["_id"];
        });
        return likes.includes(this.myId) ? true: false;
    }

    _toggleLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleTrashCanClick(evt) {
        evt.stopPropagation();
        this._handleDeleteIconClick(this);
        //this._element.remove();
        //this._element = null;
    }

    _handleImageClick() {
        this._handleCardClick();
    }
}