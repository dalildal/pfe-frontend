<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="500">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-row class="py-5">
            <v-col>
              <v-img
                src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                width="100"
                height="100"
                style="border-radius: 5px"
              ></v-img>
            </v-col>
            <v-col>
              <v-img
                src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                width="100"
                height="100"
                style="border-radius: 5px"
              ></v-img>
            </v-col>
            <v-col>
              <v-img
                src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                width="100"
                height="100"
                style="border-radius: 5px"
              ></v-img>
            </v-col>
            <v-col>
              <v-img
                src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
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
            ><v-card-text><h1>{{this.getTitle}}</h1> </v-card-text></v-card
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
          <v-row>
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
                    <v-list-item class="pl-0">Chris</v-list-item>
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
          <v-row>
            <v-col>
              <v-btn class="white--text" width="325" color="#194642"
                >contacter le vendeur
              </v-btn>
            </v-col>
            <v-col>
              <v-btn class="white--text" width="100%" color="rgb(42, 149, 141)"
                >ajouter au panier</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters} from 'vuex'

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
      currentPlace: null,
      product: null
    };
  },

  mounted() {
    this.geolocate();
    //console.log(this.$route.params);

    const payload = {
      productId : this.$route.params.pathMatch
    }
    console.log(payload)
    this.$store.dispatch('product/getProduct', payload.productId)
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },

    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
  computed: {
    ...mapGetters({
      getState : 'product/getState',
      getTitle : 'product/getTitle',
      getDescription : 'product/getDescription',
      getPrice : 'product/getPrice'
    })
  }
};
</script>

<style>
</style>