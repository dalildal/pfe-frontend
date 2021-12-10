import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    announces: [
      { id: 1, title: 'IPHONE 13 PRO MAX', desc:'petit tel pas piqué des annetons', src: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-family-hero?wid=470&hei=556&fmt=png-alpha&.v=1631220221000'},
      { id: 2, title: 'BANANE', desc:'pas encore mangée', src: 'https://media.lactualite.com/2014/08/banane-480x360.jpg'},
      { id: 3, title: 'VESTE', desc:'comme neuf', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
    ],
    users: [
      { id: 1, name: 'Chris Gaviria', src: "https://randomuser.me/api/portraits/men/78.jpg"},
      { id: 2, name: 'Dalil Rachik', src: "https://randomuser.me/api/portraits/men/78.jpg"},
      { id: 3, name: 'Filipe Manuel Cardoso Ribeiro', src: "https://randomuser.me/api/portraits/men/78.jpg"},
      { id: 4, name: 'Obey Senhaji', src: "https://randomuser.me/api/portraits/men/78.jpg"},
    ],
    notifications: [
      { id: 1, id_announce: 1, state: 'sold', to_user: 'Jean-Louis', read: false}, //normalement id user
      { id: 2, id_announce: 2, state: 'buy', to_user: 'Jospéhine', read: false},
      { id: 3, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 4, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 5, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 6, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 7, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 8, id_announce: 3, state: 'removed', to_user: null, read: false},
      { id: 9, id_announce: 3, state: 'removed', to_user: null, read: false},
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
  }
})
