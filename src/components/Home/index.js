/**
 * Created by sergey on 07.08.17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import Markup from '../../models/markupModel'
import './styles.scss'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      checkAuth: false,
      user: new UserModel(),
      markup: new Markup()
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.state.user.logout();
    this.forceUpdate();
  }
  Profile() {
    const isLogged = this.state.user.isAuthorised();
    if (isLogged) {
      return (
        <div className='head'>
          <div className='auth'>
            <div className='userNickname'>{ this.state.user.getData().nickname }</div>
            <div className='userActions'>
              <div className='toProfile'>
                <Link className='link' to='/profile'>Профиль</Link>
              </div>
              <div className='toLogout'>
                <Link className='link' to='/' onClick={ this.handleClick }>Выйти</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='head'>
        <div className='notAuth'>
          <div className='userNickname'>Вы не авторизованы!</div>
          <div className='userActions'>
            <div className='toLogin'>
              <Link className='link' to='/login'>Войти</Link>
            </div>
            <div className='toSignUp'>
              <Link className='link' to='/signup'>Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  MarkupCategory() {
    const isSelect = this.state.markup.isSelect();
    if (isSelect) {
      return (
        <div className='selectCategory'>
          <div className='toMarkup'>
            <Link className='link' to='/markup'>Разметка</Link>
          </div>
          <div className='toImageLoad'>
            <Link className='link' to='/image_load'>Загрузить изображения</Link>
          </div>
        </div>
      );
    }
    return (
      <div className='notSelectCategory'>
        <div className='toMarkupCategory'>
          <Link className='link' to='/markup_category'>Параметры разметки</Link>
        </div>
      </div>
    );
  }
  Menu() {
    const isLogged = this.state.user.isAuthorised();
    if (isLogged) {
      return (
        <div className='main'>
          <div className='name'>
            Разметка &nbsp;&nbsp;изображений
          </div>
          <div className='menu'>
            {this.MarkupCategory()}
          </div>
        </div>
      );
    }
    return (
      <div className='main'>
        <div className='name'>
          Разметка &nbsp;&nbsp;изображений
        </div>
        <div className='menu'>
          <div className='notLogin'>
            Чтобы начать разметку вы должны авторизоваться!
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className='home-page'>
        {this.Profile()}
        {this.Menu()}
      </div>
    )
  }
}
