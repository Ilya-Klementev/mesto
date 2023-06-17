export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.querySelector('.elements__element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.elements__photo');
    const cardLikeButton = this._element.querySelector('.elements__heart');
    const cardDeleteButton = this._element.querySelector('.elements__trash');

    cardImage.addEventListener('click', () => {
      this._openImagePopup();
    });

    cardLikeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
      const quantElements = document.querySelectorAll('.elements__element');
      if (quantElements.length == 1) {
        quantElements[0].classList.add('elements__onlyone');
      }
    });
  }

  _openImagePopup() {
    const popupImage = document.querySelector('.popup_type-image');
    const popupImageImgElement = popupImage.querySelector('.popup__image');
    const popupImageCaptionElement = popupImage.querySelector('.popup__caption');
    this._handleCardClick(popupImage);
    popupImageImgElement.src = this._link;
    popupImageCaptionElement.alt = this._name;
    popupImageCaptionElement.textContent = this._name;
  }

  _toggleLike() {
    const cardLikeButton = this._element.querySelector('.elements__heart');
    cardLikeButton.classList.toggle('elements__heart_liked');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.elements__photo');
    const cardTitle = this._element.querySelector('.elements__title');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    const quantElements = document.querySelectorAll('.elements__element');
    if (quantElements.length == 1) {
      quantElements[0].classList.add('elements__onlyone');
    }
    if (quantElements.length > 1) {
      quantElements.forEach(pageElement => {
        pageElement.classList.remove('elements__onlyone');
      });
    }

    return this._element;
  }
}
