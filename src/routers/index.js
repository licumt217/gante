/**
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const app_privacyPolicy = r => require.ensure([], () => r(require('../pages/app/privacyPolicy')), 'app_privacyPolicy')
const app_userAgreement = r => require.ensure([], () => r(require('../pages/app/userAgreement')), 'app_userAgreement')
const mqtt = r => require.ensure([], () => r(require('../pages/mqtt/mqtt')), 'mqtt')
const sb_scanPayDispatch = r => require.ensure([], () => r(require('../pages/sb/scanPayDispatch')), 'sb_scanPayDispatch')
const invoice_scanDispatch = r => require.ensure([], () => r(require('../pages/invoice/scanDispatch')), 'invoice_scanDispatch')
const items_aboutBalance = r => require.ensure([], () => r(require('../pages/items/aboutBalance')), 'items_aboutBalance')
const items_aboutCar = r => require.ensure([], () => r(require('../pages/items/aboutCar')), 'items_aboutCar')
const items_aboutCoupon = r => require.ensure([], () => r(require('../pages/items/aboutCoupon')), 'items_aboutCoupon')
const items_aboutOrder = r => require.ensure([], () => r(require('../pages/items/aboutOrder')), 'items_aboutOrder')
const items_aboutPay = r => require.ensure([], () => r(require('../pages/items/aboutPay')), 'items_aboutPay')
const items_payAgreement = r => require.ensure([], () => r(require('../pages/items/payAgreement')), 'items_payAgreement')
const items_preferentialRules = r => require.ensure([], () => r(require('../pages/items/preferentialRules')), 'items_preferentialRules')

const test = r => require.ensure([], () => r(require('../pages/test/test')), 'test')
const test_dispatch = r => require.ensure([], () => r(require('../pages/test/dispatch.js')), 'test_dispatch')
const test_abc = r => require.ensure([], () => r(require('../pages/test/abc')), 'test_abc')
const test_def = r => require.ensure([], () => r(require('../pages/test/def')), 'test_def')
const test_fff = r => require.ensure([], () => r(require('../pages/test/fff')), 'test_fff')
const monitor_abnormalPark = r => require.ensure([], () => r(require('../pages/monitor/abnormalPark')), 'monitor_abnormalPark')
const items_qdNorthStation = r => require.ensure([], () => r(require('../pages/items/qdNorthStation')), 'items_qdNorthStation')
const activity_zmxy = r => require.ensure([], () => r(require('../pages/activity/zmxy')), 'activity_zmxy')
const activity_zmxySuccess = r => require.ensure([], () => r(require('../pages/activity/zmxySuccess')), 'activity_zmxySuccess')
const thirdPay_thirdDispatch = r => require.ensure([], () => r(require('../pages/thirdPay/thirdDispatch')), 'thirdPay_thirdDispatch')
const items_hongqiaoActivity = r => require.ensure([], () => r(require('../pages/items/hongqiaoActivity')), 'items_hongqiaoActivity')
const items_parkMap = r => require.ensure([], () => r(require('../pages/items/parkMap')), 'items_parkMap')

const Youle_index = r => require.ensure([], () => r(require('../pages/youle/index.js')), 'youle_index')
const Youle_GetCoupon = r => require.ensure([], () => r(require('../pages/youle/GetCoupon')), 'youle_getCoupon')
const Youle_GetOver = r => require.ensure([], () => r(require('../pages/youle/GetOver')), 'youle_getOver')
const jimei_index = r => require.ensure([], () => r(require('../pages/jimei/index.js')), 'jimei_index')
const jimei_jimeiCoupon = r => require.ensure([], () => r(require('../pages/jimei/jimeiCoupon')), 'jimei_jimeiCoupon')
const jimei_jimeiSuccess = r => require.ensure([], () => r(require('../pages/jimei/jimeiSuccess')), 'jimei_jimeiSuccess')

// 无人值守 业务
const unls_generateOrder = r => require.ensure([], () => r(require('../pages/unlicensed/generateOrder')), 'unls_generateOrder')
const unls_orderError = r => require.ensure([], () => r(require('../pages/unlicensed/orderError')), 'unls_orderError')
const unls_scanPayDispatch = r => require.ensure([], () => r(require('../pages/unlicensed/scanPayDispatch')), 'unls_scanPayDispatch')
const unls_scanExitPayDispatch = r => require.ensure([], () => r(require('../pages/unlicensed/scanExitPayDispatch')), 'unls_scanExitPayDispatch')
const unls_searchOrder = r => require.ensure([], () => r(require('../pages/unlicensed/searchOrder')), 'unls_searchOrder')
const alipayVipCard_callback = r => require.ensure([], () => r(require('../pages/alipayVipCard/callback')), 'alipayVipCard_callback')
// const items_qdNorthStation= r => require.ensure([], () =>
// r(require('../pages/items/qdNorthStation')), 'items_aqdNorthStation')
const xstaohuajie = r => require.ensure([], () => r(require('../pages/xstaohuajie/index')), 'xstaohuajie')

const merchant_pc_scan = r => require.ensure([], () => r(require('../pages/merchant/merchant_pc_scan.js')), 'merchant_pc_scan')
//三方签约免密
const thirdSignUserAgreement = r => require.ensure([], () => r(require('../pages/thirdSign/thirdSignUserAgreement')), 'thirdSignUserAgreement')
const thirdSign_sancDispatch = r => require.ensure([], () => r(require('../pages/thirdSign/scanDispatch')), 'scanDispatch')
const thirdSign_sign = r => require.ensure([], () => r(require('../pages/thirdSign/sign')), 'sign')
const thirdSign_signResult = r => require.ensure([], () => r(require('../pages/thirdSign/signResult')), 'signResult')
//支付宝签约免密活动
const aliPayAutoPaySign_sign = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySign/sign')), 'aliPayAutoPaySign_sign')
const aliPayAutoPaySign_app_sign = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySign/sign')), 'aliPayAutoPaySign_app_sign')
const weixinAdPage = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySign/weixinAdPage')), 'weixinAdPage')
const signSuccess = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySign/signSuccess')), 'signSuccess')
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
//支付宝签约免密活动(后来上的新版)
const aliPayAutoPaySign_sign_new = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySignNew/sign')), 'aliPayAutoPaySign_sign_new')
const aliPayAutoPaySign_app_sign_new = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySignNew/sign')), 'aliPayAutoPaySign_app_sign_new')
const weixinAdPage_new = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySignNew/weixinAdPage')), 'weixinAdPage_new')
const signSuccess_new = r => require.ensure([], () => r(require('../pages/aliPayAutoPaySignNew/signSuccess')), 'signSuccess_new')
const login_new = r => require.ensure([], () => r(require('../pages/login/newLogin')), 'login_new')
//一元购五元券活动
const oneToFiveCoupon_buyCoupons = r => require.ensure([], () => r(require('../pages/oneToFiveCoupon/buyCoupons')), 'oneToFiveCoupon_buyCoupons')
const oneToFiveCoupon_buyResult = r => require.ensure([], () => r(require('../pages/oneToFiveCoupon/buyResult')), 'oneToFiveCoupon_buyResult')

const wechat_img_text = r => require.ensure([], () => r(require('../pages/wechatImgText/index')), 'wechat_img_text')

const wechatOpenAuthRedirect = r => require.ensure([], () => r(require('../pages/wechatOpenAuth/redirect.vue')), 'wechatOpenAuthRedirect')
const wechatOpenAuthIndex = r => require.ensure([], () => r(require('../pages/wechatOpenAuth/index.vue')), 'wechatOpenAuthIndex')
const wechatOpenAuthAuthSuccess = r => require.ensure([], () => r(require('../pages/wechatOpenAuth/authSuccess.vue')), 'wechatOpenAuthAuthSuccess')
const wechatOpenAuthTestAuth = r => require.ensure([], () => r(require('../pages/wechatOpenAuth/testAuth.vue')), 'wechatOpenAuthTestAuth')
const fengxun_findcarport = r => require.ensure([], () => r(require('../pages/fengxun/findcarport.vue')), 'fengxun_findcarport')

// 开放端小B业务
const oweOrderPay = r => require.ensure([], () => r(require('../pages/openEndSmallB/oweOrderPay')), 'oweOrderPay')
const oweOrderPaySuccess = r => require.ensure([], () => r(require('../pages/openEndSmallB/oweOrderPaySuccess')), 'oweOrderPaySuccess')

// 虹桥机场微信停车平台免密支付
const weixinMianmiOfHongqiao = r => require.ensure([], () => r(require('../pages/mianmi/weixinOfHongqiao.vue')), 'weixinMianmiOfHongqiao')
const weixinMianmiOfHongqiaoMain = r => require.ensure([], () => r(require('../pages/mianmi/hongqiaoMain.vue')), 'weixinMianmiOfHongqiaoMain')

// 礼品兑换
const exchangeCoupon = r => require.ensure([], () => r(require('../pages/exchangeCoupon/index.vue')), 'exchangeCoupon')
const exchangeCouponAuth = r => require.ensure([], () => r(require('../pages/exchangeCoupon/index.js')), 'exchangeCouponAuth')


//颐堤港会员缴费功能
const ydgVipIndex = r => require.ensure([], () => r(require('../pages/ydgVip/index.vue')), 'ydgVipIndex')
const ydgVipAddCar = r => require.ensure([], () => r(require('../pages/ydgVip/add_car.vue')), 'ydgVipAddCar')
const ydgVipCouponList = r => require.ensure([], () => r(require('../pages/ydgVip/couponList.vue')), 'ydgVipCouponList')
const ydgVipHistoryCoupon = r => require.ensure([], () => r(require('../pages/ydgVip/historyCoupon.vue')), 'ydgVipHistoryCoupon')
const ydgVipPayDetail = r => require.ensure([], () => r(require('../pages/ydgVip/payDetail.vue')), 'ydgVipPayDetail')
const ydgVipPaySuccess = r => require.ensure([], () => r(require('../pages/ydgVip/paySuccess.vue')), 'ydgVipPaySuccess')

//东方广场聚合二维码
const prePayForDfgc_index = r => require.ensure([], () => r(require('../pages/prePayForDfgc/index')), 'prePayForDfgc_index')

const parkingReport_login = r => require.ensure([], () => r(require('../pages/parkingReport/login')), 'parkingReport_login')
const parkingReport_generateReport = r => require.ensure([], () => r(require('../pages/parkingReport/generateReport')), 'parkingReport_generateReport')
const parkingReport_newUser = r => require.ensure([], () => r(require('../pages/parkingReport/newUser')), 'parkingReport_newUser')
const parkingReport_ownReport = r => require.ensure([], () => r(require('../pages/parkingReport/ownReport')), 'parkingReport_ownReport')

//人保兑换码
const renbao_exchange = r => require.ensure([], () => r(require('../pages/renbao/exchange')), 'renbao_exchange')

const router = new VueRouter({
    base: 'tcapi_web',
    mode: 'history',
    saveScrollPosition: true,
    routes: [
        {
            path: '*',
            component: app_userAgreement,
            meta: {
                title: '隐私政策'
            }
        },

        //app

        {
            path: '/app/userAgreement',
            component: app_userAgreement,
            meta: {
                title: '用户协议'
            }
        }, {
            path: '/app/privacyPolicy',
            component: app_privacyPolicy,
            meta: {
                title: '隐私政策'
            }
        }, {
            path: '/mqtt/mqtt',
            component: mqtt,
            meta: {
                title: '隐私政策'
            }
        }, {
            path: '/sb/scanPayDispatch',
            component: sb_scanPayDispatch,
            meta: {
                title: ''
            }
        }, {
            path: '/invoice/scanDispatch',
            component: invoice_scanDispatch,
            meta: {
                title: ''
            }
        }, {
            path: '/items/aboutBalance',
            component: items_aboutBalance,
            meta: {
                title: '关于余额'
            }
        }, {
            path: '/items/aboutCar',
            component: items_aboutCar,
            meta: {
                title: '关于车辆'
            }
        }, {
            path: '/items/aboutCoupon',
            component: items_aboutCoupon,
            meta: {
                title: '关于停车券'
            }
        }, {
            path: '/items/aboutOrder',
            component: items_aboutOrder,
            meta: {
                title: '关于订单'
            }
        }, {
            path: '/items/aboutPay',
            component: items_aboutPay,
            meta: {
                title: '关于支付方式'
            }
        }, {
            path: '/items/payAgreement',
            component: items_payAgreement,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/items/preferentialRules',
            component: items_preferentialRules,
            meta: {
                title: '优惠规则'
            }
        }, {
            path: '/test/test',
            component: test,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/test/dispatch',
            component: test_dispatch,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/test/abc',
            component: test_abc,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/test/def',
            component: test_def,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/test/fff',
            component: test_fff,
            meta: {
                title: '支付协议'
            }
        }, {
            path: '/monitor/abnormalPark',
            component: monitor_abnormalPark,
            meta: {
                title: '异常车场监控'
            }
        }, {
            path: '/items/qdNorthStation',
            component: items_qdNorthStation,
            meta: {
                title: '青岛北站停车大放价'
            }
        }, {
            path: '/activity/zmxySuccess',
            component: activity_zmxySuccess,
            meta: {
                title: '活动'
            }
        }, {
            path: '/activity/zmxy',
            component: activity_zmxy,
            meta: {
                title: '活动'
            }
        }, {
            path: '/thirdPay/thirdDispatch',
            component: thirdPay_thirdDispatch,
            meta: {
                title: ''
            }
        }, {
            path: '/items/hongqiaoActivity',
            component: items_hongqiaoActivity,
            meta: {
                title: '活动'
            }
        }, {
            path: '/items/parkMap',
            component: items_parkMap,
            meta: {
                title: ''
            }
        }, {
            path: '/youle',
            component: Youle_index,
            meta: {
                title: ''
            }
        }, {
            path: '/youle/getCoupon',
            component: Youle_GetCoupon,
            meta: {
                title: '领券'
            }
        }, {
            path: '/youle/getOver',
            component: Youle_GetOver,
            meta: {
                title: ''
            }
        }, {
            path: '/jimei',
            component: jimei_index,
            meta: {
                title: '集美礼包大放送'
            }
        }, {
            path: '/jimei/jimeiCoupon',
            component: jimei_jimeiCoupon,
            meta: {
                title: '集美礼包大放送'
            }
        }, {
            path: '/jimei/jimeiSuccess',
            component: jimei_jimeiSuccess,
            meta: {
                title: '集美礼包大放送'
            }
        },

        // 无人值守 业务
        {
            path: '/unlicensed/scanPayDispatch',
            component: unls_scanPayDispatch,
            meta: {
                title: ''
            }
        }, {
            path: '/unlicensed/scanExitPayDispatch',
            component: unls_scanExitPayDispatch
        }, {
            path: '/unlicensed/generateOrder',
            component: unls_generateOrder,
            meta: {
                title: '进场中'
            }
        }, {
            path: '/unlicensed/searchOrder',
            component: unls_searchOrder,
            meta: {
                title: '查询中'
            }
        }, {
            path: '/unlicensed/orderError',
            component: unls_orderError,
            meta: {
                title: ''
            }
        }, {
            path: '/alipayVipCard/callback',
            component: alipayVipCard_callback,
            meta: {
                title: ''
            }
        },
        {
            path: '/xstaohuajie',
            component: xstaohuajie,
            meta: {
                title: '香山桃花节'
            }
        },
        {
            path: '/merchant/merchant_pc_scan',
            component: merchant_pc_scan,
            meta: {
                title: ''
            }
        },
        {
            path: '/thirdSign/thirdSignUserAgreement',
            component: thirdSignUserAgreement,
            meta: {
                title: ''
            }
        },
        {
            path: '/thirdSign/scanDispatch',
            component: thirdSign_sancDispatch,
            meta: {
                title: ''
            }
        },
        {
            path: '/thirdSign/sign',
            component: thirdSign_sign,
            meta: {
                title: ''
            }
        },
        {
            path: '/thirdSign/signResult',
            component: thirdSign_signResult,
            meta: {
                title: ''
            }
        },
        {
            path: '/wechatImgText',
            component: wechat_img_text,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySign/sign',
            component: aliPayAutoPaySign_sign,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySign/appSign',
            component: aliPayAutoPaySign_app_sign,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySign/weixinAdPage',
            component: weixinAdPage,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySign/signSuccess',
            component: signSuccess,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySignNew/sign',
            component: aliPayAutoPaySign_sign_new,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySignNew/appSign',
            component: aliPayAutoPaySign_app_sign_new,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySignNew/weixinAdPage',
            component: weixinAdPage_new,
            meta: {
                title: ''
            }
        },
        {
            path: '/aliPayAutoPaySignNew/signSuccess',
            component: signSuccess_new,
            meta: {
                title: ''
            }
        },
        /////
        {
            path: '/oneToFiveCoupon/buyCoupons',
            component: oneToFiveCoupon_buyCoupons,
            meta: {
                title: ''
            }
        },
        {
            path: '/oneToFiveCoupon/buyResult',
            component: oneToFiveCoupon_buyResult,
            meta: {
                title: ''
            }
        },
        //////

        {
            path: '/wechatOpenAuth/redirect',
            component: wechatOpenAuthRedirect,
            meta: {
                title: ''
            }
        },
        {
            path: '/wechatOpenAuth/index',
            component: wechatOpenAuthIndex,
            meta: {
                title: ''
            }
        },
        {
            path: '/wechatOpenAuth/authSuccess',
            component: wechatOpenAuthAuthSuccess,
            meta: {
                title: ''
            }
        },
        {
            path: '/wechatOpenAuth/testAuth',
            component: wechatOpenAuthTestAuth,
            meta: {
                title: ''
            }
        },
        {
            path: '/fengxun/findcarport',
            component: fengxun_findcarport,
            meta: {
                title: ''
            }
        },
        {
            path: '/login/login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/login/newLogin',
            component: login_new,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/openEndSmallB/oweOrderPay',
            component: oweOrderPay,
            meta: {
                title: ''
            }
        },
        {
            path: '/openEndSmallB/oweOrderPaySuccess',
            component: oweOrderPaySuccess,
            meta: {
                title: ''
            }
        },
        {
            path: '/mianmi/weixinOfHongqiao',
            component: weixinMianmiOfHongqiao,
            meta: {
                title: ''
            }
        },
        {
            path: '/mianmi/hongqiaoMain',
            component: weixinMianmiOfHongqiaoMain,
            meta: {
                title: ''
            }
        },
        {
            path: '/exchangeCoupon',
            component: exchangeCoupon,
            meta: {
                title: ''
            }
        },
        {
            path: '/exchangeCouponAuth',
            component: exchangeCouponAuth,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVipIndex',
            component: ydgVipIndex,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVip/addCar',
            component: ydgVipAddCar,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVip/couponList',
            component: ydgVipCouponList,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVip/historyCoupon',
            component: ydgVipHistoryCoupon,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVip/payDetail',
            component: ydgVipPayDetail,
            meta: {
                title: ''
            }
        },
        {
            path: '/ydgVip/paySuccess',
            component: ydgVipPaySuccess,
            meta: {
                title: ''
            }
        },
        {
            path: '/prePayForDfgc',
            component: prePayForDfgc_index,
            meta: {
                title: ''
            }
        },
        
        {
            path: '/parkingReport/generateReport',
            component: parkingReport_generateReport,
            meta: {
                title: ''
            }
        },
        {
            path: '/parkingReport/login',
            component: parkingReport_login,
            meta: {
                title: ''
            }
        },
        {
            path: '/parkingReport/newUser',
            component: parkingReport_newUser,
            meta: {
                title: ''
            }
        },
        {
            path: '/parkingReport/ownReport',
            component: parkingReport_ownReport,
            meta: {
                title: ''
            }
        },
        {
            path: '/renbao/exchange',
            component: renbao_exchange,
            meta: {
                title: ''
            }
        },
        
        

    ]
})

let clearTjdIntervalAndTimeout = function () {
    console.log('清除开始。。。。。。。。。。。。。。。')
    if (typeof sessionStorage.tjdIntervalArray != 'undefined') {
        let tjdIntervalArray = JSON.parse(sessionStorage.tjdIntervalArray)
        for (var i = 0; i < tjdIntervalArray.length; i++) {
            clearInterval(tjdIntervalArray[i])
        }
    }

    if (typeof sessionStorage.tjdTimeoutArray != 'undefined') {
        let tjdTimeoutArray = JSON.parse(sessionStorage.tjdTimeoutArray)
        for (var i = 0; i < tjdTimeoutArray.length; i++) {
            clearTimeout(tjdTimeoutArray[i])
        }
    }

    console.log('清除结束。。。。。。。。。。。。。。。')
}

// 路由跳转 Logger
router.beforeEach((to, from, next) => {
    // next();
    if (location.protocol === 'http:' && location.href.indexOf('localhost') === -1) {
        location.href = 'https:' + location
                .href
                .substring(5)
    } else {
        console.log(`[route:] ${decodeURI(from.path)} => ${decodeURI(to.path)}`)
        next()
    }
})

router.afterEach((to, from, next) => {
    clearTjdIntervalAndTimeout()
    //取消弹窗
    store.commit('isShowModal',false)
})

export default router
