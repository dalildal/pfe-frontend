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
            <v-card elevation="0">
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
            hover: false,
        }
    },
    props: ['search', 'desc', 'campus'],
    mounted () {
        this.$store.state.announces.then(response=>this.announces=response.data)
        this.$store.state.users.then(response=>this.users=response.data)
    },
    methods: {
        getUserAnnounce(id) {
            let user = this.users.filter(u=>u._id==id)[0]
            return user.name+" "+user.lastname
        },
        filtredAnnounces(search, desc, campus) {
            let aTemp = this.announces;
            if(search) {
                aTemp = aTemp.filter(item=>{
                    return item.title.toLowerCase().includes(search) ||
                        item.description.toLowerCase().includes(search)
                })
            }
            if(desc===true) {
                aTemp = aTemp.sort((a,b)=>{return b.price-a.price})
            } else {
                aTemp = aTemp.sort((a,b)=>{return a.price-b.price})
            }
            if(campus && campus.length>0) {
                aTemp = aTemp.filter(item=>{
                    let user = this.users.filter(u=>u._id==item.idUser)[0]
                    let bool = false
                    campus.forEach(c=>{
                        console.log(campus.length);
                        if(c==user.campus) 
                            bool = true;
                    })
                    return bool;
                })
            }
            return aTemp
        }
    },
    computed: {
        getAnnounces() {
            return this.filtredAnnounces(this.search, this.desc, this.campus)
        }
    }
}
</script>