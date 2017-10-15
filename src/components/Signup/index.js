/**
 * Created by sergey on 07.08.17.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'

export default class Signup extends Component {
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
    let userName = e.target.elements[0].value;
    let userEmail = e.target.elements[1].value;
    let userPassword = e.target.elements[2].value;
    let userRepeatPassword = e.target.elements[3].value;
    if (userPassword === userRepeatPassword && userPassword !== '' && userEmail !== '') {
      this.state.validationError = true;
    }
    if (this.state.validationError === true) {
      let json = JSON.stringify({
        displayName: userName,
        email: userEmail,
        password: userPassword
      });
      const self = this;
      this.state.user.signup(json)
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
    } else {
      this.state.validationError = true;
      this.forceUpdate();
    }
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
      <div className='signup-page'>
        <div className='back'>
          <Link className='link' to='/'>Назад</Link>
        </div>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='signup-form__title'>
            Регистрация
          </div>
          <div className='signup-form__fields'>
            {this.checkValid()}
            <div className='field'>
              <label>Name</label><br/>
              <input type='text' name='userName' required/>
            </div>
            <div className='field'>
              <label>Email</label><br/>
              <input type='email' name='userEmail' required/>
            </div>
            <div className='field'>
              <label>Password</label><br/>
              <input type='password' name='userPassword' minLength='4' maxLength='14'/>
            </div>
            <div className='field'>
              <label>Repeat Password</label><br/>
              <input type='password' name='userRepeatPassword' minLength='4' maxLength='14'/>
            </div>
          </div>
          <div className='signup-btn'>
            <button className='link' type='submit'>Зарегистрироваться</button>
          </div>
        </form>
      </div>
    )
  }
}

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};