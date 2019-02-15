<template>
    <div v-title="'开通免密'">
        <section id="wrapper" class="wrapper" v-show="showMain">
            <div class="main">
                <p class="title">认证开启免密</p>
                <div class="content">
                    <p class="tip">尊敬的停简单用户，请完成认证，开启免密支付。</p>
                    <ul class="form" :class="{'hasErrorMsg':errorMSG}">
                        <li>
                            <img src="./images/input_icon.png" v-if="!showPhoneInput" alt="">
                            <img src="./images/phone.png" v-else alt="">
                            <input type="tel" class="phone" v-show="showPhoneInput" maxlength="11" v-model.trim="phone"
                                   placeholder="请输入手机号">
                            <span v-show="!showPhoneInput">{{phone}}</span>
                        </li>
                        <li>
                            <img src="./images/input_icon.png" alt="">
                            <span>{{carNum | parseCarNum(' ') }}</span>
                        </li>
                        <li>
                            <input class="yzm" type="tel" v-model="yzm" @keyup="isEnableSignBtn()" placeholder="请输入验证码"
                                   maxlength="6">
                            <span class="getYzmBtn" :class="{'grey':yzmDisabled}" @click="getYzm($event)"
                                  v-text="yzmBtnText"></span>
                        </li>
                        <li class="errorMSG">
                            <span>{{errorMSG}}</span>
                        </li>
                    </ul>
                </div>
                <input type="button" value="同意协议并开通" :class="enableSignBtn?'next_active':'next_inactive'"
                       @click="register()" :disabled="!enableSignBtn"/>
                <p class="loginText">
                    <span>
                        <a @click="go2Protocal">停简单三方免密用户使用协议</a>
                    </span>
                </p>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import { util } from 'util'
    import { wxUtil } from '../../assets/js/wxUtil'
    import { tjdServices } from 'tjdServices'
    import { ylServices } from '../../assets/js/ylServices'

    export default {
        data () {
            return {
                showMain: false,
                showPhoneInput: false,
                carNum: '',
                phone: '',
                yzm: '',
                wait: 59,
                yzmDisabled: false,
                yzmBtnText: '获取验证码',
                enableSignBtn: false,
                errorMSG: '',
                skipPhoneValidate: ''
            }
        },
        mounted () {
            this.signId = util.getUrlArray()[0]
            if (!util.isEmpty(this.signId)) {
                this.init()
            } else {
                this.$parent.showTjdModal({
                    errorMsg: '参数不正确！',
                    callBack: () => {
                        this.close()
                    }
                })
            }
        },
        watch: {
            phone: function (val) {
                this.yzmDisabled = this.phone.length !== 11
            }
        },
        methods: {
            init () {
                if (sessionStorage.getItem('signResultShowed') || sessionStorage.getItem('signShowed')) {
                    wxUtil.closeWindow()
                } else {
                    tjdServices.getLoginInfo().then(() => {
                        this.getSignInfo().then(() => {
                            // 是否是否跳过校验
                            if (this.skipPhoneValidate === '0') {
                                this.register()
                            } else {
                                // 如果没有手机号，让用户输入，有手机号不用输入，获取校验码校验
                                if (util.isEmpty(this.phone)) {
                                    this.showPhoneInput = true
                                    this.yzmDisabled = true
                                }
                                this.showMain = true
                            }
                        }, (data) => {
                            this.showMain = true
                            this.errorMSG = data.errorMSG
                        })
                    }, () => {})
                }
            },
            getYzm ($event) {
                if (!this.yzmDisabled && this.phone.length === 11) {
                    this.getRealYzm()
                    util.focus('yzm', $event)
                }
            },
            getRealYzm () {
                ylServices.request({
                    command: 'sign',
                    method: 'getPhoneCode',
                    phone: this.phone,
                }).then(data => {
                    this.yzmDisabled = true
                    this.time()
                })
            },
            /**
             * 验证码倒计时
             */
            time: function (sign) {
                clearTimeout(sign)
                if (this.wait === 0) {
                    this.yzmBtnText = '获取验证码'
                    this.wait = 59
                    this.yzmDisabled = false
                } else {
                    if (util.isEmpty(this.wait)) {
                        this.wait = 59
                    }
                    this.yzmBtnText = this.wait + '秒'
                    this.wait--
                    var timeOutSign = setTimeout(() => {
                        this.time(timeOutSign)
                    }, 1000)
                }
            },
            isEnableSignBtn () {
                if (!util.isEmpty(this.yzm) && this.yzm.length >= 4 && this.phone.length === 11) {
                    this.enableSignBtn = true
                } else {
                    this.enableSignBtn = false
                }
            },
            getSignInfo () {
                return new Promise((resolve, reject) => {
                    ylServices.request({
                        command: 'sign',
                        method: 'getSignInfo',
                        signId: this.signId,
                    }).then(data => {
                        this.carNum = data.carNum
                        this.skipPhoneValidate = data.skipPhoneValidate
                        this.phone = data.phone
                        resolve()
                    }).catch(data2 => {
                        reject(data2)
                    })
                })
            },
            register () {
                let payChannel = util.isWeixinBrowserOnly() ? util.payChannels.weixinThird : util.payChannels.alipayThird
                let returnUrl = this.getReturnUrl()
                let accessInfo = util.isAlipayBrowserOnly() ? 'ALIPAYAPP' : ''
                const params = {
                    command: 'sign',
                    method: 'doSign',
                    phone: this.phone,
                    phoneCode: this.yzm,
                    signId: this.signId,
                    payChannel: payChannel,
                    returnUrl: returnUrl,
                    accessInfo: accessInfo,
                }
                if (this.skipPhoneValidate === '0') {
                    params.phone = null
                    params.yzm = null
                }
                ylServices.request(params).then(data => {
                    if (data.isSuccess == '0' && data.signUrl) {
                        // 用户点击返回按钮有此标识直接关闭公众号网页
                        sessionStorage.setItem('signShowed', '1')
                        location.href = data.signUrl
                    }
                }).catch(data2 => {
                    if (data2.isSuccess == '3') {
                        this.$router.push({ path: '/thirdSign/signResult', query: { isSuccess: true } })
                    } else if (data2.isSuccess == '1') {
                        this.errorMSG = data2.errorMSG
                        this.showMain = true
                    } else {
                        this.errorMSG = '网络异常，请重试。'
                        this.showMain = true
                    }
                })
            },
            getReturnUrl () {
                if (util.isAlipayBrowserOnly()) {
                    return util.constants.tcapiWebUrl + 'thirdSign/signResult?isSuccess=true'
                } else {
                    return ''
                }
            },
            go2Protocal () {
                this.$router.push({ path: '/thirdSign/thirdSignUserAgreement' })
            },
            close () {
                wxUtil.closeWindow()
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/common.less';

    .main {
        width: 100%;
        padding-bottom: 10%;
        background: url("./images/main_bg.png") no-repeat;
        background-size: 100% 100%;

        .title {
            color: #fff;
            font-size: 22px;
            padding-left: 11%;
            padding-top: 10%;
            letter-spacing: 1px;
        }

        .content {
            width: 86%;
            margin: 10% auto 0;
            overflow: hidden;
            padding: 25px 30px;
            font-size: 12px;
            color: #999;
            box-sizing: border-box;
            background: url("./images/content_bg.png") no-repeat;
            background-size: 100% 100%;

            .tip {
                text-align: center;
                margin-top: 15px;
                line-height: 18px;
                letter-spacing: 1px;
                padding: 0 6%;
            }

            .form {
                color: #dadada;
                font-size: 15px;
                margin: 9% 0 20% 0;
                position: relative;

                li {
                    height: 62px;
                    line-height: 72px;
                    position: relative;
                    letter-spacing: 1px;
                    border-bottom: 1px solid #ebebeb;

                    .phone {
                        position: absolute;
                        border: none;
                        height: 30px;
                        line-height: 30px;
                        top: 50%;
                        transform: translateY(-50%);
                        outline: none;
                        margin-top: 4px;
                        font-size: 14px;
                        letter-spacing: 1px;
                    }

                    img {
                        width: 16px;
                        vertical-align: middle;
                        margin: -4px 10px 0 0;
                    }

                    .yzm {
                        border: none;
                        outline: none;
                        background: none;
                        line-height: 30px;
                        text-indent: 5px;
                        width: 40%;
                        letter-spacing: 1px;
                        font-size: 14px;
                    }

                    .getYzmBtn {
                        text-align: center;
                        position: absolute;
                        top: 62%;
                        right: 0;
                        font-size: 13px;
                        color: #fff;
                        width: 124px;
                        line-height: 41px;
                        height: 46px;
                        transform: translateY(-50%);
                        -webkit-transform: translateY(-50%);
                        background: url("./images/getYzm_bg.png") no-repeat;
                        background-size: 100% 100%;
                    }

                    .getYzmBtn.grey {
                        background: url("./images/getYzm_gray_bg.png") no-repeat;
                        background-size: 100% 100%;
                    }

                }

                li.errorMSG {
                    width: 100%;
                    font-size: 11px;
                    color: #f96161;
                    text-align: center;
                    position: absolute;
                    bottom: -17%;
                    border-bottom: none;
                    line-height: normal;
                    height: auto;
                }
            }

            .form.hasErrorMsg {
                margin: 9% 0 23% 0;
            }
        }

        .next_active, .next_inactive {
            outline: none;
            box-sizing: border-box;
            width: 84%;
            font-size: 15px;
            letter-spacing: 1px;
            padding: 13px 0 20px;
            text-align: center;
            border: none;
            margin: 5% 8%;
            color: #fff;
        }

        .next_active {
            background: url("./images/btn_bg.png") no-repeat;
            background-size: 100% 100%;
            transition: all .1s;
            -webkit-transition: all .1s;
        }

        .next_inactive {
            background: url("./images/btn_disabled_bg.png") no-repeat;
            background-size: 100% 100%;
            transition: all .1s;
            -webkit-transition: all .1s;
        }

        .next_active:active {
            background: url("./images/btn_press_bg.png") no-repeat;
            background-size: 100% 100%;
            transition: all .1s;
            -webkit-transition: all .1s;
        }

        .loginText {
            font-size: 12px;
            letter-spacing: 1px;
            text-align: center;

            a {
                color: #a7a7a7;
                border-bottom: 1px solid #a7a7a7;
            }
        }
    }

    input::-webkit-input-placeholder {
        color: #dadada;
        letter-spacing: 0;
    }


</style>


