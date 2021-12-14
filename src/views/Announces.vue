<template>
    <div>
        <navbar />
        <category-bar />
        <h3 class="pa-5" v-bind:id="this.search!==undefined?'Résultat pour ':''">{{this.search}}</h3>
        <announces-grid :search="this.search" :desc="this.desc" :campus="this.campus" :subcat="this.subcat"/>
    </div>
</template>

<script>
import AnnouncesGrid from '../components/AnnouncesGrid.vue'
import CategoryBar from '../components/CategoryBar'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'Announce',
    components: {
        Navbar,
        CategoryBar,
        AnnouncesGrid,
    },
    data () {
        return {
            search: undefined,
            desc: undefined,
            campus: undefined,
            subcat: undefined,
        }
    },
    mounted () {
        this.search = this.$route.query.search
        this.desc = this.$route.query.desc
        this.campus = this.$route.query.campus
        this.subcat = this.$route.query.subcat
    }
}
</script>
