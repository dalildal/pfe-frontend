<template>
  <v-row class="pt-5 px-9">
      <v-layout class="mb-5">
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Rechercher ..."
          solo-inverted
        ></v-autocomplete>
        <v-spacer />
        <v-menu offset-y max-height="50vh" style="position: absolute">
          <template v-slot:activator="{on, attrs}">
            <v-badge
              bordered
              color="error"
              overlap
              class="mt-2"
            >
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon large>mdi-bell-outline</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <v-list two-line v-for="notification in notifications" :key="notification">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="notificationRender(notification.id).src" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{notificationRender(notification.id).title}}</v-list-item-title>
                <v-list-item-subtitle>{{notificationRender(notification.id).subtitle}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mx-5"/>
          </v-list>
        </v-menu>
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-sheet>
              <row>
                <v-btn plain height=100% @click.stop="drawer = !drawer" v-bind="attrs" v-on="on">
                  <v-avatar color=#158aaf>JV</v-avatar>
                  <span class="mx-2">Julien</span>
                  <v-icon>fas fa-caret-down</v-icon>
                </v-btn>
              </row>
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
      </v-layout>
    </v-row>
</template>

<script>
import Profile from './Profile.vue'
export default {
    name : 'Navbar',
    components: {
      Profile,
    },
    search: null,
    data: () => ({
      announces: [
        {id: 1, title: 'IPHONE 13 PRO MAX', desc:'petit tel pas piqué des annetons', src: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-family-hero?wid=470&hei=556&fmt=png-alpha&.v=1631220221000'},
        {id: 2, title: 'BANANE', desc:'pas encore mangée', src: 'https://media.lactualite.com/2014/08/banane-480x360.jpg'},
        {id: 3, title: 'VESTE', desc:'comme neuf', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
      ],
      notifications: [
        { id: 1, id_announce: 1, state: 'sold', to_user: 'Jean-Louis'}, //normalement id user
        { id: 2, id_announce: 2, state: 'buy', to_user: 'Jospéhine'},
        { id: 3, id_announce: 3, state: 'removed', to_user: null},
      ]
    }),
    methods: {
      notificationRender(i) {
        let notification = this.notifications.filter(n=>n.id==i)[0];
        let announce = this.announces.filter(c=>c.id==notification.id_announce)[0]
        return { 
          src: announce.src,
          title: notification.state=='sold'?'Article vendu':notification.state=='buy'?'Article acheté':'Article supprimé', 
          subtitle: announce.title + (notification.state=='sold'?' vendu à ':notification.state=='buy'?' acheté par ':' a été retiré de la vente')+(notification.to_user?notification.to_user:'')
        }
      }
    }
}
</script>