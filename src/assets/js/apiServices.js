import {util} from './tjdUtils'
import axios from 'axios'
let apiAxios = axios.create({
    baseURL: util.constants.tcserverUrl
})
let config={
    twoRequestBeyondTime:2000,
    beyondTimeMsg:`请求过于频繁，请稍等${config.twoRequestBeyondTime/1000}秒！`,
    unlimitMethodArray:['find','select','is','query','get','load',],//可以一直请求的方法
}

apiAxios.defaults.timeout = 30000
apiAxios.defaults.headers.post['Content-Type'] = 'application/json'

apiAxios.interceptors.response.use(response => {
    let data=response.data;
    let errorMsg='';
    switch (data.isSuccess) {
        case "0":
            return Promise.resolve(data)
            break;
        case "1":
            errorMsg = data.errorMSG
            break;
        case "2":
            errorMsg = '网络繁忙请稍等'
            break;
        default:
            errorMsg = '接口返回信息格式不正确，无isSuccess!'
            break;
    }
    return Promise.reject(errorMsg)
}, error => {
    console.log(error.response)
    console.log(error.message)
    if (error.response) {
        let errorMsg = ''
        switch (error.response.status) {
            case 500:
                errorMsg = '服务器异常'
                break;
            case 404:
                errorMsg = '请求接口地址不存在'
                break;
            case 405:
                errorMsg = '接口地址有误'
                break;
            case 400:
                errorMsg = error.response.statusText
            case 0:
                errorMsg = '网络异常，请检查网络'
                break;
            default:
                errorMsg = '未知异常'
                break;
        }
        return Promise.reject(errorMsg)
    } else if(error.message.contains('timeout')){
        let msg='请求超时'
        return Promise.reject(msg)
    } else {
        return Promise.reject(error.message)
    }
})



let apiServices={
    /**
     * 前端通用请求接口
     */
    request: function (obj) {
        let beyondTime = config.twoRequestBeyondTime//超时时间，此时间内接口无返回可以重新请求
        //为了防止多次提交，每个方法进来后将在5秒内不能二次访问，除非回调已返回
        //不处理query,find,get,load开头的方法

        if (obj.queryOnly || config.unlimitMethodArray.find((item)=>{
                return obj.method.startsWith(item);
            })) {
            return apiServices[obj.method](obj)
        } else {
            let methodKey=util.getSession(obj.method);

            if (methodKey && ((new Date().getTime() - Number(methodKey)) < beyondTime)) {
                return Promise.reject(config.beyondTimeMsg);
            } else {//如果已超过3秒则可以再次请求
                util.setSession(obj.method, new Date().getTime())
                return apiServices[obj.method](obj)
            }
        }

    },
    getCommonInfo:function () {
        return {
            openId:'xx',
            version:'4.0',
            platform:'weixin'
        }
    },
    ajax:function (obj) {
        obj.url='gateway';
        return apiAxios[obj.type||'post'](obj.url, Object.assign({}, apiServices.getCommonInfo(), obj))
    },


    /**
     * 根据平台查询支付方式
     * @param obj
     * @returns {*}
     */
    aaa: function(obj) {
        obj.command = 'payWay';
        obj.method  = 'getSupportPayWaylist';

        return apiServices.ajax(obj)


    },

}

export {apiServices};