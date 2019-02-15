<template>
    <div v-title="'停简单年度停车报表'">
        <section class="wrapBox">
            <div class="bgBox">
                <p class="title">
                    <img src="../../assets/images/parkingReport/logo.png" alt="">
                </p>
                <div class="reportTip">
                    <p class="reportTipText"><img src="../../assets/images/parkingReport/reportTipText.png" alt=""></p>
                    <p class="reportTipInfo">
                        <img src="../../assets/images/parkingReport/biaotiIcon.png" alt="">
                        您在停简单停车<span>{{generateReportInfo.time}}</span>次
                        停车费<span>{{generateReportInfo.avgFee}}</span>元/次
                    </p>
                </div>
                <div class="middle">
                    <div class="leftTop">
                        <p>
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="generateReportInfo.userFee"></reportAmount>
                        </p>
                    </div>
                    <div class="leftBottom">
                        <p>
                            <span>{{generateReportInfo.overUser}}</span> %
                            <em>的用户</em>
                        </p>
                    </div>

                    <div class="rightTop">
                        <p>
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="generateReportInfo.userDiscount"></reportAmount>
                        </p>
                    </div>
                </div>
                <div class="reportEasy">
                    <p class="reportEasyText"><img src="../../assets/images/parkingReport/reportEasyText.png" alt=""></p>
                    <p class="reportEasyTip">
                        <img src="../../assets/images/parkingReport/biaotiIcon.png" alt="">可以节省
                        <span>{{generateReportInfoSavingTime}}</span>分钟
                        <b>·</b>停简单1秒离场
                    </p>
                    <p class="reportEasyLine"><img src="../../assets/images/parkingReport/reportEasyLine.png" alt=""></p>
                </div>
                <div class="timeBg">
                    <p>
                        <img src="../../assets/images/parkingReport/timeBg.png" alt="">
                    </p>
                </div>
                <div class="shareBox">
                    <p>
                        <img src="../../assets/images/parkingReport/easyTip.png" alt="" class="easyTip">
                        <img src="../../assets/images/parkingReport/pie.png" alt="" class="pie">
                    </p>
                    <template>
                        <p v-if="isWeixinBrowserOnly" class="shareBox">
                            <button class="share" @click="share()">分享朋友</button>
                            <button class="share" @click="share()">分享朋友圈</button>
                        </p>
                        <p class="copyBox" v-else>
                            <button class="copyUrl" :data-clipboard-text="dataClipBoardText" @click="copyUrl">复制链接分享好友</button>
                        </p>
                    </template>
                    <p>
                        <img src="../../assets/images/parkingReport/bottomTip.png" alt="" class="bottomTip">
                    </p>
                    <div class="code">
                        <div id="qr_code">
                        </div>
                    </div>
                </div>
            </div>

            <div class="dialog-contianer" @click="hideDia">
                <div class="dialog-window">
                    <p>
                        <img src="../../assets/images/parkingReport/share.png" alt="">
                    </p>
                </div>
            </div>
            <reportModal ref="msgModal" :type="modalType" :oneBtn="true" @ok="okCallBack">
                <p>{{msg}}</p>
            </reportModal>
        </section>
    </div>
</template>
<script>
import { util } from 'util'
import { tjdServices } from 'tjdServices'
import { wxUtil } from '../../assets/js/wxUtil'
import Clipboard from 'Clipboard'
import { } from '../../assets/js/qrcode'
export default {
    data() {
        return {
            modalType: 1,//弹窗图片
            msg: '',//弹窗提示语
            okCallBack: () => { },
            generateReportInfo: {},
            dataClipBoardText: '',
            isWeixinBrowserOnly: util.isWeixinBrowserOnly(),
            reportId:'',
        }
    },
    computed: {
        generateReportInfoSavingTime() {
            return Math.ceil(this.generateReportInfo.time*29/60);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        renderQRCode() {
            let url;
            if (util.isAlipay() && util.isAndroidDevice()) {
                url = "https://m.pp.cn/detail.html?appid=6608514";
            } else {
                url = "https://a.app.qq.com/o/simple.jsp?pkgname=com.tingjiandan.client";
            }

            $('#qr_code').qrcode({
                render: 'image',
                size: 92,
                text: url
            })
        },
        share() {
            $('.dialog-contianer').show();
        },
        hideDia(){
            $('.dialog-contianer').hide();
        },
        // 复制到粘贴板
        copyUrl() {
            var clipboard = new Clipboard('.copyUrl')
            clipboard.on('success', e => {
                this.msg = '页面链接已复制，黏贴分享好友'
                this.modalType = 1
                this.$refs.msgModal.showModal()
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                alert('当前浏览器不支持此功能，您可以复制链接分享给好友')
                // 释放内存
                clipboard.destroy()
            })
        },
        reportByUserId() {
            tjdServices.request({
                method: 'getUnionUserAnnualReportByUserId',
                cmUserId: this.reportId,
                handleExpOwn:true
            }).then(data => {
                $('.wrapBox').show()
                this.generateReportInfo = data.unionUserAnnualReport.userAnnualReport
            }).catch(err => {
                $('.wrapBox').show()
                if(err.isSuccess=='1'){
                    this.msg = err.errorMSG
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }else{
                    this.msg = "网络繁忙，请稍等"
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }
            });
        },
        init: function() {
            util.setChannel(util.channels.parkingReport)
            let reportId = util.getUrlParam('reportId')
            let generateReportInfo = util.getSession('generateReportInfo')
            if(!util.isEmpty(generateReportInfo)){
                this.generateReportInfo =  JSON.parse(util.getSession('generateReportInfo'))
                $('.wrapBox').show()
            }else if(!util.isEmpty(reportId)){
                this.reportId = reportId;
                this.reportByUserId()
                 $('.wrapBox').show()
            }else{
                alert('参数错误')
                return
            }

            this.dataClipBoardText = `${util.constants.tcapiWebUrl}parkingReport/generateReport?reportId=${reportId}`
            wxUtil.initWxJsAPI().then(() => {
                wxUtil.onShareFriends({
                    title: '停简单',
                    desc: '原来停车不简单-2018停车个人报告',
                    link: this.dataClipBoardText,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),
                });
                wxUtil.onShareFriendsZone({
                    title: '停简单：原来停车不简单-2018停车个人报告',
                    link: this.dataClipBoardText,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),

                })
            })
            this.renderQRCode();


        },
    }
}
</script>

