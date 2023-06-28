
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButtonElement = formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  disableSubmitElement() {
    this._submitButtonElement.disabled = true;
    this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableSubmitElement() {
    this._submitButtonElement.disabled = false;
    this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
  }
  
  _toggleButtonState() {
    const isValid = this._inputList.every((inputElement) => inputElement.validity.valid);
    if (isValid) {
      this._enableSubmitElement();
    } else {
      this.disableSubmitElement();
    }
  }


  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  resetError () {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorClass);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}



