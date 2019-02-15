<template>
    <div v-title="'开通免密'">
        <section id="wrapper" class="wrapper">
            <div class="error" v-show="error">
                <img src="./images/error.png" alt="">
                <div>请使用微信或支付宝扫码开通三方免密</div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    import {wxUtil} from '../../assets/js/wxUtil'
    import {onlyShowOnce} from '../../assets/js/onlyShowOnce'


    export default {
        data(){
            return {
                error:false,
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init: function () {
                onlyShowOnce.init().then(()=>{
                    const data = util.getUrlParam('signId')
                    if (util.isWeixinBrowserOnly()) {
                        location.replace(util.getWechatAuthUrlByAbsPath(
                            util.constants.tcapiWebUrl + 'thirdSign/sign',
                            [data]
                        ))
                    } else if (util.isAlipayBrowserOnly()) {
                        location.replace(util.getAlipayAuthUrlByAbsPath(
                            util.constants.tcapiWebUrl + 'thirdSign/sign',
                            [data]
                        ))
                    } else {
                        this.error = true;
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';

.error{
    margin-top: 45%;
    text-align: center;
    color: #999;
    font-size: 13px;
    letter-spacing: 1px;
    img{
        width: 28%;
        margin-bottom: 57px;
    }
}



</style>


