import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'

let size = 'mini';
Vue.use(VueClipboard)
Vue.use(ElementUI, {locale, size})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})
