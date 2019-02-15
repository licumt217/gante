<template>
  <div class="wrapper" v-title="'集美礼包大放送'">
    <div class="phoneInfo">
      <p class="logo">
        <img src="./images/logo.png">
      </p>
      <p class="phone">
        <img src="./images/phone.png">
        <input type="tel" placeholder="请输入您的手机号码" @keyup="validatePhone()" v-model="phone" maxlength="11">
      </p>
      <p class="phoneCode">
        <img src="./images/yzm.png">
        <input type="tel" placeholder="请输入验证码" onfocus="this.focus()" v-model="yzm" maxlength="6" v-on:keyup="isEnableNextBtn()">
        <span id="btnCode" @click.stop="getYzm($event)" :class="{'inactive_yzm':!isEnableYzm,'active_yzm':isEnableYzm}">获取验证码</span>
      </p>
      <input type="button" class="btn" value="立即领取" @click="getCoupon()" v-show="blueBtn">
      <input type="button" class="graybtn" value="立即领取" v-show="grayBtn">
      <p class="errorTip" v-if="stateError[this.errorCode]">
        <img src="./images/tipIcon.png" v-show="isIconShow">
        <span v-html="stateError[errorCode].tip"></span>
      </p>
      <p class="errorTip" v-else>
        <img src="./images/tipIcon.png" v-show="isIconShow">
        <span>{{errorTip}}</span>
      </p>
    </div>
    <div class="agreement">
      <p>
        <span>
          <input id="bdorder_input" type="checkbox" :checked="agreement==true" v-model="agreement">
          <label for="bdorder_input" @click="isEnableNextBtn()"></label>
        </span>
        <a href="javascript:;">同意成为集美用户</a>
        <br>
        <em>已注册为停简单用户的手机号无法参与活动</em>
      </p>
    </div>
  </div>
</template>
<script>
import { util } from 'util'
import { tjdServices } from '../../assets/js/tjdServices'

