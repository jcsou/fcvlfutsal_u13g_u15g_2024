<template>
  <v-navigation-drawer
    id="core-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="200"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props"/>
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-title class="text-h5 Headline">
            <v-btn text to="/" ><img src="./assets/logo.png" alt="LogoFcvl Logo" height="30" />FCVL</v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-subtitle>Futsal U13G/U15G</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav >
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item
          :key="`item-${i}`"
          :item="item"
        />
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'CoreDrawer',

    data: () => ({
      expandOnHover: false,
      items: [
        { title: 'Accueil', icon: 'mdi-view-dashboard', to: '/' },

        { title: 'U13G Poules', icon: 'mdi-view-split-vertical', to: '/Cat1Poules.html' },
        { title: 'U13G Finales', icon: 'mdi-format-line-weight', to: '/Cat1Finales.html' },

        { title: 'U15G Poules', icon: 'mdi-view-split-vertical', to: '/Cat2Poules.html' },
        { title: 'U15G Finales', icon: 'mdi-format-line-weight', to: '/Cat2Finales.html' },

        { title: 'Timeline', icon: 'mdi-timeline-clock-outline', to: '/Timeline.html' },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      //...mapState(["#00cae3 !important", "./img/jeanne.jpg"]),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: item.title,
        }
      },
    },
  }
</script>

<style scoped >
.v-list-item {
  margin-right: 2px;
  margin-left: 1px !important;
}
</style>
