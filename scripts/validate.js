
let validationObj;

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationObj.inactiveButtonClass);  
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(validationObj.inactiveButtonClass);  
      buttonElement.disabled = false;
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationObj.inputErrorClass);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      });
  });
};

const enableValidation = (obj) => {
  validationObj = obj
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      });

  const fieldsetList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  fieldsetList.forEach((fieldset)=>{
          setEventListeners(fieldset)
      })
  })
};