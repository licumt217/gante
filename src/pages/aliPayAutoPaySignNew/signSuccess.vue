<template>
    <div v-title="">
        <section id="wrapper" class="wrapper">
            <!--<div class="go2CouponPage"><span @click="go2CouponPage">查看优惠券</span></div>-->
            <div class="top">
                <img src="./images/successIcon.png" alt="">
                <p>免密支付开通成功</p>
            </div>
            <div class="bottom">
                <img src="./images/successImg.png" alt="">
                <p>20元停车立减券已奉上</p>
                <span>请在“个人中心”-“{{isTjdApp?'优惠券':'我的钱包'}}”查看！</span>
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'
    import {wxUtil} from '../../assets/js/wxUtil'
    import {onlyShowOnce} from '../../assets/js/onlyShowOnce'

    export default {
        data() {
            return {
                hasBind:false,
                isTjdApp:false
            }
        },
        mounted: function() {
                let isSignSuccess = util.getUrlParam('is_success')
                this.isTjdApp = util.getUrlParam('dispatchFrom') == "app"?true:false
                if(isSignSuccess == 'T'){
                    util.setTitle("开通成功")
                    $('.wrapper').show()
                }else if(isSignSuccess == 'F') {
                    onlyShowOnce.init().then(()=>{
                        location.href = util.getAlipayAuthUrlByAbsPath(util.constants.tcapiWebUrl+'aliPayAutoPaySignNew/sign')
                    });
                }else {
                    this.$parent.showTjdModal({
                        errorMsg:"登陆失败",
                        callBack:this.close
                    });
                }

        },
        methods: {
            go2CouponPage(){
                location.href = util.getAlipayAuthUrlByAbsPath(util.constants.tcweixinUrl+'myWallet/coupon')
            },
            close() {
                if(util.isDispatchPushFromApp()){
                    document.location='objccloseweb://';//关闭停简单app页面
                }else {
                    wxUtil.closeWindow()
                }
            },
        }
    }

</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapper {
    background: #fff;
    padding: 9% 6% 0;
    display: none;
}
.go2CouponPage{
    font-size: 12px;
    text-align: right;
    color: #aeb5c2;
    span{
        border-bottom: 1px solid #aeb5c2;
    }
}
.top{
    text-align: center;
    overflow: hidden;
    color: #3a5076;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    img{
        width: 15%;
        margin: 9% 0 5%;
    }
}
.bottom{
    margin-top: 20%;
    text-align: center;
    overflow: hidden;
    letter-spacing: 1px;
    img{
        width: 55%;
    }
    p{
        font-size: 19px;
        color: #28bef1;
        font-weight: 500;
        margin: 5% 0 2%;
        letter-spacing: 0;
    }
    span{
        color: #aeb5c2;
    }
}
</style>
