<template>
    <div v-title="'停简单年度停车报表'">
        <section class="wrapBox">
            <div class="bgBox">
                <p class="title">
                    <img src="../../assets/images/parkingReport/logo.png" alt="">
                </p>
                <div class="reportTip">
                    <p class="reportTipText"><img src="../../assets/images/parkingReport/reportTipText02.png" alt=""></p>
                    <p class="reportTipInfo">
                        <img src="../../assets/images/parkingReport/biaotiIcon.png" alt="">
                        TA在停简单停车<span>{{userAnnualReport.time}}</span>次
                        停车费<span>{{userAnnualReport.avgFee}}</span>元/次
                    </p>
                </div>
                <div class="middle">
                    <div class="leftTop">
                        <p>
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="userAnnualReport.userFee"></reportAmount>
                        </p>
                    </div>
                    <div class="leftBottom">
                        <p>
                            <!-- avgReport.everyoneFee -->
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="168.51"></reportAmount>
                        </p>
                    </div>

                    <div class="rightTop">
                        <p>
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="userAnnualReport.userDiscount"></reportAmount>
                        </p>
                    </div>
                    <div class="rightBottom">
                        <p>
                            <!-- avgReport.everyoneDiscount -->
                            <reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="48.24"></reportAmount>
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
                    <p class="copyBox">
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
            reportId:'',
            userAnnualReport: {},
            avgReport: {}
        }
    },
   computed: {
        generateReportInfoSavingTime() {
            return Math.ceil(this.userAnnualReport.time*29/60);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            util.setChannel(util.channels.parkingReport)
            let reportId = util.getUrlParam('reportId')
            if(!util.isEmpty(reportId)){
                this.reportId = reportId;
                this.reportByUserId();
                this.renderQRCode();
                $('.wraper').show()
            }else{
                alert('参数错误')
                return
            }
            wxUtil.initWxJsAPI().then(() => {
                wxUtil.onShareFriends({
                    title: '停简单',
                    desc: '原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/generateReport?reportId=${reportId}`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),
                });
                wxUtil.onShareFriendsZone({
                    title: '停简单：原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/generateReport?reportId=${reportId}`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),

                })
            })
        },
        reportByUserId() {
            tjdServices.request({
                method: 'getUnionUserAnnualReportByUserId',
                cmUserId: this.reportId,
                handleExpOwn:true
            }).then(data => {
                $('.wrapBox').show()
                this.avgReport = data.unionUserAnnualReport.avgReport
                this.userAnnualReport = data.unionUserAnnualReport.userAnnualReport
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
        ownBtn() {
            location.href = util.constants.tcapiWebUrl + 'parkingReport/login';
//            util.go2(this, 'parkingReport/login')
        }
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
                    margin: 3px -4px 0 0;
                }
            }
        }
        .reportEasy {
            // height: 60px;
            // width: 278px;
            // background: url(../../assets/images/parkingReport/reportEasy.png) no-repeat;
            // background-size: 100% 100%;
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
                    margin: 3px 0 0 0;
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
            width: 110px;
            height: 108px;
            background: url(../../assets/images/parkingReport/ownmiddleNew.png) no-repeat;
            background-size: 100% 100%; // margin: 80px auto;
            margin: 80px 0 80px 32%;
            position: relative;
            font-weight: 500;
            .leftTop {
                width: 100px;
                height: 62px;
                background: url(../../assets/images/parkingReport/rightTopyf.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -55px;
                left: -82px;
                color: #fff;
                p {
                    padding: 28px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
            .leftBottom {
                width: 100px;
                height: 62px;
                background: url(../../assets/images/parkingReport/rightTopyf.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                left: -94px;
                bottom: -24px;
                color: #fff;
                p {
                    padding: 28px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
            .rightTop {
                width: 115px;
                height: 66px;
                background: url(../../assets/images/parkingReport/leftTopjm.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -18px;
                right: -114px;
                color: #fff;
                p {
                    padding: 30px 0 0 10px;
                    span {
                        font-size: 15px;
                    }
                }
            }
            .rightBottom {
                width: 115px;
                height: 66px;
                background: url(../../assets/images/parkingReport/leftTopjm.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                right: -90px;
                bottom: -59px;
                color: #fff;
                p {
                    padding: 30px 0 0 10px;
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
            .ownBtn {
                outline: none;
                border: none;
                width: 75%;
                height: 100px;
                line-height: 130px;
                background: url(../../assets/images/parkingReport/downBg.png) no-repeat;
                background-size: 100% 100%;
                color: #fff;
                font-weight: 500;
                font-size: 15px;
                margin: -15px 0 15px -12%;
                padding-left: 15%;
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
                font-size: 11px;
            }
            .middle {
                width: 90px;
                height: 88px;
                margin: 80px 0 80px 32%;
            }
            .reportEasyText img {
                width: 70%;
            }
        }
    }
}
</style>
