/**
 * 此处须把所有过滤器全局化
 */
import Vue from 'vue'
Vue.filter('datetime', require('./tjdDateTime').datetime)
Vue.filter('tjdSecToDate', require('./tjdDateTime').tjdSecToDate)
Vue.filter('transParkTime2Str', require('./tjdDateTime').transParkTime2Str)
Vue.filter('tjdMilliToDate', require('./tjdDateTime').tjdMilliToDate)
Vue.filter('currency', require('./currency').currency)
Vue.filter('parseCarNum', require('./parseCarNum').parseCarNum)
Vue.filter('parseServicePhone', require('./stringUtils').parseServicePhone)
