<template fluid>
    <div>
        <navbar />
        <v-row>
            <h1 class="px-7 pb-7">Mes annonces</h1>
        </v-row>
        <v-expansion-panels popout v-model="panel">
            <v-expansion-panel
            v-for="(item,i) in myannounces"
            :key="i"
            >
            <v-expansion-panel-header disable-icon-rotate>
                <h3 v-if="panel==i">{{item.title}}</h3>
                <p v-else>{{item.title}}</p>
                <template v-slot:actions>
                    <div v-if="item.state==='A vendre' || item.state === 'A donner'">
                        Sur le marché
                        <v-icon 
                            class="ml-5"
                            color="teal"
                        >
                            mdi-check
                        </v-icon>
                    </div>
                    <div v-else-if="item.state==='En attente'">
                        En attente de validation
                        <v-progress-circular
                            class="ml-5"
                            :size="25"
                            :width="2"
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </div>
                    <div v-else-if="item.state==='Supprimer'">
                        Annulé
                        <v-icon 
                            color="red"
                            class="ml-5"
                        >
                            mdi-cancel
                        </v-icon>
                    </div>
                    <div v-else-if="item.state==='Vendu'">
                        Vente clôturée
                        <v-icon 
                            class="ml-5"
                        >
                            mdi-shopping-outline
                        </v-icon>
                    </div>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row>
                    <v-col xs=12 sm="3">
                        <v-img class="rounded-lg" max-height="25vh" :src="'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/'+item.liste[0]" :alt="item.title"></v-img>
                    </v-col>
                    <v-col xs=9 sm="6" align-self="center">
                        <i>{{item.description}}</i>
                    </v-col>
                    <v-col cols=3 align-self="center">
                        <v-btn elevation="0" @click="redirectToAnnounce(item._id)">
                            <span class="hidden-sm-and-down">Détails</span>
                            <v-icon>
                                mdi-link
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
    name: 'MyAnnounces',
    components: {
        Navbar
    },
    data() {
        return {
            myannounces: [],
            panel: null
        }
    },
    methods: {
        redirectToAnnounce(id) {
            this.$router.push({path:'/product/'+id})
        }
    },
    mounted() {
        this.$store.state.myannounces.then(response=>{this.myannounces=response.data})
    }
}
</script>