<template>
    <div v-title="''">
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';


    export default {
        data(){
            return {
            }
        },
        mounted(){

//            车场版小b，或者大B版小b（文哥那里）
            let orderId=util.getUrlParam('orderId');
            if(util.isWeixinBrowserOnly()){

                location.href=util.getWechatAuthUrlByAbsPath(util.constants.tcweixinUrl+'charge/sbScanPay',[orderId]);
            }else if(util.isAlipayBrowserOnly()){

                location.href=util.getAlipayAuthUrlByAbsPath(util.constants.tcweixinUrl+'charge/sbScanPay',[orderId]);
            }else if(util.isSuningBrowerOnly()){
                location.href=util.constants.tcweixinUrl+'charge/sbScanPayForSuning?orderId='+orderId;
            }else{
                this.$parent.showTjdModal({
                    errorMsg: "请用微信、支付宝或苏宁金融App扫码！",
                });
            }
        },
        methods: {
            init: function () {

            },
        }
    }
</script>


