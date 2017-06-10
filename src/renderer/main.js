import Vue from 'vue'
import axios from 'axios'
import electron from 'electron'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import VueLazyload from 'vue-lazyload'
import anime from 'animejs'
const wallpaper = require('wallpaper')
const download = require('image-downloader')

Vue.prototype.$Download = download
Vue.prototype.$Wallpaper = wallpaper
Vue.prototype.$Anime = anime
// import path from 'path'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: 'static/default.svg',
  attempt: 1
})

let height = (window.screen.height * 0.60)
electron.remote.getCurrentWindow().setSize(window.screen.width / 2, height)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
