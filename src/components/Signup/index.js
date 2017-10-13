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
      user: new UserModel()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let valid = false;
    let userName = e.target.elements[0].value;
    let userEmail = e.target.elements[1].value;
    let userPassword = e.target.elements[2].value;
    let userRepeatPassword = e.target.elements[3].value;
    if (userPassword === userRepeatPassword && userPassword !== '') {
      valid = true;
    }
    if (valid === true) {
      let json = JSON.stringify({
        displayName: userName,
        email: userEmail,
        password: userPassword
      });
      const self = this;
      this.state.user.signup(json)
        .then(function (data) {
          console.log(data);
          if (data === true) {
            self.context.router.push('/');
          }
        })
        .catch(function (err) {
          console.log(err);
        })
    } else {
      console.log('Validation Error');
    }
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
            <div className='field'>
              <label>Name</label><br/>
              <input type='text' name='userName' />
            </div>
            <div className='field'>
              <label>Email</label><br/>
              <input type='email' name='userEmail' />
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