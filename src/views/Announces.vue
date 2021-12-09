<template>
    <div>
        <navbar />
        <category-bar />
        <v-sheet
            id="scrolling-techniques-7"
            class="overflow-y-auto"
            max-height="600"
        >
            <v-container>

            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import CategoryBar from '../components/CategoryBar'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'Announce',
    components: {
        Navbar,
        CategoryBar,
    }
}
        Navbar
</script>
