<template>
    <div>
        <v-btn absolute plain top right @click="handleClickEdit()" v-if="!editMode">
            Modifier
        </v-btn>
        <v-btn absolute plain top right @click="handleClickEdit()" v-else>
            OK
        </v-btn>
        <v-list-item class="d-flex justify-center mt-10 ml-5">
            <v-list-item-avatar width=75% height=auto>
                <v-img v-bind:class="editMode?'shaking':''" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
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
                <v-list-item-subtitle>Woluwe-Saint-Lambert</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>
<script>
export default {
    name: 'Profile',
    editMode: false,
    methods: {
        handleClickEdit() {
            this.editMode = !this.editMode
            this.$forceUpdate()
        }
    }
}
</script>
<style>
.shaking {
    animation: shake 1.5s;
    animation-iteration-count: infinite;
}

.shaking:hover {
    filter: blur(2px) brightness(50%);
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
