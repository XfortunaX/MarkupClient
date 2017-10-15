/**
 * Created by sergey on 12.10.17.
 */
import Transport from '../modules/network/transport';

const tt = new Transport();

export default class MarkupModel {

  constructor() {
    if (MarkupModel.instance) {
      return MarkupModel.instance;
    }
    this.markup = {
      category: '',
      classes: [],
      activeClass: 0
    };
    MarkupModel.instance = this;
  }
  isSelect() {
    if (this.markup.classes.length > 0) {
      return true;
    }
    return false;
  }
  getData() {
    return this.markup;
  }
  drop() {
    this.markup.category = '';
    this.markup.classes = [];
    this.markup.activeClass = 0;
  }
  setData(data) {
    console.log(data);
    this.markup.category = data.category;
    for (let i = 0; i < data.classes.length; i += 1) {
      this.markup.classes[i] = data.classes[i];
    }
    console.log(this.markup);
  }
  dropActive() {
    this.markup.activeClass = 0;
  }
  changeActive(direction) {
    if (direction === 'left' && this.markup.activeClass - 1 > -1 ) {
      this.markup.activeClass -= 1;
    } else if (direction === 'right' && this.markup.activeClass + 1 < this.markup.classes.length) {
      this.markup.activeClass += 1;
    }
    console.log(this.markup.activeClass);
  }
  sendData(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('category', data, headers)
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
}
