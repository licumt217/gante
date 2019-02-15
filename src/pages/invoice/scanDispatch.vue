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
                preInvoiceChannelList:['taiguli','kefu','wx_ticket','smallB']//太古里，客服那边来的 , 微信电子发票,小B
            }
        },
        mounted(){
            let invoiceChannel = util.getUrlParam('invoiceChannel')
            //如果从下个页面过来的，直接关闭当前页面
            if(util.getSession('isToInvoicePage')){
                wxUtil.closeWindow()
            }else if( invoiceChannel && this.preInvoiceChannelList.indexOf(invoiceChannel)>-1){
                this.initFromTgl()
            }else {
                this.init();
            }



        },
        methods: {
            init() {
                let orderId=util.getUrlParam('orderId');
                let invoiceChannel=util.getUrlParam('invoiceChannel');
                let localId=util.getUrlParam('localId');
                let parkCode=util.getUrlParam('parkCode');
                if(util.isWeixinBrowserOnly()){
                    location.href=util.getWechatAuthUrlByAbsPath(util.constants.tcinvoiceWebUrl+'invoice/makeOutElecInvoice',[orderId,localId,parkCode,invoiceChannel]);
                }else if(util.isAlipayBrowserOnly()){
                    location.href=util.getAlipayAuthUrlByAbsPath(util.constants.tcinvoiceWebUrl+'invoice/makeOutElecInvoice',[orderId,localId,parkCode,invoiceChannel]);
                }else{
                    this.$parent.showTjdModal({
                        errorMsg: "请用微信或支付宝扫码！",
                    });
                }
            },
            initFromTgl(){
                let orderId = util.getUrlParam("orderId");
                let invoiceChannel=util.getUrlParam('invoiceChannel');
                let parkCode=util.getUrlParam('parkCode');
                if(util.isWeixinBrowserOnly()){
                    location.href=util.getWechatAuthUrlByAbsPath(util.constants.tcinvoiceWebUrl+'invoice/makeOutElecInvoice',[orderId,null,parkCode,invoiceChannel]);
                }else if(util.isAlipayBrowserOnly()){
                    location.href=util.getAlipayAuthUrlByAbsPath(util.constants.tcinvoiceWebUrl+'invoice/makeOutElecInvoice',[orderId,null,parkCode,invoiceChannel]);
                }else {//支持在普通浏览器中打开
                    location.href = util.constants.tcinvoiceWebUrl+'invoice/makeOutElecInvoice?data='+orderId+util.constants.splitParam+'null'+util.constants.splitParam+parkCode+util.constants.splitParam+invoiceChannel
                }
            }
        }
    }
</script>


