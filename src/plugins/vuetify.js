import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/sass/overrides.sass'

Vue.use(Vuetify);

const theme = {
//  primary: '#F1948A',
//  secondary: '#00CAE3',
//  accent: '#9C27b0',
//  info: '#00CAE3',
//
//  colorPA: '#A9CCE3',
//  colorPB: '#A2D9CE',
//  colorPC: '#D2B4DE',
//  colorPD: '#FAD7A0',
//  colorPE: '#F1948A',
//  colorPF: '#CACFD2',
  primary: '#00CAE3',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',

  colorPA: '#90CAF9',
  colorPB: '#80cbc4',
  colorPC: '#b39ddb',
  colorPD: '#ef9a9a',
  colorF1: '#00B8C2',
  colorF2: '#FD6D9E',
}

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
});
