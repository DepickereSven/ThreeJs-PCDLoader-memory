import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: "#494949",
    secondary: "#eee",
    "btn": "#3f98bd",
  }
});
