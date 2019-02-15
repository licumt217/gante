<template>
    <div v-title="'兑换'">
        <div class="main">
            <div class="box">
                <div class="leftBack"></div>
                <div class="rightBack"></div>
                <div class="content">
                    <div class="code">
                        <p class="title">余额兑换码</p>
                        <div class="field">
                            <input type="tel" maxlength="11" placeholder="请输入余额兑换码" v-model="redeemCode">
                        </div>
                    </div>
                    <div class="phone">
                        <p class="title">手机号</p>
                        <div class="field">
                            <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone">
                        </div>
                    </div>
                    <div class="phoneCode">
                        <p class="title">短信验证码</p>
                        <div class="field">
                            <input class="authCode"
                                   type="tel"
                                   maxlength="1"
                                   v-for="(i,$index) in num"
                                   :data-index="$index"
                                   v-model="code[$index]"
                                   @keydown="inputCodeEvent($event)"
                                   @keydown.delete="deleteInput($event)">
                            <div class="getCodeBox">
                                <p>4位数字验证码</p>
                                <input type="button" v-model="yzmBtnText" class="getCode" v-on:click="getCode($event)"
                                       :disabled="!isEnableGetcode">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="submit">
                    <img src="./images/top.png" class="top" alt="none">
                    <div class="declare">
                        <input type="button" :disabled="!isEnableredeem"
                               value="兑换余额">
                        <p class="title">活动说明</p>
                        <p>
                            1、礼品在起保日期后，系统每月自动生成一个新的充值码。客户可将充值码粘贴到服务商APP内进行充值使用。
                        </p>
                        <p>
                            2、每自然月可充值一次，逾期不补。
                        </p>
                        <p>
                            3、每个券码仅限充值一次，不可重复使用。
                        </p>
                    </div>
                    <img src="./images/pig.png" class="pig" alt="pig">
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { util } from 'util'
    import { wxUtil } from '../../assets/js/wxUtil'
    import { tjdServices } from 'tjdServices'
    import { ylServices } from '../../assets/js/ylServices'

    export default {
        name: 'exchange',
        data () {
            return {
                yzmBtnText: '获取验证码',
                redeemCode: '',
                phone: '',
                code: [],
                num: 4,
                wait: 59
            }
        },
        mounted () {

        },
        watch: {
            code: function (val) {
                val.forEach((item, i) => {
                    if (isNaN(item)) {
                        val[i] = ''
                    }
                })
            }
        },
        computed: {
            phoneCode: function () {
                return this.code.join('')
            },
            isEnableGetcode: function () {
                return !!this.redeemCode && (this.phone.length === 11) && this.wait === 59
            },
            isEnableredeem: function () {
                return !!this.redeemCode && (this.phone.length === 11) && (this.phoneCode.length === 4)
            }
        },
        methods: {
            deleteInput ($event) {
                if ($event.target.dataset.index > 0 && !$event.target.value) {
                    const index = ~~$event.target.dataset.index - 1
                    setTimeout(() => {
                        $('.authCode').eq(index).focus()
                    }, 0)
                }
            },
            inputCodeEvent ($event) {
                if ($event.keyCode !== 8) {
                    const key = $event.key
                    if (isNaN(key)) {
                        return false
                    }
                    const index = ~~$event.target.dataset.index + 1
                    if (index < 4) {
                        setTimeout(() => {
                            $('.authCode').eq(index).focus()
                        }, 0)
                    }
                }
            },
            getCode ($event) {
                util.focus('authCode', $event)
                this.time()
            },
            /**
             * 验证码倒计时
             */
            time (sign) {
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
            init () {
                tjdServices.getLoginInfo().then(() => {
                    this.getSignInfo().then(() => {
                        // 是否是否跳过校验
                        if (this.skipPhoneValidate === '0') {
                            this.register()
                        } else {
                            // 如果没有手机号，让用户输入，有手机号禁止输入，获取校验码校验
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
            close () {
                wxUtil.closeWindow()
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/common.less';


    .main {

        input::-webkit-input-placeholder {
            color: #999999;
            letter-spacing: 0;
            font-size: 20px;
        }

        overflow-y: scroll;
        overflow-x: hidden;
        background-image: url("./images/back.png");
        background-size: cover;
        min-width: 320px;
        height: 100vh;
        width: 100%;

        .box {
            position: relative;

            .leftBack {
                position: absolute;
                width: 20%;
                height: 250px;
                top: 6%;
                left: 7%;
                transform: rotateZ(-6deg);
                background-color: #FEF1AE;
                border-radius: 20px;
            }

            .rightBack {
                position: absolute;
                width: 20%;
                height: 250px;
                top: 6%;
                right: 7%;
                transform: rotateZ(6deg);
                background-color: #FEF1AE;
                border-radius: 20px;
            }

            .content {
                width: 86%;
                margin: 6% auto 0;
                padding: 2% 16px 100px;
                background-color: #fff;
                border-radius: 20px;
                position: relative;
                z-index: 999;

                .title {
                    font-size: 14px;
                    color: #222222;
                }

                .field {
                    height: 50px;
                    line-height: 50px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    border-bottom: 2px solid #222222;
                    z-index: 1000;

                    input {
                        font-size: 20px;
                        height: 20px;
                        line-height: 20px;
                        border: none;
                        outline: none;
                        background-color: transparent;
                    }
                }

                .phone, .phoneCode {
                    margin-top: 3%;
                }

                .phoneCode {
                    .field {
                        border-bottom: none;
                        display: flex;
                        flex-wrap: nowrap;

                        input {
                            margin-right: 6px;
                            width: 32px;
                            height: 40px;
                            border: 1px solid #222222;
                            text-align: center;
                        }

                        .getCodeBox {
                            display: inline-block;
                            height: 40px;
                            line-height: 20px;
                            vertical-align: top;
                            margin-left: 4px;

                            .getCode {
                                height: 20px;
                                width: auto;
                                font-size: 12px;
                                color: #ff5b5b;
                                border: solid 1px #ff5b5b;
                                border-radius: 2px;
                                background-color: #fff;
                                float: right;
                                padding: 0 5px;

                                &:disabled {
                                    border: 1px solid #999999;
                                    background-color: #cccccc;
                                    color: #666666;
                                }
                            }
                        }
                    }
                }
            }

            .submit {
                width: 95%;
                margin: -58px auto 0;
                position: relative;
                z-index: 9999;

                .top {
                    width: 100%;
                }

                .pig {
                    width: 100vw;
                    min-width: 320px;
                    margin-top: -8px;
                    margin-left: -3%;
                }

                .declare {
                    background-color: #FF4343;
                    padding: 0 4%;
                    width: 100%;
                    float: left;
                    overflow: hidden;
                    margin-top: -2px;

                    input[type=button] {
                        display: block;
                        margin: 2px auto 20px;
                        width: 100%;
                        height: 48px;
                        line-height: 48px;
                        background-color: #ffe762;
                        color: #ff4343;
                        font-size: 16px;
                        border: none;
                        outline: none;

                        &:disabled {
                            background-color: #ff7575;
                            color: #ffffff;
                        }
                    }

                    p {
                        color: #fff;
                        line-height: 20px;
                        font-size: 12px;
                        margin-bottom: 10px;
                    }

                    .title {
                        border-bottom: 1px solid #fff;
                    }
                }
            }
        }

    }


</style>


