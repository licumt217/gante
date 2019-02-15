/**
 * Created by liqiang on 2017/6/2.
 */
/**
 * 处理ios微信中返回后页面不刷新的问题
 * 添加此js位置在当前业务页面，不是在中转页面。注意！！！
 * @param params
 * @param cssObj
 */

import {util} from './tjdUtils'

window.addEventListener('pageshow', function(e) {
    // 通过persisted属性判断是否存在 BF Cache
    if (e.persisted) {
        if(util.isWeixinBrowserOnly() && util.isIosDevice()){
            location.reload();
        }
    }
},false);

export {}