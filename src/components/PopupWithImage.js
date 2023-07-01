import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open( imageUrl, caption ) {
    this._image.src = imageUrl;
    this._image.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }
}