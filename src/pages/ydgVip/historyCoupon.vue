<template>
 <div class="wrapper" id="wrapper" v-title="'停车缴费'">
    <div class="outsideDiv">
        <h2>提示:只展示您近三个月的历史停车优惠劵</h2>
        <section>
            <div class="ticketImgBox" v-if="couponInfoList.length>0" v-for="coupon in couponInfoList">
                <p>
                    <span>{{coupon.couponName}}</span>
                    <time v-if="coupon.useTime">
                        <i>使用时间：</i><i>{{coupon.useTime |tjdMilliToDate('datetimeNoSec','-')}}</i>
                    </time>
                </p>
                <span class="status"><b class="ticketPrice">已使用</b></span>
            </div>
        </section>
    </div>
     <ydgModal ref="msgModal" :top="false" :small="true" :force="true" :oneBtn="true" @ok="okCallBack">
         <p class="modalMsgContent">{{msg}}</p>
     </ydgModal>
</div>
</template>
<script>
    import { util } from 'util'
    import { ydgServices } from '../../assets/js/ydgServices'
    import {ydgHttp} from '../../http/ydgHttp'
    export default {
        data() {
            return {
                msg:'',
                okCallBack:()=>{},
                couponInfoList:[]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            go2Index(){
                setTimeout(()=>{
                    util.go2(this,'ydgVipIndex')
                },1000)
            },
            init(){
                ydgHttp.request('member/queryVouchersUseRecord', 'post',{
                    phone:util.getItem('ydgMobile')
                }).then((data)=>{
                    this.couponInfoList = data.memberVouchersRecordList
                },(err)=>{
                    this.okCallBack = this.go2Index
                    this.msg = err.errorMSG
                    this.$refs.msgModal.showModal()
                })
            }
        }
    }
</script>



<style lang="less" scoped>
@import '../../assets/css/common.less';
@import "./css/historyCoupon.less";
</style>
