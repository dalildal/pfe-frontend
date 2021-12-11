<template>
    <div>
        <navbar />
        <category-bar />
        <announces-grid :to_filter="true" class="mt-5"/>
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
        announces: null,
        }
    },
    mounted () {
        this.$store.state.announces.then(response => (this.announces = response.data))
    }
}
</script>
