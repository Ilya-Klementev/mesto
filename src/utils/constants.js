const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');                      //кнопка открытия попапа Edit
const popupProfileFormElement = document.forms["form-popup-edit"];                                       //форма попапа  Edit
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');                        //кнопка открытия попапа Add
const popupAddFormElement = document.forms["form-popup-add"];                                            //форма попапа Add
const placeTemplate = document.querySelector('#place-template');                                         //шаблон template

const configFormSelector = {
  formSelector: '.popup__form',                 
  inputSelector: '.popup__input',                
  submitButtonSelector: '.popup__submit',         
  inactiveButtonClass: 'popup__submit_disabled', 
  inputErrorClass: 'popup__input_type_error',   
  errorClass: 'popup__error_visible'
}

export {
  configFormSelector,
  popupEditOpenButtonElement,
  popupProfileFormElement,
  popupAddOpenButtonElement,
  popupAddFormElement,
  placeTemplate,
};
