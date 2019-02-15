<template>
  <section v-title="'会员系统'">
    <p>
      <img :src="stateImg[state].img" alt="">
    </p>
    <p>{{stateImg[state].text}}</p>
    <p :class="{'margin-top10': isOnline === 'false' && qrcodeImg}" v-html="stateImg[state].description"></p>
    <p v-if="state === 1" :class="{'margin-top20': isOnline === 'false'}">{{ isOnline === 'true' ? `您的优惠券已发放至您的停简单账户${phone}` : '您可以关注停简单公众号\\生活号,或直接下载APP使用您的优惠券。' }}</p>
    <div class="bottom-line" v-show="state !== 1002 && state !== 1003 && state !== 1004 && state !== 1008"></div>
    <template v-if="state === 1 || state === 1001">
      <button v-show="!qrcodeImg && isOnline === 'false'" @touchend="downApp" class="down-app-btn">下载APP</button>
      <div v-if="qrcodeImg" class="qrcode-block">
        <img :src="qrcodeImg" alt="">
        <div>{{qrcodeText}}</div>
      </div>
      <a class="return-youle" href="javascript:;" @click="back2youle"><icon name="leftjiantou" scale="1.9"></icon>返回有叻</a>
    </template>
  </section>
</template>
<script>
import { util } from 'util'
import {wxUtil} from '../../assets/js/wxUtil'
export default {
  data() {
    const state = this.$route.query.state * 1 || 1006,
      amount = this.$route.query.amount * 1 || 0,
      callbackUrl = this.$route.query.callbackUrl,
      isOnline = this.$route.query.isOnline
    return {
      data2:this.$route.query.data2,
      state: state,
      isOnline: isOnline,
      qrcodeImg: '',
      qrcodeText: '',
      callbackUrl: callbackUrl,
      stateImg: {
        1: {
          img: require('./image/lingquchenggong.png'),
          text: '领取成功',
          description: `恭喜您获得 <em style="color:#03C3F2;font-size:20px;font-weight:bolder;">${amount}</em> 元停简单停车优惠券！`
        },
        1001: {
          img: require('./image/yilingqu.png'),
          text: '已领取',
          description: '您已领取过优惠券啦~<br/>请继续关注其他精彩活动！'
        },
        1002: {
          img: require('./image/lingqushibai.png'),
          text: '	活动无效',
          description: ''
        },
        1003: {
          img: require('./image/lingqushibai.png'),
          text: '活动已关闭',
          description: ''
        },
        1004: {
          img: require('./image/lingqushibai.png'),
          text: '活动已结束',
          description: ''
        },
        1005: {
          img: require('./image/lingwan.png'),
          text: '领完啦',
          description: '优惠券已领完，请继续关注<br/>福利多多，活动多多！'
        },
        1006: {
          img: require('./image/lingqushibai.png'),
          text: '领取失败',
          description: '啊哦，出错啦，请刷新页面重试。'
        },
        1007: {
          img: require('./image/lingqushibai.png'),
          text: '等级不存在',
          description: ''
        },
        1008: {
          img: require('./image/lingqushibai.png'),
          text: '	活动未开始',
          description: ''
        },
      }
    }
  },
  created() {
    if(this.isOnline === 'false' && (this.state === 1 || this.state === 1001)){
      if (util.isWeixinBrowserOnly()) {
        this.qrcodeImg = location.host.indexOf('prep') > -1 ? require('./image/prep_wechat.png') : require('./image/wechat.jpg')
        this.qrcodeText = '微信公众号'
      } else if (util.isAlipayBrowserOnly()) {
        this.qrcodeImg = require('./image/alipay.png')
        this.qrcodeText = '支付宝公众号'
      }
    }
  },
  computed: {
    phone(){
      const phone = this.$route.query.phone
      return `${phone.slice(0,3)}****${phone.slice(7)}`
    }
  },
  methods: {
    back2youle(){
      if(wxUtil.isInWeixinSmall()){
          var query = { benefitId: '0204', num: this.$route.query.level,  levelId: this.$route.query.callbackUrl};
        wxUtil.back2WeixinSmall({
          url: "/pages/interestlist/interestlist?query=" + JSON.stringify(query)
        });
      }else{
        location.href=this.callbackUrl;
      }
    },
    downApp() {
      window.open('https://a.app.qq.com/o/simple.jsp?pkgname=com.tingjiandan.client')
    }
  }
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: 'hanyilinxin';
  src: url('../../assets/font/hanyilinxin_sinmple.ttf');
}
section p {
  text-align: center;
  margin-left: 3%;
  img {
    width: 65%;
    margin-top: 20%;
  }
  &:nth-child(2) {
    font-size: 22px;
    font-family: 'hanyilinxin';
    color: #504f4f;
    margin-top: 20px;
    margin-right: 5%;
    text-shadow: 1px 0px 1px #ccc;
  }
  &:nth-child(3) {
    color: #a7a5a5;
    font-size: 15px;
    margin-top: 14%;
    width: 80%;
    margin-left: 10%;
    // text-shadow: 0px 0px 1px #e0dede;
    letter-spacing: 1px;
  }
  &:nth-child(4) {
    color: #a7a5a5;
    font-size: 15px;
    letter-spacing: 1px;
    width: 80%;
    margin-left: 10%;
    word-wrap: break-word;
    word-break: break-all;
    // text-shadow: 0px 0px 1px #e0dede;
  }
}
.bottom-line{
  height: 6px;
  width: 23px;
  position: absolute;
  bottom: 38%;
  border-radius: 3px;
  background: #00BEF2;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.down-app-btn{
    background: #2dc0ee;
    border: 1px solid #2cbdee;
    color: #fff;
    position: absolute;
    bottom: 80px;
    width: 118px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 45px;
    border-radius: 30px;
    font-size: 17px;
    outline: none;
    background-image: -webkit-linear-gradient(to bottom, #2cbdee 0%, #2cbdee 30%, #4edaf3 90%);
    background-image: linear-gradient(to bottom, #2cbdee 0%, #2cbdee 30%, #4edaf3 90%);
    letter-spacing: 1px;
}
.margin-top20{
  margin-top: 20px;
}

.margin-top10{
  margin-top: 20px!important;
}
.qrcode-block {
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 120px;
  right: 0;
  text-align: center;
  margin: 0 auto;
  img{
    width: 120px;
    box-shadow: 0px 5px 14px 0px #cbe4f5;
  }
  div{
    color: #a7a5a5;
    margin-top: 10px;
    font-size: 13px;
  }
}
.return-youle {
  position: absolute;
  bottom: 3%;
  color: #00BEF2;
  font-size: 13px;
  left: 0;
  right: 0;
  margin-right: 3%;
  text-align: center;
  svg{
    position: relative;
    top:3px;
  }
}
</style>