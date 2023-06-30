const popupEditElement = document.querySelector('.popup_type-edit');                                     //попап Edit
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');                      //кнопка открытия попапа Edit
const inputNameFormPopupEditElement = popupEditElement.querySelector('.popup__input_element_name');      //поле ввода имени в попапе Edit
const inputAboutFormPopupEditElement = popupEditElement.querySelector('.popup__input_element_about');    //поле ввода about в попапе Edit
const popupProfileFormElement = document.forms["form-popup-edit"];                                       //форма попапа  Edit
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');                        //кнопка открытия попапа Add
const popupAddFormElement = document.forms["form-popup-add"];                                            //форма попапа Add
const placeTemplate = document.querySelector('#place-template');                                         //шаблон template
const placesContainer = document.querySelector('.elements');                                             //место, куда всталяем карточки

const configFormSelector = {
  formSelector: '.popup__form',                 
  inputSelector: '.popup__input',                
  submitButtonSelector: '.popup__submit',         
  inactiveButtonClass: 'popup__submit_disabled', 
  inputErrorClass: 'popup__input_type_error',   
  errorClass: 'popup__error_visible'
}

import '../pages/index.css';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Sectional from "./Sectional.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const userInfo = new UserInfo({ name: ".profile__name", about: ".profile__about" });
const popupImage = new PopupWithImage('.popup_type-image');
const popupAdd = new PopupWithForm('.popup_type-add', createPopupAdd);
const editFormValidator = new FormValidator(configFormSelector, popupProfileFormElement);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(configFormSelector, popupAddFormElement);
addFormValidator.enableValidation();
const popupEdit = new PopupWithForm('.popup_type-edit', createPopupEdit);

//инициация готовых карточек
const CardSection = new Sectional ( { items: initialCards, renderer }, '.elements' );
CardSection.renderItems();

popupImage.setEventListeners();

//слушатель попапа "добавить карточку"
popupAdd.setEventListeners();
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAdd.open();
});

//слушатель попапа "редактировать профиль"
popupEdit.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  inputNameFormPopupEditElement.value = userInfoData.name;
  inputAboutFormPopupEditElement.value = userInfoData.about;
  popupEdit.open();
});

function openPopupImageElement(imageUrl, caption) {
  popupImage.open(imageUrl, caption);
}

function createCardInstance(name, link, template) {
  const placeElement = new Card(name, link, template, openPopupImageElement);
  return placeElement.generateCard();
}

function renderer (item) {
  const generatedCard = createCardInstance(item.name, item.link, placeTemplate);
  CardSection.addItem(generatedCard);
}

function createPopupAdd (values) {
  const placeElement = createCardInstance(values.place, values.link, placeTemplate);
  placesContainer.prepend(placeElement);
  popupAdd.close();
}

function createPopupEdit (values) {
  userInfo.setUserInfo(values);
  popupEdit.close();
}