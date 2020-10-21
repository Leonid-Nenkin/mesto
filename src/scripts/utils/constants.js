export const validationObj = { submitButtonSelector: '.popup__btn_action_save',
                            inactiveButtonClass: 'popup__btn_inactive',
                            inputErrorClass: 'popup__text-field_error',
                            errorClass: 'popup__input-error_active',
                            textFieldSelector:'.popup__text-field'};

export const ApiConfig = {
    url:"https://mesto.nomoreparties.co/v1/cohort-16",
    headers:{
        authorization: '983b7e3f-9b42-4e44-b283-078e027b8912',
        'Content-type': 'application/json'
    }
};

export const editButton = document.querySelector('.profile__btn_action_edit');
export const addButton = document.querySelector('.profile__btn_action_add');
export const avatar = document.querySelector('.profile__avatar-container');

export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');
// edit form popup
export const popupEditForm = document.querySelector('.page__popup_edit-form');
export const nameInputEditForm = popupEditForm.querySelector('.popup__text-field_name');
export const jobInputEditForm = popupEditForm.querySelector('.popup__text-field_description');
export const closeButtonEditForm = popupEditForm.querySelector('.popup__btn_action_close');
export const editFormOverlay = document.querySelector('.popup__overlay_edit');

// new place form popup
export const popupNewPlaceForm = document.querySelector('.page__popup_new-place');
export const nameInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_name');
export const jobInputNewPlaceForm = popupNewPlaceForm.querySelector('.popup__text-field_description');
export const closeButtonNewPlaceForm = popupNewPlaceForm.querySelector('.popup__btn_action_close');
export const newPlaceFormOverlay = document.querySelector('.popup__overlay_new-place');

// place image popup
export const popupImage = document.querySelector('.page__popup_card-image');
export const closeButtonImage = popupImage.querySelector('.popup__btn_action_close');
export const imageOverlay = document.querySelector('.popup__overlay_image');

// avata link popup
export const avatarPopup = document.querySelector('.page__popup_update-avatar');
export const avatarImageLink = avatarPopup.querySelector('.popup__text-field_description');

export const cardsList = document.querySelector('.elements__list');
export const cardsListSelector = '.elements__list';
export const cardTemplateSelector = '#card-item';
export const popupEditFormSelector = '.page__popup_edit-form';
export const popupNewPlaceFormSelector = '.page__popup_new-place';
export const popupAvatarFormSelector = '.page__popup_update-avatar'
export const popupImageSelector = '.page__popup_card-image';
export const popupCloseButtonSelector = '.popup__btn_action_close'; 
export const imageSelector = '.popup__image';
export const imagePopupCaption = '.popup__caption';
export const popupOverlaySelector = '.popup__overlay';
export const profileNameSelector = '.profile__name';
export const profileDescSelector = '.profile__description';
export const formFieldSelector = '.popup__form-field';
export const inputFieldSelector = '.popup__text-field';
export const submitPopupSelector = '.page__popup_submit';

export const formProfileNameSelector = '.popup__text-field_name';
export const formProfileDescSelector = '.popup__text-field_description';
export const formSubmitButton = '.popup__btn_action_save';

export const popupOpenClass = 'popup_opened';
export const formSubmitButtonInactiveClass = 'popup__btn_inactive';