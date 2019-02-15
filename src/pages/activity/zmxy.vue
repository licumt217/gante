<template>
    <div v-title="'认证芝麻信用'">
        <section class="wrapper" v-show="isShowPage">
            <div class="imgWrapper">
                <p class="logo">
                    <img src="../../assets/images/activity/zmxy/logo.png" style="width:60%">
                </p>
                <p class="title">
                    <img src="../../assets/images/activity/zmxy/creditTitle.png" style="width:70%">
                </p>
                <div class="attestation">
                    <p class="needRz" v-if="isCertify==='false'" @click="go2Certify">
                        立即认证
                    </p>
                    <p class="alreadyRz" v-else>
                        已认证
                    </p>
                </div>
                <ul class="activityRules">
                    <li>
                        <b>活动规则</b>
                    </li>
                    <li style="margin-top:20px;">本次活动仅限已验证手机号码的用户参加。</li>
                    <li>每位用户仅可认证一个支付宝账户的芝麻信用。</li>
                    <li>本次活动最终解释权归停简单所有。</li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import { util } from 'util';
import { tjdServices } from 'tjdServices'
import {} from '../../assets/js/iosWxBack2Reload'

export default {
    data() {
        return {
            isCertify: 'false',
            isShowPage:false
        }
    },
    mounted() {
        this.initBgImage()
        this.init();
    },
    methods: {
        initBgImage(){
            let newImg = new Image()
            newImg.src = require('../../assets/images/activity/zmxy/creditSesameBg.png')
            newImg.onload = () => { // 图片加载成功后把地址给原来的img
                this.isShowPage=true;
            }
        },
        dynamicHeight: function() {
            document.querySelectorAll(".attestation p")[0].style.height = `${window.innerHeight * 0.065}px`;
            document.querySelectorAll(".attestation p")[1].style.height = `${window.innerHeight * 0.065}px`;
        },
        go2Certify: function() {
            if (util.isTempUser()) {
                util.setSession('isFromZmxy', '1');
                util.setSession('isSwitchUser', '1');
                location.href = util.constants.tcweixinUrl + 'login/login';

            } else {
                location.href = util.constants.zmxyCertifyUrl;
            }

        },
        getCertifyInfo: function() {

            tjdServices.request({
                method: 'isZmxyCertify'
            }).then(data => {
                this.isCertify = data.isCertify;
            })
        },
        init: function() {
            this.dynamicHeight();

            tjdServices.getLoginInfo().then(data => {
                tjdServices.checkIsAgreeProtocol().then(data=>{
                    this.getCertifyInfo();
                },()=>{
                    this.getCertifyInfo();
                })
            }, data => {
                this.getCertifyInfo();
            });

        },
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
}

.imgWrapper {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/activity/zmxy/creditSesameBg.png) center center;
    background-size: cover;
    position: relative;
    p {
        text-align: center;
    }
    .logo {
        padding: 20% 0 5%;
    }
    .activityRules {
        padding-left: 10%;  
        line-height: 25px;
        color: #fff;
        letter-spacing: 1px;
        font-size: 14px;
        position: absolute;
        bottom: 5%;
        li b{
            font-size: 18px;
            font-weight: normal;
            border-bottom: solid 1px #fff;
            padding-bottom: 10px;
        }
    }
}

.attestation {
    width: 78%;
    position: absolute;
    bottom: 33%;
    left: 11%;
    p {
        border-radius: 30px;
        text-align: center;
        display: -webkit-flex;
        display: -webkit-box;
        display: -moz-box;
        display: flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        justify-content: center;
    }
    .needRz {
        background: #00b9d5;
        background: -moz-linear-gradient(top, #00b9d5, rgba(25, 234, 203, 0.8));
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#00b9d5), to(rgba(25, 234, 203, 0.8)));
        background: -o-linear-gradient(top, #00b9d5, rgba(25, 234, 203, 0.8));
        border: solid 1px #fff;
        color: #fff;
    }
    .alreadyRz {
        background: rgba(0, 0, 0, 0.3);
        border: solid 1px #A1A1A1;
        color: #B7B6B8;
    }
}
</style>