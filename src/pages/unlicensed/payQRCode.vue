<template>
  <div class="qrcode-box">
    <div class="unlicensed-container">
      <h3 class="unlicensed-title">{{ orderInfo.parkName }}</h3>
      <div class="qrcode-wrapper">
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        <div class="qrcode-container">
          <div class="top-box">
            <p>进场时间：{{ orderInfo.inDate }}</p>
            <div id="qr_code" class="qrcode-img"></div>
          </div>
          <div class="tips-box">尊敬的用户，您可按照以下步骤使用此二维码。</div>
        </div>
      </div>
      <div class="pay-tips">
        <p>1、保存此二维码，出场由扫码枪扫描，系统语音播报应缴金额。</p>
        <p>2、请您调出微信/支付宝付款码，由扫码枪扫描并支付成功，方可快速离场。</p>
      </div>
    </div>
  </div>
</template>

<script>
import {} from '../../assets/js/qrcode'
export default {
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    $('#qr_code')
      .empty()
      .qrcode({
        render: 'image',
        text: this.orderInfo.url
      })
  }
}
</script>

<style lang="scss" scoped>
@function calVw($value) {
  @return $value / 750px * 100vw;
}

.qrcode-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: #fff;
}

.unlicensed-container {
  margin: 0 auto;
  width: calVw(620px);
  height: 100%;
  overflow-y: auto;
}

.unlicensed-title {
  padding: calVw(60px) 0 calVw(50px) 0;
  font-weight: 400;
  font-size: calVw(38px);
  color: #696969;
  text-align: center;
}

.qrcode-wrapper {
  position: relative;
  padding: calVw(20px);
  border: 1px solid #11bff1;
  border-radius: 22px;

  $radius-width: 20px;
  &:before,
  &:after {
    content: '';
    top: -1px;
  }

  &:before,
  &:after,
  .corner {
    position: absolute;
    width: $radius-width;
    height: $radius-width;
    background: #fff;
    z-index: 10;
  }

  &:before {
    left: -1px;
    border-bottom-right-radius: 100%;
    border-bottom: 1px solid #11bff1;
    border-right: 1px solid #11bff1;
  }

  &:after {
    right: -1px;
    border-bottom-left-radius: 100%;
    border-bottom: 1px solid #11bff1;
    border-left: 1px solid #11bff1;
  }

  .corner {
    bottom: -1px;

    &.bottom-left {
      left: -1px;
      border-top-right-radius: 100%;
      border-top: 1px solid #11bff1;
      border-right: 1px solid #11bff1;
    }

    &.bottom-right {
      right: -1px;
      border-top-left-radius: 100%;
      border-top: 1px solid #11bff1;
      border-left: 1px solid #11bff1;
    }
  }

  .qrcode-container {
    background: #3ad2fe;
    background: radial-gradient(
          circle at top left,
          transparent 18px,
          transparent 18px,
          #3ad2fe 0
        )
        top left,
      radial-gradient(
          circle at top right,
          transparent 18px,
          transparent 18px,
          #3ad2fe 0
        )
        top right,
      radial-gradient(
          circle at bottom right,
          transparent 18px,
          transparent 18px,
          #3ad2fe 0
        )
        bottom right,
      radial-gradient(
          circle at bottom left,
          transparent 18px,
          transparent 18px,
          #3ad2fe 0
        )
        bottom left;
    background-size: 52% 52%;
    background-repeat: no-repeat;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.1));

    .top-box {
      padding: calVw(70px) 0 calVw(60px) 0;
      text-align: center;
      color: #fff;
      font-size: calVw(30px);

      .qrcode-img {
        margin: calVw(70px) auto 0 auto;
        width: calVw(400px);
        border: calVw(25px) solid #fff;
        border-radius: 10px;
        box-sizing: border-box;
        background: #fff;
      }
    }

    .tips-box {
      padding: calVw(20px) calVw(32px);
      background: #0aa9e0;
      color: #5cddff;
      font-size: calVw(24px);
      background: radial-gradient(
            circle at top left,
            transparent 0,
            transparent 0,
            #0aa9e0 0
          )top left,
        radial-gradient(
            circle at top right,
            transparent 0,
            transparent 0,
            #0aa9e0 0
          )top right,
        radial-gradient(
            circle at bottom right,
            transparent 18px,
            transparent 18px,
            #0aa9e0 0
          )bottom right,
        radial-gradient(
            circle at bottom left,
            transparent 18px,
            transparent 18px,
            #0aa9e0 0
          )bottom left;
      background-size: 52% 53%;
      background-repeat: no-repeat;
    }
  }
}

.pay-tips {
  padding: 0 calVw(40px);
  font-size: calVw(26px);
  p {
    margin-top: calVw(36px);
    color: #868686;
  }
}
</style>
