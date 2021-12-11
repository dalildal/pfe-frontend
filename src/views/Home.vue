<template>
  <div>
    <navbar />
    <v-container fluid>
      <v-row>
        <v-col md="8" lg="9">
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
                    <v-col cols=10>
                      <h1>Fil d'actualité</h1>
                    </v-col>
                    <v-col cols=2>
                      <v-btn rounded elevation="0" color=#158aaf href="/announces">Voir tout</v-btn>
                    </v-col>
                  </v-row>
                  <announces-grid :to_filter="false" />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="hidden-sm-and-down" md="4" lg="3">
          <v-container fluid>
            <v-row dense>
              <v-col>
                <v-card max-width="400" class="mx-auto">
                  <h3 class="pa-5">Mes ventes</h3>
                  <v-virtual-scroll
                    :bench="benched"
                    :items="this.announces"
                    height="250"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item two-line :key="item.id">
                        <v-list-item-avatar tile>
                          <v-img tile :src="item.src" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.desc }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-divider></v-divider>
                    </template>
                  </v-virtual-scroll>
                </v-card>
                <v-card max-width="400" class="mx-auto mt-5">
                  <h3 class="pa-5">Chats</h3>
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
    }
  },
  mounted () {
    this.$store.state.announces.then(response => (this.announces = response.data))
    this.$store.state.users.then(response => (this.users = response.data))
  },
  methods: {
    getUserAnnounce(id) {
      let user = this.users.filter(u=>u._id==id)[0]
      return user.name+" "+user.lastname
    }
  }
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
