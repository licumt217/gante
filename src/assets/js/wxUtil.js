/**
 * Created by liqiang on 2017/6/2.
 */
/**
 * Created by liqiang on 2017/5/26.
 */

import { util } from 'util'

var wx = require('weixin-js-sdk')
import store from '../../store'

var wxUtil = {}
wxUtil.closeWindow = function () {
    var isAlipay = util.isAlipayBrowserOnly()
    var isWeixin = util.isWeixinBrowserOnly()
    util.clearAllCookies()//因为清除后缓存中信息都清空了，所以需要先将平台信息存到变量中去
    if (isAlipay) {
        AlipayJSBridge.call('exitApp')
    } else if (isWeixin) {
        if (util.isWxReady()) {
            wx.closeWindow()
        } else {
            wxUtil.initWxJsAPI().then(function () {
                wx.closeWindow()
            })
        }

    }
}
wxUtil.back2WeixinSmall = function (param) {
    wx.miniProgram.navigateTo(param)

}
wxUtil.isInWeixinSmall = function () {
    return window.__wxjs_environment === 'miniprogram'
}
/**
 * 初始化微信jsAPI
 * @param array ：要使用的微信js方法数组
 * @returns {*}
 */
wxUtil.initWxJsAPI = function (isFromApplicationJson) {

    var array = ['onMenuShareTimeline', 'updateAppMessageShareData' ,'onMenuShareAppMessage','updateTimelineShareData', 'onMenuShareQQ', 'openLocation', 'getLocation', 'closeWindow', 'scanQRCode', 'chooseImage', 'uploadImage', 'getNetworkType', 'getLocalImgData', 'chooseInvoice']
    var deferred = $.Deferred()
    var promise = deferred.promise()
    //支付宝等非微信浏览器直接resolve
    if (util.isWeixinBrowserOnly()) {
        if (util.isWxReady()) {
            deferred.resolve()
        } else {

            let realParam = {
                url: location.href,
                timestamp: '20150907',
                noncestr: 'liqiang'
            }
            setTimeout(function () {
                $.post(util.constants.wxControlUrl + 'api/findWxJsSignature', realParam, function (data) {
                    if (data.isSuccess === '0') {
                        data = data.result
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.noncestr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名，见附录1
                            jsApiList: array// 必填，需要使用的JS接口列表
                        })
                        wx.ready(function () {
                            if (isFromApplicationJson) {
                                $.ajaxSetup({
                                    contentType: 'application/json',
                                })
                            }

                            deferred.resolve(wx)
                        })

                    } else if (data.isSuccess === '1') {
                        store.commit('modalErrorMsg', data.errorMSG)
                        store.commit('isShowModal', true)

                        if (isFromApplicationJson) {
                            $.ajaxSetup({
                                contentType: 'application/json',
                            })
                        }
                        deferred.reject()
                    } else {
                        if (isFromApplicationJson) {
                            $.ajaxSetup({
                                contentType: 'application/json',
                            })
                        }
                        deferred.reject()
                        store.commit('isShowModal', true)
                    }
                })
            }, 50)
        }
    } else {
        deferred.resolve()
    }

    return promise

}
/**
 * 图片选择(如果是从调用mgr接口的页面过来的，则contentTYpe是application/json，此时需要手动改为application/x-www-form-urlencoded,当wxControl接口调用完毕再还原)
 */
wxUtil.wxChooseImage = function (isFromApplicationJson) {
    let flag = (isFromApplicationJson ? true : false)
    if (flag) {
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded',
        })
    }

    var deferred = $.Deferred()
    var promise = deferred.promise()
    wxUtil.initWxJsAPI(flag).then(function () {

        wx.chooseImage({
            count: 1,
            // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            success: function (res) {
                let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                deferred.resolve(localIds)
            },
        })
    })

    return promise
}

wxUtil.chooseInvoice = function () {
    var deferred = $.Deferred()
    var promise = deferred.promise()
    wxUtil.initWxJsAPI().then(function () {
        console.log(11)

        wx.invoke('chooseInvoice', {
            'timestamp': 1489030247,
            'nonceStr': 'p(6N&7WOAF',
        }, function (res) {
            alert(JSON.stringify(res))
            console.log(res);

            deferred.resolve(res)
        });
        console.log(22)
    });

    return promise;
}

