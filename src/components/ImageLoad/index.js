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
      markup: new MarkupModel(),
      loadFiles: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    document.getElementsByClassName('uploadImage')[0].click();
  }
  handleChange(e) {
    let files = e.target.files;
    this.state.loadFiles = files;
    this.forceUpdate();
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
  imageLoad() {
    let loadedImage = [];
    if (this.state.loadFiles.length > 0) {
      loadedImage.push(
        <div className='loaded-image__title'
             key='loaded'>
          Загруженные изображения
        </div>
      );
      for (let i = 0; i < this.state.loadFiles.length; i += 1) {
        loadedImage.push(
          <div className='loaded-image__element'
               key={'image-file' + i}>
            {this.state.loadFiles[i].name}
          </div>
        );
      }
    } else {
      loadedImage.push(
        <div className='no-loaded-image'
            key='not-loaded'>
          Изображения не загружены
        </div>
      )
    }
    return (
      <div className='loaded-images'>
        {loadedImage}
      </div>
    );
  }
  render() {
    return (
    <div className='home-page'>
      <div className='back'>
        <Link className='link' to='/'>Вернуться</Link>
      </div>
      <div className='main'>
        <div className='name'>
          Загрузка&nbsp;&nbsp; изображений
        </div>
        <div className='image-load'>
          <form id='form-upload' method='post' encType='multipart/form-data' onSubmit={this.handleSubmit}>
            <div className='form-upload__title'>
              {/*Выберите изображения для загрузки:*/}
              {this.imageLoad()}
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
          </form>
        </div>
      </div>
    </div>
    )
  }
}

ImageLoad.contextTypes = {
  router: PropTypes.object.isRequired
};
