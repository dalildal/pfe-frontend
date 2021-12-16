<template>
  <v-card elevation="0">
    <v-row style="height: 100vh">
        <v-col sm=12 md=6>
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
                    <v-form @submit.prevent="handleRegister" method="post" v-model="valid">
                        <v-text-field
                            v-model="user.lastname"
                            label="Nom"
                            outlined
                            append-icon="mdi-account-outline"
                            :rules="rules"
                        />
                        <v-text-field
                            v-model="user.name"
                            label="Prenom"
                            outlined
                            append-icon="mdi-account-outline"
                            :rules="rules"
                        />
                        <v-select
                            v-model="user.campus"
                            :items="this.$store.state.campus"
                            :label="this.displayedCampus"
                            item-text="name"
                            item-value="id"
                            outlined
                            :rules="campusrules"
                            />
                        <v-text-field
                            v-model="user.email"
                            label="Email vinci"
                            outlined
                            append-icon="mdi-email-outline"
                            :rules="emailrules"
                        />
                        <v-text-field
                            v-model="user.password"
                            label="Mot de passe"
                            outlined
                            append-icon="mdi-lock-outline"
                            :rules="rules"
                            type="password"
                        />
                        
                        <v-btn
                            block
                            large
                            elevation="0"
                            color=#158aaf
                            type="submit"
                            :disabled="!valid"
                        >
                            S'inscrire
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-col>
        <v-alert
          style="position: absolute; bottom:0"
          :key="error"
          :value="error"
          shaped
          prominent
          type="error"
          transition="scale-transition"
        >
            {{error}}
        </v-alert>
        <sign-up-canva class="hidden-sm-and-down"/>
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
                user : new User('','',0,'',''),
                rules: [
                    value=>!!value||'Champs obligatoire'
                ],
                emailrules: [
                    value=>(value && value.endsWith("vinci.be"))||'Doit se finir par "vinci.be"'
                ],
                campusrules: [
                    value=>(value>=0&&value<3)||'Champs obligatoire'
                ],
                valid: true,
                error: null
            }
        },

        methods: {
            handleRegister() {
                axios.post(server.baseURLProd+'user/register',this.user)
                .catch(e=>{console.log(e);this.error=e})
                .then(this.$router.push({path: '/login'}))
            },

            changeUser() {
                console.log(this.user);
            }
        }

    }
</script>