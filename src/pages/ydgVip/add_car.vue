<template>
  <div class="wrapper" v-title="'增改车牌'">
      <div class="banner">
          <p>增改车牌</p>
      </div>
      <div class="carNumWrapper">
          <div class="callNum">{{phone}}</div>
          <div class="carNum">
              <p v-for="(car,idx) in carObj">
                  <span>对应车辆</span>
                  <span class="carnumdel">{{car.carnum}}</span>
                  <span class="delete"><img class="del" @click="removeCar(car,idx)" src="./images/delete.png"></span>
              </p>
          </div>
          <div class="addCarNum" @click="showAddCar">
              <img src="./images/add.png">
              <span>添加新车辆</span>
          </div>
      </div>
      <div class="addCardTip">
          <p>温馨提示:</p>
          <ul>
              <li>
                  同一车牌只能同时被一位会员绑定。
              </li>
              <li>
                  每个手机号码最多可关联三部车辆。
              </li>
              <li>
                  如果未出现您绑定的车牌，请重新绑定。
              </li>
          </ul>
      </div>
      <ydgModal ref="addCarModal" title="添加新车辆" :isShowFooter="false" @ok="ok" @cancel="cancel">
          <div id="sheng">
              <span class="shengfen">{{selectedProvince}}</span>
              <span class="sanjiao" :class="{'cur':showProvice}" @click="showProvice = !showProvice"><img src="./images/xia.png"></span>
              <ul class="down" v-show="showProvice">
                  <li v-for="province in carNumProvince" @click="tapProvince(province)">{{province}}</li>
              </ul>
              <input class="shuru" v-model="inputCarNum" placeholder="输入车牌号" maxlength="7">
              <div class="queren" @click="realAddCar()">确认并返回</div>
          </div>
      </ydgModal>
      <ydgModal ref="msgModal" :top="false" :large="true" :oneBtn="true" @ok="okCallBack">
          <p class="modalMsgContent">{{msg}}</p>
      </ydgModal>
      <ydgModal ref="delCarModal" :top="false" :small="true"  @ok="realRemoveCar">
          <p class="modalMsgContent">您要删除车牌{{needDelCarobj.carnum}}吗？</p>
      </ydgModal>

  </div>
</template>
<script>
    import { util } from 'util'
    import {ydgHttp} from '../../http/ydgHttp'

export default {
    data() {
        return {
//            carObj:[{
//                carNum:'京A12345'
//            },{
//                carNum:'京A12346'
//            },{
//                carNum:'京A12347'
//            }],
            carObj:[],
            msg:'',//弹窗提示语
            needDelCarobj:{},
            needDelCarIndex:0,
            selectedProvince:'京',
            showProvice:false,
            inputCarNum:'',
            okCallBack:()=>{},
            carNumProvince:["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "青", "宁", "新", "使"]
        }
    },

    computed: {
        phone(){
            return util.getItem('ydgMobile')
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.getCarList()
        },
        getCarList(){
            ydgHttp.request('member/selectByPhone', 'post', {
                phone:util.getItem('ydgMobile')
            }).then((data)=>{
                $('.wrapper').show()
                this.carObj = data.memberInfoList
            }).catch((err)=>{
                $('.wrapper').show()
                this.msg = err.errorMSG
                this.okCallBack = this.go2Index
                this.$refs.msgModal.showModal()
            })
        },
        go2Index(){
            setTimeout(()=>{
                util.go2(this,'ydgVipIndex')
            },1000)
        },
        realAddCar(){
            let reg = /^[A-Z]{1}[A-Z_0-9]{5,6}$/;
            let reg1 = /^[0-9]{6,7}$/;
            this.inputCarNum = this.inputCarNum.replace(/\ /g,"").toUpperCase()
            let flag = this.selectedProvince == "使"?reg1.test(this.inputCarNum):reg.test(this.inputCarNum)
            if(flag){
                ydgHttp.request('member/add', 'post', {
                    phone:util.getItem('ydgMobile'),
                    carNum:this.selectedProvince + this.inputCarNum
                }).then((data)=>{
                    this.$refs.addCarModal.hideModal()
                    this.msg = '绑定成功'
                    this.carObj.push({carnum:this.selectedProvince + this.inputCarNum})
                    this.okCallBack = this.go2Index
                    this.$refs.msgModal.showModal()
                }).catch((err)=>{
                    this.$refs.addCarModal.hideModal()
                    this.msg = err.errorMSG
                    this.okCallBack = this.go2Index
                    this.$refs.msgModal.showModal()
                })
            }else {
                this.msg = '格式有误，请输入正确的车牌号。'
                this.$refs.addCarModal.hideModal()
                this.$refs.msgModal.showModal()
            }
        },
        tapProvince(val){
            this.showProvice = false
            this.selectedProvince = val
        },
        showAddCar(){
            if(this.carObj.length >= 3){
                this.msg = '每个手机号最多可关联三部车辆，请先解绑现有车辆'
                this.$refs.msgModal.showModal()
            }else {
                this.$refs.addCarModal.showModal()
            }
        },
        removeCar(car,inx){
            this.needDelCarobj = car
//            this.needDelCarIndex = inx
            this.$refs.delCarModal.showModal()
        },
        realRemoveCar(){
            let index = this.carObj.indexOf(this.needDelCarobj)
            ydgHttp.request('member/deleteByPhone', 'post', {
                phone:util.getItem('ydgMobile'),
                carNum:this.needDelCarobj.carnum
            }).then((data)=>{
                if(index>-1){
                    this.carObj.splice(index,1)
                }
                this.go2Index()
            },(err)=>{
                this.msg = err.errorMSG
                this.okCallBack = this.go2Index
                this.$refs.msgModal.showModal()
            })
        },
        ok(){
        },
        cancel(){
        }

    }
}
</script>
<style lang="less" scoped>
    @import '../../assets/css/common.less';
    @import "./css/add_car.less";
    .wrapper{
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #ebebeb;
        display: none;
    }

</style>
