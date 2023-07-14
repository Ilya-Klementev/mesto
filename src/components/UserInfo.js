export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = "";
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      userId: this._userId
    };
  }

  setUserInfo({ name, about, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._userId = _id;
  }

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }
}