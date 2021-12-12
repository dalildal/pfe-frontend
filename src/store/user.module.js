export default {
    namespaced: true,
    state: {
        userId: null,
        token: localStorage.getItem('token')
    },
    actions: {
        login( { commit }, payload ) {
            // console.log(userId)
            // console.log(token)
            console.log(payload)
            commit('SET_USER', payload )
            
        }
    },

    mutations: {
        SET_USER(state, payload ) {
            state.token = payload.token;
            state.userId = payload.userId;
            localStorage.setItem('token', payload.token)
            localStorage.setItem('userId', payload.userId)
        },
        SET_TOKEN(state, token) {
            state.token = token
        }
    },

    getters : {
        isLoggedIn(state) {
            return !!state.token
        }
    }

}
