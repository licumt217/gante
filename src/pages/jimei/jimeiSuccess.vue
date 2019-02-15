<template>
    <div class="wrapper" v-title="'领取成功'">
        <div class="successBox">
            <p>
                <img src="./images/getSuccess.png" style="width:75%;">
                <img src="./images/getSuccessText.png" style="margin-top:25px;width:35%">
            </p>
            <p class="getSuccess">优惠券已发送至账户
                <span>{{phone}}</span>
            </p>
        </div>
        <div class="qrcodeImg">
            <img :src="qrcodeImg" alt="">
            <p>（长按关注停简单，查收您的优惠券）</p>
        </div>

    </div>
    </div>
</template>
<script>
import { util } from 'util'
import { tjdServices } from '../../assets/js/tjdServices'

export default {
    data() {
        return {
            errorCode: '',
            errorTip: '',
            qrcodeImg: '',
        }
    },
    created() {
        if (util.isWeixinBrowserOnly()) {
            this.qrcodeImg = location.host.indexOf('prep') > -1 ? require('./images/prep_wechat.png') : require('./images/wechat.jpg')
        } else if (util.isAlipayBrowserOnly()) {
            this.qrcodeImg =location.host.indexOf('prep') > -1 ? require('./images/prep_alipay.png') : require('./images/alipay.png')
        }
    },
    computed: {
        phone() {
            const phone = this.$route.query.phone
            return `${phone.slice(0, 3)}****${phone.slice(7)}`
        }
    },

    mounted() {
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.wrapper {
    background: url('./images/backgroundSuccess.png') repeat-x;
    background-size: cover;
    .successBox {
        width: 80%;
        padding: 40px 0;
        text-align: center;
        background: url('./images/jmSuccessBox.png') repeat-x;
        background-size: 100% 100%;
        margin: 10%;
        .getSuccess {
            padding-top: 30px;
            font-size: 13px;
            color: #666;
            letter-spacing: 0.5px;
            span {
                color: #5E47C7;
            }
        }
    }
    .qrcodeImg {
        position: absolute;
        bottom:6%;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 0 auto;
        img {
            width: 120px;
        }
        p {
            color: #fff;
            margin-top: 10px;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
    }
}
</style>