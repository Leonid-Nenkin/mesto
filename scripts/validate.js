const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);  
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(inactiveButtonClass);  
      buttonElement.disabled = false;
  }
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, validationObj) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationObj.inactiveButtonClass);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationObj.inputErrorClass, validationObj.errorClass);
      toggleButtonState(inputList, buttonElement, validationObj.inactiveButtonClass);
      });
  });
};

const enableValidation = (validationObj) => {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      });

  const fieldsetList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  fieldsetList.forEach((fieldset)=>{
          setEventListeners(fieldset, validationObj)
      })
  })
};