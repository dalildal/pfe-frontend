import axios from "axios";
import {server} from "../helper"

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
        is_admin : null,
        url_profil_pic: null,
        userProduct : [],
        users: [],
        userUpdate: null
    },

    actions: {
        getUsers({commit}) {
            axios.get(server.baseURLProd+'user')
            .then(response => {
                console.log(response.data);
                commit('SET_USERS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        login({ commit }, payload) {
            commit('SET_USERINFO', payload)
        },
        logout({ commit }) {
            commit('DELETE_USERINFO')
        },
        async searchUserByToken( {commit}) {
            const response = await axios.get(server.baseURLProd+'user/' + this.state.user.userId,
            { headers: {
                'Authorization': `Bearer ${this.state.user.token}`
            }})
            commit('SET_USER', response.data)
        },

        searchUserById( {commit}, idUserProduct) {
            axios.get(server.baseURLProd+'user/' + idUserProduct)
            .then(response => {
                commit('SET_USERPRODUCT', response.data)
            })
            .catch(error => {
                console.log(error);
            })
        },

        updateUser({commit} ,payload) {
            commit('SET_USER_TO',payload)
            axios.patch(server.baseURLProd+'user/' + payload._id + "/isactive")
            .then(() => {
                this.state.users;
            })
        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },

        SET_USER_TO(state, user) {
            state.userUpdate = user._id
        },

        SET_USERPRODUCT(state, userProduct) {
            state.userProduct = userProduct
        },

        SET_USERINFO(state, payload ) {
            state.token = payload.token;
            state.userId = payload.user._id;
            state.name = payload.user.name
            state.lastname = payload.user.lastname
            state.campus = payload.user.campus
            state.email = payload.user.email
            state.is_admin = payload.user.is_admin
            state.url_profil_pic = payload.user.url_profil_pic
            
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userId', payload.user._id)
        },
        DELETE_USERINFO(state) {
            state.token = null;
            state.userId = null;
            state.name = null;
            state.lastname = null;
            state.campus = null;
            state.email = null;
            state.url_profil_pic = null
            
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        },
        SET_USER(state, user) {
            state.name = user.name
            state.lastname = user.lastname
            state.campus = user.campus
            state.email = user.email
            state.is_active = user.is_active
            state.is_admin = user.is_admin
            state.url_profil_pic = user.url_profil_pic
        }
    },
    getters : {
        isLoggedIn(state) {
            return !!state.token
        },
        getId(state) {
            return state.userId
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
        },
        getProfilPic(state) {
            return state.url_profil_pic
        },
        isAdmin(state) {
            return state.is_admin
        }
    }

}
