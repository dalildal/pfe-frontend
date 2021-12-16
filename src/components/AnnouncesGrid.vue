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
                :src="'https://pfe-vinci-back-dev.herokuapp.com/products/product-images/'+announce.liste[0]"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
            >
                <v-card-title>{{announce.title}}</v-card-title>
                <v-card-title v-if="announce.price>0">{{announce.price}}€</v-card-title>
                <v-card-title v-else>À donner</v-card-title>
                <v-card-subtitle v-if="!hover" v-text="announce.description" />
                
            </v-img>
            <v-card-actions>
                <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                    class="elevation-6"
                    alt=""
                    :src="'https://pfe-vinci-back-dev.herokuapp.com/user/profil-images/'+getUserAnnounce(announce.idUser).pp"
                    ></v-img>
                </v-list-item-avatar>
                <v-row>
                    <v-list-item-content>
                    <v-list-item-title>{{getUserAnnounce(announce.idUser).fullname}}</v-list-item-title>
                    </v-list-item-content>
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
    props: ['search', 'desc', 'campus', 'subcat'],
    mounted () {
        this.$store.state.announces.then(response=>{this.announces=response.data.filter(a=>a.state==='A vendre'||a.state==='A donner')})
        this.$store.state.users.then(response=>this.users=response.data)
    },
    methods: {
        getUserAnnounce(id) {
            let user = this.users.filter(u=>u._id==id)[0]
            return {
                fullname: user.name+" "+user.lastname,
                pp: user.url_profil_pic
            }
        },
        filtredAnnounces(search, desc, campus, subcat) {
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
            if(subcat) {
                aTemp = aTemp.filter(item=>{
                    return item.idCategory==subcat
                })
            }
            return aTemp
        },
        redirectToAnnounce(id) {
            this.$router.push({path:'/product/'+id})
        }
    },
    computed: {
        getAnnounces() {
            return this.filtredAnnounces(this.search, this.desc, this.campus, this.subcat)
        }
    }

    
}
</script>