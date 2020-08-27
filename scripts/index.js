let editButton = document.querySelector('.profile__btn_action_edit');
let addButton = document.querySelector('.profile__btn_action_add');

let ProfileName = document.querySelector('.profile__name');
let ProfileDesc = document.querySelector('.profile__description');

let nameInput;
let jobInput;
let formSaveButton;
let formCloseButton;

const cardsListTemplate = document.querySelector("#cards-list").content;
const cardItemTemplate = document.querySelector("#card-item").content;
const popupTemplate = document.querySelector("#popup").content;
const popupCardTemplate = document.querySelector("#popupCard").content;

const cardsSection = document.querySelector('.elements');
const popupSection = document.querySelector('.popup');

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

    const cardsList = cardsListTemplate.querySelector(".elements__list").cloneNode(true);
    initialCards.forEach(function(item) {
        let newCard = makeCard(item['name'], item['link']);
        cardsList.appendChild(newCard);
    })
    cardsSection.append(cardsList);
}

function initPopupForm(header, firstField, secondField, buttonText) {
    popupForm = popupTemplate.cloneNode(true);
    popupForm.querySelector('.popup__header').textContent = header;
    
    nameInput = popupForm.querySelector('.popup__text-field_type_name')
    nameInput.value = firstField;
    
    jobInput = popupForm.querySelector('.popup__text-field_type_description')
    jobInput.value = secondField;

    formSaveButton = popupForm.querySelector('.popup__btn_action_save')
    formSaveButton.textContent = buttonText;

    formCloseButton = popupForm.querySelector('.popup__btn_action_close')
    formCloseButton.addEventListener('click', toggleFormHandler);
    
    popupSection.textContent = "";
    popupSection.append(popupForm);
}

function initPopupCard (imageLink, caption) {
    popupCard = popupCardTemplate.cloneNode(true);
    formCloseButton = popupCard.querySelector('.popup__btn_action_close')
    formCloseButton.addEventListener('click', toggleFormHandler);
    
    popupCard.querySelector('.popup__image').src = imageLink;
    popupCard.querySelector('.popup__caption').textContent = caption;

    popupSection.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    popupSection.textContent = "";
    popupSection.append(popupCard);
}

function showEditProfile() {
    initPopupForm("Редактировать профиль", ProfileName.textContent, ProfileDesc.textContent, "Сохранить");
    popupSection.querySelector('form').addEventListener('submit', formSubmitHandler);
    toggleFormHandler();
}

function showAddCard() {
    initPopupForm("Новое место", "", "", "Создать");
    nameInput.placeholder = "Название"
    jobInput.placeholder = "Ссылка на картинку"
    popupSection.querySelector('form').addEventListener('submit', addNewCard);
    toggleFormHandler();
}

function showCard(evt) {
    const targetCard = evt.target
    let link = targetCard.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    let caption = targetCard.parentElement.querySelector('.card__text').textContent;
    initPopupCard(link, caption);
    toggleFormHandler();
}

function makeCard(name, link) {
    const cardItem = cardItemTemplate.cloneNode(true);
    cardItem.querySelector('.card__text').textContent = name;
    cardItem.querySelector('.card__image').style.backgroundImage = "url(" + link + ")";
    cardItem.querySelector('.card__image').addEventListener('click', showCard);
    cardItem.querySelector('.card__trashCan').addEventListener('click', deleteCard);
    cardItem.querySelector('.card__like').addEventListener('click', setLike);
    return cardItem
}

function toggleFormHandler() {
    popupSection.classList.toggle('popup_opened');
}

function setLike(evt) {
    evt.target.classList.toggle('card__like_inactive');
    evt.target.classList.toggle('card__like_active');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileDesc.textContent = jobInput.value;
    toggleFormHandler();
}

function addNewCard(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let link = jobInput.value;
    let cardsList = document.querySelector(".elements__list");
    let newCard = makeCard(name, link);
    cardsList.prepend(newCard);
    toggleFormHandler();
}

function deleteCard(evt) {
    evt.stopPropagation();
    evt.target.closest('.elements__item').remove();
    console.log(cardsSection);
}

initCardsGrid();
editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);