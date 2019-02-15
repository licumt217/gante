<template>
    <div v-title="'登录'">

        <section id="wrapper" class="wrapper" v-show="isShowMain">
            <div class="content">
                <img class="logo" src="../../assets/images/login/tjd_logo.png" alt="">
                <div class="title">
                    <p>你好，</p>
                    <p>停车不等待，简单新体验</p>
                </div>
                <ul class="form">
                    <li>
                        <input class="yzm-phone" type="tel" placeholder="请输入手机号码" v-model="phone" maxlength="11" />
                    </li>
                    <li>
                        <input type="tel" placeholder="请输入4位验证码" onfocus="this.focus()" v-model="yzm" maxlength="4" class="yzm-yzm" />
                        <span class="yzm-get-yzm ">获取验证码</span>
                    </li>
                </ul>

                <input type="button"  value="登录领券" class="yzm-btn" @click="register()" disabled />
                <p class="loginText">
                    <span>
                        登录即代表您同意停简单
                        <a :href="tcapiWebUrl+'app/userAgreement'" >用户协议</a>
                    </span>
                </p>
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">

import { util } from 'util'
import { tjdServices } from 'tjdServices'
import { } from '../../assets/js/jquery.yzm'

export default {
    data() {
        return {
            phone: '',
            yzm: '',
            isShowMain: false,
            tcapiWebUrl:util.constants.tcapiWebUrl,
            isAgree:false,
            agreementVersion:''
        }

    },
    mounted: function() {
        this.init();
    },
    methods: {
        checkFinal: function() {
            if (!util.validates.isValidPhone(this.phone)) {
                setTjdTimeout(()=> {
                    this.$parent.showTjdModal({
                        type: 2,
                        errorMsg: "请输入正确的手机号码"
                    });
                }, 600);
                return false;
            } else if (!util.isTempUser() && (this.phone == util.getPhone())) {
                setTjdTimeout(()=> {
                    this.$parent.showTjdModal({
                        type: 2,
                        errorMsg: "请切换不同手机号用户！"
                    });
                }, 600);
                return false;
            } else {
                return true;
            }
        },
        realRegister:function () {
            tjdServices.request({
                method: 'wxBind',
                phone: this.phone,
                yzm: this.yzm
            }).then(data => {
                util.setPhone(this.phone);
                sessionStorage.userId = data.userid;
                sessionStorage.isLogin = "1";
                //是否为新注册用户
                util.setCookie("isNewUser", data.isNewUser);
                util.setSession('isSwitchUser', null);
                util.setSession('isTempUser', null);


                //取得用户信息后，手动同意停简单推广协议
                this.getAgreeVersion().then(()=>{
                    tjdServices.request({
                        method: 'agreeTJDP',
                        agreementVersion:this.agreementVersion
                    }).then(data2 => {
                        if(util.getSession('isFromAlipayAutoPaySignNew')){
                            this.getPartInTimes();
                        }
                    })
                })
            });
        },
        getSignState(){
            tjdServices.request({
                method:'getAutoPayState',
                signType:'3005'
            }).then(data=>{
                if(data.signState && data.signState == 'true'){
                    this.$parent.showTjdModal({
                        errorMsg:"该用户已经绑定支付宝免密支付",
                        callBack:()=>{
                            window.history.go(-1)
                        }
                    });
                }else if(data.signState && data.signState == 'false'){
                    this.realSign('aliPay');
                }
            });
        },
        getPartInTimes(){
            tjdServices.request({
                method:'getPartInTimes',
                activityId:'1807311307088042',
                handleExpOwn: true,
            }).then(data=>{
                if(Number(data.times) >= 1){
                    this.$parent.showTjdModal({
                        errorMsg:"该用户已经参加过活动",
                        callBack:()=>{
                            window.history.go(-1)
                        }
                    });
                }else if(Number(data.times) == 0){
                    this.getSignState()
                }
            },(res)=>{
                if(res.isSuccess == "1"){
                    this.$parent.showTjdModal({
                        errorMsg:res.errorMSG,
                        callBack:()=>{
                            this.close()
                        }
                    });
                }else {
                    this.$parent.showTjdModal({});
                }
            });
        },
        realSign(type){
            let signType = '';
            let returnUrl= '';
            if(type == 'aliPay'){
                signType = '3005';
                returnUrl=util.constants.tcapiWebUrl + 'aliPayAutoPaySignNew/signSuccess';
            }
            tjdServices.request({
                method:'autoPaySign',
                returnUrl:returnUrl,
                signType:signType,
                accessInfo:'ALIPAYAPP',
                handleExpOwn:true,
            }).then((data)=>{
                location.href=data.signUrl;
            },(data)=>{
                if (data.isSuccess === '1') {
                    if(data.errorMSG.indexOf('已经成功签约')>0){
                        this.$parent.showTjdModal({
                            errorMsg: data.errorMSG,
                            callBack: ()=>{
                                util.go2(this,'aliPayAutoPaySignNew/signSuccess?is_success=T')
                            }
                        })
                    }else {
                        this.$parent.showTjdModal({errorMsg: data.errorMSG})
                    }
                } else {
                    this.$parent.showTjdModal({})
                }
            })
        },
        getAgreeVersion:function () {
            var deferred = $.Deferred()
            var promise = deferred.promise()
            //手动同意tjd用户协议
            tjdServices.request({
                method:'isAgreeTJDP',
            }).then(data=>{
                //取得用户协议号
                if (data.isSuccess === '0') {
                    deferred.resolve();
                    this.agreementVersion = data.agreementVersion;
                }
            });
            return promise
        },
        /**
         * 注册
         */
        register: function() {
            util.cnzzSend('生活号“登录领券”按钮','点击')
            if (this.checkFinal() === false) {
                return false;
            }
            this.realRegister();
        },
        inActiveGetYzm: function() {
            $(".yzm-get-yzm").addClass('active_yzm');
            $(".yzm-get-yzm").attr('disabled', false);
        },
        showLoginInfo: function() {
            this.isShowMain = true;
            $.initYzm({
                getYzmActiveClass: 'active_yzm',
                getYzmInActiveClass: 'inactive_yzm',
            });
        },
        init: function() {
            if (util.getSession('isFromAlipayAutoPaySignNew')) {
                this.showLoginInfo();
            }
        }
    }
}

