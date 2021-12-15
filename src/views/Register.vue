<template>
  <v-card elevation="0">
    <v-row style="height: 100vh">
        <v-col cols=6>
            <v-row justify=center>
                <v-col
                    cols="12"
                    sm="10"
                    md="8"
                    lg="6"
                    xl="4"
                >
                    <p class="pt-2 font-weight-thin">Déjà un compte ? <a color=#158aaf href="/login">Se connecter</a></p>
                    <h1 class="pt-14 mb-5">Bienvenue chez Vinci Market</h1>
                    <p class="mb-10 font-weight-thin">Projet dans une démarche de développement durable visant à promouvoir le réemploi.</p>
                    <v-form @submit.prevent="handleRegister" method="post">
                        <v-text-field
                            v-model="user.lastname"
                            label="Nom"
                            outlined
                            append-icon="mdi-account-outline"
                        />
                        <v-text-field
                            v-model="user.name"
                            label="Prenom"
                            outlined
                            append-icon="mdi-account-outline"
                        />
                        <v-text-field
                            v-model="user.campus"
                            label="Campus"
                            outlined
                            append-icon="mdi-account-outline"
                        />
                        <v-text-field
                            v-model="user.email"
                            label="Email vinci"
                            outlined
                            append-icon="mdi-account-outline"
                        />
                        <v-text-field
                            v-model="user.password"
                            label="Mot de passe"
                            outlined
                            append-icon="mdi-lock-outline"
                        />
                        
                        <v-btn
                            block
                            large
                            elevation="0"
                            color=#158aaf
                            type="submit"
                        >
                            S'inscrire
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-col>
        <sign-up-canva/>
    </v-row>
  </v-card>
</template>

<script>
    import SignUpCanva from '../components/SignUpCanva.vue'
    import User from '../models/user.js'
    import axios from 'axios';
import { server } from '../helper';

    export default {
        name: 'Register',
        components: {
            SignUpCanva,
        },

        data() {
            return {
                user : new User('','',0,'','')
            }
        },

        methods: {
            handleRegister() {
                axios.post(server.baseURLProd+'user/register',this.user)
                this.$router.push({path: '/login'})

            },

            changeUser() {
                console.log(this.user);
            }
        }

    }
</script>