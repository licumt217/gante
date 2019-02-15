/**
 * Created by liqiang on 2017/5/21.
 */
import Vue from 'vue'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue'
import VueI18n from 'vue-i18n';
import './filters/'
import store from './store'
import router from './routers'
import axios from './http/axios'

import myCommponents from './components'
import {} from './directives'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import VConsole from 'vconsole';

if(process.env.NODE_ENV!=='prod'){
    new VConsole();
}


Vue.use(VueI18n)

const i18n=new VueI18n({
    locale:'zh-cn',//语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
    messages:{
        'zh-cn':require('./common/lang/zh'),
        'en-us':require('./common/lang/en')
    }
})

console.log(store.state.count)

Vue.use(iView);

Vue.prototype.bus = new Vue();
Vue.component('icon', Icon)
Vue.use(myCommponents)
Vue.prototype.http = axios
const app = new Vue({
    el: '#app',
    i18n,
    // axios,
    router: router,
    render: h => h(App)
})
