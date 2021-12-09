<template>
    <div>
        <navbar />
        <category-bar />
        <v-sheet
            id="scrolling-techniques-7"
        >
            <v-row class="px-2 mt-10">
                <v-col
                v-for="card in cards"
                :key="card.title"
                md="6"
                lg="4"
                xl="3"
                class="px-5"
                >
                    <v-card elevation="0">
                        <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        >
                            <v-card-title v-text="card.title" />
                            <v-card-subtitle v-text="card.desc" />
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
                                    <v-list-item-title>Evan You</v-list-item-title>
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
    },
    data: () => ({
      cards: [
        { title: 'IPHONE 13 PRO MAX', desc:'petit tel pas piqué des annetons', campus: "Woluwe-Saint-Lambert", src: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-family-hero?wid=470&hei=556&fmt=png-alpha&.v=1631220221000'},
        { title: 'BANANE', desc:'pas encore mangée', campus: "Ixelles", src: 'https://media.lactualite.com/2014/08/banane-480x360.jpg'},
        { title: 'VESTE', desc:'comme neuf', campus: "Louvain-La-Neuve", src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
      ],
      users: [
        { name: 'Chris Gaviria', src: "https://randomuser.me/api/portraits/men/78.jpg"},
        { name: 'Dalil Rachik', src: "https://randomuser.me/api/portraits/men/78.jpg"},
        { name: 'Filipe Manuel Cardoso Ribeiro', src: "https://randomuser.me/api/portraits/men/78.jpg"},
        { name: 'Obey Senhaji', src: "https://randomuser.me/api/portraits/men/78.jpg"},
      ]
    })
}
</script>