/**
 * 此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。
 */
wxUtil.getLocalImgData = function (isFromApplicationJson, localId) {
    let flag = (isFromApplicationJson ? true : false)
    if (flag) {
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded',
        })
    }

    var deferred = $.Deferred()
    var promise = deferred.promise()
    wxUtil.initWxJsAPI(flag).then(function () {

        wx.getLocalImgData({
            localId: localId, // 图片的localID
            success: function (res) {
                var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                deferred.resolve(localData)
            }
        })
    })

    return promise
}

/**
 * 上传到微信服务器
 * @param isFromApplicationJson
 * @param localId
 */
wxUtil.uploadImage = function (isFromApplicationJson, localId) {
    let flag = (isFromApplicationJson ? true : false)
    if (flag) {
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded',
        })
    }

    var deferred = $.Deferred()
    var promise = deferred.promise()
    wxUtil.initWxJsAPI(flag).then(function () {

        wx.uploadImage({
            localId: localId, // 图片的localID
            success: function (res) {
                var serverId = res.serverId // 返回图片的服务器端ID
                deferred.resolve(serverId)
            }
        })
    })

    return promise
}

//网络状态
wxUtil.startRecord = function () {
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        }
    })
}

/**
 * 分享朋友圈监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onShareFriendsZone = function (obj) {
    obj = obj || {
            title: 'title',
            link: util.constants.tcweixinUrl + 'login/login.html',
            imgUrl: '',
        }
    var deferred = $.Deferred()
    var promise = deferred.promise()
    wx.onMenuShareTimeline({
        title: obj.title, // 分享标题
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
            deferred.resolve({
                type: 'success'
            })
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
            deferred.resolve({
                type: 'cancel'
            })
        }
    })
    return promise

}
/**
 * 分享朋友监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onShareFriends = function (obj) {
    obj = obj || {
            title: 'title',
            link: util.constants.tcweixinUrl + 'login/login.html',
            imgUrl: '',
            desc: ''
        }
    var deferred = $.Deferred()
    var promise = deferred.promise()
    wx.onMenuShareAppMessage({
        title: obj.title, // 分享标题
        desc: obj.desc, // 分享描述
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        // 用户确认分享后执行的回调函数
        success: function () {
            deferred.resolve({
                type: 'success'
            })
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
            deferred.resolve({
                type: 'cancel'
            })
        }
    })
    return promise
}

/**
 * 新的分享朋友圈监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onNewShareFriendsZone = function (obj) {
    obj = obj || {
            title: 'title',
            link: util.constants.tcweixinUrl + 'login/login.html',
            imgUrl: '',
        }
    var deferred = $.Deferred()
    var promise = deferred.promise()
    
    wx.updateTimelineShareData({
        title: obj.title, // 分享标题
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
            // deferred.resolve({
            //     type: 'success'
            // })
        },
    })

    return promise
}

/**
 * 新的分享朋友监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onNewShareFriends = function (obj) {
    obj = obj || {
            title: 'title',
            link: util.constants.tcweixinUrl + 'login/login.html',
            imgUrl: '',
            desc: ''
        }
    var deferred = $.Deferred()
    var promise = deferred.promise()
    wx.updateAppMessageShareData({
        title: obj.title, // 分享标题
        desc: obj.desc, // 分享描述
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        success: function () {
        },
    })

    return promise
}
/**
 * 获取地理位置接口
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.getLocation = function (obj) {
    obj = obj || {
            type: 'wgs84',// 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        }
    var deferred = $.Deferred()
    var promise = deferred.promise()

    if (util.isWeixinBrowserOnly()) {
        wxUtil.initWxJsAPI().then(function () {
            wx.getLocation({
                type: obj.type,
                success: function (data) {
                    var res = {
                        lat: data.latitude,
                        lng: data.longitude,
                        speed: data.speed,
                        accuracy: data.accuracy
                    }
                    deferred.resolve(res)
                },
            })
        })

    } else if (util.isAlipayBrowserOnly()) {
        AlipayJSBridge.call('getCurrentLocation', {bizType: 'didi'}, function (result) {
            if (result.error) {
                deferred.reject(result.errorMessage)
            } else {
                deferred.resolve({
                    lat: result.latitude,
                    lng: result.longitude
                })
            }
        })
    }
    return promise

}

export { wxUtil }
