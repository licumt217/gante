<template>
    <div v-title="'停简单年度停车报表'">
        <section class="wrapBox">
            <div class="bgBox">
                <p class="title">
                    <img class="logo" src="../../assets/images/parkingReport/logo.png" alt="">
                    <img class="tjdtip" src="../../assets/images/parkingReport/tjdtip.png" alt="">
                </p>
                <div class="middle">
                    <!--<div class="leftTop">-->
                        <!--<p>-->
                            <!--&lt;!&ndash; avgReport.everyoneFee &ndash;&gt;-->
                            <!--<reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="168.51"></reportAmount>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="rightTop">-->
                        <!--<p>-->
                            <!--&lt;!&ndash; avgReport.everyoneDiscount &ndash;&gt;-->
                            <!--<reportAmount prefixSize="12" prefixColor="#fff" amountColor="#fff" amountLeftSize="18" amountRightSize="12" :amount="48.24"></reportAmount>-->
                        <!--</p>-->
                    <!--</div>-->
                </div>
                <p class="middleIcon"><img src="../../assets/images/parkingReport/shang.png" alt=""></p>
                <div class="loginBg">
                    <h1 class="loginTitle">看看我的2018如何停车</h1>
                    <p class="phone">
                        <input type="tel" placeholder="请输入手机码" @keyup="validatePhone()" class="phoneInput" v-model="phone" maxlength="11">
                    </p>
                    <p class="phoneCode">
                        <input type="tel" placeholder="请输入4位数验证码" onfocus="this.focus()" class="yzmInput" v-model="yzm" maxlength="4" v-on:keyup="isEnableNextBtn()">
                        <span id="btnCode" @click.stop="getYzm($event)" class="active_yzm">获取验证码</span>
                    </p>
                </div>
                <div class="generateReport" v-show="activeBtn">
                    <button @click="generateReport()">生成停车报告</button>
                </div>
                <div class="grayGenerateReport" v-show="grayBtn">
                    <button @click="grayGenerateReport()">生成停车报告</button>
                </div>

            </div>
            <reportModal ref="msgModal" :type="modalType" :oneBtn="true" @ok="okCallBack">
                <p>{{msg}}</p>
            </reportModal>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">

import { util } from 'util'
import { tjdServices } from 'tjdServices'
import { wxUtil } from '../../assets/js/wxUtil'

