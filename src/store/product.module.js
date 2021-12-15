import axios from "axios";

export default {
    namespaced: true,
    state: {
        idProduct: null,
        idUser: null,
        state: null,
        title: null,
        description: null,
        price: null,
        adress: null,
        category: null,
        products: []
    },

    actions: {
        getProducts({ commit }) {
            axios.get('http://localhost:3000/products',
                {
                    headers: {}
                }).then(response => {
                    commit('SET_PRODUCTS', response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getProductsOnHold({commit}) {
            axios.get('http://localhost:3000/products/onHold',
                {
                    headers: {}
                }).then(response => {
                    commit('SET_PRODUCTS', response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getProduct({ commit }, product) {
            return new Promise((resolve, reject) => {
                axios.get('http://localhost:3000/products/' + product)
                    .then(response => {
                        commit('SET_PRODUCT', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },

        updateProduct({commit} ,payload) {
            commit('SET_PRODUCT',payload)
            console.log(payload)
            payload.state = 'En attente'
            axios.patch('http://localhost:3000/products/' + payload._id, payload)
        }
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },

        SET_PRODUCT(state, product) {
            state.idProduct = product.idProduct
            state.idUser = product.idUser
            state.state = product.state
            state.title = product.title
            state.description = product.description
            state.price = product.price
            state.adress = product.adress
        }
    },

    getters: {
        getidProduct(state) {
            return state.idProduct
        },
        getState(state) {
            return state.state
        },
        getTitle(state) {
            return state.title
        },
        getDescription(state) {
            return state.description
        },
        getPrice(state) {
            return state.price
        },
        getAdress(state) {
            return state.adress
        }, 
        getCategory(state) {
            return state.category
        }
    }

}