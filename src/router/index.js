import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Fonction from '../views/Fonction.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Announces from '../views/Announces.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Modo from '../views/Modo.vue'
import AddAnnounce from '../views/AddAnnounce.vue'
import MyAnnounces from '../views/MyAnnounces.vue'
import Error from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/*',
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
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
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
  },
  {
    path: '/add',
    name: 'AddAnnounce',
    component: AddAnnounce
  },
  {
    path:'/my-announces',
    name:'MyAnnounces',
    component: MyAnnounces,
  },
  { 
    path: "*", 
    name: "Error", 
    component: Error 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Assign page titles for each of the "named routes"
// Reason: This allows us to have short named routes, with descriptive title
const PAGE_TITLE = {
  "Home": "VinciMarket",
  "Announces": "VinciMarket | Annonces",
  "ProductDetail": "VinciMarket | Détails de l'annonce",
  "Login": "VinciMarket | Se connecter",
  "Register": "VinciMarket | S'enregistrer",
  "Modo": "VinciMarket | Page modérateur",
  "Add": "VinciMarket | Ajouter une annonce",
  "About": "VinciMarket | À propos de nous`",
  "Error": "VinciMarket | Error",
  "AddAnnounce": "VinciMarket | Ajouter une annonce",
  "MyAnnounces": "VinciMarket | Mes annonces"
}

router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
  console.log(toRoute, fromRoute)  // this lets you check what else is available to you here
})

export default router
