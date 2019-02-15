// let tjdModal = require('./modal/tjdModal')
let tjdTipModal = require('./modal/tjdTipModal')
let mqtt = require('./mqtt')
let tjdKbdCommonReal4 = require('./keyboard/tjdKbdCommonReal4')
let ydgModal = require('./modal/ydgModal.vue')
let reportModal = require('./modal/reportModal.vue')
let reportAmount = require('./amount/reportAmount.vue')
const myComponents = {
    // 'tjdModal': tjdModal,
    'tjdTipModal':tjdTipModal,
    'mqtt': mqtt,
    'tjdKbdCommonReal4': tjdKbdCommonReal4,
    'ydgModal':ydgModal,
    'reportModal':reportModal,
    'reportAmount': reportAmount,
}

const install = function(Vue, opts = {}) {
    Object.keys(myComponents).forEach((key, a, b) => {
        Vue.component(key, myComponents[key]);
    });

};

module.exports = Object.assign(myComponents, { install });
