import Card from './Сard.js';
import FormValidator from './FormValidator.js';

const editButton = document.querySelector('.profile__btn_action_edit');
const addButton = document.querySelector('.profile__btn_action_add');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// edit form popup
const popupEditForm = document.querySelector('.page__popup_edit-form');
const nameInputEditForm = popupEditForm.querySelector('.popup__text-field_name');
const jobInputEditForm = popupEditForm.querySelector('.popup__text-field_description');
const closeButtonEditForm = popupEditForm.querySelector('.popup__btn_action_close');
const editFormOverlay = document.querySelector('.popup__overlay_edit');

// new place form popup
const popupNewPlaceForm = document.querySelector('.page__popup_new-place');
const nameInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_name');
const jobInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_description');
const closeButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_close');
const newPlaceFormOverlay = document.querySelector('.popup__overlay_new-place');

// place image popup
const popupImage = document.querySelector('.page__popup_card-image');
const closeButtonImage = popupImage.querySelector('.popup__btn_action_close');
const imageOverlay = document.querySelector('.popup__overlay_image');

const cardsList = document.querySelector('.elements__list');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function initCardsGrid() {
    
    initialCards.forEach(function(item) {
        const data = {'text':item['name'], 'link':item['link']};
        const newCard = makeCard(data);
        cardsList.appendChild(newCard.generateCard());
    })
}

function showEditProfile() {
    nameInputEditForm.value =  profileName.textContent;
    jobInputEditForm.value = profileDesc.textContent;
    const inputEvent = new Event('input');
    nameInputEditForm.dispatchEvent(inputEvent);
    jobInputEditForm.dispatchEvent(inputEvent);
    openPopupHandler(popupEditForm);
}

function showAddCard() {
    openPopupHandler(popupNewPlaceForm);
}

function makeCard(data) {
    return new Card(data, '#card-item');
}

export function openPopupHandler(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleKeyPress);
}

export function closePopupHandler(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleKeyPress);
}

export function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEditForm.value;
    profileDesc.textContent = jobInputEditForm.value;
    closePopupHandler(popupEditForm);
}

function addNewCard(evt) {
    evt.preventDefault();
    const data = {};
    data.text = nameInputNewPlaceForm.value;
    data.link = jobInputNewPlaceForm.value;
    const newCard = makeCard(data);
    cardsList.prepend(newCard.generateCard());
    closePopupHandler(popupNewPlaceForm);
}

export function handleKeyPress(evt) {
    if (evt.key==="Escape") {
        const modal = document.querySelector('.popup_opened');
        closePopupHandler(modal);
    }
}

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

initCardsGrid();
initValidation();

editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);

// edit form events
popupEditForm.addEventListener('submit', handleFormSubmit);
closeButtonEditForm.addEventListener('click', function() {closePopupHandler(popupEditForm)});
editFormOverlay.addEventListener('mouseup', function() {closePopupHandler(popupEditForm)});

// new place events
popupNewPlaceForm.addEventListener('submit', addNewCard);
closeButtonNewPlaceForm.addEventListener('click', function() {closePopupHandler(popupNewPlaceForm)});
newPlaceFormOverlay.addEventListener('mouseup', function() {closePopupHandler(popupNewPlaceForm)});

// place image events
closeButtonImage.addEventListener('click', function() {closePopupHandler(popupImage)});
imageOverlay.addEventListener('mouseup', function() {closePopupHandler(popupImage)});