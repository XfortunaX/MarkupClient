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
      user: new UserModel()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let userEmail = e.target.elements[0].value;
    let userPassword = e.target.elements[1].value;
    let json = JSON.stringify({
      email: userEmail,
      password: userPassword
    });
    const self = this;
    this.state.user.login(json)
      .then(function (data) {
        console.log(data);
        if (data === true) {
          self.context.router.push('/');
        }
      })
      .catch(function (err) {
        console.log(err);
      })
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
            <div className='field'>
              <label>Email</label><br/>
              <input type='text' name='emailLogin' />
            </div>
            <div className='field'>
              <label>Password</label><br/>
              <input type='password' name='passwordLogin' minLength='4' maxLength='10'/>
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