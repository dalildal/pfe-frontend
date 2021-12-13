<template>
    <div>
        <navbar />
        <category-bar />
        <h3 class="pa-5" v-if="this.search!==undefined">Résultat pour "{{this.search}}"</h3>
        <announces-grid :search="this.search"/>
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
            search: undefined
        }
    },
    mounted () {
        this.search = this.$route.query.search
        this.$store.state.announces.then(response => (this.announces = response.data))
    }
}
</script>
