<template>
    <v-toolbar class="mt-2"
        app
        fixed
        elevation=0
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        style="z-index: 1"
    >
        <v-row class="px-5 pt-5 mr-2">
            <v-select
                v-model="selectedCampus"
                :items="campus"
                label="Campus"
                multiple
                prepend-inner-icon=mdi-school-outline
                @change="editFilter()"
            >
                <template v-slot:prepend-item>
                    <v-list-item
                        ripple
                        @click="toggle"
                    >
                        <v-list-item-action>
                            <v-icon :color="selectedCampus.length > 0 ? 'indigo darken-4' : ''">
                            {{ icon }}
                            </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                            Tout sélectionner
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                </template>
                <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>
                    <v-list-item disabled>
                    <v-list-item-avatar color="grey lighten-3">
                        <v-icon>
                        mdi-school-outline
                        </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content v-if="likesAllCampus">
                        <v-list-item-title>
                        Tous les campus sont sélectionnés
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content v-else-if="likesSomeCampus">
                        <v-list-item-title>
                        {{selectedCampus.length}} campus sélectionnés
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content v-else>
                        <v-list-item-title>
                        Aucun campus sélectionné
                        </v-list-item-title>
                        <v-list-item-subtitle>
                        Sélectionnez un campus!
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-select>
        </v-row>
        <v-toolbar-items class="hidden-sm-and-down" v-for="category in categories" :key="category.id">
            <v-hover v-slot="{ hover }">
                <div>
                    <v-btn tile height=100% elevation="0">{{category.name}}</v-btn>
                    <v-expand-transition>
                        <v-card v-if="hover" style="position: absolute; z-index: 1000">
                            <v-list v-for="subcategory in catSub(category.id)" :key="subcategory.id_categorie">
                                <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{subcategory.name}}</v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-expand-transition>
                </div>
               
            </v-hover>
        </v-toolbar-items>
        <v-menu class="hidden-md-and-up">
            <v-icon>mdi-menu</v-icon>
            <v-list>
                <v-list-tile v-for="category in categories" :key="category.id">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import axios from "axios";
export default {
    name: 'CategoryBar',
    data: () => ({
        campus: ["Woluwe-Saint-Lambert", "Ixelles","Louvain-La-Neuve"],
        selectedCampus: [],
        categories: [
            {id: 1, name: 'Maison & Jardin'},
            {id: 2, name: 'Famille'},
            {id: 3, name: 'Vêtements & Accessoires'},
            {id: 4, name: 'Loisirs & Hobbys'},
            {id: 5, name: 'Électronique'},
            {id: 6, name: 'Autres'}
        ],
        subcategories: [
            {id_categorie: 1, name: 'Outils'},
            {id_categorie: 1, name: 'Meubles'},
            {id_categorie: 1, name: 'Pour la maison'},
            {id_categorie: 1, name: 'Jardin'},
            {id_categorie: 1, name: 'Électroménager'},
            {id_categorie: 2, name: 'Santé & Beauté'},
            {id_categorie: 2, name: 'Fournitures pour animaux'},
            {id_categorie: 2, name: 'Puériculture et enfants'},
            {id_categorie: 2, name: 'Jouets & Jeux'},
            {id_categorie: 3, name: 'Sacs & Bagages'},
            {id_categorie: 3, name: 'Vêtements & chaussures femmes'},
            {id_categorie: 3, name: 'Vêtements & chaussures hommes'},
            {id_categorie: 3, name: 'Bijoux & Accessoires'},
            {id_categorie: 4, name: 'Vélos'},
            {id_categorie: 4, name: 'Loisirs créatifs'},
            {id_categorie: 4, name: 'Pièces auto'},
            {id_categorie: 4, name: 'Sports & Activités d\'extérieures'},
            {id_categorie: 4, name: 'Jeux Vidéo'},
            {id_categorie: 4, name: 'Livres, films & musiques'},
            {id_categorie: 4, name: 'Instruments de musique'},
            {id_categorie: 4, name: 'Antiquité & Objets de collection'},
            {id_categorie: 5, name: 'Électronique & Ordinateurs'},
            {id_categorie: 5, name: 'Téléphones mobiles'},
        ]
    }),
    computed: {
        likesAllCampus () {
            return this.selectedCampus.length === this.campus.length
        },
        likesSomeCampus () {
            return this.selectedCampus.length > 0 && !this.likesAllCampus
        },
        icon () {
            if (this.likesAllCampus) return 'mdi-close-box'
            if (this.likesSomeCampus) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        }
    },

    methods: {
        toggle () {
            this.$nextTick(() => {
            if (this.likesAllCampus) {
                this.selectedCampus = []
            } else {
                this.selectedCampus = this.campus.slice()
            }
            })
        },
        catSub (i) {
            return this.subcategories.filter(s=>s.id_categorie==i);
        },
        editFilter() {
            axios.put(
                `/announces`,
                this.selectedCampus
            ).then(data => {
                console.log(data)
            });
        }
    }
}
</script>
