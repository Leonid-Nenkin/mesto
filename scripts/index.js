let formElement = document.querySelector('.popup__container');
let formSaveButton = formElement.querySelector('form');
let editButton = document.querySelector('.profile__btn_action_edit');
let formCloseButton = document.querySelector('.popup__btn_action_close');
let popupForm = document.querySelector('.popup');

let ProfileName = document.querySelector('.profile__name');
let ProfileDesc = document.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__text-field_type_name');
let jobInput = formElement.querySelector('.popup__text-field_type_description');

function toggleFormHandler() {
    popupForm.classList.toggle('popup_opened');
}

function openFormHandler() {
    nameInput.value = ProfileName.textContent;
    jobInput.value = ProfileDesc.textContent;
    toggleFormHandler();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileDesc.textContent = jobInput.value;
    toggleFormHandler();
}

formSaveButton.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openFormHandler);
formCloseButton.addEventListener('click', toggleFormHandler);