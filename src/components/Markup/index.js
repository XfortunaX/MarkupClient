/**
 * Created by sergey on 02.09.17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import ImageModel from '../../models/imageModel'
import MarkupModel from '../../models/markupModel'
import './styles.scss'

export default class Markup extends Component {
  constructor() {
    super();
    this.state = {
      checkAuth: false,
      user: new UserModel(),
      image: new ImageModel(),
      markup: new MarkupModel(),
      area: { x1: 0, x2: 0, y1: 0, y2: 0 },
      k: 1,
      pressed: false,
      markup_select: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleActionClickLeft = this.handleActionClickLeft.bind(this);
    this.handleActionClickRight = this.handleActionClickRight.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }
  componentDidMount() {
    let self = this;
    this.refs.canvasMarkup.onmousemove = function (event) {
      if (self.state.pressed === true) {
        event.preventDefault();
        let canvas = document.getElementsByClassName('canvas-markup')[0];
        let context = canvas.getContext('2d');
        context.strokeStyle = '#000000';
        context.lineWidth = 3;
        self.state.area.x2 = event.offsetX;
        self.state.area.y2 = event.offsetY;
        context.clearRect(
          0,
          0,
          self.state.image.getData().srcImage.naturalWidth * self.state.k,
          self.state.image.getData().srcImage.naturalHeight * self.state.k
        );
        context.restore();
        context.drawImage(
          self.state.image.getData().srcImage,
          0,
          0,
          self.state.image.getData().srcImage.naturalWidth * self.state.k,
          self.state.image.getData().srcImage.naturalHeight * self.state.k
        );
        context.strokeRect(
          self.state.area.x1,
          self.state.area.y1,
          self.state.area.x2 - self.state.area.x1,
          self.state.area.y2 - self.state.area.y1
        );
      }
    };
    this.refs.canvasMarkup.onmousedown = function (event) {
      if (self.state.markup_select === true) {
        self.state.pressed = true;

        self.state.area = {x1: 0, x2: 0, y1: 0, y2: 0};

        self.state.area.x1 = event.offsetX;
        self.state.area.y1 = event.offsetY;
      }
    };
    this.refs.canvasMarkup.onmouseup = function () {
      if (self.state.markup_select === true) {
        self.state.pressed = false;

        self.state.image.setMarkup({
          area: {
            x1: Math.round(self.state.area.x1 * self.state.k),
            y1: Math.round(self.state.area.y1 * self.state.k),
            x2: Math.round(self.state.area.x2 * self.state.k),
            y2: Math.round(self.state.area.y2 * self.state.k)
          },
          markup_class: self.state.markup.getData().classes[self.state.markup.getData().activeClass]
        });
      }
    }
  }

  handleActionClickLeft(e) {
    e.preventDefault();
    this.state.markup.changeActive('left');

    let markup = this.state.image.getMarkup(this.state.markup.getData().classes[this.state.markup.getData().activeClass]);

    let canvas = document.getElementsByClassName('canvas-markup')[0];
    let context = canvas.getContext('2d');
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.clearRect(
      0,
      0,
      this.state.image.getData().srcImage.naturalWidth * this.state.k,
      this.state.image.getData().srcImage.naturalHeight * this.state.k
    );
    context.restore();
    context.drawImage(
      this.state.image.getData().srcImage,
      0,
      0,
      this.state.image.getData().srcImage.naturalWidth * this.state.k,
      this.state.image.getData().srcImage.naturalHeight * this.state.k
    );

    if (markup !== undefined) {
      this.state.area.x1 = markup.area.x1 / this.state.k;
      this.state.area.y1 = markup.area.y1 / this.state.k;
      this.state.area.x2 = markup.area.x2 / this.state.k;
      this.state.area.y2 = markup.area.y2 / this.state.k;

      context.strokeRect(
        this.state.area.x1,
        this.state.area.y1,
        this.state.area.x2 - this.state.area.x1,
        this.state.area.y2 - this.state.area.y1
      );
    }

    this.forceUpdate();
  }

  handleActionClickRight(e) {
    e.preventDefault();
    this.state.markup.changeActive('right');

    let markup = this.state.image.getMarkup(this.state.markup.getData().classes[this.state.markup.getData().activeClass]);

    let canvas = document.getElementsByClassName('canvas-markup')[0];
    let context = canvas.getContext('2d');
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.clearRect(
      0,
      0,
      this.state.image.getData().srcImage.naturalWidth * this.state.k,
      this.state.image.getData().srcImage.naturalHeight * this.state.k
    );
    context.restore();
    context.drawImage(
      this.state.image.getData().srcImage,
      0,
      0,
      this.state.image.getData().srcImage.naturalWidth * this.state.k,
      this.state.image.getData().srcImage.naturalHeight * this.state.k
    );

    if (markup !== undefined) {
      this.state.area.x1 = markup.area.x1 / this.state.k;
      this.state.area.y1 = markup.area.y1 / this.state.k;
      this.state.area.x2 = markup.area.x2 / this.state.k;
      this.state.area.y2 = markup.area.y2 / this.state.k;

      context.strokeRect(
        this.state.area.x1,
        this.state.area.y1,
        this.state.area.x2 - this.state.area.x1,
        this.state.area.y2 - this.state.area.y1
      );
    }
    this.forceUpdate();
  }
  handleClick(e) {
    e.preventDefault();

    let self = this;
    let json = JSON.stringify({
      category: this.state.markup.getData().category
    });
    this.state.image.getImage(json)
      .then(function (data) {
        if (data === true) {
          self.state.area = { x1: 0, x2: 0, y1: 0, y2: 0 };
          self.state.markup.dropActive();
          self.state.image.dropMarkup();
          let canvas = document.getElementsByClassName('canvas-markup')[0];
          let ctx = canvas.getContext('2d');
          let img = new Image();
          img.onload = function() {
            self.state.k = 0.7 * window.innerHeight / img.naturalHeight;
            if (img.naturalWidth * self.state.k > 0.8 * window.innerWidth) {
              self.state.k = 0.8 * window.innerWidth / img.naturalWidth;
            }
            canvas.height = img.naturalHeight * self.state.k;
            canvas.width = img.naturalWidth * self.state.k;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            self.forceUpdate();
          };
          img.src = self.state.image.getData().url;
          self.state.image.setData({
            srcImage: img,
            k: self.state.k,
            markup_category: self.state.markup.getData().category
          });
          self.state.markup_select = true;
        }
      })
      .catch(function () {

      })
  }
  handleClickSave(e) {
    e.preventDefault();
    let json = JSON.stringify({
      id: this.state.image.getData().id,
      markup: this.state.image.getData().markup
    });
    let self = this;
    this.state.image.sendData(json)
      .then(function (data) {
        if (data === true) {
          self.state.markup_select = false;

          let canvas = document.getElementsByClassName('canvas-markup')[0];
          let context = canvas.getContext('2d');
          context.strokeStyle = '#000000';
          context.lineWidth = 3;
          context.clearRect(
            0,
            0,
            self.state.image.getData().srcImage.naturalWidth * self.state.k,
            self.state.image.getData().srcImage.naturalHeight * self.state.k
          );
          self.state.image.drop();
          self.forceUpdate();
        }
      })
      .catch(function () {

      })
  }
  handleLoad(e) {
    e.preventDefault();

    let reader = new FileReader();
    let self = this;
    reader.onload = function() {
      let dataURL = reader.result;
      let canvas = document.getElementsByClassName('canvas-markup')[0];
      let context = canvas.getContext('2d');
      let im = new Image();

      im.onload = function () {

        self.state.k = 0.7 * window.innerHeight / im.naturalHeight;
        if (im.naturalWidth * self.state.k > 0.8 * window.innerWidth) {
          self.state.k = 0.8 * window.innerWidth / im.naturalWidth;
        }
        canvas.height = im.naturalHeight * self.state.k;
        canvas.width = im.naturalWidth * self.state.k;
        context.drawImage(im, 0, 0, canvas.width, canvas.height);
      };
      im.src = dataURL;
      self.state.image.setData({
        srcImage: im,
        k: self.state.k,
        markup_category: self.state.markup.getData().category
      });
    };
    this.state.name = document.getElementsByClassName('uploadImage')[0].files[0].name;
    reader.readAsDataURL(document.getElementsByClassName('uploadImage')[0].files[0]);
  }
  userActions() {
    return (
      <div className='action-btns'>
        <div className='btn-left'>
          <button className='link load-image' onClick={this.handleClick}>
            Загрузить
          </button>
          <input className='uploadImage'
                 type='file'
                 accept='image/*'
                 name='img'
                 style={{display: 'none'}}
                 onChange={this.handleLoad}>
          </input>
        </div>
        <div className='btn-action-moves'>
          <button className='link back-markup' onClick={this.handleActionClickLeft}>
            Назад
          </button>
          <button className='link go-markup' onClick={this.handleActionClickRight}>
            Далее
          </button>
        </div>
        <div className='btn-right'>
          <button className='link send-image' onClick={this.handleClickSave}>
            Сохранить
          </button>
        </div>
      </div>
    )
  }
  markupTitle() {
    let markupTitle = [];
    if (this.state.markup_select === false) {
      markupTitle.push(
        <div className='markup-title-not-select name'
          key='not-select'>
          Загрузите изображение
        </div>
      )
    } else {
      markupTitle.push(
        <div className='markup-title-select name'
            key='select'>
          <div className='markup-title-select__title'>
            Класс разметки:
          </div>
          <div className='markup-title-select__class'>
            &nbsp;&nbsp;{this.state.markup.getData().classes[this.state.markup.getData().activeClass]}
          </div>
        </div>
      )
    }
    return (
      <div className='markup-title'>
        {markupTitle}
      </div>
    );
  }
  render() {
    return (
      <div className='markup-page'>
        <div className='back'>
          <Link className='link' to='/'>Назад</Link>
        </div>
        <div className='main'>
          {this.markupTitle()}
          <div className='image'>
            <canvas className='canvas-markup'
                    ref='canvasMarkup'>
            </canvas>
          </div>
          {this.userActions()}
        </div>
      </div>
    )
  }
}
