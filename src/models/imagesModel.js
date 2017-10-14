/**
 * Created by sergey on 12.10.17.
 */
import Transport from '../modules/network/transport';

const tt = new Transport();

export default class ImagesModel {

  constructor() {
    if (ImagesModel.instance) {
      return ImagesModel.instance;
    }
    this.images = {
      data: []
    };
    ImagesModel.instance = this;
  }
  drop() {
    this.images.data = [];
  }
  add(image) {
    this.images.data.push(image);
    console.log(this.images.data);
  }
  sendData() {
    let headers = {
      'Content-type': 'application/json'
    };
    let data = this.images.data;
    console.log(data);
    return tt.post('upload', data, headers)
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
}
