
const configFormSelector = {
  formSelector: '.popup__form',                 
  inputSelector: '.popup__input',                
  submitButtonSelector: '.popup__submit',         
  inactiveButtonClass: 'popup__submit_disabled', 
  inputErrorClass: 'popup__input_type_error',   
  errorClass: 'popup__error_visible'
}


//функция отображения текста ошибки
function showTextError (inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

//функция скрытия текста ошибки
function hideTextError (inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState (buttonElement, statusButton, config) {
  if(!statusButton){
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
  else{
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);   
  }
}

//функция проверки валидации инпутов
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector (`#${inputElement.name}-error`);
  //показываем текст ошибки
  if(!isInputValid) {
    showTextError(inputElement, errorElement, config);
  }
  //скрываем текст ошибки
  else{
    hideTextError(inputElement, errorElement, config);
  }
}

//функция навешивания слушателей событий
function setEventListener(formElement, config) {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitPopupElement = formElement.querySelector(config.submitButtonSelector);

  //для сабмитов
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  //для инпутов
  Array.from(inputsList).forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitPopupElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config);
    });
  })
  
  toggleButtonState(submitPopupElement, formElement.checkValidity(), config);
}

//функция включения валидации
function enableValidation (config) {
  const pageFormElements = document.querySelectorAll(config.formSelector);
  [...pageFormElements].forEach( (formItem) => {
    setEventListener(formItem, config);
  })
};

//включение валидации
enableValidation(configFormSelector);