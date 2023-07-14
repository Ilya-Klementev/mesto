export default class Api {
  constructor( { adressServer, token } ) {
    this._adressServer = adressServer;
    this._token = token;
    this._headers = { 
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }   return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._adressServer}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._adressServer}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._adressServer}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  patchAvatar(avatar) {
    return fetch(`${this._adressServer}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify( {avatar} )
    }).then(this._handleResponse);
  }

  postCard({ name, link }) {
      return fetch(`${this._adressServer}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._adressServer}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  likeCard(card){
    return fetch(`${this._adressServer}/cards/${card._cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  dislikeCard (card){
    return fetch(`${this._adressServer}/cards/${card._cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}