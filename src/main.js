import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components/Bpmn/BpmnElement/lib/BpmnElement.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import {FgBadge} from './components/Bpmn/BpmnElement/lib/BpmnElement.umd.min.js'

import App from './App'

let size = 'mini';
Vue.use(VueClipboard)
Vue.use(ElementUI, {locale, size})
Vue.use(FgBadge)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})
