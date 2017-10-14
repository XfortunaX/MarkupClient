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
      area: {x1: 0, x2: 0, y1: 0, y2: 0},
      k: 1,
      pressed: false
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
        console.log(self.state.image.getData().srcImage.naturalWidth);
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
      self.state.pressed = true;

      self.state.area = {x1: 0, x2: 0, y1: 0, y2: 0};

      self.state.area.x1 = event.offsetX;
      self.state.area.y1 = event.offsetY;
    };
    this.refs.canvasMarkup.onmouseup = function () {
      self.state.pressed = false;

      self.state.image.setMarkup({
        area: {
          x1: self.state.area.x1 * self.state.k,
          y1: self.state.area.y1 * self.state.k,
          x2: self.state.area.x2 * self.state.k,
          y2: self.state.area.y2 * self.state.k
        },
        markup_class: self.state.markup.getData().classes[self.state.markup.getData().activeClass]
      });
    }
  }

  handleActionClickLeft(e) {
    e.preventDefault();
    this.state.markup.changeActive('left');

    this.forceUpdate();
  }

  handleActionClickRight(e) {
    e.preventDefault();
    this.state.markup.changeActive('right');

    this.forceUpdate();
  }
  handleClick(e) {
    e.preventDefault();
    // document.getElementsByClassName('uploadImage')[0].click();

    let self = this;
    this.state.image.getImage()
      .then(function (data) {
        if (data === true) {
          let myCanvas = document.getElementById('my_canvas_id');
          let ctx = myCanvas.getContext('2d');
          let img = new Image;
          img.onload = function(){
            ctx.drawImage(img,0,0); // Or at whatever offset you like
          };
          img.src = self.image.getData().src;
        }
      })
      .catch(function () {

      })
  }
  handleClickSave(e) {
    e.preventDefault();
    let json = JSON.stringify({
      image: this.state.image.getData().src,
      markup: this.state.image.getData().markup
    });
    this.state.image.sendData(json)
      .then(function (data) {
        if (data === true) {
          console.log('success');
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
    // console.log(reader.result);
      let dataURL = reader.result;
      let canvas = document.getElementsByClassName('canvas-markup')[0];
      let context = canvas.getContext('2d');
      let im = new Image();

      im.onload = function () {
        console.log(im.naturalHeight, im.naturalWidth);
        console.log(screen.height, screen.width);
        console.log(window.innerHeight, window.innerWidth);

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
    console.log(document.getElementsByClassName('uploadImage')[0].files[0]);
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
  render() {
    return (
      <div className='markup-page'>
        <div className='back'>
          <Link className='link' to='/'>Назад</Link>
        </div>
        <div className='main'>
          <div className='name'>
            Разметка класса: {this.state.markup.getData().classes[this.state.markup.getData().activeClass]}
          </div>
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

// import React, { Component } from 'react'
// import './styles.scss'
//
// export default class Markup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: '',
//       image: '',
//       rect: {
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0
//       },
//       k: 1,
//       pressed: false
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleLoad = this.handleLoad.bind(this);
//     this.handleClickSave = this.handleClickSave.bind(this);
//   }
//   componentDidMount() {
//     let self = this;
//     this.refs.canvasMarkup.onmousemove = function (event) {
//       if (self.state.pressed === true) {
//         event.preventDefault();
//         console.log(1);
//         let canvas = document.getElementsByClassName('canvas-markup')[0];
//         let context = canvas.getContext('2d');
//         context.strokeStyle = '#00FFFF';
//         context.lineWidth = 3;
//         self.state.rect.width = event.offsetX - self.state.rect.x;
//         self.state.rect.height = event.offsetY - self.state.rect.y;
//         context.clearRect(
//           0,
//           0,
//           self.state.image.naturalWidth * self.state.k,
//           self.state.image.naturalHeight * self.state.k
//         );
//         context.restore();
//         context.drawImage(
//           self.state.image,
//           0,
//           0,
//           self.state.image.naturalWidth * self.state.k,
//           self.state.image.naturalHeight * self.state.k
//         );
//         context.strokeRect(
//           self.state.rect.x,
//           self.state.rect.y,
//           self.state.rect.width,
//           self.state.rect.height
//         );
//       }
//     };
//     this.refs.canvasMarkup.onmousedown = function (event) {
//       self.state.pressed = true;
//       console.log(event.offsetX, event.offsetY);
//       self.state.rect.x = event.offsetX;
//       self.state.rect.y = event.offsetY;
//       // self.state.rect.x =
//     };
//     this.refs.canvasMarkup.onmouseup = function () {
//       self.state.pressed = false;
//     }
//   }
//   handleClick(e) {
//     e.preventDefault();
//
//     document.getElementsByClassName('uploadImage')[0].click();
//     this.forceUpdate();
//   }
//   downloadFile(fileName, urlData) {
//
//     let aLink = document.getElementsByTagName('a')[0];
//     aLink.download = fileName;
//     aLink.href = urlData;
//
//     let event = new MouseEvent('click');
//     aLink.dispatchEvent(event);
//   }
//   handleClickSave() {
//     let data = '' + this.state.name + ',' + this.state.rect.x +',' + this.state.rect.y +',' +
//       + (this.state.rect.x + this.state.rect.width) + ',' + (this.state.rect.y + this.state.rect.height);
//     this.downloadFile(this.state.name + '.csv', 'data:text/csv;charset=UTF-8,' + '\uFEFF' + encodeURIComponent(data));
//   }
//   handleLoad(e) {
//     e.preventDefault();
//
//     let reader = new FileReader();
//     let self = this;
//     reader.onload = function(){
//       // console.log(reader.result);
//       let dataURL = reader.result;
//       let canvas = document.getElementsByClassName('canvas-markup')[0];
//       let context = canvas.getContext('2d');
//       let im = new Image();
//
//       im.onload = function () {
//         console.log(im.naturalHeight, im.naturalWidth);
//         console.log(screen.height, screen.width);
//         console.log(window.innerHeight, window.innerWidth);
//
//         self.state.k = 0.8 * window.innerHeight / im.naturalHeight;
//         if (im.naturalWidth * self.state.k > 0.8 * window.innerWidth) {
//           self.state.k = 0.8 * window.innerWidth / im.naturalWidth;
//         }
//         canvas.height = im.naturalHeight * self.state.k;
//         canvas.width = im.naturalWidth * self.state.k;
//         context.drawImage(im, 0, 0, canvas.width, canvas.height);
//       };
//       im.src = dataURL;
//       self.setState({ image: im });
//       // console.log(self.state.image);
//     };
//     console.log(document.getElementsByClassName('uploadImage')[0].files[0]);
//     this.state.name = document.getElementsByClassName('uploadImage')[0].files[0].name;
//     reader.readAsDataURL(document.getElementsByClassName('uploadImage')[0].files[0]);
//
//     this.forceUpdate();
//   }
//   render() {
//     return (
//       <div className='home-page'>
//         <div className='main'>
//           <div className='name'>
//             Разметка
//           </div>
//           <div className='category'>
//             Выберите категорию
//             <select>
//               <option>Не выбрано</option>
//               <option>Транспорт</option>
//               <option>Одежда</option>
//               <option>Пункт 1</option>
//               <option>Пункт 2</option>
//             </select>
//           </div>
//           <div className='markup-classes'>
//             Выберите классы разметки
//             <button>Класс 1</button>
//             <button>Класс 2</button>
//             <button>Класс 3</button>
//             <button>Класс 4</button>
//             <button>Класс 5</button>
//           </div>
//           <div className='markup-continue'>
//             <button>Продолжить</button>
//           </div>
//           <div className='image'>
//             <canvas className='canvas-markup'
//                     ref='canvasMarkup'>
//
//             </canvas>
//           </div>
//           <div className='action-btns'>
//             <div className='action-btns__block'>
//               <div className='btn-m btn-n__left'>
//                 <button className='loadImage' onClick={this.handleClick}>
//                   Загрузить
//                 </button>
//                 <input className='uploadImage'
//                        type='file'
//                        accept='image/*'
//                        name='img'
//                        style={{display: 'none'}}
//                        onChange={this.handleLoad}>
//                 </input>
//               </div>
//               <div className='btn-m btn-n__right'>
//                 <input id='btn-save__btn'
//                        type='submit'
//                        value='СОХРАНИТЬ'
//                        onClick={this.handleClickSave}>
//                 </input>
//                 <a></a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }