<template>
    <v-card class="mx-auto">
    <v-tabs color="primary accent-4" left>
        <v-tab >Poules</v-tab>
        <v-tab >Classements</v-tab>
        <v-chip class="ma-2" label @click.stop="update()">
            <v-icon>mdi-reload</v-icon>Reload
        </v-chip>

        <v-tab-item>
            <v-container id="poules-match" fluid tag="section">
            <v-row>
            <v-col>
                <v-card class="mx-auto" >
                    <v-card-text class="pa-1 ma-0">
                        <h6>Timeline Poules</h6>
                        <v-timeline align-top dense >
                            <v-timeline-item v-for="item in getMatchs" v-bind:color="item.color" v-bind:key="item.id">
                                <v-card class="pa-0 ma-0">
                                    <v-card-title>
                                        <strong>{{ item.heureDebut }} / Salle : {{ item.salle }}</strong>
                                    </v-card-title>

                                    <v-card-text class="pa-0 ma-0"  align="center">
                                        <h6>N° {{ item.id }}, Catégorie : {{ item.categorie }}</h6>
                                        <v-container class="pa-0 ma-0">
                                            <v-row >
                                                <v-col class="pa-1 ma-0">
                                                    <v-avatar>
                                                        <v-img v-bind:src="'img/fanion/'+item.displayDom.fanion" :alt="item.displayDom.nomCourt" max-height="25" max-width="25"/>
                                                    </v-avatar>{{ item.displayDom.nomCourt }}
                                                </v-col>
                                                <v-col class="pa-4 ma-0">
                                                    <v-chip color="grey" ><h6 class="display-1 mb-1 font-weight-bold">{{ item.score }}</h6></v-chip>
                                                </v-col>
                                                <v-col class="pa-1 ma-0">
                                                    <v-avatar>
                                                        <v-img v-bind:src="'img/fanion/'+item.displayExt.fanion" :alt="item.displayExt.nomCourt" max-height="25" max-width="25"/>
                                                    </v-avatar>{{ item.displayExt.nomCourt }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
            </v-container>
        </v-tab-item>

        <v-tab-item>
        <v-container id="classement-match" fluid tag="section">
            <v-row>
            <v-col>
                <v-card class="mx-auto" >
                    <v-card-text class="pa-1 ma-0">
                        <h6>Timeline Classement</h6>
                        <v-timeline align-top dense >
                            <v-timeline-item v-for="item in getMatchsFinales" v-bind:color="item.color" v-bind:key="item.id">
                                <v-card class="pa-0 ma-0">
                                    <v-card-title>
                                        <strong>{{ item.heureDebut }} / Salle : {{ item.salle }}</strong>
                                    </v-card-title>

                                    <v-card-text class="pa-0 ma-0"  align="center">
                                        <h6>N° {{ item.id }}, Catégorie : {{ item.categorie }}, {{ item.nom }}</h6>
                                        <v-container class="pa-0 ma-0">
                                            <v-row >
                                                <v-col class="pa-1 ma-0">
                                                    <v-avatar>
                                                        <v-img v-bind:src="'img/fanion/'+item.displayDom.fanion" :alt="item.displayDom.nomCourt" max-height="25" max-width="25"/>
                                                    </v-avatar>{{ item.displayDom.nomCourt }}
                                                </v-col>
                                                <v-col class="pa-4 ma-0">
                                                    <v-chip color="grey" ><h6 class="display-1 mb-1 font-weight-bold">{{ item.score }}</h6></v-chip>
                                                </v-col>
                                                <v-col class="pa-1 ma-0">
                                                    <v-avatar>
                                                        <v-img v-bind:src="'img/fanion/'+item.displayExt.fanion" :alt="item.displayExt.nomCourt" max-height="25" max-width="25"/>
                                                    </v-avatar>{{ item.displayExt.nomCourt }}
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
            </v-container>
            </v-tab-item>
    </v-tabs>
    </v-card>
</template>



<script>
import axios from 'axios'

export default {
    data() {
      return {

        c1_categorie: "U13G",
        c2_categorie: "U15G",

        url_Poule: process.env.BASE_URL + "datas/matchs_poules.json",

        url_finales: process.env.BASE_URL + "datas/matchs_finales.json",

        urlEquipe: process.env.BASE_URL + "datas/info_tournoi.json",

        lesmatchs: [],

        lesmatchs_c1_final: [],

        lesequipeskey: {},

        headersMatch: [
          {
            sortable: false,
            text: 'Salle/Heure',
            value: 'id',
            align: 'center',
            class: 'px-1',
            cellClass: 'px-1',
          },
          {
            sortable: false,
            text: 'Match',
            value: 'nom',
            align: 'center',
            class: 'px-1',
            cellClass: 'px-1',
          },
          {
            sortable: false,
            text: 'Equipe Domicile',
            value: 'displayDom.fanion',
            align: 'center',
            class: 'px-1',
            cellClass: 'px-1',
          },
          {
            sortable: false,
            text: 'Score',
            value: 'score',
            align: 'center',
            class: 'font-weight-bold px-0',
            cellClass: 'px-1',
          },
          {
            sortable: false,
            text: 'Equipe Exterieur',
            value: 'displayExt.fanion',
            align: 'center',
            class: 'px-1',
            cellClass: 'px-1',
          },
        ],
      }
    },
    created() {
      this.loadDataOds();
    },
    methods: {
      update(){
        this.loadDataOds();
      },
      loadDataOds() {
            // Load Equipes
            var urlEquipe = this.urlEquipe;
            axios
              .get(urlEquipe)
              .then(response => {
                var equipes = response.data.lesequipes
                for (var n in equipes) {
                    this.lesequipeskey[equipes[n].id] = equipes[n]
                }
                //console.log(this.lesequipeskey)
              }).catch(error => {
                 console.log(error)
              });


            var url_Poule = this.url_Poule;
            axios
                .get(url_Poule)
                .then(response => {
                  this.lesmatchs = response.data.lesmatchs

                  for (var n in this.lesmatchs ) {
                    this.lesmatchs[n].score = this.lesmatchs[n].equipeDom.but+" - "+this.lesmatchs[n].equipeExt.but
                    this.lesmatchs[n].displayDom = this.lesequipeskey[this.lesmatchs[n].equipeDom.id]
                    this.lesmatchs[n].displayExt = this.lesequipeskey[this.lesmatchs[n].equipeExt.id]
                    this.lesmatchs[n].categorie = this.lesmatchs[n].categorie_id + " / Poule " + this.lesmatchs[n].poule

                    if (this.lesmatchs[n].cat_code=="cat1") {
                        if (this.lesmatchs[n].poule=="PA") {
                            this.lesmatchs[n].color = "colorPA"
                        } else {
                            this.lesmatchs[n].color = "colorPB"
                        }
                    } else {
                        if (this.lesmatchs[n].poule=="PA") {
                            this.lesmatchs[n].color = "colorPC"
                        } else {
                            this.lesmatchs[n].color = "colorPD"
                        }
                    }
                  }
                }).catch(error => {
                   console.log(error)
                })

            // Load C_F
            var url_finales = this.url_finales;
            axios
                .get(url_finales)
                .then(response => {
                  this.lesmatchs_c1_final = response.data.lesmatchs
                  var blancEquipe = {"categorie_id": "","id": "","nom": "","nomCourt": "","fanion": "px.png"}

                  for (var n in this.lesmatchs_c1_final ) {
                    this.lesmatchs_c1_final[n].score = this.lesmatchs_c1_final[n].equipeDom.but+" - "+this.lesmatchs_c1_final[n].equipeExt.but

                    if (this.lesmatchs_c1_final[n].equipeDom.id)
                        this.lesmatchs_c1_final[n].displayDom = this.lesequipeskey[this.lesmatchs_c1_final[n].equipeDom.id]
                    else
                        this.lesmatchs_c1_final[n].displayDom = blancEquipe

                    if (this.lesmatchs_c1_final[n].equipeExt.id)
                        this.lesmatchs_c1_final[n].displayExt = this.lesequipeskey[this.lesmatchs_c1_final[n].equipeExt.id]
                    else
                        this.lesmatchs_c1_final[n].displayExt = blancEquipe

                    this.lesmatchs_c1_final[n].categorie = this.c1_categorie

                    if (this.lesmatchs_c1_final[n].cat_code=="cat1") {
                        this.lesmatchs_c1_final[n].color = "colorF1"
                    } else {
                        this.lesmatchs_c1_final[n].color = "colorF2"
                    }

                  }
                }).catch(error => {
                   console.log(error)
                })

      }
    },
    computed: {
        getMatchs() {
            var lesmatchs = this.lesmatchs
            for (var n in lesmatchs) {
                lesmatchs[n].keytime = lesmatchs[n].heureDebut.replace(":", "")
            }
            return lesmatchs.sort((p1, p2) => (p1.keytime > p2.keytime) ? 1 : (p1.keytime < p2.keytime) ? -1 : (parseInt(p1.id) > parseInt(p2.id)) ? 1 :(parseInt(p1.id) < parseInt(p2.id)) ? -1 : 0)
        },
        getMatchsFinales() {
            var lesmatchs = this.lesmatchs_c1_final
            for (var n in lesmatchs) {
                lesmatchs[n].keytime = lesmatchs[n].heureDebut.replace(":", "")
            }
            return lesmatchs.sort((p1, p2) => (p1.keytime > p2.keytime) ? 1 : (p1.keytime < p2.keytime) ? -1 : (parseInt(p1.id) > parseInt(p2.id)) ? 1 :(parseInt(p1.id) < parseInt(p2.id)) ? -1 : 0)
        },
    }
};
</script>