<style>
    html, body{
        overflow: auto;  
        height: auto;      
    }
</style>
<style lang="less" scoped>
.wrapBox {
    display: none;
    .bgBox {
        width: 100%;
        background: url(../../assets/images/parkingReport/boxBg.png) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .title {
            text-align: center;
            padding: 10% 0 5%;
            img {
                width: 75%;
            }
        }
        .reportTip {
            height: 92px;
            width: 80%;
            background: url(../../assets/images/parkingReport/reportTipBg.png) no-repeat;
            background-size: 100% 100%;
            margin: -18px auto 0;
            color: #36A6E1;
            font-size: 12px;
            position: relative;
            text-align: center;
            .reportTipText {
                img {
                    width: 75%;
                    margin: 32px 0 0;
                }
            }
            .reportTipInfo {
                position: absolute;
                width: 100%;
                bottom: 15px;
                span {
                    font-size: 16px;
                    padding: 0 2px;
                }
                img {
                    width: 20px;
                    margin: 3px 0 0 0;
                }
            }
        }
        .reportEasy {
            margin: 20px 5% 30px 0;
            color: #13F4F0;
            font-size: 12px;
            float: right;
            width: 100%;
            position: relative;
            .reportEasyTip {
                width: 100%;
                text-align: right;
                span {
                    font-size: 16px;
                    padding: 0 2px;
                }
                b {
                    padding: 0 3px 0 0;
                }
                img {
                    width: 20px;
                    margin: 3px -4px 0 0;
                }
            }
            .reportEasyText {
                text-align: right;
                img {
                    width: 60%;
                }
            }
            .reportEasyLine {
                text-align: right;
                margin-top: -6px;
                img {
                    width: 68%;
                }
            }
        }
        .middle {
            width: 101px;
            height: 104px;
            background: url(../../assets/images/parkingReport/reportMiddle.png) no-repeat;
            background-size: 100% 100%; // margin: 80px auto;
            margin: 80px auto 80px 33%;
            position: relative;
            font-weight: 500;
            .leftTop {
                width: 110px;
                height: 62px;
                background: url(../../assets/images/parkingReport/indexLt.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -55px;
                left: -96px;
                color: #fff;
                p {
                    padding: 28px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
            .leftBottom {
                width: 138px;
                height: 85px;
                background: url(../../assets/images/parkingReport/leftBottom.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                left: -96px;
                bottom: -65px;
                color: #fff;
                p {
                    padding: 35px 0 0 15px;
                    span {
                        font-size: 20px;
                    }
                    em {
                        color: #78EFFF;
                    }
                }
            }
            .rightTop {
                width: 120px;
                height: 70px;
                background: url(../../assets/images/parkingReport/indexRt01New.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: 25px;
                right: -118px;
                color: #fff;
                p {
                    padding: 35px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
        }
        .timeBg {
            p {
                text-align: center;
                img {
                    width: 80%;
                }
            }
        }
        .shareBox {
            .copyUrl,
            .share {
                outline: none;
                border: none;
                color: #fff;
                font-weight: 500;
                font-size: 15px;
                letter-spacing: 0.5px;
            }
            .copyUrl {
                width: 75%;
                height: 100px;
                line-height: 130px;
                background: url(../../assets/images/parkingReport/downBg.png) no-repeat;
                background-size: 100% 100%;
                margin: -15px 0 15px -12%;
                padding-left: 17%;
                letter-spacing: 0.5px;
            }
            .share {
                width: 40%;
                height: 60px;
                line-height: 82px;
                background: url(../../assets/images/parkingReport/shareBg.png) no-repeat;
                background-size: 100% 100%;
                margin: 10px 0 25px -5%;
                padding-left: 9%;
                display: inline-block;
            }
            p {
                text-align: center;
                .easyTip {
                    width: 60%;
                    float: left;
                    margin: 20px 0 20px 5%;
                }
                .pie {
                    width: 80%;
                }
                .bottomTip {
                    width: 50%;
                    margin-top: 20px;
                }
            }
            .code {
                width: 114px;
                height: 130px;
                background: url(../../assets/images/parkingReport/codeBg.png) no-repeat;
                background-size: 100% 100%;
                margin: 20px auto 20px;
                text-align: center;
                #qr_code {
                    width: 92px;
                    display: inline-block;
                    margin: 9px auto;
                    border: solid 2px #2AD6DE;
                    img {
                        width: 92px;
                    }
                }
            }
        }
        @media screen and (max-width: 320px) {
            .reportTip {
                width: 90%;
            }
            .middle {
                width: 81px;
                height: 84px;
                margin: 80px 0 80px 34%;
            }
            .rightTop {
                top: 12px!important;
            }
        }
    }

    .dialog-contianer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: -webkit-flex;
        display: flex;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        z-index: 999;
        display: none;
        .dialog-window {
            p {
                text-align: right;
                img {
                    width: 220px;
                    margin: 20px;
                }
            }
        }
    }
}
</style>