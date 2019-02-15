 <template>
  <div class="enter-wrapper">
    <div class="logo">
      <img :src="require(`../../assets/images/unlicensed/logo${getConfig().uniqueSign}.png`)" alt="">
    </div>
    <div class="loading-box">
      <p>正在查询订单....</p>
      <div class="loading-wrapper">
        <div ref="loadingbar" id="J_loading" class="loading-container"></div>
      </div>
      <div id="J_number" class="loading-percent"></div>
    </div>
  </div>
</template>

<script>
  import LoadingBar from 'assets/js/loadingBar'
  import { util } from 'util'
  import { tcServices } from 'assets/js/tcServices'
  import { tjdServices } from 'assets/js/tjdServices'
  import payQRCode from './payQRCode'
  import { getConfig } from '../../config'
  export default {
    data() {
      return {
        getConfig,
        loadingBar: null,
        encryptData: this.$route.query.data,
        generateOrderState: false,
        orderData: {}
      }
    },
    methods: {


      registerOrGetCUser() {
        tcServices
          .request({
            command: 'laneScan',
            method: 'outQueryOrder',
            openId: sessionStorage.openId,
            userId: sessionStorage.userId,
            data: this.encryptData
          })
          .then(data => {

            this.loadingBar.finish()
            setTimeout(() => {
              if(data.url){
                window.location.href = data.url
              }else{
                window.location.href=util.constants.tcweixinUrl+`prePayForB/main?id=${data.clientOrderId}&parkid=${data.parkId}&type=2&datasource=10`
              }

            }, 1000)
          })
          .catch(err => {
            this.$router.push({ path: '/unlicensed/orderError', query: {type: 'exit'} })
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
          errorMsg: '参数不能为空'
        });
        return
      }



      util.setChannel(util.channels.unlicensed)

      // 测试
      // sessionStorage.openId = 'oyaEAt3nMrhRWN20BKFYF6mlW8u4'
      // sessionStorage.userId = '6db7a514810f45b193db115269a39154'

      this.initLoadingBar()
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
