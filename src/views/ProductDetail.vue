<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="500">
          <v-carousel>
            <v-carousel-item
              v-for="picture in pictures"
              :key="picture"
              :src="
                'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/' +
                picture
              "
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-row class="py-5">
            <v-col v-for="picture in pictures" :key="picture">
              <v-img
                :src="
                  'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/' +
                  picture"
                width="100"
                height="100"
                style="border-radius: 5px"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
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
            <v-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis velit ut mauris hendrerit dictum. Cras vitae nibh
              consectetur, tempus dolor non, porta turpis. Aenean in ligula
              ultricies, fermentum massa non, cursus est. Nam tincidunt iaculis
              justo eget tristique. Nulla maximus sagittis interdum. Cras
              feugiat et nibh malesuada auctor. Maecenas vitae iaculis odio.
            </v-card-text>
          </v-card>
          <v-row class="pb-5">
            <v-col>
              <label>
                <gmap-autocomplete @place_changed="setPlace">
                </gmap-autocomplete>
                <button @click="addMarker">Add</button>
              </label>
              <v-card width="325">
                <gmap-map
                  :center="center"
                  :zoom="12"
                  style="width: 100%; height: 180px"
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
              <v-card height="200" width="100%">
                <v-list>
                  <v-list-item>
                    <v-list-item class="pl-0">{{
                      userProduct.name
                    }}</v-list-item>

                    <v-list-item-avatar>
                      <v-img
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list>
                <v-card-text class="pb-0">Taille: M</v-card-text>
                <v-card-text class="py-0">Marque: Gucci</v-card-text>
                <v-card-text class="py-0">Catégorie: Animal</v-card-text>
                <v-card-text class="py-0">Etat: Un peu abimé</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn class="white--text" style="background-image: linear-gradient(to top left, #0c607a, #21bfe5);" width="100%">
            contacter le vendeur
            </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios"

export default {
  name: "ProductDetail",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      pictures: [],
      currentPlace: null,
      product: null,
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
        this.currentPlace = product.address
        this.getAddress();
      });
      
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
      const address = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+
       this.currentPlace+"&key=AIzaSyCpJaV7MNO35A2RQOmuyy0cvq0mk346kVE")
      this.addMarker(address.data.results[0]);

    }
  },
  computed: {
    ...mapGetters({
      getState: "product/getState",
      getTitle: "product/getTitle",
      getDescription: "product/getDescription",
      getPrice: "product/getPrice",
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