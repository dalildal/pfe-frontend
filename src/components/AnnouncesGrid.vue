<template>
    <v-row class="px-2">
        <v-col
            v-for="announce in this.getAnnounces"
            :key="announce.id"
            xs="12"
            sm="6"
            lg="4"
            xl="3"
            class="px-5"
        >
            <v-card elevation="0" @click="redirectToAnnounce(announce.id)">
            <v-img
                src="../assets/home.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
            >
                <v-card-title>{{announce.title}}</v-card-title><v-card-title>{{announce.price}}€</v-card-title>
                <v-card-subtitle v-if="!hover" v-text="announce.description" />
                
            </v-img>
            <v-card-actions>
                <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                </v-list-item-avatar>
                <v-row>
                    <v-list-item-content>
                    <v-list-item-title>{{getUserAnnounce(announce.idUser)}}</v-list-item-title>
                    </v-list-item-content>
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-star</v-icon>
                        <span>4,5</span>
                        </v-btn>
                    </template>
                    <span>Utilisateur recommandé</span>
                    </v-tooltip>
                </v-row>
                </v-list-item>
            </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    name: 'AnnouncesGrid',
    data () {
        return {
            users: [],
            announces: [],
        }
    },
    props: ['search'],
    mounted () {
        if(this.to_filter) {
            this.$store.state.announces.then(response => (this.announces = response.data))
        } else {
            this.$store.state.announces.then(response => (this.announces = response.data.reverse()))
        }
        this.$store.state.users.then(response => (this.users = response.data))
        //this.$store.dispatch('product/getProduct')
    },
    methods: {
        getUserAnnounce(id) {
        let user = this.users.filter(u=>u._id==id)[0]
        return user.name+" "+user.lastname
        },

        redirectToAnnounce(id) {
            this.$router.push({path:'/product/'+id})
        }        
    }

    
}
</script>