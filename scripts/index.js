const pageNameElement = document.querySelector('.profile__name');                           //Имя в профиле
const pageAboutElement = document.querySelector('.profile__about');                         //About в профиле

//const popupElements = document.querySelectorAll('.popup');                                  //попап
const popupEditElement = document.querySelector('.popup_type-edit');                        //попап Edit
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');         //кнопка открытия попапа Edit
const popupNameElement = popupEditElement.querySelector('.popup__input_element_name');      //поле ввода имени в попапе Edit
const popupAboutElement = popupEditElement.querySelector('.popup__input_element_about');    //поле ввода about в попапе Edit
const popupSpanErrorElement = popupEditElement.querySelectorAll('.popup__error');           // спан ошибки
const popupProfileFormElement = document.forms["form-popup-edit"];                          //форма попапа  Edit

const popupAddElement = document.querySelector('.popup_type-add');                          //попап Add
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');           //кнопка открытия попапа Add
//const popupPlaceElement = popupAddElement.querySelector('.popup__input_element_place');     //поле ввода названия в попапе Add
//const popupLinkElement = popupAddElement.querySelector('.popup__input_element_link');       //поле ввода ссылки на картнку в попапе Add
const popupAddFormElement = document.forms["form-popup-add"];                               //форма попапа Add
const placeNameInput = popupAddFormElement.querySelector('.popup__input_element_place');    //поле ввода места
const placeLinkInput = popupAddFormElement.querySelector('.popup__input_element_link');     //поле ввода ссылки
const popupEditSubmitElement = document.querySelector('[name=button-create]');
//const popupImageElement = document.querySelector('.popup_type-image');                      // попап image
//const popupImageImgElement = popupImageElement.querySelector('.popup__image');              // картинка попапа
//const popupImageTitleElement = popupImageElement.querySelector('.popup__caption');          // подпись к картинке попапа image

const popupCloseButtonElements = document.querySelectorAll('.popup__close');                //все крестики попапов

const placeTemplate = document.querySelector('#place-template');                            //шаблон template
const placesContainer = document.querySelector('.elements');                                //место, куда всталяем карточки

const configFormSelector = {
  formSelector: '.popup__form',                 
  inputSelector: '.popup__input',                
  submitButtonSelector: '.popup__submit',         
  inactiveButtonClass: 'popup__submit_disabled', 
  inputErrorClass: 'popup__input_type_error',   
  errorClass: 'popup__error_visible'
}

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//карточки из массива
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 


//инициация готовых карточек
initialCards.forEach((items) => {
  const placeElement = new Card(items.name, items.link, placeTemplate, openPopup);
  const generatedCard = placeElement.generateCard();
  placesContainer.appendChild(generatedCard);
});

//добавление элементов
popupAddFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const placeLinkValue = placeLinkInput.value;
  const placeElement = new Card(placeNameValue, placeLinkValue, placeTemplate, openPopup);
  const generatedCard = placeElement.generateCard();
  placesContainer.prepend(generatedCard);

  popupEditSubmitElement.classList.add('popup__submit_disabled');
  popupEditSubmitElement.disabled = true;

  //добавление класса, когда остается один элемент, чтобы не сбивалась верстка
  const quantElements = document.querySelectorAll('.elements__element');
  if (quantElements.length == 1) {
    quantElements[0].classList.add('elements__onlyone');
  }
  if (quantElements.length > 1) {
    quantElements.forEach(pageElement => {
      pageElement.classList.remove('elements__onlyone');
    });
  }
  popupAddFormElement.reset();
  closePopup(popupAddElement);
});

//закрытие попапов
popupCloseButtonElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //удаление слушателя событий "клавиша esc" и клика по оверлэю
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('mousedown', closePopupsOnOutsideClick);  
}

//объявление функции закрытия попапов по клику на пустом месте
function closePopupsOnOutsideClick (event) {
  if(event.target !== event.currentTarget) {
    return;
  }
  //const openedPopup = document.querySelector('.popup_opened');
  closePopup(event.currentTarget);
};


//функция закрытия попапов по нажатию на клавишу esc
function closePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('mousedown', closePopupsOnOutsideClick);
}

//попап Add открытие 
const openPopupAddElement = function () {
  openPopup(popupAddElement);
  const addFormValidator = new FormValidator(configFormSelector, popupAddFormElement);
  addFormValidator.enableValidation();
}

//попап Edit открытие
function openPopupEditElement() {
  openPopup(popupEditElement);
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;

  popupSpanErrorElement.forEach( (span) => {
    span.textContent = "";
  })

  popupNameElement.classList.remove('popup__input_type_error');
  popupAboutElement.classList.remove('popup__input_type_error');

  const editFormValidator = new FormValidator(configFormSelector, popupProfileFormElement);
  editFormValidator.enableValidation();
}
//Submit попапа Edit
function handleProfileFormSubmit(evt) {
  closePopup(popupEditElement);
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
  evt.preventDefault();
}

popupAddOpenButtonElement.addEventListener('click', openPopupAddElement);
popupEditOpenButtonElement.addEventListener('click', openPopupEditElement);
popupProfileFormElement.addEventListener('submit', handleProfileFormSubmit);