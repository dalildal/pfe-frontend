import axios from "axios";

export default {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId'),
        lastname: null,
        name: null,
        campus: null,
        email: null,
        token: localStorage.getItem('token')
    },

    actions: {
        login({ commit }, payload) {
            commit('SET_USERINFO', payload)
        },
        logout({ commit }) {
            commit('DELETE_USERINFO')
        },
        async searchUserByToken( {commit}) {
            let response = await axios.get('http://localhost:3000/user/' + this.state.user.userId,
            { headers: {
                'Authorization': `Bearer ${this.state.user.token}`
            }})
            commit('SET_USER', response.data)
        }
    },
    mutations: {
        SET_USERINFO(state, payload ) {
            state.token = payload.token;
            state.userId = payload.user._id;
            state.name = payload.user.name
            state.lastname = payload.user.lastname
            state.campus = payload.user.campus
            state.email = payload.user.email
            
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
            
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        },
        SET_USER(state, user) {
            state.name = user.name
            state.lastname = user.lastname
            state.campus = user.campus
            state.email = user.email
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
        }
    }

}
