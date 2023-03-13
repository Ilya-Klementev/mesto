const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close"); 
const popupOpenButtonElement = document.querySelector(".profile__edit-button"); 
const pageNameElement = document.getElementById('name');
const popupNameElement = document.getElementById('popupName');
const pageAboutElement = document.getElementById('about');
const popupAboutElement = document.getElementById('popupAbout');
const popupSubmitButtonElement = popupElement.querySelector(".popup__submit");

const PopupElementOpened = function () {
  popupElement.classList.add('popup_opened');
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;
}

const PopupElementClosed = function () {
  popupElement.classList.remove('popup_opened');
}

const PopupElementSubmit = function () {
  popupElement.classList.remove('popup_opened');
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
}

popupOpenButtonElement.addEventListener('click', PopupElementOpened);
popupCloseButtonElement.addEventListener('click', PopupElementClosed);
popupSubmitButtonElement.addEventListener('click', PopupElementSubmit);