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
      srcImage: '',
      k: 1,
      markup: [],
      markup_category: '',
      markup_colour: '#000000'
    };
    ImageModel.instance = this;
  }
  getData() {
    return this.image;
  }
  setData(data) {
    console.log(data.srcImage);
    this.image.srcImage = data.srcImage;
    this.image.k = data.k;
    this.image.markup_category = data.markup_category;
  }
  setMarkup(markup) {
    console.log(markup);
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
    console.log(this.image.markup);
  }
  sendData(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    console.log(data);
    return tt.post('markup', data, headers)
      .then(function (data) {
        if (data !== false) {
          console.log(data);
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
  getImage() {
    const self = this;
    return tt.get('image', {})
      .then(function (data) {
        console.log(data);
        self.image.src = data.src;

        // self.image = data;
        //
        // let canvas = document.getElementsByClassName('canvas-markup')[0];
        // let context = canvas.getContext('2d');
        // let im = new Image();
        //
        // im.onload = function () {
        //   console.log(im.naturalHeight, im.naturalWidth);
        //   console.log(screen.height, screen.width);
        //   console.log(window.innerHeight, window.innerWidth);
        //   canvas.height = im.naturalHeight;
        //   canvas.width = im.naturalWidth;
        //   context.drawImage(im, 0, 0, im.naturalWidth, im.naturalHeight);
        // };
        // im.src = data.imgData;

        return true;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
}
