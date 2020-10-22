import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addButton, nameInputEditForm, jobInputEditForm, 
        nameInputNewPlaceForm,jobInputNewPlaceForm, cardsListSelector, formSubmitButton,
        cardTemplateSelector, popupImageSelector,popupEditFormSelector, popupNewPlaceFormSelector,
        popupAvatarFormSelector, profileNameSelector, profileDescSelector, validationObj, ApiConfig,
        submitPopupSelector, avatarImageLink, avatar} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import '../../pages/index.css';
import Api from '../components/Api.js';

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditFormSelector, handleEditFormSubmit);
popupEditForm.setEventListeners();

const userPage = new UserInfo(profileNameSelector, profileDescSelector);

const popupNewForm = new PopupWithForm(popupNewPlaceFormSelector, addNewCardSubmit);
popupNewForm.setEventListeners();

const popupSubmit = new PopupWithSubmit(submitPopupSelector, ()=>{});
popupSubmit.setEventListeners();

const popupAvatarForm = new PopupWithForm(popupAvatarFormSelector, handleAvatarClick);
popupAvatarForm.setEventListeners();

const profileFormValidator = new FormValidator(validationObj, popupEditForm);
profileFormValidator.enableValidation();

const newFormValidator = new FormValidator(validationObj, popupNewForm);
newFormValidator.enableValidation();

const avatarValidator = new FormValidator(validationObj, popupAvatarForm);
avatarValidator.enableValidation();

let myId;
let cardsGrid;
const api = new Api(ApiConfig);

const userInfo = api.getUserInfo();
userInfo.then((res)=>{
    userPage.setUserInfo(res['name'], res['about']);
    userPage.setAvatar(res['avatar']);
    myId = res['_id'];
})
.then(initializeCards)
.catch((error) => console.log(error));

function initializeCards() {
    api.getInitialCards()
    .then((data)=>{
            cardsGrid = new Section({
            items: data,
            renderer: (item)=>{
                const data = {'text': item['name'],
                            'link':item['link'],
                            'likes':item['likes'],
                            'ownerId':item['owner']['_id'],
                            'cardId':item['_id'],
                            'myId': myId,
                            handleCardClick: ()=>{
                                popupImage.open(data);
                            },
                            handleLikeClick:(card) => {
                                likeClick(card);
                            },
                            handleDeleteIconClick: (card) => {
                                trashCanClick(card);
                            }
                        };
                const card = createCard(data, cardTemplateSelector);
                cardsGrid.addItem(card);
            }
        }, cardsListSelector);
        cardsGrid.renderItems();
    })
    .catch((error) => console.log(error));
}

function likeClick(card) {
    if (card.isActiveLike) {
        api.removeLike(card)    
        .then((res) => {card.refresh(res)})
        .catch((error) => console.log(error));
    }
    else {
        api.setLike(card)                                    
        .then((res) => {card.refresh(res)})
        .catch((error) => console.log(error));
    }
}

function trashCanClick(card) {
    popupSubmit.setCallBack(()=>{
        api.deleteCard(card)
        .then(() => {
            card.removeCard();
        })
        .then(popupSubmit.close())
        .catch((error) => console.log(error));
        });
    popupSubmit.open();
}

function createCard(data, template) {
    let card = new Card (data, template);
    card = card.generateCard();
    return card;
}

export function showEditProfile() {
    popupEditForm.open();
    const info = [userPage.getUserInfo()['userName'], userPage.getUserInfo()['userDescription']];
    popupEditForm.setFieldsValues(info);
}
  
export function handleEditFormSubmit(evt) {
    preloaderOn(popupEditForm);
    evt.preventDefault();
    const data = {"name": nameInputEditForm.value, "about":jobInputEditForm.value};
    api.updateUserInfo(data)
    .then((data) => {
        userPage.setUserInfo(data['name'], data['about']);
    })
    .then(()=>{
        popupEditForm.close();
    })
    .catch((err)=>console.log(err))
    .finally(()=>{preloaderOff(popupEditForm)});
    
}

function handleAvatarClick(evt) {
    evt.preventDefault();
    const data = {"avatar": avatarImageLink.value}
    api.updateAvatar(data)
    .then((res)=>{
        userPage.setAvatar(res['avatar']);
    })
    .then(()=>{popupAvatarForm.close();})
    .catch((err)=>console.log(err));
}

function addNewCardSubmit(evt) {
    evt.preventDefault();
    preloaderOn(popupNewForm);
    const data = {};
    data["name"] = nameInputNewPlaceForm.value;
    data["link"] = jobInputNewPlaceForm.value;
    
    api.addCard(data)
    .then((item)=> {
        const data = {'text': item['name'],
                    'link': item['link'],
                    'likes': item['likes'],
                    'ownerId': item['owner']['_id'],
                    'cardId': item['_id'],
                    'myId': myId,
                    handleCardClick: ()=>{
                        popupImage.open(data);
                    },
                    handleLikeClick:(card) => {
                        likeClick(card);
                    },
                    handleDeleteIconClick: (card) => {
                        trashCanClick(card);
                    }
        };
        const newCard = createCard(data, '#card-item');
        cardsGrid.prependItem(newCard);
        popupNewForm.close();
    })
    .catch((error) => console.log(error))
    .finally(()=>{preloaderOff(popupNewForm)});
}

function preloaderOn(form) {
    form._element.querySelector(formSubmitButton).textContent = form._element.querySelector(formSubmitButton).textContent + "...";
}

function preloaderOff(form) {
    const buttonText = form._element.querySelector(formSubmitButton).textContent;
    form._element.querySelector(formSubmitButton).textContent = buttonText.substr(0, buttonText.length-3);
}

export function showAddCard() {
    popupNewForm.setFieldsValues(["", ""]);
    popupNewForm.open();
}

editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);
avatar.addEventListener('click', ()=>{popupAvatarForm.open()});