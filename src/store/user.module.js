import axios from "axios";

export default {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId'),
        lastname: null,
        name: null,
        campus: null,
        email: null,
        token: localStorage.getItem('token'),
        is_active: null,
        userProduct : [],
        users: []
    },

    actions: {
        getUsers({commit}) {
            axios.get('http://localhost:3000/user')
            .then(response => {
                commit('SET_USERS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        login({ commit }, payload) {
            commit('SET_USERINFO', payload)
        },
        async searchUserByToken( {commit}) {
            const response = await axios.get('http://localhost:3000/user/' + this.state.user.userId,
            { headers: {
                'Authorization': `Bearer ${this.state.user.token}`
            }})
            commit('SET_USER', response.data)
        },

        searchUserById( {commit}, idUserProduct) {
            axios.get('http://localhost:3000/user/' + idUserProduct)
            .then(response => {
                commit('SET_USERPRODUCT', response.data)
                
            })
            .catch(error => {
                console.log(error);
            })
        },

        updateUser({commit} ,payload) {
            commit('SET_USER',payload)
            console.log(payload)
            payload.is_active = true
            axios.put('http://localhost:3000/user/' + payload._id, payload)
        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },

        SET_USERPRODUCT(state, userProduct) {
            state.userProduct = userProduct
        },

        SET_USERINFO(state, payload ) {
            state.token = payload.token;
            state.userId = payload.user._id;
            state.user = payload.user;
            
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userId', payload.user._id)
        },
        SET_USER(state, user) {
            state.name = user.name
            state.lastname = user.lastname
            state.campus = user.campus
            state.email = user.email
            state.is_active = user.is_active
        }
    },
    getters : {
        isLoggedIn(state) {
            return !!state.token
        },

        getLastName(state) {
            return state.lastname
        },
        getName(state) {
            return state.name
        },
        getEmail(state) {
            return state.email
        },
        getCampus(state) {
            return state.campus
        },
        getUserList(state) {
            return state.users
        }
    }

}
