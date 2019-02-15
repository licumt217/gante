<template>
    <div v-title="'立享20元停车大礼包'">
        <section id="wrapper" class="wrapper">
            <div class="pic">
                <img src="./images/reproductionNew.png" alt="">
            </div>
            <div class="signBtnArea">
                <div class="subscribe" v-show="!isSubscribe">
                    <img :src="subImgSrc" alt="">
                    <p>关注二维码领取优惠券</p>
                </div>
                <input v-show="isSubscribe" type="button" class="sure" :class="{'disabled':isBtnDisabled}" :disabled="isBtnDisabled" :value="btnVal" @click="sign()">
            </div>
            <div class="content">
                <h2><span>活动规则</span><img class="showMore" src="./images/jiantou.png" alt=""></h2>
                <p>1、活动期间，开通支付宝免密支付，即可获得20元停车优惠券；</p>
                <p>2、享受优惠后，停车费最低支付金额为1元；</p>
                <p>3、用户参与流程：{{isSubscribe?'':'关注停简单生活号→'}}开通支付宝免密支付→领20元停车优惠券；</p>
                <p>4、每个用户只能领取一次；</p>
                <p>5、活动最终解释权归停简单所有。咨询电话：<a :href="'tel:'+servicePhone">{{servicePhone | parseServicePhone}}</a></p>
            </div>
            <div class="couponUseRule">
                <p class="ruleTitle">
                    <span class="titleContent">优惠券使用说明</span>
                </p>
                <ul class="ruleContent">
                    <li>1、20元停车优惠券，分4次使用，每笔停车订单可抵停车费，车辆出场时会自动使用优惠券抵扣相应停车费；</li>
                    <li>2、每个停车订单只能使用一张优惠券；</li>
                    <li>3、优惠券仅在停简单停车场进行支付宝免密支付时使用；</li>
                    <li>4、优惠券有效期：自领取之日起30日内有效；</li>
                    <li>5、优惠券不可兑换现金，不得提现，不予找零，不能转赠；</li>
                    <li>6、优惠券仅在开通支付宝免密支付的情况下才可享受，如果活动期间关闭免密支付功能，将不享受优惠；再次开通后可继续享受优惠；</li>
                </ul>
            </div>

        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'
    import {wxUtil} from '../../assets/js/wxUtil'

    export default {
        data() {
            return {
                servicePhone:util.constants.servicePhone,
                isSubscribe:false,
                isTemp:false,
                hasBind:false,
                isBtnDisabled:false,
                btnVal:"点击领取"
            }
        },
        computed:{
            subImgSrc() {
                if(process.env.NODE_ENV == 'prod'){
                    return require('./images/aliPaySub_prod.png')
                }else {
                    return require('./images/aliPaySub_prep.png')
                }
            }
        },
        mounted: function() {
            util.initAPPCommInfo().then(()=>{
                if(util.isAlipayBrowserOnly() || util.isDispatchPushFromApp()){
                    this.init();
                }else {
                    this.$parent.showTjdModal({
                        errorMsg:"请用支付宝或停简单APP打开此页面！",
                    });
                }
            },()=>{
                this.$parent.showTjdModal({
                    errorMsg:"请先登录",
                    callBack: ()=>{
                        document.location='objccloseweb://';//关闭停简单app页面
                    }
                });
            })
        },
        methods: {
            sign(){
                if(util.isDispatchPushFromApp()){
                    util.cnzzSend('APP端停车礼包活动“点击领取”按钮','点击')
                }else {
                    util.cnzzSend('生活号停车礼包活动“点击领取”按钮','点击')
                }
                this.isBtnDisabled = true;
                if (this.hasBind){
                    this.$parent.showTjdModal({
                        errorMsg:"您已开通免密支付！",
                        callBack: ()=>{
                            this.isBtnDisabled = false;
                            this.close();
                        }
                    });
                }else {
                    this.getActivityState().then(()=>{
                        if(this.isTemp){
                            util.setSession('isFromAlipayAutoPaySignNew','1')
                            util.cnzzSend("匿名用户跳转到登陆页",'跳转')
                            location.href = util.constants.tcapiWebUrl + 'login/newLogin';
                        }else{
                            this.realSign('aliPay');
                        }
                    })
                }
            },
            getPartInTimes(){
                tjdServices.request({
                    method:'getPartInTimes',
                    activityId:'1807311307088042',
                    handleExpOwn: true,
                }).then(data=>{
                    if(Number(data.times) >= 1){
                        this.btnVal= "您已领取优惠券"
                        this.isBtnDisabled = true;
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
                    if(util.isDispatchPushFromApp()){
                        returnUrl= util.constants.tcapiWebUrl + 'aliPayAutoPaySignNew/signSuccess?dispatchFrom=app';
                    }else {
                        returnUrl= util.constants.tcapiWebUrl + 'aliPayAutoPaySignNew/signSuccess';
                    }
                }
                tjdServices.request({
                    method:'autoPaySign',
                    returnUrl:returnUrl,
                    signType:signType,
                    accessInfo:'ALIPAYAPP',
                    handleExpOwn: true,
                }).then((data)=>{
                    if(util.isDispatchPushFromApp()){
                        let str = "alipays://platformapi/startapp?appId=20000067&url=" + encodeURIComponent(data.signUrl) + "&_t=" + data.timestamp
                        location.href = str;
                        setTimeout(()=>{
                            if(util.urlContains('TJDAPPMustBeLogin')){//从app首页banner点进来
                                util.freshMain()
                            }else {
                                window.history.go(-1)
                            }
                        },30)
                    } else {
                        location.href=data.signUrl;
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
            getSignState(){
                tjdServices.request({
                    method:'getAutoPayState',
                    signType:'3005'
                }).then(data=>{
                    if(data.signState && data.signState == 'true'){
                        this.hasBind=true;
                        this.btnVal='您已开通免密支付';
                        this.isBtnDisabled = true;
                    }
                });
            },
            getActivityState(){
                let state={
                    "noActivityConfig":"活动配置不存在",
                    "activityNoStart":"活动未开始",
                    "activityEnd":"活动已结束",
                    "activityClose":"活动已关闭",
                    "participateInActivity":"活动有效"
                }
                return new Promise((resolve, reject)=>{
                    tjdServices.request({
                        method:'getActivityStatus',
                        activityId:'1807311307088042',
                        handleExpOwn: true,
                    }).then(data=>{
                        if(data.state !== "participateInActivity" && state[data.state]){
                            this.$parent.showTjdModal({
                                errorMsg:state[data.state]
                            });
                            reject()
                        }else if(data.state == "participateInActivity"){
                            resolve()
                        }
                    },(res)=>{
                        if(res.isSuccess == "1"){
                            this.$parent.showTjdModal({
                                errorMsg:res.errorMSG,
                                callBack:()=>{
                                    this.close()
                                }
                            });
                            reject()
                        }else {
                            this.$parent.showTjdModal({});
                            reject()
                        }
                    });
                })
            },
            init() {
                tjdServices.getLoginInfo().then(()=>{
                    if(util.isDispatchPushFromApp()){
//                        app来的不显示关注二维码等信息
                        this.isSubscribe = true;
                    }else {
                        this.isSubscribe = util.isSubscribe();
                    }
                    this.isTemp = util.isTempUser();
                    if(this.isSubscribe && !this.isTemp){
                        this.getPartInTimes()
                    }
                    $('.wrapper').show()
                },()=>{
                    this.$parent.showTjdModal({
                        errorMsg:"登陆失败",
                        callBack:this.close
                    });
                })
            },
            close() {
                if(util.isDispatchPushFromApp()){
                    document.location='objccloseweb://';//关闭停简单app页面
                }else {
                    wxUtil.closeWindow()
                }
            },
        }
    }

</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapper {
    display: none;
    /*padding: 0 10%;*/
}
.pic{
    text-align: center;
    overflow: hidden;
    img{
        width: 100%;
    }
    img:nth-child(2){
        width: 78%;
        margin-top: 8%;
    }

}
.signBtnArea{
    margin-top: -13%;
    padding: 0 11%;
    text-align: center;
    .sure{
        outline: none;
        border: none;
        font-size: 17px;
        text-align: center;
        color: #fff;
        background: url("./images/button_normal.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        padding: 12px 0;
        margin: 0.5em 0 2em;
        letter-spacing: 2px;
        font-weight: 500;
    }
    .sure:active{
        background: url("./images/button_press.png") no-repeat;
        background-size: 100% 100%;
    }
    .sure.disabled{
        background: url("./images/button_disabled.png") no-repeat;
        background-size: 100% 100%;
    }
    .subscribe{
        margin-bottom: 2em;
        text-align: center;
        img{
            width: 38%;
        }
        p{
            color: #6e81ff;
            font-weight: bold;
            margin-top: 1.5em;
            letter-spacing: 2px;
            font-size: 14px;
        }
    }
}
.content{
    margin: 0 0 32px;
    padding: 0 11%;
    color: #2a2a2a;
    letter-spacing: 1px;
    h2{
        font-size: 13px;
        text-align: center;
        font-weight: 500;
        position: relative;
        margin-bottom: 3em;
        .showMore{
            position: absolute;
            top: 27px;
            left: 50%;
            width: 8px;
            transform:translateX(-50%);
        }
    }
    p{
        margin-bottom: 1.3em;
        font-size: 12px;
        a{
            color: #2a2a2a;
        }
    }
    p:last-child{
        margin-bottom: 0;
    }
}
.content.magrinTop{
    margin: 0 0 32px;
}
.couponUseRule{
    color: #2a2a2a;
    margin-bottom: 2em;
    padding: 0 11%;
    letter-spacing: 1px;
    .ruleTitle{
        font-size: 13px;
        text-align: center;
        font-weight: 500;
        margin-bottom: 2em;
    }
    .ruleContent{
        color: #2a2a2a;
        letter-spacing: 1px;
        li{
            margin-bottom: 1.3em;
            font-size: 12px;
        }
        li:last-child{
            margin-bottom: 0;
        }
    }
}



</style>
