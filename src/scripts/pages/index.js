import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, editButton, addButton, profileName,
        profileDesc, nameInputEditForm, jobInputEditForm, 
        nameInputNewPlaceForm,jobInputNewPlaceForm, cardsList, cardsListSelector,
        cardTemplateSelector, popupImageSelector,popupEditFormSelector, popupNewPlaceFormSelector,
        profileNameSelector, profileDescSelector, validationObj} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import '../../pages/index.css';

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditFormSelector, handleEditFormSubmit);
popupEditForm.setEventListeners();

const userPage = new UserInfo(profileNameSelector, profileDescSelector);

const popupNewForm = new PopupWithForm(popupNewPlaceFormSelector, addNewCardSubmit);
popupNewForm.setEventListeners();

const formList = Array.from(document.querySelectorAll('.popup__form'));

const profileFormValidator = new FormValidator(validationObj, popupEditForm);
profileFormValidator.enableValidation();

const newFormValidator = new FormValidator(validationObj, popupNewForm);
newFormValidator.enableValidation();

const cardsGrid = new Section({
    items: initialCards,
    renderer: (item)=>{
        const data = {'text': item['name'], 'link':item['link']};
        const card = createCard(data, cardTemplateSelector, ()=>{
                popupImage.open(data);
            });
        cardsGrid.addItem(card);
    }
}, cardsListSelector);

function createCard(data, template, callback) {
    let card = new Card (data, template, callback);
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
    profileName.textContent = nameInputEditForm.value;
    profileDesc.textContent = jobInputEditForm.value;
    popupEditForm.close();
}

function addNewCardSubmit(evt) {
    evt.preventDefault();
    const data = {};
    data.text = nameInputNewPlaceForm.value;
    data.link = jobInputNewPlaceForm.value;
    const newCard = createCard(data, '#card-item', ()=>{});
    cardsList.prepend(newCard);
    popupNewForm.close();
}

export function showAddCard() {
    popupNewForm.setFieldsValues(["", ""]);
    popupNewForm.open();
}

cardsGrid.renderItems();

editButton.addEventListener('click', showEditProfile);
addButton.addEventListener('click', showAddCard);