/**
 * 微信和支付宝浏览器，返回上一页时，直接关闭当前页面
 */
import { wxUtil } from '../assets/js/wxUtil'
import {util} from 'util';
export default {
    created(){
        function pushHistory() {
            let url=location.href;
            let urlArray=url.split('/');
            let state = {
                title: "title",
                url: urlArray[urlArray.length-1]
            };
            sessionStorage.backToClose=location.pathname;
            window.history.pushState(state, state.title, state.url);
        }
        if(!sessionStorage.backToClose){
            pushHistory();
            window.addEventListener("popstate", function(e) {
                if(e.state){
                    if(!e.state.url && location.href.indexOf(sessionStorage.backToClose)!==-1){
                        close();
                    }
                }else{

                    close();
                }

                // alert(e.state)
                // alert(e.state.url)


                function close () {
                    if(util.isWeixinBrowserOnly() || util.isAlipayBrowserOnly()){
                        wxUtil.closeWindow();
                    }else{
                        document.location='objccloseweb://';//关闭停简单app页面
                    }
                }
            }, false);
        }



    }
};