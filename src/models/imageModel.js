/**
 * Created by sergey on 12.10.17.
 */
import Transport from '../modules/network/transport';

const tt = new Transport();

export default class ImageModel {

  constructor() {
    if (ImageModel.instance) {
      return ImageModel.instance;
    }
    this.image = {
      url: '',
      id: '',
      srcImage: '',
      k: 1,
      markup: [],
      markup_category: '',
      markup_colour: '#000000'
    };
    ImageModel.instance = this;
  }
  drop() {
    this.image.url = '';
    this.image.id = '';
    this.image.markup = [];
    this.image.srcImage = '';
  }
  dropMarkup() {
    this.image.markup = [];
  }
  getMarkup(markup_class) {
    for (let i = 0; i < this.image.markup.length; i += 1) {
      if (this.image.markup[i].markup_class === markup_class) {
        return this.image.markup[i];
      }
    }
  }
  getData() {
    return this.image;
  }
  setData(data) {
    this.image.srcImage = data.srcImage;
    this.image.k = data.k;
    this.image.markup_category = data.markup_category;
  }
  setMarkup(markup) {
    for (let i = 0; i < this.image.markup.length; i += 1) {
      if (this.image.markup[i].markup_class === markup.markup_class) {
        this.image.markup[i].area = {
          x1: markup.area.x1,
          y1: markup.area.y1,
          x2: markup.area.x2,
          y2: markup.area.y2
        };
        return;
      }
    }
    this.image.markup.push({
      area: {
        x1: markup.area.x1,
        y1: markup.area.y1,
        x2: markup.area.x2,
        y2: markup.area.y2
      },
      markup_class: markup.markup_class
    });
  }
  sendData(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('markup', data, headers)
      .then(function (data) {
        if (data !== false) {
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
  getImage(data) {
    const self = this;
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('image', data, headers)
      .then(function (data) {
        if (data !== false) {
          self.image.url = data.url;
          self.image.id = data.id;
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
}
