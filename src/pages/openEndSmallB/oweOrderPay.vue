<template>
    <div></div>
</template>

<script>
    import {util} from 'util';

    export default {
        name: 'scanPay',
        mounted() {
            const orderId = util.getUrlParam('oweOrderId');
            if (util.isWeixinBrowserOnly()) {
                location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcweixinUrl + 'charge/openSbOweOrderPay', [orderId]);
            } else if (util.isAlipayBrowserOnly()) {
                location.href = util.getAlipayAuthUrlByAbsPath(util.constants.tcweixinUrl + 'charge/openSbOweOrderPay', [orderId]);
            } else {
                this.$parent.showTjdModal({
                    errorMsg: "请用微信、支付宝扫码！",
                });
            }
        }
    };
</script>

<style scoped>

</style>
