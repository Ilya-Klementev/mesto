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
    this._cardImage = this._element.querySelector('.elements__photo');
    this._cardLikeButton = this._element.querySelector('.elements__heart');
    this._cardDeleteButton = this._element.querySelector('.elements__trash');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle('elements__heart_liked');
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

    return this._element;
  }
}
