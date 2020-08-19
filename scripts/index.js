// Находим форму в DOM
let formElement = document.querySelector('.popup-form');
let editButton = document.querySelector('.profile__btn_action_edit');
let formCloseButton = document.querySelector('.close-icon');

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler(evt) {
        evt.preventDefault();
        // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Находим поля формы в DOM
        let nameInput = formElement.querySelector('.popup-form__text_type_name');
        let jobInput = formElement.querySelector('.popup-form__text_type_description');

    // Получите значение полей из свойства value
        let name = nameInput.value;
        let job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
        let ProfileName = document.querySelector('.profile__name');
        let ProfileDesc = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
        ProfileName.textContent = name;
        ProfileDesc.textContent = job;
		openCloseFormHandler(evt);
}

function initForm() {
    let name = document.querySelector('.profile__name').textContent;
    let job = document.querySelector('.profile__description').textContent;
    formElement.querySelector('.popup-form__text_type_name').value = name;
    formElement.querySelector('.popup-form__text_type_description').value = job;
}

function openCloseFormHandler(evt) {
    evt.preventDefault();
    initForm()
    let editForm = document.querySelector('.popup');
    editForm.classList.toggle('popup_opened');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openCloseFormHandler);
formCloseButton.addEventListener('click', openCloseFormHandler);