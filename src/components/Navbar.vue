<template>
  <v-row class="pt-5 px-9">
      <v-layout class="mb-5">
        <v-form @submit.prevent="handleSearchSubmit">
        <v-text-field
          v-bind:id="windowWidth<600?'search':''"
          v-model="search"
          label="Recherche"
          placeholder="Recherche d'annonce ..."
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
        <v-menu offset-y max-Width="50vh" style="position: absolute">
          <template v-slot:activator="{on, attrs}">
              <v-badge
                bordered
                color="error"
                overlap
                class="mt-2"
                :value="notif"
                :content="notif"
              >
                <v-btn icon v-bind="attrs" v-on="on" @click="notif=0;handleNotifClick()">
                  <v-icon large>mdi-bell-outline</v-icon>
                </v-btn>
              </v-badge>
          </template>
          <v-card>
            <h2 class="pl-5 pt-2">Notifications</h2>
            <v-list two-line v-for="notification in this.notifications" :key="notification._id">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="notificationRender(notification).img" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{notificationRender(notification).title}}</v-list-item-title>
                  <v-list-item-subtitle>{{notificationRender(notification).subtitle}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mx-5"/>
            </v-list>
          </v-card>
        </v-menu>
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <div>
              <v-btn class="mt-2" plain @click.stop="drawer = !drawer" v-bind="attrs" v-on="on">
                <v-avatar>
                  <img :src="'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+getProfilPic"/>
                </v-avatar>
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
          </template>
          <span>Profile</span>
        </v-tooltip>
        </template>
        <template v-else>
          <v-btn class="mt-2" elevation="0" href="/login">
            <v-icon>
              mdi-account-outline
            </v-icon>
            <div class="hidden-sm-and-down">Se connecter</div>
          </v-btn>
        </template>
      </v-layout>
    </v-row>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Profile from './Profile.vue'
import { server } from '../helper'
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
      notif: null,
      notifications: null,
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    this.$store.state.announces.then(response => this.announces=response.data)
    this.isLoggedIn?this.$store.dispatch('user/searchUserByToken'):null
    this.notif = this.notificationsNotRead()
    this.$store.state.notifications.then(response=>this.notifications=response.data.reverse())
    this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
    notificationRender(notification) {
      let announce = this.announces.filter(a=>a.id==notification.idProduct)[0]
      return {
          title: notification.title+" - "+announce.title,
          subtitle: notification.description,
          img: 'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/'+announce.liste[0]
      }
    },
    notificationsNotRead() {
      this.$store.state.notifications.then(response=>this.notif = response.data.filter(n=>n.state===false).length);
    },
    handleNotifClick() {
      axios.patch(server.baseURLProd+"notifications/"+localStorage.getItem("userId"))
    },
    handleSearchSubmit() {
      if(this.$route.path!="/announces")
        this.$router.push({path: "/announces", query: {search: this.search.toLowerCase(), desc: this.$parent.$children[2].$props.desc}})
      else
        this.$router.replace({ query: {
          search: this.search.toLowerCase(), 
          desc: this.$parent.$children[2].$props.desc,
          campus: this.$parent.$children[2].$props.campus
        } })
        this.$parent.$data.search = this.search
        this.$parent.$children[2].$props.search = this.search
    },
    onResize() {
        this.windowWidth = window.innerWidth
    }
  },
  computed: {
    ...mapGetters({
      getName: 'user/getName',
      isLoggedIn: 'user/isLoggedIn',
      getUser: 'user/searchUserByToken',
      getProfilPic: 'user/getProfilPic'
    }),
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
        this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    }
  },
  beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
  },
}
</script>
<style>
 #search  {
    width: 2vh;
}

#search:focus {
    padding-right:80px;  
    margin-right:20vh;
    outline: none;
}

#search {
    -webkit-transition: all 0.7s ease 0s;
    -moz-transition: all 0.7s ease 0s;
    -o-transition: all 0.7s ease 0s;
    transition: all 0.7s ease 0s;
}
</style>