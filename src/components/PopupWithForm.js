import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitCallback = submitCallback;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector(".popup__submit");
  }

  processLoading(statusLoading) {
    this._buttonSubmit.disabled = statusLoading;
    if(statusLoading) {
      this._buttonSubmit.textContent = "Сохранение..";
    } else {
      this._buttonSubmit.textContent = "Сохранить";
    }
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submitCallback(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  
  close() {
    super.close();
    this._form.reset();
  }
}