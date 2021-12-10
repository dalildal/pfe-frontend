<template>
    <v-toolbar class="mt-2"
        fixed
        rounded
        elevation=0
        elevate-on-scroll
        style="z-index: 1"
    >
        <v-row class="px-5 pt-5 mr-2">
            <v-select
                v-model="selectedCampus"
                :items="$store.state.campus"
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
                        Tous les $store.state.campus sont sélectionnés
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content v-else-if="likesSomeCampus">
                        <v-list-item-title>
                        {{selectedCampus.length}} $store.state.campus sélectionnés
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content v-else>
                        <v-list-item-title>
                        Aucun $store.state.campus sélectionné
                        </v-list-item-title>
                        <v-list-item-subtitle>
                        Sélectionnez un $store.state.campus!
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-select>
        </v-row>
        <v-toolbar-items class="hidden-sm-and-down" v-for="category in this.$store.state.categories" :key="category.id">
            <v-hover v-slot="{ hover }">
                <div>
                    <v-btn tile height=100% elevation="0">{{category.name}}</v-btn>
                    <v-expand-transition>
                        <v-card v-if="hover" style="position: absolute; z-index: 1000">
                            <v-list v-for="subcategory in catSub(category.id)" :key="subcategory.id_categorie">
                                <v-list-item @click="handleSubCatClick(subcategory.name)">
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
        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="hidden-md-and-up"
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            <v-list style="width: 50vw">
                <v-list-item v-for="category in this.$store.state.categories" :key="category.id">
                    <v-hover v-slot="{ hover }">
                        <div>
                            <v-row tile height=100% elevation="0" class="px-2">{{category.name}}</v-row>
                            <v-expand-transition>
                                <v-card v-if="hover" style="position: flex; top: 0px; left: 25vw; z-index: 1000">
                                    <v-list v-for="subcategory in catSub(category.id)" :key="subcategory.id_categorie">
                                        <v-list-item @click="handleSubCatClick(subcategory.name)">
                                        <v-list-item-content>
                                            <v-list-item-title>{{subcategory.name}}</v-list-item-title>
                                        </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-expand-transition>
                        </div>
                    </v-hover>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import axios from "axios";
export default {
    name: 'CategoryBar',
    data: () => ({
        selectedCampus: [],
        selectedSubCategory: null,
    }),
    computed: {
        likesAllCampus () {
            return this.selectedCampus.length === this.$store.state.campus.length
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
                this.selectedCampus = this.$store.state.campus.slice()
            }
            })
        },
        catSub (i) {
            return this.$store.state.subcategories.filter(s=>s.id_categorie==i);
        },
        handleSubCatClick(i) {
            this.selectedSubCategory = i;
            this.editFilter();
        },
        editFilter() {
            console.log(this.selectedCampus, this.selectedSubCategory);
            axios.put(
                `/announces`,
                [
                    this.selectedCampus,
                    this.selectedSubCategory
                ]
            ).then(data => {
                console.log(data)
            });
        }
    }
}
</script>
