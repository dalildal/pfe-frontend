<template>
    <div>
        <navbar/>
        <v-card class="mt-10">
            <template>
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <h1 class="pa-7">Ajouter une annonce</h1>
                    </v-row>
                    <v-row>
                        <v-col md="6" sm="12">
                            <v-row class="mx-10">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Titre de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-text-field
                                        v-model="title"
                                        label="Titre"
                                        outlined
                                        :rules="rules"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Description de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-textarea
                                        v-model="description"
                                        label="Description"
                                        outlined
                                        :rules="rules"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Statut de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-select
                                        v-model='selectedStatut'
                                        :items="['À donner', 'À vendre']"
                                        label="À donner/À vendre"
                                        outlined
                                        :rules="rules"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10" v-if="selectedStatut=='À vendre'">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Prix de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-text-field
                                        v-model="price"
                                        label="Prix"
                                        outlined
                                        :rules="rules"
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Catégorie de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-select
                                        v-model='selectedCategory'
                                        :items="this.categories"
                                        item-text="name"
                                        item-value="id"
                                        label="Catégorie"
                                        outlined
                                        :rules="rules"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10" v-if="this.selectedCategory!=null">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Sous-catégorie de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-select
                                        v-model='selectedSubCategory'
                                        :items="this.subcategories.filter(s=>s.idCategory==selectedCategory)"
                                        item-text="name"
                                        item-value="id"
                                        label="Sous-catégorie"
                                        outlined
                                        :rules="rules"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mx-10">
                                <v-col md="4" class="hidden-sm-and-down">
                                    <p>Adresse de l'annonce</p>
                                </v-col>
                                <v-col
                                    md="8" sm="12"
                                >
                                    <v-text-field
                                        v-model="address"
                                        label="Adresse"
                                        outlined
                                        :rules="rulesAddress"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col md="6" sm="12" align-self="center" class="px-16">
                            <template v-if="images.length>0">
                                <v-carousel :show-arrows="false" width=50%>
                                    <v-carousel-item
                                    v-for="(item,i) in images"
                                    :key="i"
                                    :src="item"
                                    ></v-carousel-item>
                                </v-carousel>
                            </template>
                            <template v-else>
                                Veuillez ajouter des images
                            </template>
                            <v-row justify="center">
                                <v-file-input 
                                    :rules="rules" 
                                    @change="handleAddImage" 
                                    v-model="addedImage" 
                                    multiple prepend-icon="mdi-camera-outline"></v-file-input>
                            </v-row>
                        </v-col>
                    </v-row>
                    <div class="text-center pa-16">
                        <v-dialog
                            v-model="dialog"
                            width="500"
                            persistent
                        >
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
                                    L'annonce a bien été envoyée. Nos modérateurs mettent tout en oeuvre pour traiter votre annonce dans les plus brefs délais
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                        href="/"
                                    >
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

<script> //titre, desc, prix, cat
import axios from 'axios'
import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import { server } from '../helper'
export default {
    name: 'AddAnnounce',
    components: {
        Navbar,
    },
    data () {
      return {
        selectedStatut: null,
        selectedCategory: null,
        selectedSubCategory: null,
        categories: null,
        subcategories: null,
        address: null,
        addedImage: undefined,
        images: [],
        rules: [
            value=>!!value||'Champs obligatoire'
        ],
        rulesAddress: [
            value=>(!!value && new RegExp('.+ [0-9]+ [0-9]+ .+').test(value))||'Doit respecter : \'rue\' \'numero\' \'code postal\' \'ville\''
        ],
        valid: true,
        title: null,
        description: null,
        price: null,
      }
    },
    mounted () {
        if(!this.isLoggedIn) this.$router.push("/")
        this.$store.state.categories.then(response=>{this.categories=response.data})
        this.$store.state.subcategories.then(response=>{this.subcategories=response.data})
    },
    methods: {
        handleAddImage() {
            this.addedImage.forEach(
                i=>this.images.push(URL.createObjectURL(i))
            )
        },
        validate() {
            console.log(this.$store.state.campus.filter(c=>c.id==this.getCampus)[0]);
            this.$refs.form.validate()
            axios.post(server.baseURLProd+"products", {
                idUser: localStorage.getItem('userId'),
                state: "En attente",
                title: this.title,
                description: this.description,
                price: this.price?this.price:0,
                idCategory: this.selectedSubCategory,
                address: this.address
            }, {headers: {}})
                .then(response=>{
                    let id = response.data.id
                    console.log(this.addedImage);
                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                    this.addedImage.forEach(i=>{
                        let fd = new FormData()
                        fd.append('file',i)
                        fd.append('userId',id);
                        axios.post(server.baseURLProd+"upload/product-images", fd, config).catch(e=>console.log(e.stack))
                    })
                })
        }

    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'user/isLoggedIn',
            getCampus: 'user/getCampus'
       }),        
    }
}
</script>