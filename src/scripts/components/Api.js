export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo(){
    const userUrl = '/users/me/';
    return this._getResultByUrl(userUrl);
  }

  getInitialCards() {
    const cardsUrl = '/cards/'
    return this._getResultByUrl(cardsUrl);
  }

  updateAvatar(data){
    const userUrl = '/users/me/avatar';
    return fetch(this._url+userUrl, {
      method:"PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._errorHandler(res)
    });
  }

  updateUserInfo(data){
    const userUrl = '/users/me/';
    return fetch(this._url+userUrl, {
      method:"PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._errorHandler(res)
    });
  }

  setLike(data) {
    const cardUrl = "/cards/likes/" + data.cardId;
    return fetch(this._url + cardUrl, {
      method: "PUT",
      headers: this._headers
    }).then((res)=>{return this._errorHandler(res)});
  }

  removeLike(data) {
    const cardUrl = "/cards/likes/" + data.cardId;
    return fetch(this._url + cardUrl, {
      method: "DELETE",
      headers: this._headers
    }).then((res)=>{return this._errorHandler(res)})
  }

  addCard(data){
    const cardUrl = "/cards"
    return fetch(this._url + cardUrl, {
      method:"POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._errorHandler(res)
    });
  }

  deleteCard (data) {
    const cardUrl = "/cards/" + data.cardId;
    return fetch (this._url + cardUrl, {
      method: "DELETE",
      headers: this._headers,
    }).then((res)=>{return this._errorHandler(res)})
  }

  _getResultByUrl(url){
    return fetch(this._url + url, {
      method:"GET",
      headers: this._headers
    })
    .then((res) => {
      return this._errorHandler(res)  
    });
  }

  _errorHandler(res) {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}