</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapper {
    background: url("../../assets/images/login/login_bg_new.png") no-repeat;
    background-size: 100% 100%;
    .content{
        width: 85%;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
        /*margin: 19% auto 0;*/
        background: url("../../assets/images/login/login_content-bg.png") no-repeat;
        background-size: 100% 100%;
        padding: 10%;
        .logo{
            width: 58px;
            position: absolute;
            right: 8%;
            top: 20px;
        }
        .title {
            color: #fff;
            p:nth-child(1){
                font-size: 32px;
                letter-spacing: 2px;
                margin:6px 0 10px;
                font-weight: 500;
            }
            p:nth-child(2){
                font-size: 15px;
                letter-spacing: 2px;
            }
        }
        ul.form{
            margin-top:20%;
            li {
                border-bottom: solid 1px #6f4f61;
                font-size: 13px;
                input {
                    color: #fff;
                    width: 75%;
                    border: none;
                    outline: none;
                    background: none;
                    padding: 20px 0;
                    font-size: 13px;
                    letter-spacing: 1px;
                }
                &:nth-child(2) input {
                     width: 55%;
                 }
            }
            li:nth-child(2){
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
        }
    }

}

.inactive_yzm {
    color: #a5a5a5;
    background: #e5e5e5;
    transition: all .2s;
}

.active_yzm {
    color: #668097;
    background: #fff;
    transition: all .2s;
}

.inactive_yzm,
.active_yzm {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    float: right;
    width: 45%;
    text-align: center;
    padding: 8px 0;
    border-radius: 23px;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #7e7083;
    font-size: 13px;
    letter-spacing: 1px;
}
.next_active,
.next_inactive {
    outline: none;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em 0;
    font-size: 15px;
    border-radius: 30px;
    letter-spacing: 1px;
    margin: 34% 0 1.3em;
    text-align: center;
    border: none;
}

.next_active {
    color: #668097;
    background: #fff;
    transition: all .1s;
    -webkit-transition: all .1s;
    border: 1px solid transparent;
}

.next_inactive {
    border: 1px solid #eaeaea;
    color: #a5a5a5;
    background: #e5e5e5;
    box-sizing: border-box;
}

.next_active:active {
    background: #e5e5e5;
    transition: all .1s;
    -webkit-transition: all .1s;
}

.loginText {
    font-size: 13px;
    color: #7e7083;
    text-align: center;
    margin-bottom: 1em;
    letter-spacing: 1px;
    line-height: 26px;
    height:26px;
    a {
        font-size: 12px;
        color: #fff;
        border-bottom: 1px solid #fff;
    }
}
</style>
