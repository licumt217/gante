<template>
    <div class="wrap" v-show="isShow" v-title="'礼品兑换'">
        <div class="inner-box">
            <div class="content">
                <div class="exchange-code-box">
                    <input class="exchange-code" placeholder="点击输入您的兑换码" v-model="exchangeCode" />
                    <!--<img class="line-icon" src="../../assets/images/exchangeCoupon/line.png"/>
                    <img class="scan-icon" @click="scan" src="../../assets/images/exchangeCoupon/scan_icon.png"/>-->
                </div>
                <p>
                    <img class="arrow_up" src="../../assets/images/exchangeCoupon/arrow_up.png">
                </p>
                <p>请输入您的兑换码</p>
            </div>
            <div class="exchange-box">
                <button class="exchange" type="button" @click="exchange">兑换</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { util } from 'util'
    import {wxUtil} from '../../assets/js/wxUtil'
    import {tjdServices} from 'tjdServices'
    export default {
        name: 'index',
        data() {
            return {
                exchangeCode: '',
                h: '',
                isShow: false
            }
        },
        mounted() {
            util.initAPPCommInfo().then(() => {
                this.init();
            });
        },
        methods: {
            init() {
                tjdServices.getLoginInfo().then(()=>{
                    this.exchangeCode = util.getUrlParam('data') || '';
                    this.isShow = true;
                }, ()=>{
                    this.isShow = true;
                });
            },
            scan() {
                if (util.isWeixinBrowserOnly()) {
                    wxUtil.initWxJsAPI().then((wx)=> {
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: (res)=> {
                                this.isCanRoute("weixin",res)
                            }
                        });
                    });
                }else if(util.isAlipayBrowserOnly()){
                    AlipayJSBridge.call('scan', {
                        type: 'qr',
                        actionType: 'scan'  //“scan”只扫码值“route”只路由码值“scanAndRpc”扫描返回原码及跳转后的路径“scanAndRoute”扫描并路由，类同首页效果
                    }, (result)=> {
                        this.isCanRoute("aliPay",result)
                    });
                } else {
                    this.$parent.showTjdModal({
                        errorMsg: "请在微信或支付宝中打开！",
                    });
                }
            },
            isCanRoute(type,res){
                if(type === 'weixin' && this.isRightUrl(res.resultStr)){
                    location.href = res.resultStr;
                }else if(type === 'aliPay' && this.isRightUrl(res.qrCode)){
                    location.href = res.qrCode;
                }
            },
            isRightUrl(str){
                if(str.indexOf("tingjiandan.com")<0){
                    this.$parent.showTjdModal({
                        errorMsg: "请扫描正确的二维码！",
                    });
                    return false;
                }else{
                    return true;
                }
            },
            exchange() {
                if (!this.exchangeCode) {
                    this.$parent.showTjdModal({
                        errorMsg:"请输入正确的兑换码"
                    });
                    return;
                }
                tjdServices.request({
                    method: 'exchange',
                    code: this.exchangeCode,
                    channel: util.channels.exchangeCoupon + '',
                    handleExpOwn: true
                }).then((data) => {
                    this.$parent.showTjdModal({
                        type: '1',
                        errorMsg:"兑换成功"
                    });
                    this.exchangeCode = '';
                }, (err) => {
                    if (err.isSuccess === '1') {
                        this.$parent.showTjdModal({
                            errorMsg: err.errorMSG
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less">
    body, html{
        overflow-y: scroll;
        background: #1484f0;
    }

    .wrap{
        max-width: 750px;
        min-height: 100%;
        width: 100%;
        margin: 0 auto;
        background: url('../../assets/images/exchangeCoupon/bg.png') no-repeat 0 0 #1484f0;
        background-size: 100%;
    }

    .inner-box{
        padding-top: 90%;
    }

    .content{
        color: #b0d1f5;
        font-size: 14px;
        text-align: center;
    }

    .exchange-code-box{
        display: flex;
        align-items: center;
        width: 58%;
        border-radius: 4px;
        padding: 15px 10px;
        margin: 0 auto 1%;
        background: #58b4f1;
        text-align: left;
        overflow: hidden;
    }

    .exchange-code{
        flex: auto;
        width: 100%;
        height: 20px;
        border: none;
        background: #58b4f1;
        color: #b0d1f5;
        line-height: 1;

        &::placeholder{
            color: #b0d1f5;
            height: 20px;
            line-height: 1;
        }

        &:focus{
            outline: none;
        }
    }

    .scan-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }

    .line-icon{
        width: 1px;
        height: 20px;
        margin: 0 10px;
    }

    .arrow_up{
        width: 2.5%;
        vertical-align: middle;
    }

    .exchange-box{
        padding: 6% 0 10%;
        text-align: center;
    }

    .exchange{
        overflow: hidden;
        width: 78%;
        height: 50px;
        border: none;
        color: #fff;
        font-size: 16px;
        background: url("../../assets/images/exchangeCoupon/btn.png") no-repeat 0 0;
        background-size: 100% 100%;

        &:focus{
            outline: none;
        }

        &:active{
            background: url("../../assets/images/exchangeCoupon/btn_active.png") no-repeat 0 0;
            background-size: 100% 100%;
        }
    }

</style>
