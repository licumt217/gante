<template>
    <!--虹桥机场微信停车平台免密支付-->
    <div v-title="'微信车主服务'">
        <section v-show="isShowPage" class="wrapper">
            <p class="banner"><img src="../../assets/images/mianmi/banner.png"></p>
            <p class="title">已添加的车牌</p>
            <ul class="carList">
                <li v-for="car in carNums">
                    {{car | parseCarNum(' · ')}}
                </li>
            </ul>
            <p class="tip">可在"我"-"钱包"-右上角入口-"支付管理"-"自动扣费"-"微信车主服务免密支付"中进行修改扣款方式或关闭服务。</p>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { wxUtil } from '../../assets/js/wxUtil'
    import { hqServices } from '../../http/hqServices'
    import { tjdServices } from 'tjdServices'
    export default {
        data() {
            return {
                isShowPage: false,
                openId: '',
                parkId:'',
                carNums: []
            }
        },
        mounted: function () {
            util.setSession('isFromMain','1');
            tjdServices.getLoginInfo().then(() => {
                if (util.isProdEnv()) {
                    this.openId = util.getOpenId();
                    this.parkId=util.getUrlArray()[0];
                } else {
                  let type=util.getUrlArray()[1];

                  if(type==='137'){
                      this.openId = util.getUrlArray()[0];
//                      this.openId='ozqqas78t6P4x_pSLspxe-ITnjys'//永利的121500000
//                      this.openId='ozqqasw-7J_k9H_QKY1-oYIcWIeI'//我的
//                      this.openId='ozqqas9lPD-xIN4W4hubjmDs278s'//永利小号微信
                      this.parkId='3426193d25b4415fb4c75717fff12377';//137
                  }else{
                      this.openId = util.getUrlArray()[0];
                      this.parkId='e2daa7a068664b85a2938baae4d6829f';//
                  }


                }

                hqServices.request('wechatPay/querySignState', 'post', {
                    openId: this.openId,
                    parkId: this.parkId
                }).then(data => {
                    if (data.path) {
                      util.removeSession("isFromMain")
                        location.href = data.path;
                    } else {
                        this.isShowPage = true;
                        this.carNums = data.carNums.split(',');

                        if(this.carNums.length===1){
                            hqServices.request(`OrderPayRecord/binding/${this.parkId}/3302/${this.carNums[0]}`, 'get', {
                            }).then(data => {

                            })
                        }
                    }
                })

            }, () => {
                this.$parent.showTjdModal({
                    errorMsg: "登录失败",
                    callBack: wxUtil.closeWindow
                });
            })

        },
        methods: {}
    }

</script>


<style lang="less" scoped>
 @import '../../assets/css/common.less';
 .banner{
     height: 157px;
     width: 100%;
     img{
         height: 157px;
         width: 100%;
     }
 }
 .title{
     font-size: 15px;
     color: #B4B4B4;
     padding:0 5%;
     margin: 18px 0 10px;
 }
 .carList{
     margin: 0 5%;
     li{
         padding:12px 0;
         text-align: center;
         color: #303B33;
         font-size: 17px;
         border-radius: 10px;
         border: solid 2px #15BEF0;
         background: #F1FCFF;
         margin-bottom: 20px;
         letter-spacing: 0.5px;
     }
 }
 .tip{
        padding: 12px 5%;
        text-align: center;
        font-size: 14px;
        color: #B4B4B4;
 }


</style>
