const editButton = document.querySelector('.profile__btn_action_edit');
const addButton = document.querySelector('.profile__btn_action_add');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// edit form popup
const popupEditForm = document.querySelector('.page__popup_edit-form');
const inputListEdit = Array.from(popupEditForm.querySelectorAll('.popup__text-field'));
const nameInputEditForm = popupEditForm.querySelector('.popup__text-field_name');
const jobInputEditForm = popupEditForm.querySelector('.popup__text-field_description');
const saveButtonEditForm = popupEditForm.querySelector('.popup__btn_action_save');
const closeButtonEditForm = popupEditForm.querySelector('.popup__btn_action_close');
const editFormOverlay = document.querySelector('.popup__overlay_edit');

// new place form popup
const popupNewPlaceForm = document.querySelector('.page__popup_new-place');
const inputListAddNew = Array.from(popupNewPlaceForm.querySelectorAll('.popup__text-field'));
const nameInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_name');
const jobInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_description');
const saveButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_save');
const closeButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_close');
const newPlaceFormOverlay = document.querySelector('.popup__overlay_new-place');

// place image popup
const popupImage = document.querySelector('.page__popup_card-image');
const closeButtonImage = popupImage.querySelector('.popup__btn_action_close');
const imageOverlay = document.querySelector('.popup__overlay_image');
const img = popupImage.querySelector('.popup__image');
const imgCaption = popupImage.querySelector('.popup__caption')

const cardItemTemplate = document.querySelector("#card-item").content;
const cardsList = document.querySelector('.elements__list');

function initCardsGrid() {
    initialCards.forEach(function(item) {
        const newCard = makeCard(item['name'], item['link']);
        cardsList.appendChild(newCard);
    })
}

function showEditProfile() {
    nameInputEditForm.value =  profileName.textContent;
    jobInputEditForm.value = profileDesc.textContent;
    toggleButtonState(inputListEdit, saveButtonEditForm, 'popup__btn_inactive');
    openPopupHandler(popupEditForm);
}

function showAddCard() {
    document.addEventListener('keydown', ()=>handleKeyPress(event, popupNewPlaceForm));
    openPopupHandler(popupNewPlaceForm);
}

function showCard(caption, imageLink) {
    img.src = imageLink;
    img.alt = caption;
    imgCaption.textContent = caption;
    document.addEventListener('keydown', ()=>handleKeyPress(event, popupImage));
    openPopupHandler(popupImage);
}

function makeCard(name, link) {
    const cardItem = cardItemTemplate.cloneNode(true);
    const img = cardItem.querySelector('.card__image')
    
    cardItem.querySelector('.card__text').textContent = name;
    img.style.backgroundImage = "url(" + link + ")";
    img.addEventListener('click', ()=>showCard(name, link));
    
    cardItem.querySelector('.card__trashCan').addEventListener('click', deleteCard);
    cardItem.querySelector('.card__like').addEventListener('click', setLike);
    return cardItem
}

function openPopupHandler(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleKeyPress);
}

function closePopupHandler(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleKeyPress);
}

function setLike(evt) {
    evt.target.classList.toggle('card__like_active');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEditForm.value;
    profileDesc.textContent = jobInputEditForm.value;
    closePopupHandler(popupEditForm);
}

function addNewCard(evt) {
    evt.preventDefault();
    const name = nameInputNewPlaceForm.value;
    const link = jobInputNewPlaceForm.value;
    const newCard = makeCard(name, link);
    cardsList.prepend(newCard);
    closePopupHandler(popupNewPlaceForm);
}

function deleteCard(evt) {
    evt.stopPropagation();
    evt.target.closest('.elements__item').remove();
}

function handleKeyPress(evt) {
    if (evt.key==="Escape") {
        const form = document.querySelector('.popup_opened');
        closePopupHandler(form);
    }
}

initCardsGrid();
enableValidation(
    { formSelector: '.popup__form',
    inputSelector: '.popup__form-set',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__text-field_error',
    errorClass: 'popup__input-error_active'});

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