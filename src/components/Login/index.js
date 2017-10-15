/**
 * Created by sergey on 07.08.17.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      checkAuth: false,
      user: new UserModel(),
      validationError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.state.validationError = false;
    let userUsername = e.target.elements[0].value;
    let userPassword = e.target.elements[1].value;
    let json = JSON.stringify({
      email: userUsername,
      password: userPassword
    });
    const self = this;
    this.state.user.login(json)
      .then(function (data) {
        if (data === true) {
          self.context.router.push('/');
        }
        self.state.validationError = true;
        self.forceUpdate();
      })
      .catch(function () {
        self.state.validationError = true;
        self.forceUpdate();
      })
  }
  checkValid() {
    if (this.state.validationError === true) {
      return (
        <div className='valid-error'>
          Ошибка валидации
        </div>
      )
    }
    return (
      <div className='valid-error'>
      </div>
    )
  }
  render() {
    return (
      <div className='login-page'>
        <div className='back'>
          <Link className='link' to='/'>Назад</Link>
        </div>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='login-form__title'>
            Авторизация
          </div>
          <div className='login-form__fields'>
            {this.checkValid()}
            <div className='field'>
              <label>Username</label>
              <input type='text' name='usernamelLogin' />
            </div>
            <div className='field'>
              <label>Password</label>
              <input type='password' name='passwordLogin' minLength='4' maxLength='14'/>
            </div>
          </div>
          <div className='login-btn'>
            <button className='link' type='submit'>Войти</button>
          </div>
        </form>
      </div>
    )
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};