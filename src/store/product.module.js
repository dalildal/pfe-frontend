import axios from "axios";

export default {
    namespaced: true,
    state: {
        productId: null,
        state: null,
        title: null,
        description: null,
        price : null,
        adress : null,
        products : []
    },

    actions : {
        getProducts({commit}) {
            axios.get('http://localhost:3000/products', 
            { headers: {}
            }).then(response => {
                commit('SET_PRODUCTS', response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },

        async getProduct( { commit },payload) {
            //console.log(payload)
            const response = await axios.get('http://localhost:3000/products/' + payload)
            commit('SET_PRODUCT', response.data)
        }
    },

    mutations : {
        SET_PRODUCTS(state, products){
            state.products = products
        },

        SET_PRODUCT(state, product) {
            state.productId = product.productId
            state.state = product.state
            state.title = product.title
            state.description = product.description
            state.price = product.price
            state.adress = product.adress
        }
    },

    getters : {
        getProductId(state) {
            return state.productId
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
        }
    }

}