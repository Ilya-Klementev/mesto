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
const popupAddForm = document.querySelector('.popup_type-add .popup__form');                //форма Add
const placeNameInput = popupAddForm.querySelector('.popup__input_element_place');           //поле ввода места
const placeLinkInput = popupAddForm.querySelector('.popup__input_element_link');            //поле ввода ссылки
const popupContainerElement = document.querySelectorAll('.popup__container');               //контейнер попапа

const popupImageElement = document.querySelector('.popup_type-image');                       // попап image
const popupImageImgElement = popupImageElement.querySelector('.popup__image');               // картинка попапа
const popupImageTitleElement = popupImageElement.querySelector('.popup__caption');          // подпись к картинке попапа image

const popupCloseButtonElements = document.querySelectorAll('.popup__close');                //все крестики попапов

const placeTemplate = document.querySelector('#place-template');                             //шаблон template
const placesContainer = document.querySelector('.elements');                                 //место, куда всталяем карточки

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
initialCards.forEach((card) => {
  const placeElement = createCard(card.name, card.link);
  placesContainer.appendChild(placeElement);
});

function createCard(name, link) {
  const placeElement = placeTemplate.content.cloneNode(true);
  placeElement.querySelector('.elements__title').textContent = name;
  placeElement.querySelector('.elements__photo').src = link;
  placeElement.querySelector('.elements__photo').alt = name;
  //лайки
  const heartElement = placeElement.querySelector('.elements__heart');
    heartElement.addEventListener('click', () => {
      heartElement.classList.toggle('elements__heart_liked');
    })
  //удаление 
  const trashElement = placeElement.querySelector('.elements__trash');
    trashElement.addEventListener('click', () => {
      const parent = trashElement.closest('.elements__element');
      parent.remove();
      //если остается один объект, то чтобы не ломалась верстка:
      const quantElem = document.querySelectorAll('.elements__element');
      if (quantElem.length == 1) {
        quantElem[0].classList.add('elements__onlyone');
      }
    })
  //попап Image
  const imageElement = placeElement.querySelector('.elements__photo');
  imageElement.addEventListener('click', () => {
    openPopup(popupImageElement);
    popupImageImgElement.src = link;
    popupImageImgElement.alt = name;
    popupImageTitleElement.textContent = name;
  })
  return placeElement;
}

//добавление элементов
popupAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const placeLinkValue = placeLinkInput.value;
  evt.target.reset();
  const placeElement = createCard(placeNameValue, placeLinkValue);
  placesContainer.prepend(placeElement);

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

  const textMessageElements = popup.querySelectorAll('.popup__error');
  textMessageElements.forEach((messageElement) => {
    messageElement.textContent = "";
  });

  const inputElements = popup.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  //удаление слушателя событий "клавиша esc"
  document.removeEventListener('keydown', closePopupOnEsc);
}

//объявление функции закрытия попапов по клику на пустом месте
function closePopupsOnOutsideClick (event) {
  if(event.target !== event.currentTarget) {
    return;
  }
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
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
  popup.addEventListener('click', closePopupsOnOutsideClick);
}

//попап Edit открытие
function openedPopupEditElement() {
  openPopup(popupEditElement);
  popupNameElement.value = pageNameElement.textContent;
  popupAboutElement.value = pageAboutElement.textContent;
}

//попап Add открытие 
const openedPopupAddElement = function () {
  openPopup(popupAddElement);
  popupPlaceElement.value = "";
  popupLinkElement.value = "";
}

//Submit попапа Edit
function submitPopupElement(evt) {
  closePopup(popupEditElement);
  pageNameElement.textContent = popupNameElement.value;
  pageAboutElement.textContent = popupAboutElement.value;
  evt.preventDefault();
}

popupAddOpenButtonElement.addEventListener('click', openedPopupAddElement);
popupEditOpenButtonElement.addEventListener('click', openedPopupEditElement);
popupFormElement.addEventListener('submit', submitPopupElement);

