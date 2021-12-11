<template>
  <v-card elevation="0">
    <v-row style="height: 100vh">
        <v-col cols=6 align-self="center">
            <h1>404 Not Found</h1>
            <p>La page que vous tenter d'afficher n'existe pas ou plus</p>
        </v-col>
        <sign-up-canva/>
    </v-row>
  </v-card>
</template>

<script>
    import SignUpCanva from '../components/SignUpCanva.vue'

    export default {
        name: 'Error',
        components: {
            SignUpCanva,
        }
    }
</script>