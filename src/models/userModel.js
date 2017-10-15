/**
 * Created by sergey on 09.08.17.
 */

import Transport from '../modules/network/transport';
import markupModel from './markupModel'

const tt = new Transport();
let markup = new markupModel();

export default class UserModel {

  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }
    this.user = {
      isAuthorised: false
    };
    this.image = {};
    UserModel.instance = this;
  }
  isAuthorised() {
    return this.user.isAuthorised;
  }
  getData() {
    return this.user;
  }
  setData(data) {
    this.user.nickname = data.displayName;
    this.user.email = data.email;
    this.user.isAuthorised = true;
    console.log(data.markup);
    if (data.markup !== undefined) {
      markup.setData(data.markup);
    }
  }
  // checkAuth() {
  //   let token = localStorage.getItem('token');
  //   let headers = {
  //     Authorization: token
  //   };
  //   const self = this;
  //   return tt.get('custom', headers)
  //     .then(function (data) {
  //       self.setData(data);
  //       // console.log(data);
  //       return true;
  //     })
  //     .catch(function (error) {
  //       console.log('Request failed', error);
  //       return false;
  //     });
  // }
  logout() {
    localStorage.clear();
    this.user = {
      isAuthorised: false,
      nickname: '',
      email: ''
    }
    markup.drop();
  }
  login(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    const self = this;
    return tt.post('login', data, headers)
      .then(function (data) {
        if (data !== false) {
          console.log(data);
          self.setData(data);
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
  signup(data) {
    console.log(data);
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('user', data, headers)
      .then(function (data) {
        if (data !== false) {
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
}
