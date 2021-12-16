<template>
  <div>
    <navbar />
    <v-container>
      <v-row>
        <v-col sm="12" md="6">
          <v-card>
            <v-carousel>
              <v-carousel-item
                v-for="picture in getListe"
                :key="picture"
                :src="
                  'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/' +
                  picture
                "
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
            <v-row class="py-5 hidden-sm-and-down">
              <v-col v-for="picture in getListe" :key="picture">
                <v-img
                  :src="
                    'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/' +
                    picture
                  "
                  width="100"
                  height="100"
                  style="border-radius: 5px"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col sm="12" md="6">
          <v-container>
            <v-card
              elevation="0"
              class="mb-12"
              height="50"
              width="100%"
              color="#E5F7F6"
              ><v-card-text
                ><h1>{{ this.getTitle }}</h1>
              </v-card-text></v-card
            >
            <v-card class="mb-12" width="100%">
              <v-card-title>Information</v-card-title>
              <v-card-text>
                {{this.getDescription}}
              </v-card-text>
            </v-card>
            <v-row class="pb-5">
              <v-col cols="12">
                <v-card>
                  <v-card-text>{{ this.currentPlace }}</v-card-text>
                  <gmap-map
                    :center="center"
                    :zoom="12"
                    style="height: 180px"
                  >
                    <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      @click="center = m.position"
                    ></gmap-marker>
                  </gmap-map>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="200">
                  <v-list>
                    <v-list-item>
                      <v-list-item class="pl-0">{{
                        userProduct.name+" "+userProduct.lastname
                      }}</v-list-item>

                      <v-list-item-avatar>
                        <v-img
                          :src="'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+userProduct.url_profil_pic"
                        ></v-img>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-list>
                  <v-card-text class="pb-0">
                    Prix: {{ product.price }}€
                  </v-card-text>
                  <v-card-text class="py-0"
                    >Article : {{ product.title }}
                  </v-card-text>
                  <v-card-text class="py-0"
                    >Etat: {{ product.state }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
              height="200"
              v-if="userProduct._id!=getUserId"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  width="100%"
                  style="background-image: linear-gradient(to top left, #0c607a, #21bfe5);"
                  >contacter le vendeur</v-btn
                >
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar
                    style="background-image: linear-gradient(to top left, #0c607a, #21bfe5);"
                    dark
                    >Contacte</v-toolbar
                  >
                  <v-card-text>
                    <div class="text-h6 pa-12">
                      Vous pouvez contacter le vendeur par email :
                      <a :href="'mailto:'+userProduct.email">{{userProduct.email}}</a>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <v-btn
              v-else
              color="primary"
              v-bind="attrs"
              v-on="on"
              width="100%"
              style="background-image: linear-gradient(to top left, #0c607a, #21bfe5);"
              @click="clotureProduct(product)"  
            >Clôturer l'annonce
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import Navbar from "../components/Navbar.vue"

export default {
  name: "ProductDetail",
  components: {
    Navbar
  },
  
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      pictures: [],
      currentPlace: null,
    };
  },

  mounted() {
    const productPath = {
      productId: this.$route.params.pathMatch,
    };
    this.$store
      .dispatch("product/getProduct", productPath.productId)
      .then((response) => {
        const product = response.data;
        this.$store.dispatch("user/searchUserById", product.idUser);
        //this.pictures = product.liste;
        this.currentPlace = product.address;
        this.getAddress();
      });
      console.log(this.product);
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(address) {
      if (address) {
        console.log(address);
        console.log(address.geometry.location);
        const marker = {
          lat: address.geometry.location.lat,
          lng: address.geometry.location.lng,
        };
        this.markers.push({ position: marker });
        this.places.push(address);
        this.center = marker;
        //this.currentPlace = null;
      }
    },

    async getAddress() {
      const address = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          this.currentPlace +
          "&key=AIzaSyCpJaV7MNO35A2RQOmuyy0cvq0mk346kVE"
      );
      this.addMarker(address.data.results[0]);
    },
    ...mapActions({
      clotureProduct: 'product/clotureProduct'
    })
  },
  computed: {
    ...mapGetters({
      getState: "product/getState",
      getTitle: "product/getTitle",
      getDescription: "product/getDescription",
      getPrice: "product/getPrice",
      getListe: "product/getListe",
      getUserId: "user/getId"
    }),

    ...mapState({
      userProduct: (state) => state.user.userProduct,
      product: (state) => state.product,
    }),
  },
};
</script>

<style>
</style>