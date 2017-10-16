/**
 * Created by sergey on 07.08.17.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './styles.scss'
import MarkupModel from '../../models/markupModel'

export default class MarkupCategory extends Component {
  constructor() {
    super();
    this.state = {
      markup: new MarkupModel()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let markup = {};
    let category = e.target.elements[0].value;
    let classes = [];
    for (let i = 1; i < e.target.elements.length - 1; i += 1) {
      if (e.target.elements[i].value !== '') {
        classes.push(e.target.elements[i].value);
      }
    }
    markup.category = category;
    markup.classes = classes;
    let json = JSON.stringify({
      category: markup.category,
      classes: markup.classes
    });
    const self = this;
    self.state.markup.setData(markup);
    this.state.markup.sendData(json)
      .then(function (data) {
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
      <div className='markup-category'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <div className='main'>
          <div className='name'>
            Категория и классы разметки
          </div>
          <form className='markup-category-classes' onSubmit={this.handleSubmit}>
            <div className='markup-category'>
              <div className='field'>
                <label>Выберите категорию</label>
                <input type='text' name='category' size='15'/>
              </div>
            </div>
            <div className='markup-classes'>
              <div className='field'>
                <label>Выберите классы разметки</label>
              </div>
              <div className='field'>
                <input type='text' name='first-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='second-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='third-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='forth-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='fifth-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='sixth-class' size='15'/>
              </div>
              <div className='field'>
                <input type='text' name='seventh-class' size='15'/>
              </div>
            </div>
            <div className='markup-go-btn'>
              <button className='link' type='submit'>Продолжить</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

MarkupCategory.contextTypes = {
  router: PropTypes.object.isRequired
};
