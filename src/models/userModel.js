/**
 * Created by sergey on 09.08.17.
 */

import Transport from '../modules/network/transport';

const tt = new Transport();

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
    console.log(data);
    this.user.nickname = data.user;
    this.user.email = data.email;
    this.user.isAuthorised = true;
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
  }
  login(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    const self = this;
    return tt.post('login', data, headers)
      .then(function (data) {
        if (data !== false) {
          self.setData(data);
          console.log(data);
          localStorage.setItem('nickname', data.nickname);
          localStorage.setItem('email', data.email);
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
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('user', data, headers)
      .then(function (data) {
        if (data !== false) {
          console.log(data);
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
