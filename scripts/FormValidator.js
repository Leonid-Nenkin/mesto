export default class FormValidator {
  constructor (data, element) {
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._textFieldSelector = data.textFieldSelector; 
    this._element = element;
  }

  enableValidation() {
    this._element.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._setEventListeners(this._element);
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._textFieldSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
  
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
    inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, this._inputErrorClass, this._errorClass);
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
        });
    });
  }

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);  
      buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);  
        buttonElement.disabled = false;
    }
  }
}
