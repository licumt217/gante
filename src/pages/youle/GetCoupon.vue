<template>
  <div class="wrapper" v-title="'会员系统'">
    <p>
      <span>{{ levelText }}</span>
      <icon name="jewel" style="position:relative;top:2px;" scale="1.6"></icon>
    </p>
    <p>
      尊敬的{{ levelText }}您好，请领取您的专属福利
    </p>
    <button class="btn" @click="onClick" :disabled="disabled">立即领取</button>
  </div>
</template>
<script>
import { util } from 'util'
import { ylServices } from '../../assets/js/ylServices'
import { tjdServices } from '../../assets/js/tjdServices'

export default {
  data() {
    return {
      cmUserId: '',
      recordId: '',
      level: '',
      isOnline: false,
      phone: '',
      disabled: true,
      encryptData: util.getUrlArray()[0],
      data2: util.getUrlArray()[1],
    }
  },

  computed: {
    levelText() {
      return {
        'V3': '白金会员',
        'V2': '金卡会员',
        'V1': '银卡会员'
      }[this.level]
    }
  },

  mounted() {
    if (!this.encryptData) {
      alert("参数不能为空");
      return
    }
    this.initCommonInfo();

    this.encryptData = this.encryptData.replace(/[ ]/g, '+')
    if (sessionStorage.openId) {
      this.registerOrGetCUser()
    } else {
      tjdServices.getLoginInfo().then(data => {
        this.registerOrGetCUser()
      }, data => {
        this.registerOrGetCUser()
      })
    }
  },
  methods: {
    initCommonInfo(){
      util.setChannel(util.channels.fxyl);
      if(util.isWeixinBrowserOnly()){
          util.setPlatform(util.platforms.weixin)
      }else if(util.isAlipayBrowserOnly()){
          util.setPlatform(util.platforms.alipay)
      }else{
          util.setPlatform(util.platforms.third)
      }
    },
    
    registerOrGetCUser() {
      ylServices
        .request({
          command: 'ylreq',
          method: 'registerOrGetCUser',
          openId: sessionStorage.openId,
          data: this.encryptData
        }).then(data => {
          this.disabled = false
          this.cmUserId = data.cmUserId
          this.recordId = data.recordId
          this.level = data.level
          this.phone = data.phone
          this.isOnline = data.isOnline
        }).catch(err => alert(err.errorMSG))
    },

    onClick() {
      ylServices
      .request({
        command: 'ylreq',
        method: 'obtainCoupon',
        cmUserId: this.cmUserId,
        recordId: this.recordId
      })
      .then(
        data => {
          location.href = `${location.origin}/tcapi_web/youle/getOver?state=${data.errorCode || 1}&callbackUrl=${data.callbackUrl}&amount=${data.amount}&phone=${this.phone}&isOnline=${this.isOnline}&data2=${this.data2}&level=${data.level}&benefitId=${data.benefitId}`
          // this.$router.push({
          //   path: '/youle/getOver',
          //   query: {
          //     state: data.errorCode || 1,
          //     callbackUrl: data.callbackUrl,
          //     amount: data.amount,
          //     phone: this.phone,
          //     isOnline: this.isOnline
          //   }
          // })
        })
        .catch(err => alert(err.errorMSG))
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  background: url('./image/backgroundWeUI.png') repeat-x;
  background-size: 100% auto;
  p:nth-child(1) {
    margin-top: 6%;
    margin-left: 15px;
    span {
      font-size: 16px;
      letter-spacing: 1px;
      color: #ffffff;
      margin-right: 5px;
    }
  }
  p:nth-child(2) {
    margin-top: 5px;
    margin-left: 15px;
    font-size: 13px;
    color: #f0fafb;
    letter-spacing: 1px;
  }
}
.btn {
  background: #2dc0ee;
  border: 1px solid #2cbdee;
  color: #fff;
  position: absolute;
  bottom: 30px;
  width: 80%;
  left: 10%;
  height: 45px;
  border-radius: 30px;
  font-size: 18px;
  outline: none;
  background-image: -webkit-linear-gradient(
    to bottom,
    #2cbdee 0%,
    #2cbdee 30%,
    #30d1ed 90%
  );
  background-image: linear-gradient(
    to bottom,
    #2cbdee 0%,
    #2cbdee 30%,
    #30d1ed 90%
  );
  letter-spacing: 1px;
}
</style>