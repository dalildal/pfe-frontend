<template>
    <div>
        <v-btn absolute plain top right @click="handleClickEdit()" v-if="!editMode">
            Modifier
        </v-btn>
        <v-btn absolute plain top right @click="handleClickEdit()" v-else>
            OK
        </v-btn>
        <v-list-item class="d-flex justify-center mt-10 ml-5">
            <v-list-item-avatar width=75% height=auto v-if="editMode">
                <v-img class='shaking' :src="displayedImage?displayedImage:'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+getProfilPic"></v-img>
                <v-file-input 
                    style="position: absolute; color: white;" 
                    class="text--white" 
                    prepend-icon="mdi-camera" 
                    hide-input 
                    @change="handleAddImage" 
                    v-model="addedImage">
                </v-file-input>
            </v-list-item-avatar>
            <v-list-item-avatar width=75% height=auto v-else>
                <v-img :src="displayedImage?displayedImage:'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+getProfilPic"></v-img>
            </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title 
                    class="d-flex justify-center"
                >
                    <h3 class="pa-3">{{getName+' '+getLastName}}</h3>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <h4>Informations de contact</h4>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
            <v-list-item-title>EMAIL</v-list-item-title>
            <v-list-item-subtitle>{{getEmail}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>CAMPUS</v-list-item-title>
                <v-list-item-subtitle v-if="!editMode">{{selectedCampus?this.$store.state.campus.filter(c=>c.id==this.selectedCampus)[0].name:this.displayedCampus}}</v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                    <v-select
                    v-model="selectedCampus"
                    :items="this.$store.state.campus"
                    :label="this.displayedCampus"
                    item-text="name"
                    item-value="id"
                    @change="editCampus"
                    />
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import { server } from '../helper';
export default {
    name: 'Profile',
    data: () => ({
        editMode: false,
        addedImage: null,
        selectedCampus: null,
        displayedImage: null,
        campus: null
    }),
    mounted() {
        this.$store.dispatch('user/searchUserByToken')
    },
    methods: {
        handleClickEdit() {
            if(this.editMode) {
                if(this.addedImage!=null) {
                    try {
                        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                        let fd = new FormData()
                        fd.append('file',this.addedImage)
                        fd.append('userId',localStorage.getItem('userId'));
                        axios.post("https://pfe-vinci-back-dev.herokuapp.com/upload/profil-images/", fd, config)
                    } catch(e) {
                        console.log(e);
                    }   
                }
            }
            this.editMode = !this.editMode
        },
        editCampus() {
            axios.patch(server.baseURLProd+"user/"+localStorage.getItem("userId"), {campus: this.selectedCampus})
        },
        handleAddImage() {
            this.displayedImage = URL.createObjectURL(this.addedImage)
        }
    },
    computed: {
        ...mapGetters({
        getName: 'user/getName',
        getLastName: 'user/getLastName',
        getCampus: 'user/getCampus',
        getEmail: 'user/getEmail',
        getProfilPic: 'user/getProfilPic',
        getUser: 'user/searchUserByToken',
        }),
        displayedCampus() {
            this.$store.dispatch('user/searchUserByToken')
            return this.$store.state.campus.filter(c=>c.id==this.getCampus)[0].name
        }
    }
}
</script>
<style>
.shaking {
    animation: shake 1.5s;
    animation-iteration-count: infinite;
}

.shaking:hover > * {
    filter: blur(2px);
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -1px) rotate(0deg); }
  20% { transform: translate(-1px, 0px) rotate(1deg); }
  30% { transform: translate(1px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(0deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-1px, 1px) rotate(0deg); }
  70% { transform: translate(1px, 1px) rotate(0deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
