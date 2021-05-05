import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import Login from '../views/Login/Login'
import error404 from '../components/404'
import error403 from '../components/403'
import Staff from '../views/Staff/Staff.vue'
import StaffIndex from '../views/Staff/StaffIndex.vue'
import StaffCreate from '../views/Staff/StaffCreate.vue'
import StaffEdit from '../views/Staff/StaffEdit.vue'

export const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [{
    path: '',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authOnly: true
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          authOnly: true,
        }
      },
      {
        path: 'staff',
        name: 'Staff',
        component: Staff,
        meta: {
          authOnly: true,
          // QuanLyOnly: true,
        },
        children: [
          {
            path: '',
            name: 'StaffIndex',
            component: StaffIndex,
            meta: {
              authOnly: true,
              // QuanLyOnly: true,
            },
          },
          {
            path: 'create',
            name: 'StaffCreate',
            component: StaffCreate,
            meta: {
              authOnly: true,
              // QuanLyOnly: true,
            },
          },
          {
            path: '/:id/edit',
            name: 'StaffEdit',
            component: StaffEdit,
            meta: {
              authOnly: true,
              // QuanLyOnly: true,
            },
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/403',
    name: 'error403',
    component: error403,
    meta: {
      authOnly: true
    }
  },
  {
    path: '/404',
    name: 'error404',
    component: error404,
  },
  {
    path: '*',
    redirect: '/404'
  }
  ]
});
