/**
 * Created by sergey on 02.09.17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import MarkupModel from '../../models/markupModel'
import './styles.scss'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: new UserModel(),
      markup: new MarkupModel()
    }
  }
  profileData() {
    return (
      <div className='nickname'>
        Никнейм:&nbsp;&nbsp;&nbsp;&nbsp; {this.state.user.getData().nickname}
      </div>
    )
  }
  markupData() {
    let markupClasses = [];
    for (let i = 0; i < this.state.markup.getData().classes.length; i += 1) {
      markupClasses.push(<div className='class' key={i}>{this.state.markup.getData().classes[i]}</div>);
    }
    return (
      <div className='markup-data'>
        <div className='markup-data__category'>
          Категория:&nbsp;&nbsp; {this.state.markup.getData().category}
        </div>
        <div className='markup-data__classes'>
          Классы:
          <div className='classes'>
            {markupClasses}
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className='profile-page'>
        <div className='back'>
          <Link className='link' to='/'>Назад</Link>
        </div>
        <div className='main'>
          <div className='profile-title'>
            Профиль
          </div>
          {this.profileData()}
          {this.markupData()}
        </div>
      </div>
    )
  }
}