export default {
  data() {
    return {
      errorCode: '',
      errorTip: '',
      isEnableYzm: false,
      newestYzm: "",
      wait: 59,
      phone: '',
      yzm: '',
      agreement: true,
      isIconShow: false,
      blueBtn: false,
      grayBtn: true,
      stateError: {
        1001: {
          tip: `已经参与活动`
        },
        1002: {
          tip: `活动无效`
        },
        1003: {
          tip: `活动已关闭`
        },
        1004: {
          tip: `活动未开启`
        },
        1005: {
          tip: `活动已过期`
        },
        1006: {
          tip: `红包已发完`
        },
        1007: {
          tip: `红包领取失败`
        },
        2001: {
          tip: `该手机号注册过<br/>停简单用户，无法参与此活动`
        },
      }
    }
  },
  watch: {
    yzm(val) {
      if (!util.isEmpty(val) && val.length >= 4 && !util.isEmpty(this.phone) && this.phone.length === 11 && this.agreement === true) {
        this.blueBtn = true;
        this.grayBtn = false;
      }
    },
    phone(val) {
      if (!util.isEmpty(val) && val.length === 11 && !util.isEmpty(this.yzm) && this.yzm.length >= 4 && this.agreement === true) {
        this.blueBtn = true;
        this.grayBtn = false;
      }
    },
    errorCode(code, phone) {
      if (code === '2000') {
        this.$router.push({
          path: '/jimei/jimeiSuccess',
          query: {
            phone: this.phone,
          }
        })
      }
    }
  },
  computed: {
  },

  mounted() {
    this.init()
    document.querySelector(".phoneInfo").style.height = `${window.innerHeight * .85}px`;
  },
  methods: {
    init: function() {
      // 为了调试方便openID写死
      // util.setOpenId('oyaEAt3dMdCb1TcGBuhovP7C_38w');
      tjdServices.getLoginInfo().then(data => {
        util.setChannel(util.channels.jmCoupon);
        this.enablePhone();
      }, data => {

      })
    },
    checkFinal: function() {
      if (!util.validates.isValidPhone(this.phone)) {
        setTjdTimeout(()=>{
            this.$parent.showTjdModal({
                type: 2,
                errorMsg: "手机号格式不正确！"
            });
        }, 600)
        return false;
      } else {
        util.setPhone(this.phone);
        return true;
      }
    },
    enablePhone: function() {
      $(".phone input").attr('disabled', false);
    },
    disablePhone: function() {
      $(".phone input").attr('disabled', true);
    },
    // 领券方法
    getCoupon: function() {
      if (this.checkFinal() === false) {
        return false;
      }
      tjdServices.request({
        method: 'obtainCoupon',
        phone: this.phone,
        yzm: this.yzm
      }).then(data => {
        this.errorCode = data.errorCode;
        this.errorTip = data.errorTip;
        this.isIconShow = true;

      }).catch(err => {
        this.$parent.showTjdModal({
          type: 2,
          errorMsg: data.errorMsg
        });
      });
    },
    // 获取验证码
    getRealYzm: function() {
      tjdServices.request({
        method: 'getPhoneCode',
        phone: this.phone
      }).then(data => {
        this.isEnableYzm = false;
        $(".phone input").attr("readonly", true);
        this.disablePhone()
        this.time($("#btnCode")[0]);
      });
    },
    validatePhone: function() {
      if (!util.isEmpty(this.phone) && this.phone.length === 11) {
        this.isEnableYzm = true;
      } else {
        this.isEnableYzm = false;
      }
      this.isEnableNextBtn();
    },
    isEnableNextBtn: function() {
      console.log(this.agreement)
      setTimeout(() => {
        if (!util.isEmpty(this.phone) && !util.isEmpty(this.yzm) && this.phone.length === 11 && this.yzm.length >= 4 && this.agreement === true) {
          this.blueBtn = true;
          this.grayBtn = false;
        } else {
          this.grayBtn = true;
          this.blueBtn = false;
        }
      })
    },
    // 验证码倒计时
    time: function(o) {
      if (this.wait === 0) {
        o.innerHTML = "再次获取";
        this.wait = 59;
        this.isEnableYzm = true;
        $(".phone input").removeAttr("readonly");
        this.enablePhone()
      } else {
        if (util.isEmpty(this.wait)) {
          this.wait = 59;
        }
        $(".phone input").attr("readonly", true);
        o.innerHTML = "已发送 (" + this.wait + "s)";
        this.wait--;
        setTjdTimeout(() => {
          this.time(o);
        }, 1000)
      }
    },
    getYzm: function($event) {
      if (this.isEnableYzm) {
        //验证手机号格式
        if (!util.validates.isValidPhone(this.phone)) {
          setTjdTimeout(()=>{
              this.$parent.showTjdModal({
                  type: 2,
                  errorMsg: "手机号格式不正确！"
              });
          }, 600)
        } else {
          this.getRealYzm();
          util.focus('yzm', $event);
        }

      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  background: url('./images/jimeiWrapBg.png') repeat-x;
  background-size: cover;
  .logo {
    padding: 11% 11% 5%;
    img {
      width: 50%;
    }
  }
  .phone,
  .phoneCode {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #DBD9F5;
    width: 61%;
    margin-left: 5%;
    img {
      width: 15px;
      margin: 18px 10px;
      position: absolute;
    }
    input {
      height: 44px;
      border: none;
      outline: none;
      font-size: 14px;
      width: 85%;
      padding-left: 15%;
      background: none;
    }
  }
  .phoneCode {
    position: relative;
    .active_yzm {
      width: 100px;
      display: inline-block;
      height: 40px;
      background: url('./images/phoneCode.png');
      background-size: 100% 100%;
      font-size: 14px;
      color: #fff;
      line-height: 34px;
      text-align: center;
      position: absolute;
      right: -5%;
      top: 10px;
    }
    .inactive_yzm {
      width: 100px;
      display: inline-block;
      height: 40px;
      background: url('./images/phoneCodeGray.png');
      background-size: 100% 100%;
      font-size: 14px;
      color: #fff;
      line-height: 34px;
      text-align: center;
      position: absolute;
      right: -5%;
      top: 10px;
    }
  }

  .btn {
    width: 60%;
    padding: 14px 0 22px;
    border: none;
    outline: none;
    background: url('./images/btn.png');
    background-size: 100% 100%;
    font-size: 15px;
    color: #fff;
    margin: 20% 20% 0;
    letter-spacing: 0.5px;
  }
  .graybtn {
    width: 60%;
    padding: 14px 0 22px;
    border: none;
    outline: none;
    background: url('./images/grayBtn.png');
    background-size: 100% 100%;
    font-size: 15px;
    color: #fff;
    margin: 20% 20% 0;
    letter-spacing: 0.5px;
  }
  .errorTip {
    color: #fff;
    font-size: 13px;
    letter-spacing: 0.5px;
    text-align: center;
    width: 200px;
    line-height: 20px;
    margin: 8% auto 1%;
    img {
      width: 13px;
      margin: 3px;
    }
  }
  input[type="checkbox"] {
    opacity: 0;
  }
  input[type="checkbox"]:checked+label {
    background: url(./images/checked.png) no-repeat;
    width: 22px;
    height: 22px;
    display: inline-block;
    background-size: 100% 100%;
  }
  input[type="checkbox"]+label {
    background: url(./images/uncheck.png) no-repeat;
    width: 22px;
    height: 22px;
    display: inline-block;
    background-size: 100% 100%;
  }
  .agreement {
    width: 100%;
    padding-top: 3%;
    p {
      text-align: center;
      font-size: 13px;
      color: #DFDEF1;
      letter-spacing: 0.5px;
      line-height: 10px;
      a {
        font-size: 13px;
        color: #DFDEF1;
      }
      span {
        margin: 5px;
        vertical-align: middle;
        display: inline-block;
      }
    }
  }
}
</style>
