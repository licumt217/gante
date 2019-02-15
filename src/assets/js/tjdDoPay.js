import {util} from 'util';


const tjdPayManner={

};

/**
 * 微信支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @param callBack:支付成功后的回调函数
 * @returns {*}
 */
tjdPayManner.weixin = function (data,callBack) {
    WeixinJSBridge.invoke('getBrandWCPayRequest', data.secuParam,res=>{
        if(res.err_msg === "get_brand_wcpay_request:ok" ) {
            callBack()
        }
    });
}

/**
 * 支付宝支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.alipay = function (data) {
    util.setSession2Cookie();
    location.href=data.secuParam;
}

/**
 * 招行一网通
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.zhyktKj = function (data) {
    util.setSession2Cookie();

    var obj=data.secuParam;
    var temp_form = document.createElement("form");
    var paramArray=obj.param.split('&');
    var postUrl=obj.url;
    temp_form.action = postUrl;
    temp_form.method = "post";
    temp_form.style.display = "none";
    for (var i=0;i<paramArray.length;i++) {
        var child = document.createElement("input");
        var key=paramArray[i].split('=')[0];
        var value=decodeURIComponent(paramArray[i].split('=')[1]);
        child.type = 'hidden';
        child.name = key;
        child.value = value;
        temp_form.appendChild(child);
    }
    document.body.appendChild(temp_form);
    temp_form.submit();
}

/**
 * 京东wap支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.jdPay = function (data) {
    util.setSession2Cookie();

    var $form;
    $form = $('<form></form>');
    $form.attr('action', data.secuParam);
    $form.attr('method', 'POST');
    $(document.body).append($form);
    $form.submit();
}

/**
 * 苏宁wap支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.suningWapPay = function (data) {
    util.setSession2Cookie();

    var $form;
    $form = $('<form></form>');
    $form.attr('action', data.secuParam);
    $form.attr('method', 'POST');
    $(document.body).append($form);
    $form.submit();
}

/**
 * ios停简单app吊起微信支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.weixinAppIos = function (data) {
    return (
        'objcwx://payChannl/tingjiandan/' +
        util.payChannels.weixinApp +
        '/tingjiandan/secuParam/tingjiandan/' +
        JSON.stringify(data.secuParam)
    )
}

/**
 * Android停简单app吊起微信支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.weixinAppAndroid = function (data) {
    android.onPayment(util.payChannels.weixinApp, JSON.stringify(data.secuParam))
}


/**
 * ios停简单app吊起支付宝
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.alipayAppIos = function (data) {
    return (
        'objc://payChannl/tingjiandan/' +
        util.payChannels.alipayApp +
        '/tingjiandan/secuParam/tingjiandan/' +
        data.secuParam
    )
}

/**
 * ios停简单app吊起支付宝2.0
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.alipayNewAppIos = function (data) {
    window.webkit.messageHandlers.TingJianDanOC.postMessage({
        "payChannel":util.payChannels.alipayAppNew,
        "secuParam":data.secuParam,
        "OCType":"TJDPay"
    });
}


/**
 * Android停简单app吊起支付宝支付
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.alipayAppAndroid = function (data) {
    android.onPayment(util.payChannels.alipayApp, data.secuParam)
}

/**
 * Android停简单app吊起支付宝支付2.0
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @returns {*}
 */
tjdPayManner.alipayNewAppAndroid = function (data) {
    android.onPayment(util.payChannels.alipayAppNew, data.secuParam)
}



/**
 * 初始化微信jsAPI
 * @param payManner:支付方式
 * @param data:请求支付接口后返回的数据，一般是Cpay或者insidePay
 * @param callBackUrl:支付成功后的回调url（一般是支付宝或者一网通支付需要带的）
 * @param callBackFunction:支付成功后的回调函数（一般是微信支付成功后的执行函数）
 * @returns {*}
 */
function tjdDoPay(payManner,data,callBackUrl,callBackFunction){
    if(util.isEmpty(payManner)){
        return
    }
    if(typeof data !== "object"){
        return
    }
    if(callBackFunction && (typeof callBackFunction !== 'function')){
        return
    }
    let url = util.isEmpty(callBackUrl)?'':callBackUrl;

    util.setCookie('lastPayMnner',payManner);  //本地记录最近支付方式

    if(payManner==util.payChannels.weixin){//微信
        tjdPayManner.weixin(data,callBackFunction)
    }else if(payManner==util.payChannels.alipay){//支付宝
        tjdPayManner.alipay(data)
    }else if(payManner==util.payChannels.zhyktKj){//招行一网通
        tjdPayManner.zhyktKj(data)
    }else if(payManner==util.payChannels.jdPay){//京东wap支付
        tjdPayManner.jdPay(data)
    }else if(payManner==util.payChannels.suningWapPay){//苏宁wap支付
        tjdPayManner.suningWapPay(data)
    }else if(payManner==util.payChannels.weixinApp){//停简单app吊起微信支付
        if(util.isDispatchPushFromIOS()){
            document.location = tjdPayManner.weixinAppIos(data)
        }else if (util.isDispatchPushFromAndroid()){
            tjdPayManner.weixinAppAndroid(data)
        }
    }else if(payManner==util.payChannels.alipayApp){//停简单app吊起支付宝支付
        if(util.isDispatchPushFromIOS()){
            document.location = tjdPayManner.alipayAppIos(data)
        }else if (util.isDispatchPushFromAndroid()){
            tjdPayManner.alipayAppAndroid(data)
        }
    }else if(payManner==util.payChannels.alipayAppNew){//停简单app吊起支付宝2.0支付
        if(util.isDispatchPushFromIOS()){
            tjdPayManner.alipayNewAppIos(data)
        }else if (util.isDispatchPushFromAndroid()){
            tjdPayManner.alipayNewAppAndroid(data)
        }
    } else {
        return
    }








}




export {tjdDoPay}
