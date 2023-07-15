
import {
  popupAvatarButtonElement,
  configFormSelector,
  popupEditOpenButtonElement,
  popupProfileFormElement,
  popupAddOpenButtonElement,
  popupAddFormElement,
  placeTemplate,
  popupAvatarFormElement,
  adressServer,
  token
} from "../utils/constants.js";

import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Api from "../components/Api.js"

const userInfo = new UserInfo({ 
  nameSelector: ".profile__name", 
  aboutSelector: ".profile__about", 
  avatarSelector: ".profile__avatar" 
});

const popupImage = new PopupWithImage('.popup_type-image');
const popupAdd = new PopupWithForm('.popup_type-add', createPopupAdd);
const popupAvatar = new PopupWithForm('.popup_type-avatar', createAvatar);
const popupEdit = new PopupWithForm('.popup_type-edit', createPopupEdit);
const popupDelete = new PopupDeleteCard('.popup_type-delete', deleteCardElement);
const cardSection = new Section(renderer, '.elements');

const editFormValidator = new FormValidator(configFormSelector, popupProfileFormElement);
const addFormValidator = new FormValidator(configFormSelector, popupAddFormElement);
const avatarFormValidator = new FormValidator(configFormSelector, popupAvatarFormElement);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const api = new Api( { adressServer, token } );

//инициация готовых карточек-данных пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) =>
    console.log(`Ошибка получения данных пользователя/карточек: ${err}`)
  );


function renderer (item, cardSection) {
  const generatedCard = createCardInstance(
    item.likes, 
    item.name, 
    item.link, 
    item.owner,
    item._id,
    placeTemplate);
  cardSection.addItem(generatedCard);
}

//создание карточки
function createCardInstance(likes, name, link, owner, _id, template) {
  const placeElement = new Card(
    likes, 
    name, 
    link, 
    owner,
    _id,
    template,
    userInfo.getUserInfo().userId,
    openPopupImageElement, 
    openPopupDeleteCard,
    handleCountLike
  );
  return placeElement.generateCard();
}

//лайки
function handleCountLike(card) {
  if (!card.liked){
    api.likeCard(card)
      .then((res) => {
      card.changeValueLikes(res);
      card.toggleLike();
      })
      .catch((err) => console.log(`Ошибка обновления лайка: ${err}`))
  } else {
    api.dislikeCard(card)
      .then((res) => {
      card.changeValueLikes(res);  
      card.toggleLike();
      })
      .catch((err) => console.log(`Ошибка обновления лайка: ${err}`))
  }
}

//изменение данных пользователя
function createPopupEdit (values) {
  popupEdit.processLoading(true);
  api.patchUserInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => console.log(`Ошибка отправки данных: ${err}`))
    .finally(() => popupEdit.processLoading(false))
}

//добавление новой карточки
function createPopupAdd (values) {
  popupAdd.processLoading(true);
  api.postCard(values)
    .then((data) => {
      const placeElement = createCardInstance(
        data.likes, 
        data.name, 
        data.link, 
        data.owner,
        data._id,
        placeTemplate);
      cardSection.addItem(placeElement);
      popupAdd.close();
    })
    .catch((err) => console.log(`Ошибка добавление карточки: ${err}`))
    .finally(() => popupAdd.processLoading(false))
}

//удаление карточки
function deleteCardElement ( { element, cardId } ) {
  api.deleteCard(cardId)
    .then(() => {
      element.remove();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`)
    });
}

//изменение аватара
function createAvatar( avatar ) {
  popupAvatar.processLoading(true);
  api.patchAvatar(avatar.picture)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => console.log(`Ошибка при отправке аватара: ${err}`))
    .finally(() => popupAvatar.processLoading(false))
}

popupImage.setEventListeners();
popupDelete.setEventListeners();

//слушатель попапа "Изменить аватар"
popupAvatar.setEventListeners();
popupAvatarButtonElement.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.disableSubmitElement();
  avatarFormValidator.resetError();
})

//слушатель попапа "добавить карточку"
popupAdd.setEventListeners();
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAdd.open();
  addFormValidator.resetError();
  addFormValidator.disableSubmitElement();
});

//слушатель попапа "редактировать профиль"
popupEdit.setEventListeners();
popupEditOpenButtonElement.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editFormValidator.resetError();
});

//открыть попап с картинкой
function openPopupImageElement(imageUrl, caption) {
  popupImage.open(imageUrl, caption);
}

//открыть попап удаления карточки
function openPopupDeleteCard(element, cardId) {
  popupDelete.open(element, cardId);
}