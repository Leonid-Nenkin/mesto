import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addButton, profileName,
        profileDesc, profileAvatar, nameInputEditForm, jobInputEditForm, 
        nameInputNewPlaceForm,jobInputNewPlaceForm, cardsList, cardsListSelector, formSubmitButton,
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
const api = new Api(ApiConfig);

const userInfo = api.getUserInfo();
userInfo.then((res)=>{
    profileName.textContent = res['name'];
    profileDesc.textContent = res['about'];
    profileAvatar.src = res['avatar'];
    myId = res['_id'];
})
.then(initializeCards())
.catch((error) => console.log(error));

function initializeCards() {
    api.getInitialCards()
    .then((data)=>{
        const cardsGrid = new Section({
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
    popupSubmit.open();
    popupSubmit.setCallBack(()=>{
        api.deleteCard(card)
        .then(() => {
            card._element.remove();
        })
        .then(popupSubmit.close())
        .catch((error) => console.log(error));
    });
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
    evt.preventDefault();
    const data = {"name": nameInputEditForm.value, "about":jobInputEditForm.value};
    api.updateUserInfo(data)
    .then((data) => {
        profileName.textContent = data.name;
        profileDesc.textContent = data.about;    
    })
    .catch((err)=>console.log(err));
    popupEditForm.close();
}

function handleAvatarClick(evt) {
    evt.preventDefault();
    console.log(avatarImageLink);
    const data = {"avatar": avatarImageLink.value}
    api.updateAvatar(data)
    .then((res)=>{
        avatar.querySelector('.profile__avatar').src = res['avatar'];
    })
    .catch((err)=>console.log(err));
    popupAvatarForm.close();
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
        cardsList.prepend(newCard);
        preloaderOff(popupNewForm);
        popupNewForm.close();
    })
    .catch((error) => console.log(error));
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