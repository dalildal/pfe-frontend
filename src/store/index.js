import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import {server} from '../helper'
import userModule from './user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    announces: axios.get(
      server.baseURLProd+'products',
      {headers: {}}
    ),
    users: axios.get(server.baseURLDev+'user',
      {headers: {}}
    ),
    notifications: [
      { id: 1, id_announce: '61b32c5d077d6f98f1d4130c', state: 'sold', to_user: 'Jean-Louis', read: false}, //normalement id user
      { id: 2, id_announce: '61b32cbe077d6f98f1d4130f', state: 'buy', to_user: 'Jospéhine', read: false},
      { id: 3, id_announce: '61b32cf5077d6f98f1d41312', state: 'removed', to_user: null, read: false},
      { id: 4, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 5, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 6, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 7, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 8, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
      { id: 9, id_announce: '61b32da6077d6f98f1d41319', state: 'removed', to_user: null, read: false},
    ],
    campus: ["Woluwe-Saint-Lambert", "Ixelles","Louvain-La-Neuve"],
    categories: [
        {id: 1, name: 'Maison & Jardin'},
        {id: 2, name: 'Famille'},
        {id: 3, name: 'Vêtements & Accessoires'},
        {id: 4, name: 'Loisirs & Hobbys'},
        {id: 5, name: 'Électronique'},
        {id: 6, name: 'Autres'}
    ],
    subcategories: [
        {id_categorie: 1, name: 'Outils'},
        {id_categorie: 1, name: 'Meubles'},
        {id_categorie: 1, name: 'Pour la maison'},
        {id_categorie: 1, name: 'Jardin'},
        {id_categorie: 1, name: 'Électroménager'},
        {id_categorie: 2, name: 'Santé & Beauté'},
        {id_categorie: 2, name: 'Fournitures pour animaux'},
        {id_categorie: 2, name: 'Puériculture et enfants'},
        {id_categorie: 2, name: 'Jouets & Jeux'},
        {id_categorie: 3, name: 'Sacs & Bagages'},
        {id_categorie: 3, name: 'Vêtements & chaussures femmes'},
        {id_categorie: 3, name: 'Vêtements & chaussures hommes'},
        {id_categorie: 3, name: 'Bijoux & Accessoires'},
        {id_categorie: 4, name: 'Vélos'},
        {id_categorie: 4, name: 'Loisirs créatifs'},
        {id_categorie: 4, name: 'Pièces auto'},
        {id_categorie: 4, name: 'Sports & Activités d\'extérieures'},
        {id_categorie: 4, name: 'Jeux Vidéo'},
        {id_categorie: 4, name: 'Livres, films & musiques'},
        {id_categorie: 4, name: 'Instruments de musique'},
        {id_categorie: 4, name: 'Antiquité & Objets de collection'},
        {id_categorie: 5, name: 'Électronique & Ordinateurs'},
        {id_categorie: 5, name: 'Téléphones mobiles'},
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user : userModule
  }
})
