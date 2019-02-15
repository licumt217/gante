<template>
    <!--虹桥机场微信停车平台免密支付-->
    <div v-title="''">
        <section class="wrapper">


        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { wxUtil } from '../../assets/js/wxUtil'
    import { hqServices } from '../../http/hqServices'
    export default {
        data() {
            return {
                authCode: ''
            }
        },
        mounted: function () {
          if(util.getSession('isFromMain')){
            setTimeout(data=>{
                wxUtil.closeWindow();
            },50)
          }else{
              if (util.isProdEnv()) {
                  let parkId=util.getUrlParam('parkId');
                  if(parkId){
                        util.setSession('hongqiaoParkId',parkId);
                      location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'mianmi/hongqiaoMain',[parkId])
                  }else{
                    if(util.getSession('hongqiaoParkId')){
                        parkId=util.getSession('hongqiaoParkId')
                        location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'mianmi/hongqiaoMain',[parkId])
                    }else{
                        this.$parent.showTjdModal({
                            errorMsg: "请配置停车场ID！",
                            callBack: wxUtil.closeWindow
                        });
                    }

                  }

              } else {
//              util.setSession('openId','135488240836582227')
//              if(util.getOpenId()){
//                  location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'mianmi/hongqiaoMain', [util.getOpenId()])
//                  return;
//              }


//                  $.get('https://www.hongqiaoairporttingche.com:20443/alipark-core/car/queryAliState/xxx/京A12345',{
//                  }, function (data) {
//alert(JSON.stringify(data))
//                  })
//
//
//                  setTimeout(data=>{
//                      $.post('https://www.hongqiaoairporttingche.com:20443/tcserver/gateway',{
//                          method:'insideGetOrder',
//                          parkId:'x',
//                          carNum:'x',
//                          prePayType:'x'
//                      }, function (data) {
//                          alert(JSON.stringify(data))
//                      })
//                  },5000)
//
//                  return;




                  this.authCode = util.getUrlParam('authCode');
                  let type=util.getUrlParam('type')


                  if(type){
                    util.setSession('type',type)
                  }else{
                    if(util.getSession("type")){
                        type=util.getSession('type')
                    }
                  }

                  if(type){
                      if(this.authCode){

                          hqServices.request(`wechatTool/getOpenId/${this.authCode}`, 'get', {}).then(data => {

                              location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'mianmi/hongqiaoMain', [data.openId,type])

                          }, error => {
                              this.$parent.showTjdModal({
                                  errorMsg: error.errorMSG,
                                  callBack: wxUtil.closeWindow
                              });
                          })
                      }else if(util.getUrlParam('openid')){
                          location.href = util.getWechatAuthUrlByAbsPath(util.constants.tcapiWebUrl + 'mianmi/hongqiaoMain', [util.getUrlParam('openid'),type])
                      }else{
                          this.$parent.showTjdModal({
                              errorMsg: 'authCode不能为空！',
                              callBack: wxUtil.closeWindow
                          });
                      }
                  }else{
                      this.$parent.showTjdModal({
                          errorMsg: '用于区分环境的type不能为空！',
                          callBack: wxUtil.closeWindow
                      });
                  }




              }
          }


        },
        methods: {}
    }

</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';


</style>
