<template>
  <div>
    <navbar />
    <v-container class="d-flex justify-center mb-5">
      <v-container>
        <v-btn elevation="0" @click="activeAnnouncesList">
              <v-icon>mdi-widgets-outline</v-icon>
              Annonces à validés
            </v-btn>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <v-btn elevation="0" @click="activeUsersList" >
              <v-icon>mdi-account-multiple</v-icon>
              Utilisateurs
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-row justify="center">
      <v-expansion-panels popout v-if="userIsActive">
        <v-expansion-panel v-for="user in users" :key="user._id">
          <v-expansion-panel-header
            >{{ user.name }}
            <div v-if="user.isActive">
              <v-chip width="10px" class="ma-2" color="green" outlined>
                Utilisateur vérifié
              </v-chip>
            </div>
            <div v-else>
              <v-chip width="10px" class="ma-2" color="red" outlined>
                Utilisateur banni
              </v-chip>
            </div>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn class="ma-2" color="red" dark @click="updateUser(user)">
              Bannir
              <v-icon dark right> mdi-cancel </v-icon>
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels popout v-else>
        <v-expansion-panel v-for="(product, index) in products" :key="product.id_announce">
          <v-expansion-panel-header
            > {{product.title}}
            <div>
              <v-chip width="10px" class="ma-2" color="red" outlined>
               annonce en attente
              </v-chip>
            </div>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="d-flex flex-row">
                <v-card-text>Posté par : {{users[index].name}} </v-card-text>
                <v-card-text>prix : {{ product.price }}</v-card-text>
                <!-- <v-card-text>descrition : {{ product.description }}</v-card-text> -->
                <v-card-text>adresse : {{ product.address }}</v-card-text> 
            <v-btn class="ma-2" color="green" dark @click="updateProduct(product)">
              Confirmé l'annonces
              <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
            </v-btn>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapState, mapActions } from "vuex";

export default {
  components: { Navbar },
  name: "Modo",

  data() {
    return {
      userIsActive : false,
      usersByProduct: []
    }
  },

  methods : {
    activeUsersList () {
      this.userIsActive = true
    },
    activeAnnouncesList () {
      this.userIsActive = false
    },

    ...mapActions({
      updateProduct : 'product/updateProduct',
      updateUser: 'user/updateUser'
    })
  },

  mounted() {
    this.$store.dispatch("user/getUsers");
    this.$store.dispatch("product/getProductsOnHold")
    .then(response => {
      const productsHold = response.data;
      for(let i = 0 ; i < productsHold.length; i++ ) {
        const user = this.$store.dispatch('user/searchUserById', productsHold[i].idUser)
        this.users.push(user)
      }
    });
  },

  computed: {
    ...mapState({
      users: state => state.user.users,
      products : state => state.product.products
    })
  },
};
</script>

<style>
</style>