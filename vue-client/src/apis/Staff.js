import Api from './Api'
export default {
  index() {
    return Api().get('/staff');
  },
  create(form){
    return Api().post('/staff', form);
  }
}