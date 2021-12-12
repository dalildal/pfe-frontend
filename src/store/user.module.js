import axios from "axios";

export default {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId'),
        user: null,
        token: localStorage.getItem('token')
    },

    actions: {
        login({ commit }, payload) {
            console.log(payload)
            commit('SET_USERINFO', payload)
        },
        async searchUserByToken( {commit}) {
            let response = await axios.get('http://localhost:3000/user/' + this.state.userId,
            { headers: {
                'Authorization': `Bearer ${this.state.token}`
            }})
            console.log("searchUser: " + response.data)
            commit('SET_USER', response.data)
        }
    },

    mutations: {
        SET_USERINFO(state, payload ) {
            state.token = payload.token;
            state.userId = payload.user._id;
            state.user = payload.user;
            
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userId', payload.user._id)
        },
        SET_USER(state, user) {
            state.user = user
        }
    },

    getters : {
        isLoggedIn(state) {
            return !!state.token
        },

        getUser(state) {
            return state.user
        }
    }

}
