<template>
  <div class="wrapper" id="wrapper" v-title="'停车缴费'">
      <div v-if="memberInfoList.length <= 0" class="welcome">
          <img class="logo" src="./images/logo.png">
          <h3>欢迎来到颐堤港</h3>
      </div>
      <div v-else class="banner">
          <p>线上缴费</p>
      </div>

      <!--车辆不在场-->
      <div v-if="memberInfoList" class="order absentOrder" v-for="(car,idx) in memberInfoList">
          <div class="border_bottom"></div>
          <h5>{{car.carnum}}</h5>
          <template v-if="!car.parkInfo">
              <p>入场时间<span>车辆不在场内</span></p>
              <p>停车时长<span>0时0分</span></p>
          </template>
          <template v-else>
              <p>入场时间<span>{{car.parkInfo.inDt}}</span></p>
              <p>停车时长<span>{{car.parkInfo.parkTime | tjdSecToDate('1')}}</span></p>
              <p>停车费用 <label class="feeAmount">{{car.parkInfo.totalAmount}}元</label></p>
              <button @click="go2Details(car)">支付离场</button>
          </template>
      </div>
      <!--车辆不在场end-->

      <div v-if="memberInfoList.length <= 0" class="navChange">
          <button class="changeCar" @click="go2AddCar();">增改车牌</button>
          <p>点击【增改车牌】添加车辆</p>
      </div>
      <div v-else class="changeCar" @click="go2AddCar();">
          <img src="./images/changeCar.png"/>
          <span>增改车牌</span>
      </div>


      <div class="parkTicketBox" @click="go2couponList()">
          <p>
              <span>查看我的停车优惠劵</span>
              <span class="ticketBtn"><span class="ticketCount" v-if="memberInfoList.length>0">{{couponCount}}张</span><span>&gt;</span></span>
          </p>
      </div>
      <div class="tip">
          <p>
              <label>!</label>
              温馨提示:<br>
              <span class="firstSpan">支付后您将有15分钟时间离场，期间不产生任何费用。</span>
              <span>优惠规则:</span>
              <span>1.会员停车优惠:铂金级会员每日减免4小时，金级会员每日减免2小时，仅限单次使用。</span>
              <span>2.会员积分抵扣:200积分兑换1小时。</span>
              <span>3.停车优惠券:每次支付仅限使用一张停车优惠券。</span>
              <span>4.每人每日最多享受8小时停车优惠，纸质券不可与微信支付同时使用。</span>
              <!--<span>5.消费减免优惠:请至服务台办理消费减免优惠。</span>
  -->		</p>
      </div>

      <ydgModal ref="msgModal" :top="false" :large="true" :oneBtn="true">
          <p class="modalMsgContent">{{msg}}</p>
      </ydgModal>
  </div>
</template>
<script>

</script>
<script>
    import { util } from 'util'
    import { ydgServices } from '../../assets/js/ydgServices'
    import {ydgHttp} from '../../http/ydgHttp'
    export default {
    data() {
        return {
            phone:'',
            memberInfoList:[],
            msg:'',
            couponCount:'',
            shopInfo:{},//通过猫酷返回的商户信息，去优惠券时候用
        }
    },

    computed: {
    },
    mounted() {
        this.init();
    },
    methods: {
        go2AddCar(){
            util.go2(this,'ydgVip/addCar')
        },
        go2Details(car){
            util.setSession('ydgToPayCar',JSON.stringify(car))
            util.go2(this,'ydgVip/payDetail')
        },
        getCarList(){
            ydgHttp.request('member/selectByPhone', 'post', {
                phone:this.phone
            }).then((data)=>{
                this.memberInfoList = data.memberInfoList
                if(this.memberInfoList.length>0){
//                    this.getShopInfo()
                    this.memberInfoList.forEach((item,index)=>{
                        this.getCarType(item,index)
                    })
                }
                $('.wrapper').show()
            },(err)=>{
                $('.wrapper').show()
                this.msg = err.errorMSG || "网络繁忙请稍等";
                this.$refs.msgModal.showModal()
            })
        },
        getCarType(carObj,index){
            ydgHttp.request('mallcoo/selectInfoByCarNum', 'post', {
                carNum:carObj.carnum
            }).then((data)=>{
                let result = JSON.parse(data.result)
                if(result.isSuccess == 0){
                    result.inDt = result.inDt.trans14Datetime2Str('-')
                    this.memberInfoList.splice(index,1,Object.assign({},carObj,{'parkInfo':result}))
                }
            }).catch((err)=>{
                this.msg = err.errorMSG || "网络繁忙请稍等";
                this.$refs.msgModal.showModal()
            })
        },
        getShopInfo(){
            ydgServices.mallcooRequset({
                url:' https://openapi10.mallcoo.cn/Coupon/PutIn/v1/GetAll/',
                params:{}
            }).then((data)=>{
                if(data.length>0){
                    this.shopInfo = data[0]
                    util.setSession('ydgShopInfo',JSON.stringify(this.shopInfo))
                    this.getCouponInfo()
                }
            })
        },
        getCouponInfo(){
            ydgServices.mallcooRequset({
                url:'https://openapi10.mallcoo.cn/Coupon/v1/GetCanUse/ByMobile/',
                params:{
                    Mobile:this.phone,
                    CouponType:5
                }
            }).then((data)=>{
                if(data.CouponInfoList.length>0){
                    this.couponCount = data.Count
                }
            },(err)=>{
                let result = JSON.parse(err.result)
                this.couponCount = 0;
            })
        },
        go2couponList(){
            util.go2(this,'ydgVip/couponList')
        },
        init(){
            ydgServices.getLoginInfo().then(()=>{
                this.phone = util.getItem('ydgMobile')
                this.getCarList()//获取绑定车列表
                this.getCouponInfo()//获取优惠券列表
//                this.getShopInfo()
            },()=>{
                window.location.href = util.getYdgAuthUrl(util.constants.tcapiWebUrl+'ydgVipIndex');
            })
        },
    }
}
</script>
<style lang="less" scoped>

</style>
<style lang="less" scoped>
    @import '../../assets/css/common.less';
    @import "./css/index.less";
    @import "./css/online_pay.less";
    .wrapper{
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #ebebeb;
        display: none;
    }

</style>
