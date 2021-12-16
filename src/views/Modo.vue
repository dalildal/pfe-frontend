<template>
  <div>
    <navbar />
    <v-container class="mb-5">
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn elevation="0" @click="activeAnnouncesList">
            <v-icon>mdi-widgets-outline</v-icon>
            Annonces à valider
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn elevation="0" @click="activeUsersList">
            <v-icon>mdi-account-multiple</v-icon>
            Utilisateurs
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn elevation="0" @click="activeCategoryList">
            <v-icon>
              mdi-shape-outline
            </v-icon>
            Catégories
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-expansion-panels popout v-if="userIsActive">
        <v-expansion-panel v-for="user in users" :key="user._id">
          <v-expansion-panel-header
            >{{ user.name }}
            <div v-if="user.is_active">
              <v-chip width="10px" class="ma-2" color="green" outlined>
                Utilisateur vérifié
              </v-chip>
            </div>
            <div v-else>
              <v-chip width="10px" class="ma-2" color="red" outlined>
                Utilisateur banni
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="d-flex flex-row">
              <v-row>
              <v-col>
              <v-card-text class="d-flex justify-center align-center">
                <v-avatar>
                <v-img :src="'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+user.url_profil_pic"></v-img>
                </v-avatar>
              </v-card-text>
              </v-col>
              <v-col>
              <v-card-text>Nom : {{user.name + user.lastname}} </v-card-text>
              </v-col>
              <v-col>
              <v-card-text>email : {{user.email}}</v-card-text>
              </v-col>
              <v-col>
              <v-card-text>campus : {{user.campus}}</v-card-text>
              </v-col>
              <v-col>
              <v-btn
                v-if="user.is_active"
                class="ma-2"
                color="red"
                dark
                @click="updateUser(user)"
              >
                Bannir compte
                <v-icon dark right> mdi-cancel </v-icon>
              </v-btn>
              <v-btn
                v-else
                class="ma-2"
                color="green"
                dark
                @click="updateUser(user)"
              >
                Activer compte
                <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
              </v-btn>
              </v-col>
              </v-row>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels popout v-else-if="announceIsActive">
        <v-expansion-panel
          v-for="(product, index) in products"
          :key="product.id_announce"
        >
          <v-expansion-panel-header>
            {{ product.title }}
            <div>
              <v-chip width="10px" class="ma-2" color="red" outlined>
                annonce en attente
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col xs="12" sm="3">
                <v-img class="rounded-lg" :src="'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/'+product.liste[0]"></v-img>
              </v-col>
              <v-col xs="12" sm="9" align-self="center">
                <p>{{product.description}}</p>
              </v-col>
            </v-row>
            <v-row>
            <v-card width="100%" class="d-flex flex-row">
              <v-card-text>Posté par : {{ users[index].name+" "+users[index].lastname }} </v-card-text>
              <v-card-text>prix : {{ product.price }}</v-card-text>
              <!-- <v-card-text>descrition : {{ product.description }}</v-card-text> -->
              <v-card-text>adresse : {{ product.address }}</v-card-text>
              <v-col>
                <v-btn
                class="ma-2"
                color="green"
                dark
                @click="acceptProduct(product)"
              >
                <div class="hidden-sm-and-down">Confirmer l'annonce</div>
                <v-icon dark> mdi-checkbox-marked-circle </v-icon>
              </v-btn>
                <v-btn
                class="ma-2"
                color="red"
                dark
                @click="removeProduct(product)"
              >
                <div class="hidden-sm-and-down">Annuler l'annonce</div>
                <v-icon dark> mdi-cancel </v-icon>
              </v-btn>
              </v-col>
            </v-card>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card width="95%" class="mx-5" v-if="categoryIsActive">
        <v-row class="ma-5" justify="start">
          <h1>Ajouter une catégorie</h1>
        </v-row>
        <v-form ref="form" v-model="validCat">
        <v-row class="ma-5">
          <v-col xs="12" md="4">
            <v-select
                v-model='selectedCategory'
                :items="this.categories"
                item-text="name"
                item-value="id"
                label="Catégorie"
                outlined
            ></v-select>
          </v-col>
          <v-col xs="6" md="4">
            <v-text-field
                v-model="category"
                label="Nom de la catégorie"
                outlined
                :rules="rules"
            ></v-text-field>
          </v-col>
          <v-col xs="6" md="4">
            <v-btn 
              @click="addCategory"
              :disabled="!validCat">
              <v-icon>mdi-plus</v-icon>
              Ajouter une catégorie
            </v-btn>
          </v-col>
        </v-row>
        </v-form>
        <v-form ref="form" v-model="validSub">
        <v-row v-if="selectedCategory" class="ma-5">
          <v-col sm="12" md="4">
            <v-select
                v-model='selectedSubCategory'
                :items="this.subcategories.filter(s=>s.idCategory==selectedCategory)"
                item-text="name"
                item-value="id"
                label="Sous catégorie"
                outlined
            ></v-select>
          </v-col>
          <v-col sm="6" md="4">
            <v-text-field
                v-model="subcategory"
                label="Nom de la sous-catégorie"
                outlined
                :rules="rules"
            ></v-text-field>
          </v-col>
          <v-col sm="6" md="4">
            <v-btn 
              @click="addSubCategory"
              :disabled="!validSub">
              <v-icon>mdi-plus</v-icon>
              Ajouter une sous catégorie
            </v-btn>
          </v-col>
        </v-row>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import { mapState, mapActions } from "vuex";
