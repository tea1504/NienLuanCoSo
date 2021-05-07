import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'admin-lte'
import 'admin-lte/dist/css/adminlte.css'
import 'admin-lte/dist/js/adminlte.js'

import JQuery from 'jquery'
window.$ = JQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import { router } from './routes/index'
import { store } from './store/index'

import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      if (to.matched.some(record => record.meta.QuanLyOnly)) {
        if (store.getters.isQuanLy) {
          next();
        }
        else
          next({
            name: 'error403'
          })
      }
      else
        next();
    };
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (localStorage.getItem('token')) {
      next({ name: 'Home' })
    } else next();
  }
  else {
    next();
  }
})

Vue.filter('date', function (value) {
  if (!value) return '';
  var d = new Date(value);
  return d.toLocaleDateString('vi');
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
