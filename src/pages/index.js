
import {
  configFormSelector,
  popupEditOpenButtonElement,
  popupProfileFormElement,
  popupAddOpenButtonElement,
  popupAddFormElement,
  placeTemplate,
} from "../utils/constants.js";

import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const userInfo = new UserInfo({ name: ".profile__name", about: ".profile__about" });
const popupImage = new PopupWithImage('.popup_type-image');
const popupAdd = new PopupWithForm('.popup_type-add', createPopupAdd);
const editFormValidator = new FormValidator(configFormSelector, popupProfileFormElement);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(configFormSelector, popupAddFormElement);
addFormValidator.enableValidation();
const popupEdit = new PopupWithForm('.popup_type-edit', createPopupEdit);

//инициация готовых карточек
const cardSection = new Section ( { items: initialCards, renderer }, '.elements' );
cardSection.renderItems();

popupImage.setEventListeners();

//слушатель попапа "добавить карточку"
popupAdd.setEventListeners();
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAdd.open();
  addFormValidator.disableSubmitElement();
});

//слушатель попапа "редактировать профиль"
popupEdit.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
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
  cardSection.addItem(generatedCard);
}

function createPopupAdd (values) {
  const placeElement = createCardInstance(values.place, values.link, placeTemplate);
  cardSection.addItem(placeElement);
  popupAdd.close();
}

function createPopupEdit (values) {
  userInfo.setUserInfo(values);
  popupEdit.close();
}