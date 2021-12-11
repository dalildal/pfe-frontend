import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Fonction from '../views/Fonction.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Announces from '../views/Announces.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Modo from '../views/Modo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/fonction',
    name: 'Fonction',
    component: Fonction
  },
  {
    path: '/register',
    name: 'Signin',
    component: Register
  },
  {
    path: '/login',
    name: 'Signup',
    component: Login
  },
  {
    path: '/announces',
    name: 'Announces',
    component: Announces
  },
  {
    path: '/modo',
    name: 'Modo',
    component: Modo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
