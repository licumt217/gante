<template>
    <div v-title="'1元购5元停车优惠券'">
        <section id="wrapper" class="wrapper">
            <div class="pic">
                <img src="./images/reproductionNew.png" alt="">
            </div>
            <div class="signBtnArea">
                <input type="button" class="sure" :class="{'disabled':isBtnDisabled}" :disabled="isBtnDisabled" :value="btnVal" @click="buy()">
            </div>
            <div class="content">
                <h2><span>活动规则</span><img class="showMore" src="./images/jiantou.png" alt=""></h2>
                <p style="color:red;">1、该优惠券为支付宝场内支付专享券；</p>
                <p>2、活动期间，停简单APP用户进入活动页即可快速购买停车优惠券；</p>
                <p>3、停车优惠券面值为5元，售价1元；</p>
                <p>4、每个用户每日限购2张券；</p>
                <p>5、优惠券使用条件：线上停车订单实际支付金额满6元可用；</p>
                <p>6、活动最终解释权归停简单所有。咨询电话：<a :href="'tel:'+servicePhone">{{servicePhone | parseServicePhone}}</a></p>
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'
    import {wxUtil} from '../../assets/js/wxUtil'
    import { tjdDoPay } from '../../assets/js/tjdDoPay'

    /**
     * c端支付回调
     */
    window.payCallback=function(data) {
        if(data=="0"){
            location.href=util.constants.tcapiWebUrl + 'oneToFiveCoupon/buyResult?dispatchFrom=app&is_success=T';
        }else{
            location.href=util.constants.tcapiWebUrl + 'oneToFiveCoupon/buyResult?dispatchFrom=app&is_success=F';
            //alert('支付失败')
        }
    }

    export default {
        data() {
            return {
                servicePhone:util.constants.servicePhone,
                isBtnDisabled:false,
                btnVal:"立即购券",
                state:{
                    "1001":"可以参与活动",
                    "1002":"商品不存在",
                    "1003":"商品未开启购买",
                    "1004":"商品已售完",
                    "1005":"商品未到购买时间",
                    "1006":"商品已截止购买",
                    "1007":"购买商品数量没有达到最少购买量",
                    "1008":"今日已购券",
                },
                unitPrice:'1.00'//商品单价
            }
        },
        computed:{
        },
        mounted: function() {
            util.initAPPCommInfo().then(()=>{
                if(util.isDispatchPushFromApp()){
                    this.init();
                }else {
                    this.$parent.showTjdModal({
                        errorMsg:"请用停简单APP打开此页面！",
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
            buy(){
                if(util.isDispatchPushFromApp()){
                    util.cnzzSend('APP端1元购5元活动“立即购券”按钮','点击')
                }
                this.isBtnDisabled = true;
                this.getUnitPrice().then((data)=>{
                    this.realBuy();
                },()=>{
                    this.realBuy();
                })
            },
            getUnitPrice(){
                return new Promise((resolve, reject)=>{
                    tjdServices.request({
                        method:'getGoodsInfo',
                        goodsId:'1809141217533861',
                        handleExpOwn: true,
                    }).then(data=>{
                        this.unitPrice = data.goodsInfo.amount
                        resolve(data)
                    },(res)=>{
                        reject()
                    });
                })
            },
            realBuy(){
                let returnUrl = util.constants.tcapiWebUrl + 'oneToFiveCoupon/buyResult?dispatchFrom=app';
                let payManner = util.payChannels.alipayAppNew;
                tjdServices.request({
                    method:'pay',
                    buyNum:'1',
                    payChannel:payManner,
                    amount: this.unitPrice || '1.00',
                    goodsId:'1809141217533861',
                    handleExpOwn: true,
                }).then((data)=>{
//                    util.urlContains('TJDAPPMustBeLogin')
                    if(data.state && data.state !== "1001" && this.state[data.state]){
                        this.btnVal=this.state[data.state];
                        this.isBtnDisabled = true;
                        this.$parent.showTjdModal({
                            errorMsg:this.state[data.state],
                            callBack:()=>{
                                this.close()
                            }
                        });
                    }else{
                        if(data.secuParam) tjdDoPay(payManner, data, returnUrl);
                        this.isBtnDisabled = false;
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
                        this.$parent.showTjdModal({
                            callBack:()=>{
                                this.close()
                            }
                        });
                    }
                });
            },
            canBuy(){
                tjdServices.request({
                    method:'canBuy',
                    goodsId:'1809141217533861',
                    buyNum:'1',
                    handleExpOwn: true,
                }).then(data=>{
                    if(data.state !== "1001" && this.state[data.state]){
                        this.btnVal=this.state[data.state];
                        this.isBtnDisabled = true;
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
            init() {
                tjdServices.getLoginInfo().then(()=>{
                    this.canBuy()
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
    background: #f5fbfc;
    /*padding: 0 10%;*/
}
.pic{
    text-align: center;
    overflow: hidden;
    img{
        width: 100%;
    }
}
.signBtnArea{
    margin-top: -41%;
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
        width: 81%;
        padding: 12px 0 15px;
        margin: 1.5em 0;
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
}
.content{
    margin: 0 0 32px;
    padding: 0 11%;
    color: #556d86;
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
            color: #556d86;
        }
    }
    p:last-child{
        margin-bottom: 0;
    }
}




</style>
