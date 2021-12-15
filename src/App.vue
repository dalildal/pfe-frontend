<template>
  <div id="app">
    <v-app id="inspire">
      <!-- Hardcodé en attendant -->
      <sidebar/>
      <v-main>
        <v-container fluid>
            <v-row class="fill-height">
                <v-col>
                    <transition name="fade">
                        <router-view></router-view>
                        <v-alert id="alert"></v-alert>
                    </transition>
                </v-col>
            </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
  },
};
</script>
