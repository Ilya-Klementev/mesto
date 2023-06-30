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
      this._handleCardClick(this._link, this._name);
    });

    cardLikeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
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

    return this._element;
  }
}
