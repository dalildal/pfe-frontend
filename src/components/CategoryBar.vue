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
                v-model="desc"
                :items="[
                    {
                        label: 'Par ordre croissant',
                        value: false,
                    },
                    {
                        label: 'Par ordre décroissant',
                        value: true,
                    }
                ]"
                label="Trier par prix"
                item-text="label"
                item-value="value"
                @change="handleSort"
            >
            </v-select>
            <v-select
                v-model="selectedCampus"
                :items="$store.state.campus"
                label="Campus"
                item-text="name"
                item-value="id"
                multiple
                prepend-inner-icon=mdi-school-outline
                @change="handleCampus"
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
        <v-toolbar-items class="hidden-sm-and-down" v-for="category in this.categories" :key="category.id">
            <v-hover v-slot="{ hover }">
                <div>
                    <v-btn tile height=100% elevation="0">{{category.name}}</v-btn>
                    <v-expand-transition>
                        <v-card v-if="hover" style="position: absolute; z-index: 1000">
                            <v-list v-for="subcategory in catSub(category.id)" :key="subcategory.id">
                                <v-list-item @click="handleSubCatClick(subcategory.id)">
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
                <v-list-item v-for="category in this.categories" :key="category.id">
                    <v-hover v-slot="{ hover }">
                        <div>
                            <v-row tile height=100% elevation="0" class="px-2">{{category.name}}</v-row>
                            <v-expand-transition>
                                <v-card v-if="hover" style="position: flex; top: 0px; left: 25vw; z-index: 1000">
                                    <v-list v-for="subcategory in catSub(category.id)" :key="subcategory.id">
                                        <v-list-item @click="handleSubCatClick(subcategory.id)">
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
export default {
    name: 'CategoryBar',
    data: () => ({
        categories: [],
        selectedCampus: [],
        selectedSubCategory: null,
        desc: undefined,
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
            return this.subcategories.filter(s=>s.idCategory==i);
        },
        handleSubCatClick(i) {
            this.selectedSubCategory = i;
            this.$router.replace({ query: {
                search: this.$parent.$children[2].$props.search, 
                desc: this.desc, 
                campus: this.selectedCampus,
                subcat: this.selectedSubCategory,
            } })
            this.$parent.$data.subcat = this.selectedSubCategory
            this.$parent.$children[2].$props.subcat = this.selectedSubCategory
        },
        handleCampus() {
            this.$router.replace({ query: {
                search: this.$parent.$children[2].$props.search, 
                desc: this.desc, 
                campus: this.selectedCampus,
                subcat: this.selectedSubCategory,
            } })
            this.$parent.$data.campus = this.selectedCampus
            this.$parent.$children[2].$props.campus = this.selectedCampus
        },
        handleSort() {
            this.$router.replace({ query: {
                search: this.$parent.$children[2].$props.search, 
                desc: this.desc, 
                campus: this.selectedCampus,
                subcat: this.selectedSubCategory,
            } })
            this.$parent.$data.desc = this.desc
            this.$parent.$children[2].$props.desc = this.desc
        }
    },
    mounted() {
        this.$store.state.categories.then(response=>(this.categories=response.data))
        this.$store.state.subcategories.then(response=>(this.subcategories=response.data))
        console.log(this.subcategories);
    }
}
</script>
