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
                <v-img class='shaking' :src="addedImage?addedImage:'https://randomuser.me/api/portraits/men/78.jpg'"></v-img>
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
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title 
                    class="d-flex justify-center"
                >
                    <h3 class="pa-3">Julien Van Tongerloo</h3>
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
            <v-list-item-subtitle>julien.vantongerloo@student.vinci.be</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>TELEPHONE</v-list-item-title>
                <v-list-item-subtitle>0499/46.73.83</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>CAMPUS</v-list-item-title>
                <v-list-item-subtitle v-if="!editMode">Woluwe-Saint-Lambert</v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                    <v-select
                    v-model="selectedCampus"
                    :items="this.$store.state.campus"
                    label="Woluwe-Saint-Lambert"
                    @change="editCampus()"
                    />
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Profile',
    data: () => ({
        editMode: false,
        addedImage: null,
        selectedCampus: null,
    }),
    methods: {
        handleClickEdit() {
            this.editMode = !this.editMode
            this.$forceUpdate()
        },
        editCampus() {
            console.log(this.selectedCampus);
            axios.put(
                '/profile/campus',
                this.selectedCampus
            ).then(data => {
                console.log(data)
            });
        },
        handleAddImage() {
            this.addedImage = URL.createObjectURL(this.addedImage)
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
