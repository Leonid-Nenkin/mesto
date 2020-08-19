// ������� ����� � DOM
let formElement = document.querySelector('.popup-form');
let editButton = document.querySelector('.profile__btn_action_edit');
let formCloseButton = document.querySelector('.close-icon');

    // ���������� ��������� �����, ���� ����
    // ��� ������ ������������ �� �����
    function formSubmitHandler(evt) {
        evt.preventDefault();
        // ��� ������� �������� ����������� �������� �����.
        // ��� �� ����� ���������� ���� ������ ��������.
        // � ���, ��� ��� ������, ��������� �����.

        // ������� ���� ����� � DOM
        let nameInput = formElement.querySelector('.popup-form__text_type_name');
        let jobInput = formElement.querySelector('.popup-form__text_type_description');

    // �������� �������� ����� �� �������� value
        let name = nameInput.value;
        let job = jobInput.value;
    // �������� ��������, ���� ������ ���� ��������� �������� �����
        let ProfileName = document.querySelector('.profile__name');
        let ProfileDesc = document.querySelector('.profile__description');
    // �������� ����� �������� � ������� textContent
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


// ����������� ���������� � �����:
// �� ����� ������� �� �������� �submit� - ���������
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openCloseFormHandler);
formCloseButton.addEventListener('click', openCloseFormHandler);