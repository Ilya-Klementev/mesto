const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close'); 
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const pageNameElement = document.querySelector('.profile__name');
const popupNameElement = popupElement.querySelector('.popup__input_element_name');
const pageAboutElement = document.querySelector('.profile__about');
const popupAboutElement = popupElement.querySelector('.popup__input_element_about');
const popupFormElement = popupElement.querySelector('.popup__form');
const popupSubmitButtonElement = popupFormElement.querySelector('.popup__submit');
const pageHeartElements = document.querySelectorAll('.place__heart');


const PopupElementOpened = function () {
  popupElement.classList.add('popup_opened');
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;
}

const PopupElementClosed = function () {
  popupElement.classList.remove('popup_opened');
}

const PopupElementSubmit = function (evt) {
  PopupElementClosed();
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
  evt.preventDefault();
}

for (let i = 0; i < pageHeartElements.length; i++) {
  const pageHeartElement = pageHeartElements[i];
  pageHeartElement.addEventListener('click', function(){
    pageHeartElement.classList.toggle('place__heart_liked');
  });
}

popupOpenButtonElement.addEventListener('click', PopupElementOpened);
popupCloseButtonElement.addEventListener('click', PopupElementClosed);
popupFormElement.addEventListener('submit', PopupElementSubmit);