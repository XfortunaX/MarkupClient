/**
 * Created by sergey on 07.08.17.
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './styles.scss'
import { API_URL } from '../../constants/index'
import ImagesModel from '../../models/imagesModel'
import MarkupModel from '../../models/markupModel'

export default class ImageLoad extends Component {
  constructor() {
    super();
    this.state = {
      numPicture: 0,
      k: 1,
      value: '',
      images: new ImagesModel(),
      markup: new MarkupModel()
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange() {
    // let files = e.target.files;
    // this.state.images.drop();
    //
    // let self = this;
    // for (let i = 0; i < files.length; i++) { //for multiple files
    //   (function(file) {
    //     let reader = new FileReader();
    //     reader.onload = function() {
    //       self.state.images.add(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   })(files[i]);
    // }
  }
  handleSubmit(e) {
    e.preventDefault();

    let self = this;
    let form = document.getElementById('form-upload');
    let form_data = new FormData(form);
    form_data.append('category', this.state.markup.getData().category);
    let req = new XMLHttpRequest();
    req.open('POST',  API_URL + 'upload');
    req.onload = function () {
      self.context.router.push('/');
    };
    req.send(form_data);
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
          <form id='form-upload' method='post' encType='multipart/form-data' onSubmit={this.handleSubmit}>
            <div className='form-upload__title'>
              Выберите изображения для загрузки:
            </div>
            <div className='btns-action'>
              <div className='btn-left'>
                <button className='link load-image' onClick={this.handleClick}>
                  Загрузить
                </button>
                <input className='uploadImage'
                       ref='fileUpload'
                       type='file'
                       accept='image/*'
                       name='fileToUpload'
                       style={{display: 'none'}}
                       onChange={this.handleChange}
                       multiple>
                </input>
              </div>
              <div className='btn-right'>
                <input className='link' type='submit' value='Отправить' name='submit'/>
              </div>
            </div>

            {/*<input className='link'*/}
                   {/*type='file'*/}
                   {/*accept='image/*'*/}
                   {/*name='fileToUpload'*/}
                   {/*ref='fileUpload'*/}
                   {/*onChange={this.handleChange}*/}
                   {/*multiple/>*/}
              {/*<input className='link' type='submit' value='Upload Image' name='submit'/>*/}
          </form>

          {/*<div className='image-load__picture'>*/}
            {/*{this.loadedPicture()}*/}
          {/*</div>*/}

          {/*<div className='btns-action'>*/}
            {/*<div className='btn-left'>*/}
              {/*<button className='link load-image' onClick={this.handleClick}>*/}
                {/*Загрузить*/}
              {/*</button>*/}
              {/*<input className='uploadImage'*/}
                 {/*type='file'*/}
                 {/*accept='image/*'*/}
                 {/*name='img'*/}
                 {/*style={{display: 'none'}}*/}
                 {/*onChange={this.handleLoad}>*/}
              {/*</input>*/}
            {/*</div>*/}
            {/*<div className='btn-right'>*/}
              {/*<button className='link send-image' onClick={this.handleSend}>*/}
                {/*Отправить*/}
              {/*</button>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
    )
  }
}

ImageLoad.contextTypes = {
  router: PropTypes.object.isRequired
};
