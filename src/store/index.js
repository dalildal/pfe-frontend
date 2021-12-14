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
    users: axios.get(server.baseURLProd+'user',
      {headers: {}}
    ),
    /*notifications: [
      { id: 1, id_announce: '61b32c5d077d6f98f1d4130c', state: 'sold', to_user: 'Jean-Louis', read: false}, //normalement id user
      { id: 2, id_announce: '61b32cbe077d6f98f1d4130f', state: 'buy', to_user: 'Jospéhine', read: false},
      { id: 3, id_announce: '61b32cf5077d6f98f1d41312', state: 'removed', to_user: null, read: false},
      { id: 4, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 5, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 6, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 7, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 8, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 9, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
    ],*/
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
