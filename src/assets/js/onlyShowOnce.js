/**
 * 处理入口处中转页面，从后边页面返回到入口页面时直接关闭当前页
 */

import {util} from './tjdUtils'
import {wxUtil} from '../../assets/js/wxUtil'


let onlyShowOnce={
    init:function () {
        let deferred = $.Deferred();
        let promise = deferred.promise();

        window.addEventListener('pageshow', function(e) {
            if(util.getSession('onlyShowOnce')){
                wxUtil.closeWindow();
            }else{
                util.setSession('onlyShowOnce','1')
                deferred.resolve();
            }
        },false);
        setTimeout(()=>{
            deferred.resolve();
        },3000);
        return promise;
    }
}




export {onlyShowOnce}