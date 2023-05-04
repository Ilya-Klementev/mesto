const pageNameElement = document.querySelector('.profile__name');                          //Имя в профиле
const pageAboutElement = document.querySelector('.profile__about');                        //About в профиле

const popupElements = document.querySelectorAll('.popup');                                 //попап
const popupEditElement = document.querySelector('.popup_type-edit');                       //попап Edit
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');        //кнопка открытия попапа Edit
const popupNameElement = popupEditElement.querySelector('.popup__input_element_name');     //поле ввода имени в попапе Edit
const popupAboutElement = popupEditElement.querySelector('.popup__input_element_about');   //поле ввода about в попапе Edit
const popupSubmitButtonElement = popupEditElement.querySelector('.popup__submit');         //кнопка submit в попапе Edit

const popupFormElement = popupEditElement.querySelector('.popup__form');                   //форма попапа

const popupAddElement = document.querySelector('.popup_type-add');                         //попап Add
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');           //кнопка открытия попапа Add
const popupPlaceElement = popupAddElement.querySelector('.popup__input_element_place');     //поле ввода названия в попапе Add
const popupLinkElement = popupAddElement.querySelector('.popup__input_element_link');       //поле ввода ссылки на картнку в попапе Add

const popupCloseButtonElements = document.querySelectorAll('.popup__close');

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

const placeTemplate = document.querySelector('#place-template');
const placesContainer = document.querySelector('.elements');

initialCards.forEach((card) => {
  const placeElement = placeTemplate.content.cloneNode(true);
  const placeTitleElement = placeElement.querySelector('.elements__title');
  const placeImageElement = placeElement.querySelector('.elements__photo');

  placeTitleElement.textContent = card.name;
  placeImageElement.src = card.link;
  placeImageElement.alt = card.name;
  placesContainer.appendChild(placeElement);
});

//закрытие попапов
popupCloseButtonElements.forEach(popupCloseButtonElement => {
  popupCloseButtonElement.addEventListener('click', function() {
    popupElements.forEach(popupElement => {
      popupElement.classList.remove('popup_opened');
    });
  });
});

//добавление элементов
const popupAddForm = document.querySelector('.popup_type-add .popup__form');
popupAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeNameInput = popupAddForm.querySelector('.popup__input_element_place');
  const placeLinkInput = popupAddForm.querySelector('.popup__input_element_link');
  const placeNameValue = placeNameInput.value;
  const placeLinkValue = placeLinkInput.value;
  const placeElement = placeTemplate.content.cloneNode(true);
  const placeTitle = placeElement.querySelector('.elements__title');
  const placeImage = placeElement.querySelector('.elements__photo');
  const placeHeart = placeElement.querySelector('.elements__heart');

  placeTitle.textContent = placeNameValue;
  placeImage.src = placeLinkValue;
  placeImage.alt = placeNameValue;

  const elementsContainer = document.querySelector('.elements');
  elementsContainer.prepend(placeElement);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  const popupAdd = document.querySelector('.popup_type-add');
  popupAdd.classList.remove('popup_opened');

  placeHeart.addEventListener('click', function(){
    placeHeart.classList.toggle('elements__heart_liked');
  });
  pageElementsTrash();
  pagePopupImageOpen();

  //добавление класса, когда остается один элемент, чтобы не сбивалась верстка
  const quantElem = document.querySelectorAll('.elements__element');
  if (quantElem.length == 1) {
    quantElem[0].classList.add('elements__onlyone');
  }
  if (quantElem.length > 1) {
    quantElem.forEach(pageElement => {
      pageElement.classList.remove('elements__onlyone');
    });
  }
});

//лайки
function pageElementsLiked() {
  const pageHeartElements = document.querySelectorAll('.elements__heart');

  pageHeartElements.forEach((pageHeartElement) => {
    pageHeartElement.addEventListener('click', function(){
      pageHeartElement.classList.toggle('elements__heart_liked');
    })})};
pageElementsLiked();

//открытие попапа Image
function pagePopupImageOpen() {
const pageImageElements = document.querySelectorAll('.elements__photo');
const popupImageElement = document.querySelector('.popup_type-image');
const popupImageImgElement = popupImageElement.querySelector('.popup__image');
const pageImageTitleElements = document.querySelectorAll('.elements__title');
const popupImageTitleElement = popupImageElement.querySelector('.popup__caption');

pageImageElements.forEach(pageImageElement => {
  pageImageElement.addEventListener('click', function() {
    popupImageElement.classList.add('popup_opened');
    popupImageImgElement.src = pageImageElement.src;
    popupImageTitleElement.textContent = pageImageTitleElements[Array.from(pageImageElements).indexOf(pageImageElement)].textContent;
  });
})};
pagePopupImageOpen();

//удаление элементов
function pageElementsTrash() {
const pageTrashButtonsElements = document.querySelectorAll('.elements__trash');
pageTrashButtonsElements.forEach((button) => {
  button.addEventListener('click', () => {
    const parent = button.closest('.elements__element');
    parent.remove();

    const quantElem = document.querySelectorAll('.elements__element');
    if (quantElem.length == 1) {
      quantElem[0].classList.add('elements__onlyone');
    }
  });
})};
pageElementsTrash();

//попап Edit открытие
function popupEditElementOpened() {
  popupEditElement.classList.add('popup_opened');
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;
}

//попап Add открытие 
const popupAddElementOpened = function () {
  popupAddElement.classList.add('popup_opened');
  popupPlaceElement.value = "";
  popupLinkElement.value = "";
}

//Submit попапа Edit
const popupElementSubmit = function (evt) {
  popupEditElement.classList.remove('popup_opened');
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
  evt.preventDefault();
}

popupAddOpenButtonElement.addEventListener('click', popupAddElementOpened);
popupEditOpenButtonElement.addEventListener('click', popupEditElementOpened);
popupFormElement.addEventListener('submit', popupElementSubmit);