export default {
    data() {
        return {
            phone: '',
            yzm: '',
            wait: 59,
            activeBtn: false,
            grayBtn: true,
            modalType: 1,//弹窗图片
            msg: '',//弹窗提示语
            okCallBack: () => { },
            generateReportInfo: {},
            userAnnualReport: {},
            avgReport: {},
            cmUserId: '',
            yzmState: false
        }

    },
    watch: {
        yzm(val) {
            if (!util.isEmpty(val) && val.length >= 4 && !util.isEmpty(this.phone) && this.phone.length === 11) {
                this.activeBtn = true;
                this.grayBtn = false;
            }
        },
        phone(val) {
            if (!util.isEmpty(val) && val.length === 11 && !util.isEmpty(this.yzm) && this.yzm.length >= 4) {
                this.activeBtn = true;
                this.grayBtn = false;
            }
        },
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init() {
            if (util.isIosDevice()) {
                this.handleInput();
            }
            wxUtil.initWxJsAPI().then(() => {
                wxUtil.onShareFriends({
                    title: '停简单',
                    desc: '原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/login`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),
                });
                wxUtil.onShareFriendsZone({
                    title: '停简单：原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/login`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),

                })
            })
            util.setChannel(util.channels.parkingReport)
            $('.wrapBox').show()
//            this.getAvgAnnualReport();

        },
        //处理ios12系统的输入框调起键盘时键盘再收起时页面底部会出现空白的bug
        handleInput() {
            let elem, _this = this;
            $('input').on('blur', function() {
                let clientH = document.documentElement.clientHeight;
                let scrollH = document.documentElement.scrollHeight;
                if (this === elem ||
                    $(elem).prop('className') !== 'yzmInput' && $(elem).prop('className') !== 'phoneInput' && $(elem).prop('className') !== 'active_yzm' ||
                    $(this).prop('className') === 'yzmInput' && $(elem).prop('className') === 'active_yzm' && (util.isEmpty(_this.phone) || !util.validates.isValidPhone(_this.phone)) ||
                    $(this).prop('className') === 'yzmInput' && $(elem).prop('className') === 'active_yzm' && (!util.isEmpty(_this.phone) && util.validates.isValidPhone(_this.phone)) && _this.yzmState ||
                    $(this).prop('className') === 'phoneInput' && $(elem).prop('className') === 'active_yzm' && (util.isEmpty(_this.phone) || !util.validates.isValidPhone(_this.phone))
                    // $(this).prop('className') === 'yzmInput' && $(elem).prop('className') === 'phoneInput'
                ) {
                    setTimeout(() => {
                        window.scrollTo(0, scrollH - clientH);
                    }, 50)
                }
            })
            $('html').on('touchstart', function(e) {
                elem = e.target;
            });
        },
        checkFinal() {
            if (util.isEmpty(this.phone)) {
                setTjdTimeout(() => {
                    this.msg = '请填写正确的手机号后获取验证码'
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }, 600)
                return false;
            }
            if (!util.validates.isValidPhone(this.phone)) {
                setTjdTimeout(() => {
                    this.msg = '填写的手机号格式错误请检查'
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }, 600)
                return false;
            } else {
                util.setPhone(this.phone);
                return true;
            }
        },
        enablePhone() {
            $(".phone input").attr('disabled', false);
        },
        disablePhone() {
            $(".phone input").attr('disabled', true);
        },
        // 获取验证码
        getRealYzm: function() {
            tjdServices.request({
                method: 'getPhoneCode',
                phone: this.phone
            }).then(data => {
                $(".phone input").attr("readonly", true);
                this.disablePhone()
                this.time($("#btnCode")[0]);
            }, () => {
                this.yzmState = false;
            });
        },
        validatePhone() {
            this.isEnableNextBtn();
        },
        isEnableNextBtn() {
            setTimeout(() => {
                if (!util.isEmpty(this.phone) && !util.isEmpty(this.yzm) && this.phone.length === 11 && this.yzm.length >= 4) {
                    this.activeBtn = true;
                    this.grayBtn = false;
                } else {
                    this.grayBtn = true;
                    this.activeBtn = false;
                }
            })
        },
        // 验证码倒计时
        time(o) {
            if (this.wait === 0) {
                o.innerHTML = "再次获取";
                this.wait = 59;
                $(".phone input").removeAttr("readonly");
                this.enablePhone()
                this.yzmState = false;
            } else {
                if (util.isEmpty(this.wait)) {
                    this.wait = 59;
                }
                $(".phone input").attr("readonly", true);
                o.innerHTML = "已发送 (" + this.wait + "s)";
                this.wait--;
                setTjdTimeout(() => {
                    this.time(o);
                }, 1000)
            }
        },
        getYzm($event) {
            if (this.checkFinal() === false) {
                return false;
            }
            if (this.yzmState) {
                return false;
            }
            util.focus('yzmInput',$event);
            this.yzmState = true;
            this.getRealYzm();
        },
        grayGenerateReport() {
            if (this.checkFinal() === false) {
                return false;
            }
            if (util.isEmpty(this.yzm)) {
                setTjdTimeout(() => {
                    this.msg = '请填写正确的验证码'
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }, 600)
                return false;
            }
            if (this.yzm.length > 0 && this.yzm.length < 4) {
                setTjdTimeout(() => {
                    this.msg = '请填写正确的验证码'
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }, 600)
                return false;
            }
        },
        //生成报告方法
        generateReport() {
            if (this.checkFinal() === false) {
                return false;
            }
            tjdServices.request({
                method: 'getUnionUserAnnualReportByPhoneAndCode',
                phone: this.phone,
                phoneCode: this.yzm,
                handleExpOwn: true
            }).then(data => {
                this.userAnnualReport = data.userAnnualReport
                this.cmUserId = data.cmUserId
//                this.doNext()
                if (this.userAnnualReport && Number(this.userAnnualReport.time) >0 && this.cmUserId) {
                    window.location.href = util.constants.tcapiWebUrl + 'parkingReport/generateReport?isFormLogin=true&reportId=' + this.cmUserId;
                }
                else {
                    window.location.href = util.constants.tcapiWebUrl + 'parkingReport/newUser';
                }
            }).catch(err => {
                if (err.isSuccess == '1') {
                    this.msg = err.errorMSG
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                } else {
                    this.msg = "网络繁忙，请稍等"
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }
            });
        },
        doNext: function() {
            let generateReportInfo = {
                userFee: this.userAnnualReport.userFee,//用户一年的总停车费
                userDiscount: this.userAnnualReport.userDiscount,//用户一年总共优惠金额
                overUser: this.userAnnualReport.overUser,//超过用户
                time: this.userAnnualReport.time,//停车次数
                avgFee: this.userAnnualReport.avgFee,//平均停车费
                parkTime:this.userAnnualReport.parkTime,
                savingTime: this.userAnnualReport.savingTime,//节约时间
                cmUserId: this.cmUserId
            }
            util.setSession('generateReportInfo', JSON.stringify(generateReportInfo));
        },
        getAvgAnnualReport() {
            tjdServices.request({
                method: 'getAvgAnnualReport',
                handleExpOwn: true
            }).then(data => {
                $('.wrapBox').show()
                this.avgReport = data.avgReport
            }).catch(err => {
                $('.wrapBox').show()
                if (err.success == '1') {
                    this.msg = err.errorMSG
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                } else {
                    this.msg = "网络繁忙，请稍等"
                    this.modalType = 0
                    this.$refs.msgModal.showModal()
                }
            });
        },



    }
}
</script>


