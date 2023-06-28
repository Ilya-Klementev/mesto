import '../pages/index.css';

const pageNameElement = document.querySelector('.profile__name');                           //Имя в профиле
const pageAboutElement = document.querySelector('.profile__about');                         //About в профиле

const popupEditElement = document.querySelector('.popup_type-edit');                        //попап Edit
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');         //кнопка открытия попапа Edit
const inputNameFormPopupEditElement = popupEditElement.querySelector('.popup__input_element_name');      //поле ввода имени в попапе Edit
const inputAboutFormPopupEditElement = popupEditElement.querySelector('.popup__input_element_about');    //поле ввода about в попапе Edit
const popupProfileFormElement = document.forms["form-popup-edit"];                          //форма попапа  Edit

const popupAddElement = document.querySelector('.popup_type-add');                          //попап Add
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');           //кнопка открытия попапа Add
const popupAddFormElement = document.forms["form-popup-add"];                               //форма попапа Add
const placeNameInput = popupAddFormElement.querySelector('.popup__input_element_place');    //поле ввода места
const placeLinkInput = popupAddFormElement.querySelector('.popup__input_element_link');     //поле ввода ссылки
//const popupEditSubmitElement = document.querySelector('[name=button-create]');

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
import { initialCards } from "./initialCards.js";

function createCardInstance(name, link, template, openPopup) {
  const placeElement = new Card(name, link, template, openPopup);
  return placeElement.generateCard();
}

//инициация готовых карточек
initialCards.forEach((items) => {
  const generatedCard = createCardInstance(items.name, items.link, placeTemplate, openPopup);
  placesContainer.appendChild(generatedCard);
});

//добавление элементов
popupAddFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const placeLinkValue = placeLinkInput.value;
  const placeElement  = createCardInstance(placeNameValue, placeLinkValue, placeTemplate, openPopup);
  placesContainer.prepend(placeElement);
  addFormValidator.disableSubmitElement();
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
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('mousedown', closePopupsOnOutsideClick);
}

const addFormValidator = new FormValidator(configFormSelector, popupAddFormElement);
addFormValidator.enableValidation();

//попап Add открытие 
const openPopupAddElement = function () {
  openPopup(popupAddElement);
}

const editFormValidator = new FormValidator(configFormSelector, popupProfileFormElement);
editFormValidator.enableValidation();

//попап Edit открытие
function openPopupEditElement() {
  editFormValidator.resetError();
  openPopup(popupEditElement);
  inputNameFormPopupEditElement.value = pageNameElement.textContent;
  inputAboutFormPopupEditElement.value = pageAboutElement.textContent;
}

//Submit попапа Edit
function handleProfileFormSubmit(evt) {
  closePopup(popupEditElement);
  pageNameElement.textContent = inputNameFormPopupEditElement.value;
  pageAboutElement.textContent = inputAboutFormPopupEditElement.value;
  evt.preventDefault();
}

popupAddOpenButtonElement.addEventListener('click', openPopupAddElement);
popupEditOpenButtonElement.addEventListener('click', openPopupEditElement);
popupProfileFormElement.addEventListener('submit', handleProfileFormSubmit);