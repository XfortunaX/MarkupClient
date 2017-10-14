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
      data: ''
    };
    ImagesModel.instance = this;
  }
  setData(data) {
    this.images.data = data;
  }
  sendData() {
    let headers = {
      'Content-type': 'multipart/form-data'
    };
    let data = this.images.data;
    return tt.post('user', data, headers)
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
