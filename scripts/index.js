const editButton = document.querySelector('.profile__btn_action_edit');
const addButton = document.querySelector('.profile__btn_action_add');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

// edit form popup
const popupEditForm = document.querySelector('.page__popup_edit-form');
const nameInputEditForm = popupEditForm.querySelector('.popup__text-field_type_name');
const jobInputEditForm = popupEditForm.querySelector('.popup__text-field_type_description');
const saveButtonEditForm = popupEditForm.querySelector('.popup__btn_action_save');
const closeButtonEditForm = popupEditForm.querySelector('.popup__btn_action_close');
// edit form events
popupEditForm.addEventListener('submit', formSubmitHandler);
closeButtonEditForm.addEventListener('click', function() {togglePopupHandler(popupEditForm)});


// new place form popup
const popupNewPlaceForm = document.querySelector('.page__popup_new-place');
const nameInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_type_name');
const jobInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_type_description');
const saveButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_save');
const closeButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_close');
// new place events
popupNewPlaceForm.addEventListener('submit', addNewCard);
closeButtonNewPlaceForm.addEventListener('click', function() {togglePopupHandler(popupNewPlaceForm)});

// place image popup
const popupImage = document.querySelector('.page__popup_card-image');
const closeButtonImage = popupImage.querySelector('.popup__btn_action_close');
// place image events
closeButtonImage.addEventListener('click', function() {togglePopupHandler(popupImage)});

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
    togglePopupHandler(popupEditForm);
}

function showAddCard() {
    popupNewPlaceForm.addEventListener('submit', addNewCard);
    togglePopupHandler(popupNewPlaceForm);
}

function showCard(evt) {
    const targetCard = evt.target
    const imageLink = targetCard.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    const caption = targetCard.parentElement.querySelector('.card__text').textContent;
    
    popupImage.querySelector('.popup__image').src = imageLink;
    popupImage.querySelector('.popup__caption').textContent = caption;
    togglePopupHandler(popupImage);
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

function togglePopupHandler(popup) {
    popup.classList.toggle('popup_opened');
}

function setLike(evt) {
    evt.target.classList.toggle('card__like_inactive');
    evt.target.classList.toggle('card__like_active');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEditForm.value;
    profileDesc.textContent = jobInputEditForm.value;
    togglePopupHandler(popupEditForm);
}

function addNewCard(evt) {
    evt.preventDefault();
    const name = nameInputNewPlaceForm.value;
    const link = jobInputNewPlaceForm.value;
    const newCard = makeCard(name, link);
    cardsList.prepend(newCard);
    togglePopupHandler(popupNewPlaceForm);
}

function deleteCard(evt) {
    evt.stopPropagation();
    evt.target.closest('.elements__item').remove();
}

initCardsGrid();
editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);