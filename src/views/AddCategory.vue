<template>
  <div>
    <navbar />
    <v-card class="mt-10">
      <template>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="handleCategory"
          method="post"
        >
          <v-row>
            <h1 class="pa-7">Ajouter une categorie</h1>
          </v-row>
          <v-row>
            <v-col md="6" sm="12">
              <v-row class="mx-10">
                <v-col md="4" class="hidden-sm-and-down">
                  <p>Catégorie de l'annonce</p>
                </v-col>
                <v-col md="8" sm="12">
                  <v-select
                    v-model="selectedCategory"
                    :items="this.categories"
                    item-text="name"
                    item-value="id"
                    label="Catégorie"
                    outlined
                    :rules="rules"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="mx-10" v-if="this.selectedCategory != null">
                <v-col md="4" class="hidden-sm-and-down">
                  <p>Sous-catégorie de l'annonce</p>
                </v-col>
                <v-col md="8" sm="12">
                  <v-select
                    v-model="selectedSubCategory"
                    :items="
                      this.subcategories.filter(
                        (s) => s.id_categorie == selectedCategory
                      )
                    "
                    item-text="name"
                    item-value="id"
                    label="Sous-catégorie"
                    outlined
                    :rules="rules"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="text-center pa-16">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  absolute
                  bottom
                  right
                  v-bind="attrs"
                  v-on="on"
                  @click="validate"
                  :disabled="!valid"
                >
                  Confirmer
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Annonce en cours de validation
                </v-card-title>

                <v-card-text class="pt-5">
                  L'annonce a bien été envoyée. Nos modérateurs mettent tout en
                  oeuvre pour traiter votre annonce dans les plus brefs délais
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text href="/">
                    Retourner à l'accueil
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-form>
      </template>
    </v-card>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
export default {
  name: "AddCategory",
  components: {
    Navbar,
  },
  data() {
    return {
      selectedCategory: null,
      selectedSubCategory: null,
      categories: null,
      images: [],
      subcategories: null,
      rules: [(value) => !!value || "Champs obligatoire"],
      valid: true,
    };
  },
  mounted() {
    this.categories = this.$store.state.categories;
    this.subcategories = this.$store.state.subcategories;
  },
  methods: {
    handleCategory() {
      axios.post("http://localhost:3000/categories", this.user);
    },
    handleSubCategory() {
      axios.post("http://localhost:3000/subcategories", this.user);
    },
    validate() {
      console.log(this.$refs.form.validate());
      this.$refs.form.validate();
    },
  },
};
</script>