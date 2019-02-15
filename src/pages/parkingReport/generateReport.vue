<template>
    <div v-title="'停简单年度停车报表'">
        <section class="wrapBox">
            <div class="bgBox">
                <p class="title">
                    <img src="../../assets/images/parkingReport/logo.png" alt="">
                </p>
                <div class="reportTip">
                    <p class="reportTipText">
                        <img src="../../assets/images/parkingReport/reportTipTextNew.png" alt="">
                    </p>
                    <p class="reportTipInfo">
                        <img src="../../assets/images/parkingReport/biaotiIcon.png" alt="">
                        <i v-if="isOwn">您</i><i v-else>TA</i>停车<span>{{generateReportInfo.time}}</span>次，
                        共计<span v-if="timeObj.hour*1>0">{{timeObj.hour}}</span><i v-if="timeObj.hour*1>0">小时</i><span v-if="timeObj.minute*1>0">{{timeObj.minute}}</span><i v-if="timeObj.minute*1>0">分钟</i>
                    </p>
                </div>
                <div class="middle" :class="{'isOwn':isOwn}">
                    <div class="leftTop">
                        <p>
                           <em>{{generateReportInfoSavingTime}}</em>
                            <i>分钟</i>
                            <!--<reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="generateReportInfo.userFee"></reportAmount>-->
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
                    <!--<p class="reportEasyTip">-->
                        <!--<img src="../../assets/images/parkingReport/biaotiIcon.png" alt="">-->
                    <!--</p>-->
                    <!--<p class="reportEasyLine"><img src="../../assets/images/parkingReport/reportEasyLine.png" alt=""></p>-->
                </div>
                <div class="timeBg">
                    <p>
                        <img src="../../assets/images/parkingReport/timeBg.png" alt="">
                    </p>
                </div>
                <div class="shareBox">
                    <p>
                        <img src="../../assets/images/parkingReport/easyTip.png" alt="" class="easyTip">
                        <img src="../../assets/images/parkingReport/pieNew.png" alt="" class="pie">
                    </p>
                    <template v-if="isOwn">
                        <p v-if="isWeixinBrowserOnly">
                            <button class="share" @click="share()">分享朋友</button>
                            <button class="share" @click="share()">分享朋友圈</button>
                        </p>
                        <p class="copyBox" v-else>
                            <button class="copyUrl" :data-clipboard-text="dataClipBoardText" @click="copyUrl">复制链接分享好友</button>
                        </p>
                    </template>
                    <p v-else class="copyBox">
                        <button class="ownBtn" @click="ownBtn()">我的2018在这里</button>
                    </p>
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
        isOwn() {
            return util.getUrlParam('isFormLogin') == 'true';
        },
        timeObj(){
            let obj = {
                hour:0,
                minute:0
            }
            let secound = Number(this.generateReportInfo.parkTime)>0?Number(this.generateReportInfo.parkTime):0;
            obj.hour = Math.floor(secound/3600);
            obj.minute = Math.ceil(secound/60) % 60;
            return obj
        },
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
        ownBtn() {
            location.href = util.constants.tcapiWebUrl + 'parkingReport/login';
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
//                 $('.wrapBox').show()
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
            height: 110px;
            width: 86%;
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
                    margin: 38px 0 0 0;
                }
            }
            .reportTipInfo {
                position: absolute;
                width: 100%;
                /*right: 8%;*/
                bottom: 18px;
                span {
                    font-size: 16px;
                    padding: 0 2px;
                    color: #7AFAFF;
                    font-weight: 500;
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
            background: url(../../assets/images/parkingReport/reportMiddleTA.png) no-repeat;
            background-size: 100% 100%; // margin: 80px auto;
            margin: 80px auto 80px 33%;
            position: relative;
            font-weight: 500;
            .leftTop {
                width: 110px;
                height: 66px;
                background: url(../../assets/images/parkingReport/indexLtNew.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -58px;
                left: -96px;
                color: #fff;
                p {
                    padding: 28px 0 0 13px;
                    span {
                        font-size: 15px;
                    }
                    em{
                        font-size: 18px;
                    }
                    i{
                        font-size: 12px;
                    }
                }
            }
            .leftBottom {
                width: 138px;
                height: 86px;
                background: url(../../assets/images/parkingReport/leftBottomNew.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                left: -96px;
                bottom: -71px;
                color: #fff;
                p {
                    padding: 36px 0 0 15px;
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
                height: 75px;
                background: url(../../assets/images/parkingReport/indexRt02New.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: 22px;
                right: -119px;
                color: #fff;
                p {
                    padding: 36px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
        }
        .middle.isOwn{
            background: url(../../assets/images/parkingReport/reportMiddle.png) no-repeat;
            background-size: 100% 100%;
            margin: 80px auto 80px 33%;
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
            .copyBox{
                text-align: center;
                font-size: 16px;
                color: #fff;
                font-weight: 500;
                letter-spacing: 0.5px;
                width: 92%;
                height: 85px;
                padding-left: 10%;
                margin: -15px 0 15px;
                position: relative;
                background: url(../../assets/images/parkingReport/grayGenerateReportNew.png) no-repeat;
                background-size: 100% 100%;
                .copyUrl,.ownBtn{
                    width: 87%;
                    vertical-align: middle;
                    display: table;
                    background: none;
                    padding: 14px 0 19.5px;
                    color: #fff;
                    position: absolute;
                    bottom: 0;
                    border: none;
                    outline: none;
                }
            }
            .share {
                outline: none;
                border: none;
                color: #fff;
                font-weight: 500;
                font-size: 16px;
                letter-spacing: 0.5px;
                width: 45%;
                height: 65px;
                line-height: 82px;
                background: url(../../assets/images/parkingReport/shareBgNew.png) no-repeat;
                background-size: 100% 100%;
                margin: 10px 0 25px -6%;
                padding-left: 8.5%;
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
