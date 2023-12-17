<template>
    <v-container id="accueil" fluid tag="section">
        <v-row>
            <v-col cols="12" sm="6" lg="4">
                <v-card class="mx-auto px-0" max-width="400">
                  <v-img class="mx-auto" max-height="200px" max-width="200px" src="../assets/logo.png" alt="FCVL logo"/>
                  <v-card-text class="text-center pa-1">
                    <h3 class="display-2 font-weight-light mb-3 black--text">
                      {{tournoi.titre}}
                    </h3>
                    <p class="font-weight-light grey--text">{{tournoi.date}}</p>

                    <p class="font-weight-light grey--text">
                        <br/> <a @click="scrollMeTo('Cat1')" >{{cat1.categorie_id}} : {{cat1.texthoraire}}</a>
                        <br/><a @click="scrollMeTo('Cat2')" >{{cat2.categorie_id}} : {{cat2.texthoraire}}</a>
                    <p class="font-weight-light grey--text">{{tournoi.temps_jeu}}</p>
                  </v-card-text>
                  <v-card-actions class="pa-0">
                    <v-spacer></v-spacer>
                    <v-chip class="ma-0" label link :href="tournoi.lien_reglement">
                       <v-icon left>mdi-information-outline</v-icon> Règlement
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-chip class="ma-0" label link :href="tournoi.lien_ficheequipe">
                       <v-icon left>mdi-account-multiple-outline</v-icon> Fiche Equipe
                    </v-chip>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-card-actions class="pa-0">
                    <v-chip class="ma-2" label @click.stop="dialogMap = true">
                       <v-icon left>mdi-map-outline</v-icon> Plan (Accès)
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-chip class="ma-2" label @click.stop="dialogQRcode = true">
                       <v-icon left>mdi-share-variant</v-icon> URL QR Code
                    </v-chip>
                  </v-card-actions>
                </v-card>

                <v-dialog v-model="dialogMap" max-width="500">
                  <v-card class="pa-1">
                    <v-card-title class="text-h5 pa-1">
                        <h3 class="display-2 font-weight-light mb-3 black--text">Plan des salles à la Chartre</h3>
                        <h6 class="display-1">6 Rue Jacques Peletier, 72340 La Chartre-sur-le-Loir</h6>

                    </v-card-title>
                    <v-card-text class="pa-1">
                      <v-img class="mx-auto" max-height="450px" max-width="450px" src="img/PlanAcces.JPG" alt="PlanAcces"/>
                    </v-card-text>
                    <v-card-actions class="pa-1 ">
                      <v-btn color="primary" text link href="https://goo.gl/maps/qaZv9G98zxA4RPsTA" @click="dialogMap = false" target="_blank"><v-icon>mdi-map-marker</v-icon>GoogleMap</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogMap = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogQRcode" max-width="500">
                  <v-card class="pa-1">
                    <v-card-title class="text-h5 pa-1">
                        <h3 class="display-2 font-weight-light mb-3 black--text">{{tournoi.titre_QRcode}}</h3>
                        <h6 class="display-1 black--text">Partager ce site avec ce QRCode ...</h6>
                        <h6 class="display-1 black--text">{{tournoi.lien_site}}</h6>
                    </v-card-title>
                    <v-card-text class="pa-1">
                      <v-img class="mx-auto" max-height="450px" max-width="450px" src="img/QRsite.png" alt="QRsite"/>
                    </v-card-text>
                    <v-card-actions class="pa-1 ">
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogQRcode = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogSalles" max-width="520">
                  <v-card class="pa-1">
                    <v-card-title class="text-h5 pa-1">
                        <h3 class="display-2 font-weight-light mb-3 black--text">2 salles</h3>
                    </v-card-title>
                    <v-card-text class="pa-1">
                      <v-container class="pa-0 ma-0">
                          <v-row >
                              <v-col class="pa-1 ma-0 ">
                                  <h5 class="display-1 mb-1 text-center">{{salle1.id}}</h5>
                                  <h6 class="display-1 mb-1 grey--text text-center">{{salle1.nomlong}}</h6>
                                  <v-img class="mx-auto" max-height="200px" max-width="200px" :src="salle1.lien" :alt="salle1.id"/>
                              </v-col>
                              <v-col class="pa-1 ma-0">
                                  <h5 class="display-1 mb-1 text-center">{{salle2.id}}</h5>
                                  <h6 class="display-1 mb-1 grey--text text-center">{{salle2.nomlong}}</h6>
                                  <v-img class="mx-auto" max-height="200px" max-width="200px" :src="salle2.lien" :alt="salle2.id"/>
                              </v-col>
                          </v-row>
                      </v-container>

                    </v-card-text>
                    <v-card-actions class="pa-1 ">
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogSalles = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-card max-width="400" class="mx-auto">
                    <v-img class="mx-auto" max-height="300px" max-width="300px" src="img/pub/mma.jpeg" alt="mma"/>
                    <v-card-title>Annonceurs</v-card-title>
                </v-card>

            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <div ref="Cat1"/>
                <base-material-card
                      icon="mdi-clipboard-text"
                      :title="cat1.categorie_id + ' : ' + cat1.texthoraire"
                      class="px-5 py-3"
                      color="primary"
                    >
                      <v-simple-table>
                        <template v-slot:default>
                        <thead>
                          <tr>
                            <th width="3%" class="text-center">
                              N°
                            </th>
                            <th width="3%" class="text-center">
                              Poule
                            </th>
                            <th width="10%" class="text-center">
                              Fanion
                            </th>
                            <th width="84%" class="text-left">
                              Club
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(equipe, n) in equipes1" :key="equipe.id">
                            <td>{{n+1}}</td>
                            <td>{{equipe.poule}}</td>
                            <td><v-img  v-bind:src="'img/fanion/'+equipe.fanion" max-height="30" max-width="30"/></td>
                            <td>{{equipe.nom}}<v-spacer></v-spacer></td>
                          </tr>
                        </tbody>
                      </template>
                      </v-simple-table>
                      <v-divider></v-divider>
                      <v-card-actions class="pa-0 ">
                        <v-chip class="ma-2" label @click.stop="dialogSalles = true">
                           <v-icon left>mdi-home-switch-outline</v-icon> Les Salles
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-chip class="ma-2" label link to="/Cat1Poules.html">
                           <v-icon left>mdi-view-split-vertical</v-icon> Poules
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-chip class="ma-2" label link to="/Cat1Finales.html">
                           <v-icon left>mdi-format-line-weight</v-icon> Finales
                        </v-chip>
                      </v-card-actions>
                    </base-material-card>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <div ref="Cat2"/>
                <base-material-card
                      icon="mdi-clipboard-text"
                      :title="cat2.categorie_id + ' : ' + cat2.texthoraire"
                      class="px-5 py-3"
                      color="primary"
                    >
                      <v-simple-table>
                        <template v-slot:default>
                        <thead>
                           <tr>
                             <th width="3%" class="text-center">
                               N°
                             </th>
                             <th width="3%" class="text-center">
                               Poule
                             </th>
                             <th width="10%" class="text-center">
                               Fanion
                             </th>
                             <th width="84%" class="text-left">
                               Club
                             </th>
                           </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(equipe, n) in equipes2" :key="equipe.id">
                            <td>{{n+1}}</td>
                            <td>{{equipe.poule}}</td>
                            <td><v-img  v-bind:src="'img/fanion/'+equipe.fanion" max-height="30" max-width="30"/></td>
                            <td>{{equipe.nom}}<v-spacer></v-spacer></td>
                          </tr>
                        </tbody>
                      </template>
                      </v-simple-table>
                      <v-divider></v-divider>
                      <v-card-actions class="pa-0 ">
                          <v-chip class="ma-2" label @click.stop="dialogSalles = true">
                             <v-icon left>mdi-home-switch-outline</v-icon> Les Salles
                          </v-chip>
                          <v-spacer></v-spacer>
                        <v-chip class="ma-2" label link to="/Cat2Poules.html">
                           <v-icon left>mdi-view-split-vertical</v-icon> Poules
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-chip class="ma-2" label link to="/Cat2Finales.html">
                           <v-icon left>mdi-format-line-weight</v-icon> Finales
                        </v-chip>
                      </v-card-actions>
                    </base-material-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        categorie1: "U13G",
        categorie2: "U15G",
        dialogMap: false,
        dialogQRcode: false,
        dialogSalles: false,
        url: process.env.BASE_URL + "datas/info_tournoi.json",

        equipes1: null,
        equipes2: null,
        cat1: '{"id": "", "categorie_id": "", "nomlong": "", "texthoraire": ""}',
        cat2: '{"id": "", "categorie_id": "", "nomlong": "", "texthoraire": ""}',
        salle1: '{"id": "", "nomlong": "", "lien": ""}',
        salle2: '{"id": "", "nomlong": "", "lien": ""}',
        tournoi: '{"titre": "", "date": "", "temps_jeu": "", "lien_reglement": "", "lien_ficheequipe": "", "lien_site": "", "titre_QRcode": ""}',

      };
    },
    created() {
      this.loadDataOds();
    },
    methods: {
        update(){
            this.loadDataOds();
        },
        loadDataOds() {
            var url = this.url;
            var categorie1 = this.categorie1;
            var categorie2 = this.categorie2;
            axios
                .get(url)
                .then(response => {
                  this.equipes1 = response.data.lesequipes.filter(function (entry){return entry.categorie_id===categorie1;})
                  this.equipes2 = response.data.lesequipes.filter(function (entry){return entry.categorie_id===categorie2;})
                  this.tournoi = response.data.tournoi
                  this.cat1 = response.data.lescategories.filter(function (entry){return entry.categorie_id===categorie1;})[0]
                  this.cat2 = response.data.lescategories.filter(function (entry){return entry.categorie_id===categorie2;})[0]
                  this.salle1 = response.data.lessalles[0]
                  this.salle2 = response.data.lessalles[1]
                }).catch(error => {
                   console.log(error)
                })
          },
        scrollMeTo(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;

            window.scrollTo(0, top);
        },
    },
};
</script>