import { util } from 'util'

export default {
    created() {
        if(util.isWeixinBrowserOnly()){

            location.href='http://ori.xmay.cc/Emporium_Web/payparking/payparking_index.do'
        }else if(util.isAlipayBrowserOnly()){
            if(util.getUrlParam('pmParkId')){
                location.href=util.constants.tcweixinUrl+'prePay/payInPark?pmParkId='+util.getUrlParam('pmParkId')
            }else{
                location.href=util.constants.tcweixinUrl+'prePay/payInPark'
            }

            
        }else{
            this.$parent.showTjdModal({
                errorMsg: "请用微信或支付宝扫码！",
            });
        }
    }
}


