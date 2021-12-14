<template>
  <v-row class="pt-5 px-9">
      <v-layout class="mb-5">
        <v-form @submit.prevent="handleSearchSubmit">
        <v-text-field
          v-model="search"
          label="Recherche"
          placeholder="Recherche d'annonce"
          outlined
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        </v-form>
        <v-spacer />
        <template v-if="this.isLoggedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }"
              class="pt-5">
            <v-btn
              elevation="0"
              v-bind="attrs"
              v-on="on"
              large
              class="mx-5 pt-2"
              icon
              href="/add"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Ajouter une annonce</span>
        </v-tooltip>
        <v-menu offset-y max-height="50vh" style="position: absolute">
          <template v-slot:activator="{on, attrs}">
              <v-badge
                bordered
                color="error"
                overlap
                class="mt-2"
                :value="notif"
                :content="notificationsNotRead()"
              >
                <v-btn icon v-bind="attrs" v-on="on" @click="notif=0;handleNotifClick()">
                  <v-icon large>mdi-bell-outline</v-icon>
                </v-btn>
              </v-badge>
          </template>
          <v-card>
            <h2 class="pl-5 pt-2">Notifications</h2>
            <v-list two-line v-for="notification in this.$store.state.notifications" :key="notification.id">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="../assets/home.png" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{notificationRender(notification.id).title}}</v-list-item-title>
                  <v-list-item-subtitle>{{notificationRender(notification.id).subtitle}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mx-5"/>
            </v-list>
          </v-card>
        </v-menu>
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-sheet>
              <div>
                <v-btn plain height=100% @click.stop="drawer = !drawer" v-bind="attrs" v-on="on">
                  <v-avatar color=#158aaf></v-avatar>
                  <span class="mx-2">{{getName}}</span>
                  <v-icon>fas fa-caret-down</v-icon>
                </v-btn>
              </div>
              <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right
                width=300
              >
                <profile />
              </v-navigation-drawer>
            </v-sheet>
          </template>
          <span>Profile</span>
        </v-tooltip>
        </template>
        <template v-else>
          <v-btn class="mt-2" elevation="0" href="/login">
            <v-icon>
              mdi-account-outline
            </v-icon>
            Se connecter
          </v-btn>
        </template>
      </v-layout>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from './Profile.vue'
export default {
  name : 'Navbar',
  components: {
    Profile,
  },
  data () {
    return {
      drawer: undefined,
      select: undefined,
      search: undefined,
      loading: undefined,
      announces: [],
      notif: [],
    }
  },
  mounted () {
    this.$store.state.announces.then(response => this.announces=response.data)
    this.isLoggedIn?this.$store.dispatch('user/searchUserByToken'):null
  },
  methods: {
    notificationRender(i) {
      let notification = this.$store.state.notifications.filter(n=>n.id==i)[0];
      let announce = this.announces.filter(c=>c.id==notification.id_announce)[0]
      return { 
        src: "../assets/home.png",
        title: notification.state=='sold'?'Article vendu':notification.state=='buy'?'Article acheté':'Article supprimé', 
        subtitle: announce.title + (notification.state=='sold'?' vendu à ':notification.state=='buy'?' acheté par ':' a été retiré de la vente')+(notification.to_user?notification.to_user:'')
      }
    },
    notificationsNotRead() {
      return this.$store.state.notifications.filter(n=>n.read==false).length;
    },
    handleNotifClick() {
      this.$store.state.notifications.forEach(n=>n.read=true)
    },
    handleSearchSubmit() {
      if(this.$route.path!="/announces")
        this.$router.push({path: "/announces", query: {search: this.search, desc: this.$parent.$children[2].$props.desc}})
      else
        this.$router.replace({ query: {
          search: this.search, 
          desc: this.$parent.$children[2].$props.desc,
          campus: this.$parent.$children[2].$props.campus
        } })
        this.$parent.$data.search = this.search
        this.$parent.$children[2].$props.search = this.search
    }
  },
  computed: {
    ...mapGetters({
      getName: 'user/getName',
      isLoggedIn: 'user/isLoggedIn'
    })
  }
}
</script>