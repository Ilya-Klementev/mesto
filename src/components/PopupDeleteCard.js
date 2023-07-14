import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._onSubmitHandler();
    });
  }

  _onSubmitHandler = () => {
    this._submitCallback( { element : this._element, cardId : this._cardId } );
  }

  open( element, cardId ) {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}

