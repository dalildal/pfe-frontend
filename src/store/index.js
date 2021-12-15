import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import {server} from '../helper'
import userModule from './user.module'
import productModule from './product.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    announces: axios.get(
      server.baseURLProd+'products',
      {headers: {}}
    ),
    myannounces: axios.get(
      server.baseURLProd+'products/productsUser/'+localStorage.getItem('userId'),
      {headers: {}}
    ),
    users: axios.get(server.baseURLProd+'user',
      {headers: {}}
    ),
    notifications: axios.get(server.baseURLProd+"notifications/"+userModule.state.userId,
    {headers: {}}),
    campus: [
      {id: 0, name: 'Woluwe-Saint-Lambert'}, 
      {id: 1, name: 'Ixelles'},
      {id: 2, name: 'Louvain-La-Neuve'}
    ],
    categories: axios.get(
      server.baseURLProd+'categories',
      {headers: {}}
    ),
    subcategories: axios.get(
      server.baseURLProd+'subcategories',
      {headers: {}}
    )
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user : userModule,
    product : productModule
  }
})
