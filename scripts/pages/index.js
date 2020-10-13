import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, editButton, addButton, profileName,
        profileDesc, nameInputEditForm, jobInputEditForm, 
        nameInputNewPlaceForm,jobInputNewPlaceForm, cardsList, cardsListSelector,
        cardTemplateSelector, popupImageSelector,popupEditFormSelector, popupNewPlaceFormSelector,
        profileNameSelector, profileDescSelector, popupOpenClass} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';

const cardsGrid = new Section({
    items: initialCards,
    renderer: (item)=>{
        const data = {'text': item['name'], 'link':item['link']};
        const card = new Card(data, cardTemplateSelector, ()=>{
            const popup = new PopupWithImage(popupImageSelector);
            popup.open(data);
            popup.setEventListeners();
        });
        const cardElement = card.generateCard();
        cardsGrid.addItem(cardElement);
    }
}, cardsListSelector);

export function showEditProfile() {
    const popup = new PopupWithForm(popupEditFormSelector, handleEditFormSubmit);
    const userPage = new UserInfo(profileNameSelector, profileDescSelector);
    popup.open();
    popup.setEventListeners();
    popup.setFieldsValues(userPage.getUserInfo()['userName'], userPage.getUserInfo()['userDescription']);
  }
  
export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEditForm.value;
    profileDesc.textContent = jobInputEditForm.value;
    closePopupHandler(popupEditFormSelector);
}

function addNewCardSubmit(evt) {
    evt.preventDefault();
    const data = {};
    data.text = nameInputNewPlaceForm.value;
    data.link = jobInputNewPlaceForm.value;
    const newCard = new Card(data, '#card-item');
    cardsList.prepend(newCard.generateCard());
    closePopupHandler(popupNewPlaceFormSelector);
}

function closePopupHandler(modal){
    document.querySelector(modal).classList.remove(popupOpenClass);
}

export function showAddCard() {
    const popup = new PopupWithForm(popupNewPlaceFormSelector, addNewCardSubmit);
    popup.open();
    popup.setEventListeners();
}

// function initCardsGrid() {    
//     initialCards.forEach(function(item) {
//         const data = {'text':item['name'], 'link':item['link']};
//         const newCard = makeCard(data);
//         cardsList.appendChild(newCard.generateCard());
//     })
// }

// function makeCard(data) {
//     return new Card(data, '#card-item');
// }

// export function openPopupHandler(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', handleKeyPress);
// }

// export function handleFormSubmit(evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInputEditForm.value;
//     profileDesc.textContent = jobInputEditForm.value;
//     closePopupHandler(popupEditForm);
// }

// function addNewCard(evt) {
//     evt.preventDefault();
//     const data = {};
//     data.text = nameInputNewPlaceForm.value;
//     data.link = jobInputNewPlaceForm.value;
//     const newCard = makeCard(data);
//     cardsList.prepend(newCard.generateCard());
//     closePopupHandler(popupNewPlaceForm);
// }

// export function handleKeyPress(evt) {
//     if (evt.key==="Escape") {
//         const modal = document.querySelector('.popup_opened');
//         closePopupHandler(modal);
//     }
// }

function initValidation() {
    const validationObj = { submitButtonSelector: '.popup__btn',
                            inactiveButtonClass: 'popup__btn_inactive',
                            inputErrorClass: 'popup__text-field_error',
                            errorClass: 'popup__input-error_active',
                            textFieldSelector:'.popup__text-field'};

    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {        
        formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set'));
    fieldsetList.forEach((fieldset)=>{
            const validElem = new FormValidator(validationObj, fieldset)
            validElem.enableValidation();
        })
    })
}

cardsGrid.renderItems();

//initCardsGrid();
initValidation();

editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);

// edit form events
//popupEditForm.addEventListener('submit', handleFormSubmit);
//closeButtonEditForm.addEventListener('click', function() {closePopupHandler(popupEditForm)});
//editFormOverlay.addEventListener('mouseup', function() {closePopupHandler(popupEditForm)});

// new place events
// popupNewPlaceForm.addEventListener('submit', addNewCard);
// closeButtonNewPlaceForm.addEventListener('click', function() {closePopupHandler(popupNewPlaceForm)});
// newPlaceFormOverlay.addEventListener('mouseup', function() {closePopupHandler(popupNewPlaceForm)});

// place image events
//closeButtonImage.addEventListener('click', function() {closePopupHandler(popupImage)});
//imageOverlay.addEventListener('mouseup', function() {closePopupHandler(popupImage)});