<template>
    <div class="wrapper" id="wrapper" v-title="'支付离场'">
        <div class="banner">
            <p>支付离场</p>
        </div>

        <!--车辆不在场-->
        <div class="order absentOrder">
            <div class="border_bottom"></div>
            <h5>
                <em>{{order.carNum}}</em>
                <span v-if="MallCardType =='2'"><img src="./images/silvery.png" alt=""></span>
                <span v-if="MallCardType =='3'"><img src="./images/gold.png" alt=""></span>
                <span v-if="MallCardType =='4'"><img src="./images/platinum.png" alt=""></span>
            </h5>
            <template>
                <p>入场时间
                    <span><i>{{order.startDate}}</i>&nbsp;<i>{{order.startTime}}</i></span>
                </p>
                <p>出场时间
                    <span>未出场</span>
                </p>
                <p>停车时长
                    <span>{{order.parkTime | transParkTime2Str('1')}}</span>
                </p>
                <p class="parkingMoney">停车费用
                    <span>{{order.parkAmount}}元</span>
                </p>
                <div v-if="(isUseMember && memberAmount*1 > 0) || (serviceAmount*1 > 0)" class="preferential">
                    <p v-if="isUseMember && memberAmount*1 > 0">会员线上自动减免
                        <span class="money" v-if="memberAmount*1 == 0">- 0元</span>
                        <span class="money" v-else>- {{memberAmount | currency}}元</span>
                    </p>
                    <p v-if="serviceAmount*1 > 0">客服台已办理减免
                        <span class="money" v-if="serviceAmount*1 == 0">- 0元</span>
                        <span class="money" v-else>- {{serviceAmount | currency}}元</span>
                    </p>
                </div>
            </template>
        </div>
        <div class="deduction">
            <div class="deductionInfo">
                <p>可用积分:
                    <em>{{score - (scoreHour * scoreUnit)}}</em>
                    <span>消耗积分:
                        <em>{{scoreHour * scoreUnit}}</em>
                    </span>
                </p>
                <p>
                    <em><img src="./images/deduction.png" class="deductionIcon" />
                        <i>积分抵扣</i>
                        <b class="numButton">
                            <button class="numJian" :class="scoreHour*1==0?'disabled':''" @click="offsetHour('0')" :disabled="scoreHour*1==0?true:false"></button>
                            <i> {{scoreHour}} </i>
                            <button class="numJia" @click="offsetHour('1')"></button>
                        </b>
                        <i>小时</i><img @click="showTip" src="./images/problemIcon.png" class="problemIcon" /></em>
                    <span style="color: #f74924">- {{scoreHour*parkAmountUnit}}元</span>
                </p>
                <p v-if="couponCount>0 && couponInfoList.length>0" @click.stop="showActionSheet()"><img src="./images/couponIcon.png" class="couponIcon" />停车优惠券
                    <span v-if="selectCoupon && selectCoupon.disCountMoney" style="color: #f74924">- {{selectCoupon.disCountMoney | currency}}元&nbsp;&gt;</span>
                    <span v-else>有券可用去使用&nbsp;&gt;</span>
                </p>
                <p v-else><img src="./images/couponIcon.png" class="couponIcon" />停车优惠券
                    <span>无可用优惠券&nbsp;&gt;</span>
                </p>
            </div>
        </div>
        <p class="payMoney">应缴金额
            <span>{{realUnPayAmount | currency}}元</span>
        </p>
        <div v-transfer-dom>
            <popup v-model="popVisible" :hide-on-blur="true">
                <div class="popup">
                    <div class="couponBoxList">
                        <p class="couponTitle"><img src="./images/couponTitle.png" alt=""></p>
                        <template v-if="couponCount>0" v-for="coupon in couponInfoList">
                            <input type="radio" :id="'radio'+coupon.VCode" name="selectedCoupon" :checked="coupon.VCode==selectCoupon.VCode">
                            <label :for="'radio'+coupon.VCode" :class="coupon.isExpRight?'isExpRight':''" @click="tapCoupon(coupon)">
                                <div class="couponBox">
                                    <p>
                                        <span>{{coupon.CouponName}}</span>
                                        <time>
                                            <i class="ticketStartTime">{{coupon.EnableTime.split(' ')[0].replace(/\//g,'-')}}</i>-<i class="ticketEndTime">{{coupon.OverdueTime.split(' ')[0].replace(/\//g,'-')}}</i>
                                        </time>
                                    </p>
                                    <span class="state">
                                        <b class="couponPrice">{{coupon.disCountMoney}}</b>元
                                    </span>
                                </div>
                            </label>
                        </template>
                    </div>
                    <div class="noUseCoupon">
                        <p class="selectNobtn" @click="tapCoupon()">不使用停车优惠券</p>
                    </div>
                </div>
            </popup>
        </div>

        <div class="tip">
            <p>
                <label>!</label>
                温馨提示:<br>
                <span class="firstSpan">支付后您将有15分钟时间离场，期间不产生任何费用。若您未能在15分钟内离场，超出时间将按临停标准收费。</span>
                <template v-if="MallCardType =='3' || MallCardType =='4'">
                    <span>优惠规则:</span>
                    <span>1.会员停车优惠:铂金级会员每日减免4小时，金级会员每日减免2小时，仅限单次使用。</span>
                    <span>2.会员积分抵扣:200积分兑换1小时。</span>
                    <span>3.停车优惠券:每次支付仅限使用一张停车优惠券。</span>
                    <span>4.每人每日最多享受8小时停车优惠，纸质券不可与微信支付同时使用。</span>
                </template>
            </p>
        </div>
        <p class="sure" v-if="this.order && this.order.unPayAmount*1>0" @click="commit">下一步</p>
        <ydgModal ref="msgModal" :top="false" :small="true" :force="true" :oneBtn="true" @ok="okCallBack">
            <p class="modalMsgContent">{{msg}}</p>
        </ydgModal>
    </div>
</template>
<script type="text/ecmascript-6">
import { TransferDom, Popup } from 'vux'
import { util } from 'util'
import { ydgServices } from '../../assets/js/ydgServices'
import {ydgHttp} from '../../http/ydgHttp'
export default {
    components: {
        Popup
    },
    directives: {
        TransferDom
    },
    data() {
        return {
            maxFavourableHours:8,//前端写死的最大优惠小时数
            parkAmountUnit:6,//前端写死的每小时停车费6元
            advancedInfo:{},//获取会员信息（金卡，银卡，还有积分等）
            ydgToPayCar:{},//当前车信息（上个页面带过来的）
            order:{},
            phone:'',
            score:{},//会员积分
            scoreHour:0,//使用积分抵扣的小时数
            isUseMember:false,//是否能用会员优惠
            serviceAmount:0,//服务台减免金额
            memberAmount:0,//会员线上自动减免
            couponCount:0,//优惠券个数
            couponInfoList:[],//优惠券列表
            selectCoupon:{},//选择的优惠券
            msg:'',
            okCallBack:()=>{},
            popVisible: false,
            VmemberObj:{
                memberGrade:'0',
                MWOParams:{},
            },//核销会员等级权益对象
            VcouponObj:{
                vouchers:'0',
                VWOParams:{}
            },//核销优惠券对象
            VscoreObj:{
                integral:'0',
                IWOParams:{}
            },//核销积分权益对象
            detailList:[],//传给乔明那边的抵扣列表
            debounce:true
        }
    },
    watch:{
        isUseMember(val){
            let obj = {
                memberGrade:'0',
                MWOParams:{},
            }
            let listObj ={}
            let recordId = util.uuid()//流水号
            if(val && Number(this.memberAmount)>0){
                obj = {
                    memberGrade:"1",
                    MWOParams:{
                        memberId: "",
                        phone: this.phone,
                        memberGrade:String(this.advancedInfo.MallCardTypeID),
                        pmParkId: this.ydgToPayCar.parkInfo.pmParkId,
                        recordId:recordId
                    }
                }
                listObj = {
                    outTradeNo: recordId,
                    type: "1",//优惠券
                    couponType:"0",//金额
                    channel: "2202",//会员等级
                    amount: this.memberAmount,
                    membershipGrade: this.advancedInfo.MallCardName,
                    identityType: "01",//手机号
                    identityId: this.phone,
                    memo: "颐堤港-金额-会员等级抵扣"
                }
            }
            this.VmemberObj = Object.assign(this.VmemberObj,obj)
            this.$set(this.detailList,0,listObj);
        },
        selectCoupon(val){
            let obj = {
                vouchers:'0',
                VWOParams:{}
            }
            let listObj ={}
            let recordId = util.uuid()//流水号
            if(!util.isEmpty(val)){
                obj = {
                    vouchers:"1",
                    VWOParams:{
                        VCode:val.VCode,
                        Verification:2,//商场
                    },
                    vouchersInfo:val,
                    phone:this.phone
                }
                listObj = {
                    outTradeNo: recordId,
                    type: "1",//优惠券
                    couponType:"0",//金额
                    channel: "2204",//会员卡券
                    amount: val.disCountMoney,
                    identityType: "01",//手机号
                    identityId: this.phone,
                    memo: "颐堤港猫酷-金额-优惠券抵扣"
                }
            }
            this.VcouponObj = Object.assign(this.VcouponObj,obj)
            this.$set(this.detailList,1,listObj);
        },
        scoreHour(val){
            let obj = {
                integral:'0',
                IWOParams:{}
            }
            let listObj ={}
            let recordId = util.uuid()//流水号
            if(Number(val)>0){
                obj = {
                    integral:"1",
                    IWOParams:{
                        Mobile: this.phone,
                        Score: Number(val * this.scoreUnit),
                        TransID:recordId,
                        ScoreEvent: 1009 //积分抵扣停车费
                    }
                }
                listObj = {
                    outTradeNo: recordId,
                    type: "1",//优惠券
                    couponType:"0",//金额
                    channel: "2203",//会员积分
                    amount: String(val*this.parkAmountUnit),
                    integral:String(val * this.scoreUnit),
                    identityType: "01",//手机号
                    identityId: this.phone,
                    memo: "颐堤港猫酷-金额-会员积分抵扣"
                }
            }
            this.VscoreObj = Object.assign(this.VscoreObj,obj)
            this.$set(this.detailList,2,listObj);
        }

    },
    computed: {
        scoreUnit:function () {
            let unit = 200 ;//抵扣规则（普通会员每小时200积分，银级、金级、铂金会员每小时100）
            if(this.MallCardType == '2' || this.MallCardType == '3' || this.MallCardType == '4'){
                unit = 200
            }
            return unit
        },
        realUnPayAmount:function () {
            let {unPayAmount} = this.order
            //alldisCountAmount中不包括客服台减免的金额，因为在unpayAmount已经是去掉这个金额后的金额
            let alldisCountAmount = (Number(this.couponAmount) + (this.scoreHour*this.parkAmountUnit) +Number(this.memberAmount))
            //页面显示的应付金额
            if(unPayAmount){
                unPayAmount =  Number(unPayAmount).subtract(Number(alldisCountAmount));
            }else {
                unPayAmount = 0
            }

            return unPayAmount<0 ? 0 : unPayAmount
        },
        couponAmount:function () {
            if(!util.isEmpty(this.selectCoupon)){
                return this.selectCoupon.disCountMoney
            }else {
                return 0
            }
        },
        MallCardType:function () {
            //会员卡类型，从猫酷那边取到，普通电子会员（245），金卡（），银卡（），铂金（）
            let MallCardTypeID = 245 ;//默认245为电子会员
            if(this.advancedInfo && !util.isEmpty(this.advancedInfo.MallCardTypeID)){
                MallCardTypeID = this.advancedInfo.MallCardTypeID
            }
            switch (String(MallCardTypeID)){
                case '245':
                    return '1';//电子会员
                case '277':
                    return '2';//银牌会员
                case '278':
                    return '3';//金牌会员
                case '279':
                    return '4';//铂金会员
                default:
                    return '1'
            }

        }
    },

    mounted() {
        this.init()
    },
    methods: {
        showActionSheet: function() {
            this.popVisible = true;
        },
        go2Index(){
            setTimeout(()=>{
                util.go2(this,'ydgVipIndex')
            },1000)
        },
        showTip(){
            this.msg = `抵扣规则:${this.scoreUnit}积分/小时,每天最多抵扣${this.maxFavourableHours}小时。`
            this.$refs.msgModal.showModal()
        },
        getOrderInfo(){
            ydgHttp.request('omPay/accountMinutes', 'post', {
                omParkInfoId:this.ydgToPayCar.parkInfo.tradeId,
                prePayType:util.prePayTypes.prePayForCuiwei,//产品说按这个来(军哥那边20为手机场内支付)
                freeMinutes:"0",
            }).then((data)=>{
                let order = data.omParkInfo
                order.startDate=order.startDate.transEightDate2Str("-");
                order.startTime=order.startTime.transSixTime2Str();
                this.order = order
                this.celServiceAmount()//计算客服台减免金额（嘉彬商家扫码金额）
                $('.wrapper').show()
            },(err)=>{
                $('.wrapper').show()
                this.okCallBack = this.go2Index
                this.msg = err.errorMSG || "网络繁忙请稍等";
                this.$refs.msgModal.showModal()
            })
        },
        tapCoupon(coupon){
            if(coupon){
                let alldisCountAmount = (Number(coupon.disCountMoney) + Number(this.serviceAmount) + (this.scoreHour*this.parkAmountUnit) +Number(this.memberAmount))
                if(alldisCountAmount>this.maxFavourableHours*this.parkAmountUnit){
                    this.popVisible = false;
                    this.msg = `每日最多可享受 ${this.maxFavourableHours} 小时停车优惠`
                    this.$refs.msgModal.showModal()
//                    this.selectCoupon = {};
                    return
                }else {
                    this.popVisible = false;
                    this.selectCoupon = Object.assign({},coupon)
                }
            }else {
                this.popVisible = false;
                this.selectCoupon = {};
            }
        },
        offsetHour(type){
            let scoreHour = this.scoreHour
            if(type == '0'){//减
                 scoreHour --
            }else if(type == '1') {//加
                 scoreHour ++
            }
            if(Number(scoreHour)<=-1) return;
            if(Number(scoreHour) * this.scoreUnit > this.score){
                this.msg = '积分不足'
                this.$refs.msgModal.showModal()
                return
            }

            let isBeyoundHours = Number(scoreHour)>this.maxFavourableHours;
            let alldisCountAmount = (Number(this.couponAmount) + Number(this.serviceAmount) + (scoreHour*this.parkAmountUnit) +Number(this.memberAmount))
            if( isBeyoundHours || alldisCountAmount>this.maxFavourableHours*this.parkAmountUnit){
                this.msg = `每日最多可享受 ${this.maxFavourableHours} 小时停车优惠`
                this.$refs.msgModal.showModal()
                return
            }
            if(this.realUnPayAmount<=0 && type == '1'){
                this.msg = `您已抵扣全部停车费，无需继续抵扣`
                this.$refs.msgModal.showModal()
                return
            }
            this.scoreHour = scoreHour;

        },
        celServiceAmount(){
            let {accountDetailList} = this.order
            let amount  = 0
            if(accountDetailList.length>0){
                accountDetailList.forEach((item)=>{
                    if(item.payChannel == '2003'){
                        amount += item.amount
                    }
                })
            }
            this.serviceAmount = amount;
        },
        getMemberInfo(){
            ydgHttp.request('member/queryMemberEquity', 'post', {
                "memberGrade":String(this.advancedInfo.MallCardTypeID),
                "pmParkId":this.ydgToPayCar.parkInfo.pmParkId,
                "phone":this.phone,
            }).then((data)=>{
                if(data.result){
                    this.isUseMember = data.result.isUse == 'true'?true:false;
                    this.memberAmount = data.result.discontMoney ;
                }
            },(err)=>{
                this.msg = err.errorMSG || "网络繁忙请稍等";
                this.$refs.msgModal.showModal()
            })
        },
        getCouponInfo(){
            ydgServices.mallcooRequset({
                url:'https://openapi10.mallcoo.cn/Coupon/v1/GetCanUse/ByMobile/',
                params:{
                    Mobile:this.phone,
                    CouponType:5,
                    PageSize: 1000,
                }
            }).then((data)=>{
                if(data.CouponInfoList.length>0){
                    this.couponCount = data.Count;
                    this.couponInfoList = data.CouponInfoList;
                    this.transCoupon()
                }
            },(err)=>{
                if(err.result && err.result.Code == 6){
                    //暂无数据
                    this.couponCount = 0;
                }
            })
        },
        transCoupon(){
            if(this.couponInfoList.length>0){
                let sortArrey = this.couponInfoList
                let tempAmount = 0
                let alldisCountAmount = (Number(this.serviceAmount) + (this.scoreHour*this.parkAmountUnit) +Number(this.memberAmount))

                sortArrey.forEach((item,index)=>{
                    if(item.CouponType == '5'){
                        if(!util.isEmpty(item.InsteadMoney)){
                            item.disCountMoney = item.InsteadMoney
                        }else if(!util.isEmpty(item.InsteadTime)){
                            //将时间转换成金额
                            item.disCountMoney = (item.InsteadTime/60)*this.parkAmountUnit
                        }else {
                            item.disCountMoney = 0
                        }
                    }
                    item.isExpRight = this.getExpType(item.OverdueTime)
                    //默认使用一张金额最大且满足最大优惠范围的优惠券(此次先去掉此段逻辑，不默认使用优惠券)
//                    if(Number(item.disCountMoney) > tempAmount && !util.isEmpty(this.order.unPayAmount)){
//                        if((Number(item.disCountMoney)+Number(alldisCountAmount))<=this.maxFavourableHours*this.parkAmountUnit){
//                            tempAmount = item.disCountMoney;
//                            this.selectCoupon = Object.assign({},item)
//                        }
//                    }
                })
                sortArrey.sort((a,b)=>{
                    //按金额大小排序，金额相等时，按过期时间早优先的顺序
                    let amount1 = a.disCountMoney;
                    let amount2 = b.disCountMoney;
                    if(amount1 == amount2){
                        return Date.parse(a.OverdueTime) - Date.parse(b.OverdueTime)
                    }
                    return amount2 - amount1
                })
                this.couponInfoList = sortArrey

            }
        },
        getExpType(data){
            let date = new Date()
            let applydate = new Date(data)
            if(parseInt((applydate - date) / (1000 * 60 * 60 * 24)) <=7){//过期
                //即将过期
                return true
            }else{//没过期
                return false
            }
        },
        commit(){
            if(!this.debounce) return;
            let commitObj ;
            let detailList = []
            let order = this.order;
            this.detailList.forEach((item)=>{
                if(!util.isEmpty(item)) detailList.push(item)
            })
            commitObj = {
                tradeId:order.omParkinfoId,
                accountId:order.accountId,
                prePayType:util.prePayTypes.prePayForCuiwei,//产品说按这个来(军哥那边20为手机场内支付)
                giveFreeTimeOut:"true",//提供免费出场时间
                detailList:detailList,
            }
            let allObj = Object.assign(commitObj,this.VmemberObj,this.VcouponObj,this.VscoreObj)
            this.debounce = false;
            ydgHttp.request('mallcoo/preferentialPay', 'post', allObj).then((data)=>{
                this.debounce = true;
                this.okCallBack = this.go2PayPage
                this.msg = "操作完成后请在15分钟内离场，若超时未离场，将再次产生费用"
                this.$refs.msgModal.showModal()
            },(err)=>{
                this.debounce = true;
                this.okCallBack = this.go2Index
                this.msg = err.errorMSG || "网络繁忙请稍等";
                this.$refs.msgModal.showModal()
            })

        },
        go2PayPage(){
            util.setSession('ydgToPayOrder',JSON.stringify(this.order))
            window.location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcweixinUrl + 'charge/prePayForYdgVip')
        },
        getAdvancedInfo(){
            return new Promise((resolve,reject)=>{
                ydgServices.mallcooRequset({
                    url:'https://openapi10.mallcoo.cn/User/AdvancedInfo/v1/Get/ByMobile/',
                    params:{
                        Mobile:this.phone,
                    }
                }).then((data)=>{
                    if(data){
                        this.advancedInfo = data
                        resolve()
                    }else {
                        reject()
                    }
                },()=>{
                    reject()
                })
            })
        },
        init(){
            this.ydgToPayCar = JSON.parse(util.getSession('ydgToPayCar'))
//            this.advancedInfo = JSON.parse(util.getSession('advancedInfo'))
            this.phone = util.getItem('ydgMobile')
            this.getAdvancedInfo().then(()=>{
                this.score = (this.advancedInfo && !util.isEmpty(this.advancedInfo.Score))?this.advancedInfo.Score:0;
                this.getMemberInfo()//获取会员等级相关信息
                this.getOrderInfo()
                this.getCouponInfo()//获取优惠券列表
            },()=>{
                this.score = (this.advancedInfo && !util.isEmpty(this.advancedInfo.Score))?this.advancedInfo.Score:0;
//                this.getMemberInfo()//获取会员等级相关信息
                this.getOrderInfo()
                this.getCouponInfo()//获取优惠券列表
            })
        }
    }
}
</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
@import "./css/index.less";
@import "./css/online_pay.less";
@import "./css/payDetail.less";

</style>
<style lang="less">
    .vux-popup-dialog {
        height: 82%!important;
        background: #fff!important;
        border-radius: 10px 10px 0 0;
    }
    .popup{
        height: 100%;
        overflow-y: auto;
        position: relative;
    }
    .couponTitle{
        text-align: center;
    }
    .couponTitle img{
        width: 105px!important;
    }
    input[type="radio"]{
        display: none;
    }
    input[type="radio"]+ label{
        width: 88%;
        height: 88px;
        display: block;
        box-sizing: border-box;
        background: url("./images/ticketImgBox.png") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        margin: 14px 6% 0!important;
    }
    input[type="radio"]:checked+ label{
        background: url("./images/selectTicketImg.png") no-repeat;
        background-size: 100% 100%;
    }
    input[type="radio"]+ label.isExpRight{
        background: url("./images/noCheckedOutTime.png") no-repeat!important;
        background-size: 100% 100%!important;
    }
    input[type="radio"]:checked+ label.isExpRight{
        background: url("./images/selectNoCheckedOutTime.png") no-repeat!important;
        background-size: 100% 100%!important;
    }


</style>
