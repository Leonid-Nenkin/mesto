export default class UserInfo {
  constructor (userNameSelector, userDescriptionSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDesc = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {"userName": this._userName.textContent, "userDescription": this._userDesc.textContent};
  }

  setUserInfo(name, description) {
    this._userName.textContent = name;
    this._userDesc.textContent = description; 
  }
}