<style>
html,
body {
    overflow: auto;
    height: auto;
}
</style>

<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapBox {
    display: none;
    .bgBox {
        width: 100%;
        background: url(../../assets/images/parkingReport/indexBg.png) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .title {
            text-align: center;
            padding: 10% 0 5%;
            .logo {
                width: 75%;
            }
            .tjdtip {
                width: 80%;
            }
        }
        .middle {
            width: 310px;
            height: 114px;
            /*background: url(../../assets/images/parkingReport/indexTip.png) no-repeat;*/
            background: url(../../assets/images/parkingReport/timeBg.png) no-repeat;
            background-size: 100% 100%;
            margin: 50px auto 14px;
            position: relative;
            font-weight: 500;
            .leftTop {
                width: 101px;
                height: 62px;
                background: url(../../assets/images/parkingReport/indexLt.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -57px;
                left: 0;
                color: #fff;
                p {
                    font-size: 15px;
                    padding: 28px 0 0 10px;
                }
            }
            .rightTop {
                width: 126px;
                height: 76px;
                background: url(../../assets/images/parkingReport/indexRtNew.png) no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                position: absolute;
                top: -25px;
                right: -12px;
                color: #fff;
                p {
                    font-size: 15px;
                    padding: 35px 0 0 10px;
                }
            }
        }
        .middleIcon {
            text-align: center;
            img {
                width: 40px;
            }
        }
        .loginBg {
            width: 80%;
            height: 168px;
            background: url(../../assets/images/parkingReport/loginBg.png) no-repeat;
            background-size: 100% 100%;
            margin: 20px auto;
            .loginTitle {
                text-align: center;
                font-size: 14px;
                color: #6EEEF9;
                line-height: 56px;
                font-weight: 500;
            }
            .phone,
            .phoneCode {
                width: 85%;
                margin: 0 auto 10px;
                position: relative;
                overflow: hidden;
            }
            .phone input,
            .phoneCode input {
                background: url(../../assets/images/parkingReport/inputBg.png) no-repeat;
                background-size: 100% 100%;
                color: #6CFFFF;
                padding: 11px 0;
                outline: none;
                border: none;
                width: 100%;
                padding-left: 5%;
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: #596182;
            }
            input[type=tel]:focus {
                background: url(../../assets/images/parkingReport/phoneSelect.png) no-repeat;
                background-size: 100% 100%;
            }
            .active_yzm {
                width: 80px;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                text-align: center;
                float: right;
                margin-right: 5px;
                position: absolute;
                right: 0;
                top: 0;
                background: url(../../assets/images/parkingReport/vertical_lineA.png) no-repeat left center;
                background-size: 1px 14px;
                color: #67F7FB;
            }
        }
        .generateReport,
        .grayGenerateReport {
            text-align: center;
            font-size: 16px;
            color: #fff;
            font-weight: 500;
            letter-spacing: 0.5px;
            width: 92%;
            height: 85px;
            padding-left: 10%;
            margin: -10px 0 50px;
            position: relative;
            button {
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
        .generateReport {
            background: url(../../assets/images/parkingReport/generateReportNew.png) no-repeat;
            background-size: 100% 100%;
        }
        .grayGenerateReport {
            background: url(../../assets/images/parkingReport/grayGenerateReportNew.png) no-repeat;
            background-size: 100% 100%;
        }
        @media screen and (max-width: 320px) {
            .middle {
                width: 243px;
                height: 200px;
                .leftTop {
                    top: -55px;
                    left: -16px;
                }
                .rightTop {
                    top: -33px;
                    right: -28px;
                }
            }
        }
    }
}
</style>

