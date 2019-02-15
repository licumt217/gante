<template>
    <div v-title="'认证芝麻信用'">
        <section class="wrapper" v-show="isShowPage">
            <div class="imgWrapper">
                <p class="logo">
                    <img src="../../assets/images/activity/zmxy/logo.png" style="width:60%">
                </p>
                <p class="title">
                    <img src="../../assets/images/activity/zmxy/success.png" style="width:30%">
                </p>
                <div class="textPrompt">
                    <p>支付金额上限提升
                        <span class="heighten">{{addValue}}</span>元</p>
                    <p>单笔停车费不超过
                        <span>{{maxCredit|currency}}</span>元，可先离场后付费。</p>
                </div>
                <div class="attestation">
                    <p @click="close">
                        确定
                    </p>
                    <h1 class="remind">注：账户内如有已离场订单尚未支付，支付后才能再享先离场后付费服务。</h1>
                </div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
import { util } from 'util';
import { tjdServices } from 'tjdServices'
import { wxUtil } from '../../assets/js/wxUtil'
export default {
    data() {
        return {
            maxCredit: null,
            addValue: null,
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
            newImg.src = require('../../assets/images/activity/zmxy/successBg.png')
            newImg.onload = () => { // 图片加载成功后把地址给原来的img
                this.isShowPage=true;
            }
        },
        go2ActivityList: function() {
            location.href = util.constants.tcweixinUrl + 'center/activity';
        },
        close: function() {
            wxUtil.closeWindow()
        },
        dynamicHeight: function() {
            document.querySelector(".attestation p").style.height = window.innerHeight * 0.063 + 'px';
        },

        zmxyCertify: function() {
            let orderNo = util.getUrlParam('orderNo')

            if (util.isEmpty(orderNo)) {
                this.$parent.showTjdModal({
                    errorMsg: '认证失败！',
                    withTwoButtons: 1,
                    confirmButtonMessage: '重试',
                    cancelButtonMessage: '取消',
                    callBack: () => {
                        location.href = util.constants.zmxyCertifyUrl;
                    },
                    callBackForCancel: () => {
                        this.close();
                    }
                })

            } else {
                tjdServices.request({
                    method: 'zmxyCertify',
                    orderNo: orderNo,
                    handleExpOwn: true
                }).then(data => {
                    this.addValue = data.addValue
                    this.maxCredit = data.maxCredit;
                    $(".wrapper").show();
                }, data => {
                    if (data.isSuccess === '1') {
                        this.$parent.showTjdModal({
                            errorMsg: data.errorMSG,
                            callBack: () => {
                                this.close()
                            }
                        })

                    } else {
                        this.$parent.showTjdModal({
                            callBack: () => {
                                this.close()
                            }
                        })
                    }
                })
            }


        },
        init: function() {
            this.dynamicHeight();
            tjdServices.getLoginInfo().then(data => {
                this.zmxyCertify();
            }, data => {
                this.zmxyCertify();
            });

        },
    }
}
</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';

html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: box;
    display: -webkit-box;
    display: -o-box;
    display: -moz-box;
    display: -ms-box;
    -webkit-box-flex: 1;
    -o-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
    -webkit-box-orient: vertical;
    -o-box-orient: vertical;
    -ms-box-orient: vertical;
    box-orient: vertical;
    -webkit-box-sizing: 1;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    font-family: "PingFang SC", "San Francisco", "Helvetica Neue", Helvetica, Tahoma, Arial, "Microsoft YaHei", "Hiragino Sans GB", "Heiti SC", sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: #fff;
}

.wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    display: none;
}

.imgWrapper {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/activity/zmxy/successBg.png) center center;
    background-size: cover;
    position: relative;
    p {
        text-align: center;
    }
    .logo {
        padding: 20% 0 15%;
    }
    .title{
        padding-bottom: 10%;
    }
}

.textPrompt {
    width: 90%;
    position: absolute;
    left: 6%;
    .heighten {
        font-size: 30px;
        margin-left: 2%;
    }
}

.textPrompt p {
    color: #fff;
    text-align: center;
    font-size: 14px;
    margin: 1% 0 0 0;
}

.attestation {
    width: 78%;
    position: absolute;
    bottom:20%;
    left: 11%;
    h1{
        color: #ffffff;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 1px;
        margin-top: 30px;
    }
}

.attestation P {
    background: #00b9d5;
    /* 一些不支持背景渐变的浏览器 */
    background: -moz-linear-gradient(top, #00b9d5, rgba(25, 234, 203, 0.8));
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#00b9d5), to(rgba(25, 234, 203, 0.8)));
    background: -o-linear-gradient(top, #00b9d5, rgba(25, 234, 203, 0.8));
    border: solid 1px #fff;
    color: #fff;
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
</style>
