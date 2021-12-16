<template>
  <v-card elevation="0">
    <v-row style="height: 100vh">
      <v-col sm=12 md="6">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <p class="pt-2 font-weight-thin">
              Pas encore de compte ?
              <a color="#158aaf" href="/register">S'inscrire</a>
            </p>
            <h1 class="pt-14 mb-5">Bon retour chez Vinci Market</h1>
            <p class="mb-10 font-weight-thin">
              Projet dans une démarche de développement durable visant à
              promouvoir le réemploi.
            </p>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="user.email"
                label="Email vinci"
                outlined
                append-icon="mdi-account-outline"
              />
              <v-text-field
                v-model="user.password"
                label="Mot de passe"
                outlined
                type="password"
                append-icon="mdi-lock-outline"
              />
              <v-btn type="submit" block large elevation="0" color="#158aaf">
                Se connecter
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-alert
          style="position: absolute; bottom:0"
          :key="error"
          :value="error"
          shaped
          prominent
          type="error"
          transition="scale-transition"
        >
          {{error}}
      </v-alert>
      </v-col>
      <sign-up-canva class="hidden-sm-and-down" />
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import SignUpCanva from "../components/SignUpCanva.vue";
import User from "../models/user.js";
import { server } from '../helper';
// import { mapMutations } from "vuex"

export default {
  name: "Login",
  components: {
    SignUpCanva,
  },

  data() {
    return {
      user: new User("", ""),
      error: null
    };
  },

  methods: {

    async handleLogin() {
      await axios
        .post(server.baseURLProd+"user/login", this.user)
        .catch(e=>{console.log(e);this.error=e})
        .then((response) => {
          if (response.data.access_token) {
            let payload = {
              token: response.data.access_token,
              user : response.data.user
            }
            this.$store.dispatch('user/login', payload )
            this.$router.push({path:'/'})
          }
        });
    },
  },
};
</script>
