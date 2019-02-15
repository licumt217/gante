<template>
  <div class="wrapper" id="wrapper" v-title="'停车缴费'">
    <div class="outsideDiv">
      <h2>提示:请到支付页面使用停车优惠劵</h2>
      <section>
        <div class="ticketImgBox" :class="coupon.isExpRight?'isExpRight':''" v-if="couponCount>0" v-for="coupon in couponInfoList">
          <p>
            <span>{{coupon.CouponName}}</span>
            <time>
              <i class="ticketStartTime">{{coupon.EnableTime.split(' ')[0].replace(/\//g,'-')}}</i>-<i class="ticketEndTime">{{coupon.OverdueTime.split(' ')[0].replace(/\//g,'-')}}</i>
            </time>
          </p>
          <span class="status">
            <b class="ticketPrice">{{coupon.disCountMoney}}</b>元</span>
        </div>
      </section>
    </div>
    <h5 @click="go2history()">查看历史停车优惠劵
      <span>&gt;</span>
    </h5>
  </div>
</template>
<script>
    import { util } from 'util'
    import { ydgServices } from '../../assets/js/ydgServices'
    import {ydgHttp} from '../../http/ydgHttp'
export default {
    data() {
        return {
            parkAmountUnit:6,//前端写死的每小时停车费6元
            phone:'',
            couponCount:0,
            couponInfoList:''
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.phone = util.getItem('ydgMobile')
            this.getCouponInfo()
        },
        transCoupon(){
            let sortArrey = this.couponInfoList
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
        getCouponInfo(){
            ydgServices.mallcooRequset({
                url:'https://openapi10.mallcoo.cn/Coupon/v1/GetCanUse/ByMobile/',
                params:{
                    Mobile:this.phone,
                    CouponType:5,
                    PageSize: 1000,
                }
            }).then((data)=>{
                this.couponInfoList = data.CouponInfoList
                this.couponCount = data.Count
                this.transCoupon()
            },(err)=>{
                if(err.result && err.result.Code == 6){
                    //暂无数据
                    this.couponCount = 0;
                }
            })
        },
        go2history(){
            util.go2(this,'ydgVip/historyCoupon')
        },
    }
 }
</script>
<style lang="less" scoped>
@import '../../assets/css/common.less';
@import "./css/couponList.less";

</style>
