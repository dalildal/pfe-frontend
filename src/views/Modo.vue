<template>
  <div>
    <navbar />
    <v-container class="d-flex justify-center mb-5">
      <v-btn class="mr-5">
        <v-list-item>
          <v-list-icon>
            <v-icon>mdi-widgets-outline</v-icon>
          </v-list-icon>
          <v-list-item-title> Annonces </v-list-item-title>
          <v-list-item-subtitle> 50 annonces à validés </v-list-item-subtitle>
        </v-list-item>
      </v-btn>
      <v-container>
          <v-row>
              <v-col>
                  <v-btn elevation="0">
                      <v-icon>mdi-widgets-outline</v-icon>
                  </v-btn>
              </v-col>
                <v-container>
                    Annonces
                </v-container>
              <v-col>
                  
              </v-col>
          </v-row>
      </v-container>
    </v-container>
    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>Item</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: { Navbar },
  name: "Modo",
};
</script>

<style>
</style>