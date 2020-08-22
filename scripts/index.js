let formElement = document.querySelector('.popup__container');
let formSaveButton = formElement.querySelector('.popup__btn_action_save');
let editButton = document.querySelector('.profile__btn_action_edit');
let formCloseButton = document.querySelector('.popup__btn_action_close');
let popupForm = document.querySelector('.popup');

let ProfileName = document.querySelector('.profile__name');
let ProfileDesc = document.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__text-field_type_name');
let jobInput = formElement.querySelector('.popup__text-field_type_description');

function openFormHandler() {
    nameInput.value = ProfileName.textContent;
    jobInput.value = ProfileDesc.textContent;
    popupForm.classList.toggle('popup_opened');
}

function closeFormHandler() {
    popupForm.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileDesc.textContent = jobInput.value;
    closeFormHandler();
}

formSaveButton.addEventListener('click', formSubmitHandler);
editButton.addEventListener('click', openFormHandler);
formCloseButton.addEventListener('click', closeFormHandler);