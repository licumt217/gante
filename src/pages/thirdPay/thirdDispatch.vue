<template>
    <div v-title="''">
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    import {wxUtil} from '../../assets/js/wxUtil'

    export default {
        data(){
            return {
            }
        },
        mounted(){
            //如果从下个页面过来的，直接关闭当前页面
//            if(util.getSession('isToInvoicePage')){
//                wxUtil.closeWindow()
//            }else{
                this.init();
//            }



        },
        methods: {
            /**
             * 集美支付
             */
            init: function () {
                let parkId=util.getUrlParam('parkId');
                let parkInfoId=util.getUrlParam('parkInfoId');
                let accountId=util.getUrlParam('accountId');
                let payAmount=util.getUrlParam('payAmount');
                let successUrl=util.getUrlParam('successUrl');
                let failUrl=util.getUrlParam('failUrl');
                let channel=util.getUrlParam('channel');

                if(util.isWeixinBrowserOnly()){

                    location.href=util.getWechatAuthUrlByAbsPath(util.constants.tcweixinUrl+'charge/thirdPay',[parkId,parkInfoId,accountId,payAmount,channel,successUrl,failUrl]);


                }else{
                    this.$parent.showTjdModal({
                        errorMsg: "请用微信浏览器打开！",
                    });
                }
            },
        }
    }
</script>


