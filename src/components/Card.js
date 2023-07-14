export default class Card {
  constructor(
    likes, 
    name, 
    link, 
    owner,
    _id,
    templateSelector, 
    userId,
    handleCardClick, 
    openPopapDeleteCard,
    handleCountLike
    ) {
    this._name = name;
    this._link = link;
    this._likesQuantity = likes.length;
    this._cardId = _id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopapDeleteCard = openPopapDeleteCard;
    this._createdUserCard = owner._id === userId;
    this.liked = likes.some(like => like._id === userId);
    this.handleCountLike = handleCountLike;
    this._element = this._getTemplate();
    this._cardLikeButton = this._element.querySelector('.elements__heart');
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.querySelector('.elements__element').cloneNode(true);
    return cardElement;
  }

  _handleDeleteCard = () => {
    this._openPopapDeleteCard( this._element, this._cardId );
  };

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.elements__photo');
    this._cardLikeButton = this._element.querySelector('.elements__heart');
  
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._cardLikeButton.addEventListener('click', () => {
      this.handleCountLike(this);
      this._toggleLike();
    });

    if (this._createdUserCard){
      this._cardDeleteButton.addEventListener('click', this._handleDeleteCard);
    } else {
      this._cardDeleteButton.remove();
    }
  }

  _toggleLike() {
    if(!this.liked){
      this._cardLikeButton.classList.add('elements__heart_liked')
      this.liked = true;
    } else {
      this._cardLikeButton.classList.remove('elements__heart_liked')
      this.liked = false;
    }
  }

  changeValueLikes(card) {
    this._likeCount.textContent = card.likes.length;
  }

  generateCard() {
    const cardImage = this._element.querySelector('.elements__photo');
    const cardTitle = this._element.querySelector('.elements__title');
    this._cardDeleteButton = this._element.querySelector('.elements__trash');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._likeCount = this._element.querySelector('.elements__like-count');
    this._likeCount.textContent = this._likesQuantity;

    if (this.liked) {
      this._cardLikeButton.classList.add('elements__heart_liked');
    }

    this._setEventListeners();
    return this._element;
  }
}