import { server } from '../helper';
import axios from 'axios';

export default {
  components: { Navbar },
  name: "Modo",

  data() {
    return {
      userIsActive: false,
      announceIsActive: true,
      categoryIsActive: false,
      usersByProduct: [],
      categories: [],
      subcategories: [],
      selectedCategory: null,
      selectedSubCategory: null,
      category: null,
      subcategory: null,
      validCat: true,
      validSub: true,
      rules: [
        value=>(!!value && new RegExp('[A-Z]{1}.+').test(value))||'Doit commencer par une majuscule'
      ]
    };
  },

  methods: {
    activeUsersList() {
      this.userIsActive = true;
      this.announceIsActive = false;
      this.categoryIsActive = false;
    },
    activeAnnouncesList() {
      this.userIsActive = false;
      this.announceIsActive = true;
      this.categoryIsActive = false;
    },
    activeCategoryList() {
      this.userIsActive = false;
      this.announceIsActive = false;
      this.categoryIsActive = true;
    },
    ...mapActions({
      acceptProduct: "product/acceptProduct",
      removeProduct: "product/removeProduct",
      updateUser: "user/updateUser",
    }),
    addCategory() {
      console.log(this.category);
      axios.post(server.baseURLProd+"categories", {name: this.category}, 
      {headers: {'Authorization': `Bearer ${this.user}`}})
    },
    addSubCategory() {
      console.log(this.subcategory);
      axios.post(server.baseURLProd+"subcategories", {idCategory: this.selectedCategory, name: this.subcategory}, 
      {headers: {'Authorization': `Bearer ${this.user}`}})
    }
  },

  mounted() {
    this.$store.dispatch("user/getUsers");
    this.$store.dispatch("product/getProductsOnHold").then((response) => {
      const productsHold = response.data;
      for (let i = 0; i < productsHold.length; i++) {
        const user = this.$store.dispatch(
          "user/searchUserById",
          productsHold[i].idUser
        );
        this.users.push(user);
      }
    });
    this.$store.state.categories.then(response=>{this.categories=response.data})
        this.$store.state.subcategories.then(response=>{this.subcategories=response.data})
  },

  computed: {
    ...mapState({
      users: (state) => state.user.users,
      products: (state) => state.product.products,
      user: (state) => state.user.token
    }),
  },
};
</script>

<style>
</style>