import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#212121',
        secondary: '#F48FB1',
        accent: '#757575',
      },
    },
  },
});
