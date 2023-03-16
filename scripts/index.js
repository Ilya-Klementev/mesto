const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close'); 
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const pageNameElement = document.querySelector('.profile__name');
const popupNameElement = popupElement.querySelector('.popup__input_element_name');
const pageAboutElement = document.querySelector('.profile__about');
const popupAboutElement = popupElement.querySelector('.popup__input_element_about');
const popupFormElement = popupElement.querySelector('.popup__form');
const popupSubmitButtonElement = popupFormElement.querySelector('.popup__submit');
//const pageHeartElements = document.querySelectorAll('.elements__heart');

const popupElementOpened = function () {
  popupElement.classList.add('popup_opened');
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;
}

const popupElementClosed = function () {
  popupElement.classList.remove('popup_opened');
}

const popupElementSubmit = function (evt) {
  popupElementClosed();
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
  evt.preventDefault();
}

popupOpenButtonElement.addEventListener('click', popupElementOpened);
popupCloseButtonElement.addEventListener('click', popupElementClosed);
popupFormElement.addEventListener('submit', popupElementSubmit);