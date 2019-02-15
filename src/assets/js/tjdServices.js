/**
 * Created by liqiang on 2017/6/3.
 */
import { util } from './tjdUtils'
import store from '../../store'


var tjdServices = {
    /**handleExpOwn
     * 通用ajax访问对象
     * @param obj
     * @returns {*}
     */
    commonAjax: function (obj) {
        var deferred = $.Deferred()
        var promise = deferred.promise()
        var myRandom = '?'+Math.random()

        var requestType = 'post', urlPrefix = util.constants.tcserverUrl + 'gateway' + myRandom

        obj.params = util.isEmpty(obj.params) ? {} : obj.params
        if (!util.isEmpty(obj.requestType)) {
            requestType = obj.requestType
        }
        //区分是通用的还是大接口

        try {
            setTimeout(function () {
                $[requestType](urlPrefix, obj.params, function (data) {
                    if (typeof obj.params == 'string' && obj.params.indexOf('|') == -1) {
                        var key = JSON.parse(obj.params).method
                        util.removeSession(key)
                    } else if (typeof obj.params == 'object') {
                        var key = obj.params.method
                        util.removeSession(key)
                    } else {
                    }
                    // alert(JSON.stringify(data));
                    if (obj.data && obj.data.successKey) {//有些接口返回的成功失败值不是isSuccess
                        data.isSuccess = data[obj.data.successKey]
                    }

                    if (data.isSuccess === '0') {
                        deferred.resolve(data)
                    } else if (data.isSuccess === '1') {
                        if ((obj.data && obj.data.handleExpOwn) || (obj.params && JSON.parse(obj.params).handleExpOwn)) {
                            deferred.reject(data)
                        } else {
                            setTimeout(function () {
                                store.commit('modalErrorMsg',data.errorMSG)
                                store.commit('isShowModal',true)

                            }, 150)
                            deferred.reject(data)
                        }

                    } else {
                        if ((obj.data && obj.data.handleExpOwn) || (obj.params && JSON.parse(obj.params).handleExpOwn)) {
                            deferred.reject(data)
                        }else{
                            deferred.reject(data)
                            setTimeout(function () {
                                store.commit('isShowModal',true)
                            }, 150)
                        }
                    }
                }).fail(function (e) {
                })
            }, 35)
        } catch (e) {
            if (typeof obj.params == 'string' && obj.params.indexOf('|') == -1) {
                var key = JSON.parse(obj.params).method
                util.removeSession(key)
            } else if (typeof obj.params == 'object') {
                var key = obj.params.method
                util.removeSession(key)

            }
            deferred.reject(e)
        }



        return promise

    },
    /**
     * 前端通用请求接口
     */
    request: function (obj) {
        var beyondTime = 5000//超时时间，此时间内接口无返回可以重新请求
        //为了防止多次提交，每个方法进来后将在5秒内不能二次访问，除非回调已返回
        //不处理query,find,get,load开头的方法

        if (obj.queryOnly == 1 || obj.method.indexOf('find') == 0 || obj.method.indexOf('select') == 0 || obj.method.indexOf('is') == 0 || obj.method.indexOf('query') == 0 || obj.method.indexOf('get') == 0 || obj.method.indexOf('load') == 0) {
            return tjdServices[obj.method](obj)
        } else {
            if (util.getSession(obj.method) && (new Date().getTime() - Number(util.getSession(obj.method)) < beyondTime)) {
                //如果已超过1.5秒则可以再次请求
                return
            } else {
                util.setSession(obj.method, String(new Date().getTime()))
                return tjdServices[obj.method](obj)
            }
        }

    },
    /**
     * 登录验证
     */
    getLoginInfo: function (isOriginalApplicationJson) {
        var deferred = $.Deferred()
        var promise = deferred.promise()
        var result = ''
        localStorage.isNeedRestoreData = '0';//清除local中的信息
        //分为微信、支付宝、百度地图（没有鉴权）
        //验证登录分两条线（从微信菜单和推送渠道）
        if (!util.isEmpty(sessionStorage.isLogin) && sessionStorage.isLogin === '1') {//已登录
            deferred.resolve(result)

        } else {
            //获取渠道
            var channel = ''
            if (util.isEmpty(sessionStorage.channel)) {
                channel = util.getChannelFromUrl()
            } else {
                channel = util.getChannel()
            }
            util.setPlatformAuthcodePaychannelByChannel(channel)
            if (util.getPlatform() === 'third') {//三方app过来的，如果手机号不为空，则直接登录
                var phone = util.getUrlParam('phone')
                if (phone) {
                    //先通过解密接口拿到解密后的phone
                    tjdServices.aesDecrypt({
                        'data': phone,
                        //"key":""
                    }).then(function (data) {
                        phone = data.result
                        if (util.validates.isValidPhone(phone)) {
                            if (util.isLoginedInThirdBefore(phone)) {//手机号相同才能获取之前用户信息
                                util.setPhone(phone)
                                util.logined()
                                deferred.resolve(result)
                            } else {
                                if (phone) {//直接登录
                                    util.setPhone(phone)
                                    util.logined()
                                    deferred.resolve(result)
                                } else {//返回登录
                                    result = 'unbind'
                                    deferred.reject(result)
                                }
                            }
                        } else {

                            store.commit('modalErrorMsg',"手机号格式不正确！")
                            store.commit('isShowModal',true)

                            deferred.reject(result)
                        }

                    }, function () {
                        result = 'unbind'
                        deferred.reject(result)
                    })
                } else {
                    result = 'unbind'
                    deferred.reject(result)
                }

            } else if (util.isBaidu()) {//如果是百度来源，判断缓存中是否登录过，是的话直接进入
                if (util.isLoginedInBaiduBefore()) {
                    util.logined()
                    deferred.resolve(result)
                } else {
                    result = 'unbind'
                    deferred.reject(result)
                }
            } else if (util.isPushFromWeixin() || util.isPushFromAlipay()) {//微信或支付宝推送；取得openId验证是否已注册
                if (util.isEmpty(util.getOpenId())) {//如果用户未登陆，且从推送进入到业务页面，经过业务页面的登录验证后openId已经有值了。此时返回到登录页面再次进行登录验证时url已经没有参数了，且openId已经有值
                    util.setOpenId(util.getUrlArray()[1])
                }
                handleLogin()

            } else if (util.isPushFromWeixinCityLife()) {//微信城市服务推送；取得openId参数，不用验证是否注册
                util.setOpenId(util.getUrlArray()[1])
                util.logined()
                deferred.resolve(result)
            } else if (util.isFromAndroid() || util.isFromIOS()) {//默认从app过来的都是已登录了

                util.setUserId(util.getUrlArray()[1])
                util.setTopic(util.getUrlArray()[2])
                //从app的车位市场和停车服务包进来都先调用此方法，同时军哥给app的推送经戴总他们包装后进入服务详情页面后也调用此方法【下边这句不确定暂时有用没】
                //if(!util.isEmpty(util.getUrlParam('omRentId'))){
                //	sessionStorage.omRentId_rent=util.getUrlParam('omRentId');
                //}
                util.logined()
                deferred.resolve(result)
            } else {
                handleLogin()
            }
            function handleLogin() {
                //此处加if判断是因为：有些手机在上边代码resolve后还继续执行之后代码
                if (sessionStorage.isLogin !== '1' && result !== 'unbind') {
                    //通过渠道获取授权码
                    var code = util.getUrlParam(util.getAuthCodeColumn())
                    //百度没有授权码
                    //code和openId都没有的话返回登录页面
                    if (!util.isBaidu() && util.isEmpty(code) && util.isEmpty(sessionStorage.openId)) {
                        //没有授权码，可能是通过浏览器直接访问，需要特殊处理。。。。后期操作
                        result = 'unbind'
                        deferred.reject(result)
                    }
                    code = code || 'baidu'
                    setTimeout(function () {
                        //兼容mgr接口的content-type是application/json格式的
                        if (isOriginalApplicationJson) {
                            $.ajaxSetup({
                                contentType: 'application/x-www-form-urlencoded',
                            })
                        }

                        $.post(util.constants.wxControlUrl + 'api/isLogin', {
                            code: code,
                            openId: util.getOpenId(),
                            platForm: util.getPlatform(),
                            channel: util.getChannel()
                        }, function (data) {
                            if (isOriginalApplicationJson) {
                                $.ajaxSetup({
                                    contentType: 'application/json',
                                })
                            }

                            if (data.isSuccess === '0') {
                                data = data.result
                                sessionStorage.headimgurl = data.headimgurl
                                if (data.subscribe == '1') {//已关注停简单生活号或公众号
                                    util.setIsSubscribe()
                                }
                                if (data.isAnonymous === '0') {//是匿名用户
                                    util.setTempUser()
                                }
                                sessionStorage.accessToken=data.accessToken;
                                sessionStorage.userId = data.cmUserId
                                sessionStorage.phone = data.phone
                                sessionStorage.openId = data.openId
                                util.setBaseWXInfo()
                                util.logined()
                                deferred.resolve(result)
                            } else {
                                if (data.isSuccess === '1') {
                                } else {
                                }
                                deferred.reject(result)
                            }
                        })
                    }, 35)

                }

            }

        }
        return promise
    },
    /**
     * 判断用户是否已经认证芝麻信用
     * @param obj
     * @returns {*}
     */
    isZmxyCertify: function (obj) {
        var command = 'activity'
        var method1 = 'isZmxyCertify'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
        a = a.toJson()
        return tjdServices.commonAjax({
            params: a,
        })
    },
    /**
     * 用户进行芝麻认证
     * @param obj
     * @returns {*}
     */
    zmxyCertify: function (obj) {
        var command = 'activity'
        var method1 = 'zmxyCertify'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('orderNo', obj.orderNo)
            .put('handleExpOwn', obj.handleExpOwn ? true : false)
        a = a.toJson()

        return tjdServices.commonAjax({
            params: a,
        })
    },
    /**
     * 根据用户输入的手机号获取验证码
     */
    getPhoneCode: function (obj) {
        var command = 'user'
        var method1 = 'getPhoneCode'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('phone', obj.phone)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
    * 将微信账户或支付宝账户绑定停简单账户
    * @param obj
    * @returns {*}
    */
    wxBind: function (obj) {

        var command = 'user'
        var method1 = 'h5Bind'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('phone', obj.phone)
            .put('phoneCode', obj.yzm)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    obtainCoupon: function (obj) {
        var command = 'jm'
        var method1 = 'obtainCoupon'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('phone', obj.phone)
            .put('phoneCode', obj.yzm)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 查询用户是否同意停简单隐私协议
     */
    isAgreeTJDP: function (obj) {
        var command = 'user'
        var method1 = 'isAgreeTJDP'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('handleExpOwn', obj.handleExpOwn?'true':'false')
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 用户同意停简单隐私协议记录保存
     * @param obj
     * @returns {*}
     */
    agreeTJDP: function (obj) {
        var command = 'user'
        var method1 = 'agreeTJDP'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('agreementVersion', obj.agreementVersion)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 查询用户是否同意停简单隐私协议
     */
    checkIsAgreeProtocol: function () {
        var deferred = $.Deferred()
        var promise = deferred.promise()
        tjdServices.request({
            method:'isAgreeTJDP',
            handleExpOwn: true,
        }).then(data=>{
            if (data.isSuccess === '0') {
                if(data.isAgree && data.isAgree === 'true'){
                    deferred.resolve(data.isAgree)
                }else {
                    //新的弹窗
                    $.showTipModal({
                        titleText:'温馨提示',
                        oneButtonMessage:'同意并继续',
                        cancelButtonMessage:'查看详情',
                        isProtocalTipModal:true,
                        withTwoButtons:1,
                        callBack:()=>{
                            tjdServices.request({
                                method: 'agreeTJDP',
                                agreementVersion:data.agreementVersion
                            }).then(data2 => {
                                $.hideTjdTipModal();
                            })
                        },
                        callBackForCancel:()=>{
                            location.href = util.constants.tcapiWebUrl+'app/userAgreement';
                        }
                    })
                    deferred.reject(data)
                }
            }
        },data=>{
            if (data.isSuccess === '1') {
                store.commit('modalErrorMsg',data.errorMSG)
                store.commit('isShowModal',true)
            } else {
                store.commit('isShowModal',true)
            }
            deferred.reject(data)
        });
        return promise
    },

  /**
   * 支付宝会员卡开卡
   * @param obj
   * @returns {*}
   */
    applyAlipayCard: function (obj) {
        var command = 'userMember'
        var method1 = 'applyAlipayCard'
        var a = util.getCommonMap()
          .put('command', command)
          .put('method', method1)
          .put('token', obj.token)
          .put('requestId', obj.requestId)
          .toJson()
        return tjdServices.commonAjax({
          params: a,
          isBigInterface: true
        })
    },
    getParkCount: function (obj){
        var command = 'park'
        var method1 = 'getParkCount'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('parkIds', obj.parkIds)
            // .put('platForm', util.getPlatform())
            .put('channel', util.getChannel())
            .toJson()
            return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 查询用户自动付款列表
     * @returns {*}
     */
    getAllAutoPay: function () {
        var command = 'wallet'
        var method1 = 'getAllAutoPay'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 查询指定类型代扣的签约状态
     * @returns {*}
     */
    getAutoPayState: function (obj) {
        var command = 'wallet'
        var method1 = 'getAutoPayState'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('signType', obj.signType)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 自动付款签约【百度/支付宝】
     * @param signType
     * @param returnUrl
     * @param accessInfo 支付宝签约用到，不同的签约类型
     */
    autoPaySign: function (obj) {
        var command = 'wallet'
        var method1 = 'autoPaySign'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('signType', obj.signType)
            .put('returnUrl', obj.returnUrl)
            .put('accessInfo', obj.accessInfo)
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 根据车牌号查询车位信息
     * 反寻-峰寻
     * @param obj
     * @returns {*}
     */
    findCar: function (obj) {
        var command = 'parkingSpace'
        var method1 = 'findCar'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('parkId', obj.parkId)
            .put('carNum', obj.carNum)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 根据车场ID查询车牌号默认归属地
     * @param obj
     * @returns {*}
     */
    queryDefaultProvince: function (obj) {
        var command = 'park'
        var method1 = 'queryDefaultProvince'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('parkId', obj.parkId)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 查询指定的活动当前状态
     * @param obj
     * @returns {*}
     */
    getActivityStatus: function (obj) {
        var command = 'activity'
        var method1 = 'getActivityStatus'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('activityId', obj.activityId?obj.activityId:'')
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },

    /**
     * 查询商品详情
     * @param obj
     * @returns {*}
     */
    getGoodsInfo: function (obj) {
        var command = 'shop'
        var method1 = 'getGoodsInfo'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('goodsId', obj.goodsId?obj.goodsId:'')
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },

    /**
     * 判断用户是否能购买指定数量的商品
     * @param obj
     * @returns {*}
     */
    canBuy: function (obj) {
        var command = 'shop'
        var method1 = 'canBuy'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('buyNum', obj.buyNum?obj.buyNum:'')
            .put('goodsId', obj.goodsId?obj.goodsId:'')
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },

    /**
     * 购买商品支付下单
     * @param obj
     * @returns {*}
     */
    pay: function (obj) {
        var command = 'shop'
        var method1 = 'pay'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('buyNum', obj.buyNum?obj.buyNum:'')
            .put('goodsId', obj.goodsId?obj.goodsId:'')
            .put('payChannel', obj.payChannel?obj.payChannel:'')
            .put('amount', obj.amount?obj.amount:'')
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },

    /**
     * 查询用户指定的活动的参与次数
     * @param obj
     * @returns {*}
     */
    getPartInTimes: function (obj) {
        var command = 'activity'
        var method1 = 'getPartInTimes'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('activityId', obj.activityId?obj.activityId:'')
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    /**
     * 用于兑换优惠券
     * @param obj
     * @returns {*}
     */
    exchange(obj) {
        var command = 'wallet'
        var method1 = 'exchange'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('code', obj.code)
            .put('channel', obj.channel)
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
    
      /**
     * 停车报告首页
     * @param obj
     * @returns {*}
     */
    getAvgAnnualReport(obj) {
        var command = 'report'
        var method1 = 'getAvgAnnualReport'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true
        })
    },
     /**
     * 根据手机号生成停车报告
     * @param obj
     * @returns {*}
     */
    getUnionUserAnnualReportByPhoneAndCode(obj) {
        var command = 'report'
        var method1 = 'getUnionUserAnnualReportByPhoneAndCode'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('phone', obj.phone)
            .put('phoneCode', obj.phoneCode)
            // .put('channel', obj.channel)
            // .put('platform', obj.platform)
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true,
        })
    },
   /**
     * 根据用户ID生成停车报告
     * @param obj
     * @returns {*}
     */
    getUnionUserAnnualReportByUserId(obj) {
        var command = 'report'
        var method1 = 'getUnionUserAnnualReportByUserId'
        var a = util.getCommonMap()
            .put('command', command)
            .put('method', method1)
            .put('cmUserId', obj.cmUserId)
            .put('handleExpOwn', obj.handleExpOwn)
            .toJson()
        return tjdServices.commonAjax({
            params: a,
            isBigInterface: true,
        })
    },


}

export { tjdServices }
