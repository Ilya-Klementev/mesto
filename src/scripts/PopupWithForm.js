import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__input');
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this._form.reset();
    });
  }
}