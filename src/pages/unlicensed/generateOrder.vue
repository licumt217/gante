<template>
  <div class="enter-wrapper">
    <div class="logo">
      <img :src="require(`../../assets/images/unlicensed/logo${getConfig().uniqueSign}.png`)" alt="">
    </div>
    <div class="loading-box">
      <p>订单正在生成中....</p>
      <div class="loading-wrapper">
        <div ref="loadingbar" id="J_loading" class="loading-container"></div>
      </div>
      <div id="J_number" class="loading-percent"></div>
    </div>
    <pay-qr-code v-if="generateOrderState" :orderInfo="orderData"></pay-qr-code>
  </div>
</template>

<script>
import LoadingBar from 'assets/js/loadingBar'
import { util } from 'util'
import { wxUtil } from 'assets/js/wxUtil'
import { tcServices } from 'assets/js/tcServices'
import { tjdServices } from 'assets/js/tjdServices'
import payQRCode from './payQRCode'
import {} from 'assets/js/iosWxBack2Reload';
import backToClose from '../../mixin/backToClose'
import { getConfig } from '../../config'


export default {
  components: {
    'pay-qr-code': payQRCode
  },
  data() {
    return {
      getConfig,
      loadingBar: null,
      encryptData: this.$route.query.data,
      generateOrderState: false,
      orderData: {}
    }
  },
  mixins:[backToClose],
  methods: {
    initCommonInfo() {

        util.setChannel(util.channels.unlicensed)
    },

    registerOrGetCUser() {
      tcServices
        .request({
          command: 'laneScan',
          method: 'scanIn',
          openId: sessionStorage.openId,
          userId: sessionStorage.userId,
          data: this.encryptData
        })
        .then(data => {
          console.log(data)
          this.loadingBar.finish()
          setTimeout(() => {
            this.orderData = Object.assign({}, data)
            this.generateOrderState = true
          }, 1000)
        })
        .catch(err => {
          this.$router.push({path: '/unlicensed/orderError', query: {type: 'enter'}})
        })
    },

    initLoadingBar() {
      this.loadingBar = new LoadingBar('J_loading', 'J_number')
      this.loadingBar.start()
    }
  },
  mounted() {

    if (!this.encryptData) {
      this.$parent.showTjdModal({
        type: 2,
        errorMsg: "参数不能为空"
      });
      return
    }

    // 测试
    // sessionStorage.openId = 'oyaEAt3nMrhRWN20BKFYF6mlW8u4'
    // sessionStorage.userId = '6db7a514810f45b193db115269a39154'

    util.setSession('isToInvoicePage', 1)

    this.initLoadingBar()

    this.initCommonInfo()

    this.encryptData = this.encryptData.replace(/[ ]/g, '+')

    if (sessionStorage.openId) {
      this.registerOrGetCUser()
    } else {
      tjdServices
        .getLoginInfo()
        .then(data => {
          this.registerOrGetCUser()
        })
        .catch(err => {
          console.log(err.errorMSG)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.enter-wrapper {
  height: 100%;
  background: url('../../assets/images/unlicensed/unls_bg.png') center center
    no-repeat;
  background-size: cover;

  .logo {
    padding: 70px 0 40px 0;
    margin-bottom: 15%;
    text-align: center;

    img {
      width: 110px;
    }
  }

  .loading-box {
    text-align: center;
    color: #818283;
  }
}
@keyframes slider {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 25px 0;
  }
}

.loading-wrapper {
  margin: 40px auto 0 auto;
  width: 70%;
  height: 15px;
  border-radius: 30px;
  border: 1px solid #27bfeb;
  background: #f3fcff;
  overflow: hidden;
}

.loading-container {
  position: relative;
  width: 0;
  height: 15px;
  border-radius: 30px;
  background: #49cbf3;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  font-size: 0.5px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(255, 255, 255, 0.2); */
    animation: slider 0.5s linear infinite;
    background-size: 25px 25px;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.4) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      transparent 75%,
      transparent
    );
  }
}

.loading-percent {
  margin-top: 30px;
  color: #ffb232;
  .num {
    font-size: 26px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
