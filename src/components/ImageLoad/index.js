/**
 * Created by sergey on 07.08.17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import './styles.scss'
import { API_URL } from '../../constants/index';

export default class ImageLoad extends Component {
  constructor() {
    super();
    this.state = {
      numPicture: 0,
      k: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount() {

  }
  handleLoad(e) {
    e.preventDefault();

    let reader = new FileReader();
    let self = this;

    reader.onload = function () {
      // console.log(reader.result);
      let dataURL = reader.result;
      let canvas = document.getElementsByClassName('loaded-picture')[self.state.numPicture];
      let context = canvas.getContext('2d');
      let im = new Image();

      im.onload = function () {
        console.log(im.naturalHeight, im.naturalWidth);
        console.log(screen.height, screen.width);
        console.log(window.innerHeight, window.innerWidth);

        self.state.k = 0.2 * window.innerHeight / im.naturalHeight;
        if (im.naturalWidth * self.state.k > 0.2 * window.innerWidth) {
          self.state.k = 0.2 * window.innerWidth / im.naturalWidth;
        }
        canvas.height = im.naturalHeight * self.state.k;
        canvas.width = im.naturalWidth * self.state.k;
        context.drawImage(im, 0, 0, canvas.width, canvas.height);
        self.state.numPicture += 1;
        self.forceUpdate();
      };
      im.src = dataURL;
      // self.setState({ image: im });
    };
      // this.state.name = document.getElementsByClassName('uploadImage')[0].files[0].name;
    reader.readAsDataURL(document.getElementsByClassName('uploadImage')[0].files[0]);
  }
  handleClick(e) {
    e.preventDefault();
    document.getElementsByClassName('uploadImage')[0].click();
  }
  handleSend(e) {
    e.preventDefault();
    // todo send to server
  }
  loadedPicture() {
    let loadPicture = [];
    for (let i = 0; i < this.state.numPicture + 1; i += 1) {
      loadPicture.push(
        <div key={'picture' + i} className='picture-block'>
          <canvas key={'canvas' + i} className='loaded-picture'>
          </canvas>
        </div>
      );
    }
    return (
      loadPicture
    )
  }
  render() {
    return (
    <div className='home-page'>
      <div className='back'>
        <Link className='link' to='/'>Назад</Link>
      </div>
      <div className='main'>
        <div className='name'>
          Загрузка&nbsp;&nbsp; изображений
        </div>
        <div className='image-load'>
          <form action={API_URL + 'images'} method='post' formEncType='multipart/form-data'>
            Select image to upload:
            <input type='file' accept='image/*' name='fileToUpload' multiple/>
              <input type='submit' value='Upload Image' name='submit'/>
          </form>
          <div className='image-load__picture'>
            {this.loadedPicture()}
          </div>
          <div className='btns-action'>
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
            <div className='btn-right'>
              <button className='link send-image' onClick={this.handleSend}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
