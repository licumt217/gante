<template>
    <div v-title="''">
    </div>
</template>

<script>
import { util } from 'util'
import { getConfig } from '../../config'
import {onlyShowOnce} from '../../assets/js/onlyShowOnce'
export default {
  data() {
    return {}
  },
  mounted() {
    //如果从下个页面过来的，直接关闭当前页面

    onlyShowOnce.init().then(()=>{
      this.init()
    });
  },
  methods: {
    init: function() {

      util.initAPPCommInfo().then(()=>{
        if(util.isWeixinBrowserOnly() || util.isFromApp() || util.isAlipayBrowserOnly()){
          const data = util.getUrlParam('data');
          if (util.isWeixinBrowserOnly()) {
            location.href = util.getWechatAuthUrlByAbsPath(
              util.constants.tcapiWebUrl + 'unlicensed/generateOrder',
              [data]
            )
          }else if(util.isAlipayBrowserOnly()){
            location.href = util.getAlipayAuthUrlByAbsPath(
              util.constants.tcapiWebUrl + 'unlicensed/generateOrder',
              [data]
            )
          } else {
            location.href = util.constants.tcapiWebUrl + `unlicensed/generateOrder?data=${data}`;
          }
        }else{
            this.$parent.showTjdModal({
            type: 2,
            errorMsg: getConfig().unlicensedAlertInfo
          });
        }
      },(data)=>{
          this.$parent.showTjdModal({
          type: 2,
          errorMsg: data
        });
      })


    }
  }
}
</script>

<style>

</style>
