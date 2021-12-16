<template :key="isLoggedIn">
  <div>
    <navbar />
    <v-container fluid>
      <v-row>
        <v-col v-bind:md="isLoggedIn?8:12" v-bind:lg="isLoggedIn?9:12">
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <v-card
                  style="background-image: linear-gradient(to top left, #0c607a, #21bfe5);"
                  elevation="0"
                  class="mb-5"
                >
                  <v-card-title>
                    <v-img max-width="50" src="../assets/home.png" />
                    <span class="text-h6 ml-5 font-weight-light white--text"
                      >Vinci Market</span
                    >
                  </v-card-title>
                  <v-card-text class="text-h5 white--text">
                    "Nous avons tous des trésor enfouis au fond de notre
                    grenier ou de nos placards. Trésors qui profiteraient à
                    d’autres. Valorisons-les en leur donnant une seconde vie."
                  </v-card-text>
                  <v-card-actions>
                    <v-list-item>
                      <v-btn
                        plain
                        target="_blank"
                        href="https://www.ecoconso.be/fr/content/pourquoi-acheter-en-seconde-main"
                      >
                        <v-list-item-avatar>
                          <v-icon>fas fa-globe</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>EcoConso.be</v-list-item-title>
                        </v-list-item-content>
                      </v-btn>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0">
                  <v-row class="pt-5 px-10">
                    <v-col>
                      <h1>Fil d'actualité</h1>
                    </v-col>
                    <v-col align-self="center">
                      <v-row justify="end">
                        <v-btn rounded elevation="0" color=#158aaf href="/announces">Voir tout</v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                  <announces-grid :desc="true"/>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="hidden-sm-and-down" md="4" lg="3" v-if="isLoggedIn">
          <v-container fluid style="position: sticky; top: 10vh" :key="isLoggedIn">
            <v-row dense>
              <v-col>
                <v-card max-width="400" class="mx-auto">
                  <v-card-title class="pa-5">
                    <v-icon>mdi-storefront-outline</v-icon>
                    <h3 class="ml-2">Mes annonces</h3>
                  </v-card-title>
                  <v-virtual-scroll
                    :bench="benched"
                    :items="this.myannounces"
                    height="250"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item two-line>
                        <v-list-item-avatar tile>
                          <v-img tile :src="'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/'+item.liste[0]" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.state }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon @click="redirectToAnnounce(item._id)">mdi-link</v-icon>
                        </v-list-item-icon>
                      </v-list-item>

                      <v-divider></v-divider>
                    </template>
                  </v-virtual-scroll>
                </v-card>
                <v-card max-width="400" class="mx-auto mt-5">
                  <v-card-title>
                    <v-icon>mdi-chat-outline</v-icon>
                    <h3 class="ml-2">Chats</h3>
                  </v-card-title>
                  <v-virtual-scroll
                    :bench="benched"
                    :items="this.users"
                    height="300"
                    item-height="70"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item two-line :key="item.id">
                        <v-list-item-avatar>
                          <v-img src="../assets/home.png" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Dernière chose de dite
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                    </template>
                  </v-virtual-scroll>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AnnouncesGrid from '../components/AnnouncesGrid.vue';
import Navbar from "../components/Navbar";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    AnnouncesGrid,
  },
  data () {
    return {
      announces: undefined,
      users: undefined,
      benched: undefined,
      hover: undefined,
      myannounces: []
    }
  },
  mounted () {
    this.$store.state.announces.then(response => (this.announces = response.data))
    this.$store.state.users.then(response => (this.users = response.data))
    this.$store.dispatch('user/searchUserByToken')
    this.$store.dispatch('user/isLoggedIn')
    this.$store.state.myannounces.then(response=>{this.myannounces=response.data})
  },
  methods: {
    getUserAnnounce(id) {
      let user = this.users.filter(u=>u._id==id)[0]
      return user.name+" "+user.lastname
    },
    redirectToAnnounce(id) {
        this.$router.push({path:'/product/'+id})
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
    })
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
