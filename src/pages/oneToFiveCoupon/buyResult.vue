<template>
    <div v-title="''">
        <section id="wrapper" class="wrapper">
            <div class="top">
                <img v-if="isSuccess" src="./images/successIcon.png" alt="">
                <img v-if="!isSuccess" src="./images/failIcon.png" alt="">
            </div>
            <div class="couponUseRule">
                <p class="ruleTitle">
                    <span class="titleContent">优惠券使用说明</span>
                </p>
                <ul class="ruleContent">
                    <li>1、使用流程：下载停简单APP→查找附近停简单停车场，并驶入停车，支付宝场内支付→使用停车优惠券抵扣相应停车费→驶出车场；</li>
                    <li>2、线上停车订单实际支付金额满6元可用；</li>
                    <li>3、每个停车订单只能使用一张优惠券，若购买多张停车券，不可叠加使用；</li>
                    <li>4、优惠券仅在停简单停车场进行支付宝场内支付停车费时使用；其他支付方式不能使用该券。</li>
                    <li>5、优惠券一经购买，不支持退款。</li>
                    <li>6、优惠券有效期：自购买之日起60日内有效。逾期自动作废。</li>
                    <li>7、优惠券不可兑换现金，不找零，不可与其他活动优惠券叠加使用。</li>
                    <li>8、活动最终解释权归停简单所有。<br/>咨询电话：<a :href="'tel:'+servicePhone">{{servicePhone | parseServicePhone}}</a></li>
                </ul>
            </div>
            <div class="bottom">
                <input type="button" class="sure" @click="close()">
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'
    import {wxUtil} from '../../assets/js/wxUtil'

    export default {
        data() {
            return {
                servicePhone:util.constants.servicePhone,
                hasBind:false,
                isTjdApp:false,
                isSuccess:false
            }
        },
        mounted: function() {
            this.init()
        },
        methods: {
            go2CouponPage(){
                location.href = util.getAlipayAuthUrlByAbsPath(util.constants.tcweixinUrl+'myWallet/coupon')
            },
            close() {
                document.location='objccloseweb://';//关闭停简单app页面
            },
            init(){
                let isSignSuccess = util.getUrlParam('is_success')
                this.isTjdApp = util.getUrlParam('dispatchFrom') == "app"?true:false
                if(isSignSuccess == 'T'){
                    this.isSuccess=true
                    util.setTitle("购买成功")
                }else if(isSignSuccess == 'F') {
                    util.setTitle("购买失败")
                    this.isSuccess=false
                }else {
                    this.$parent.showTjdModal({
                        errorMsg:"登陆失败",
                        callBack:this.close
                    });
                }
                $('.wrapper').show()
            }
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
        width: 24%;
        margin: 1% 0 7%;
    }
}

.couponUseRule{
    color: #556d86;
    margin-bottom: 2em;
    padding: 0 3%;
    letter-spacing: 1px;
    .ruleTitle{
        font-size: 14px;
        text-align: center;
        font-weight: 500;
        margin-bottom: 1.5em;
        color: #0b0b0b;
    }
    .ruleContent{
        color: #556d86;
        letter-spacing: 1px;
        li{
            margin-bottom: 1.3em;
            font-size: 12px;
            a{
                color: #556d86;
            }
        }
        li:last-child{
            margin-bottom: 0;
        }
    }
}
.bottom{
    text-align: center;
    .sure{
        outline: none;
        text-align: center;
        border: none;
        background: url("./images/button_close.png") no-repeat;
        background-size: 100% 100%;
        width: 68%;
        padding: 18px 0;
        margin: 0.5em 0 2em;
    }
}
</style>
