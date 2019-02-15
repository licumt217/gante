<template>
    <!-- 键盘输入区域 -->
    <div class="tjdKbdWrapper">
        <div class="tjd_carnum_input_div">
            <div class="tjd_carnum_input_div_one" :class="{'rdPark':isRdPark}">
                <input type="button" onfocus="this.blur();" class="tjd_carnum_first carnum_btn" @click="showTjdKbd(1,$event)" value="" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_second carnum_btn" @click="showTjdKbd(2,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_third carnum_btn" @click="showTjdKbd(3,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_forth carnum_btn" @click="showTjdKbd(4,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_fivth carnum_btn" @click="showTjdKbd(5,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_sixth carnum_btn" @click="showTjdKbd(6,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_seventh carnum_btn" @click="showTjdKbd(7,$event)" />
                <input type="button" onfocus="this.blur();" class="tjd_carnum_eighth carnum_btn" @click="showTjdKbd(8,$event)" />
            </div>

            <!-- 中文键盘区域 -->
            <div v-clickoutside="hideKbds">
                <div class="tjd_carnum_one" style="display:none;">
                    <div class="tjd_carnum_one_row">
                        <input type="button" class="tjd_keyboard_one_btn" value="京" />
                        <input type="button" class="tjd_keyboard_one_btn" value="津" />
                        <input type="button" class="tjd_keyboard_one_btn" value="冀" />
                        <input type="button" class="tjd_keyboard_one_btn" value="鲁" />
                        <input type="button" class="tjd_keyboard_one_btn" value="晋" />
                        <input type="button" class="tjd_keyboard_one_btn" value="蒙" />
                        <input type="button" class="tjd_keyboard_one_btn" value="辽" />
                        <input type="button" class="tjd_keyboard_one_btn" value="吉" />
                        <input type="button" class="tjd_keyboard_one_btn" value="黑" />
                        <input type="button" class="tjd_keyboard_one_btn" value="沪" />
                    </div>
                    <div class="tjd_carnum_one_row">
                        <input type="button" class="tjd_keyboard_one_btn" value="苏" />
                        <input type="button" class="tjd_keyboard_one_btn" value="浙" />
                        <input type="button" class="tjd_keyboard_one_btn" value="皖" />
                        <input type="button" class="tjd_keyboard_one_btn" value="闽" />
                        <input type="button" class="tjd_keyboard_one_btn" value="赣" />
                        <input type="button" class="tjd_keyboard_one_btn" value="豫" />
                        <input type="button" class="tjd_keyboard_one_btn" value="鄂" />
                        <input type="button" class="tjd_keyboard_one_btn" value="湘" />
                        <input type="button" class="tjd_keyboard_one_btn" value="粤" />
                        <input type="button" class="tjd_keyboard_one_btn" value="桂" />
                    </div>
                    <div class="tjd_carnum_one_row">
                        <input type="button" class="tjd_keyboard_one_btn" value="琼" />
                        <input type="button" class="tjd_keyboard_one_btn" value="渝" />
                        <input type="button" class="tjd_keyboard_one_btn" value="川" />
                        <input type="button" class="tjd_keyboard_one_btn" value="贵" />
                        <input type="button" class="tjd_keyboard_one_btn" value="云" />
                        <input type="button" class="tjd_keyboard_one_btn" value="藏" />
                        <input type="button" class="tjd_keyboard_one_btn" value="陕" />
                        <input type="button" class="tjd_keyboard_one_btn" value="甘" />
                        <input type="button" class="tjd_keyboard_one_btn" value="青" />
                        <input type="button" class="tjd_keyboard_one_btn" value="宁" />
                    </div>

                    <div class="tjd_carnum_one_row">
                        <span class="tjd_keyboard_ABC"><img src="../../assets/images/common/btnabc.png" /></span>
                        <input type="button" class="tjd_keyboard_one_btn" value="新" />
                        <input type="button" class="tjd_keyboard_one_btn" value="港" />
                        <input type="button" class="tjd_keyboard_one_btn" value="澳" />
                        <input type="button" class="tjd_keyboard_one_btn" value="台" />
                        <input type="button" class="tjd_keyboard_one_btn" value="警" />
                        <input type="button" class="tjd_keyboard_one_btn" value="使" />
                        <input type="button" class="tjd_keyboard_one_btn" value="领" />
                        <span class="tjd_keyboard_del_btn"><img src="../../assets/images/common/btndelete.png" /></span>
                    </div>
                </div>
                <!-- 字母数字键盘区域 -->
                <div class="tjd_carnum_two" style="display:none;" >
                    <div class="tjd_carnum_two_row">
                        <input type="button" class="tjd_keyboard_two_btn" value="1" />
                        <input type="button" class="tjd_keyboard_two_btn" value="2" />
                        <input type="button" class="tjd_keyboard_two_btn" value="3" />
                        <input type="button" class="tjd_keyboard_two_btn" value="4" />
                        <input type="button" class="tjd_keyboard_two_btn" value="5" />
                        <input type="button" class="tjd_keyboard_two_btn" value="6" />
                        <input type="button" class="tjd_keyboard_two_btn" value="7" />
                        <input type="button" class="tjd_keyboard_two_btn" value="8" />
                        <input type="button" class="tjd_keyboard_two_btn" value="9" />
                        <input type="button" class="tjd_keyboard_two_btn" value="0" />
                    </div>
                    <div class="tjd_carnum_two_row">
                        <input type="button" class="tjd_keyboard_two_btn" value="Q" />
                        <input type="button" class="tjd_keyboard_two_btn" value="W" />
                        <input type="button" class="tjd_keyboard_two_btn" value="E" />
                        <input type="button" class="tjd_keyboard_two_btn" value="R" />
                        <input type="button" class="tjd_keyboard_two_btn" value="T" />
                        <input type="button" class="tjd_keyboard_two_btn" value="Y" />
                        <input type="button" class="tjd_keyboard_two_btn" value="U" />
                        <input type="button" class="tjd_keyboard_two_btn" value="P" />
                    </div>
                    <div class="tjd_carnum_two_row">
                        <input type="button" class="tjd_keyboard_two_btn tjd_no_visible" />
                        <input type="button" class="tjd_keyboard_two_btn" value="A" />
                        <input type="button" class="tjd_keyboard_two_btn" value="S" />
                        <input type="button" class="tjd_keyboard_two_btn" value="D" />
                        <input type="button" class="tjd_keyboard_two_btn" value="F" />
                        <input type="button" class="tjd_keyboard_two_btn" value="G" />
                        <input type="button" class="tjd_keyboard_two_btn" value="H" />
                        <input type="button" class="tjd_keyboard_two_btn" value="J" />
                        <input type="button" class="tjd_keyboard_two_btn" value="K" />
                        <input type="button" class="tjd_keyboard_two_btn tjd_l" value="L" />
                        <input type="button" class="tjd_keyboard_two_btn tjd_no_visible" />
                    </div>

                    <div class="tjd_carnum_two_row">
                        <span class="tjd_keyboard_province">省份</span>
                        <input type="button" class="tjd_keyboard_two_btn" value="Z" />
                        <input type="button" class="tjd_keyboard_two_btn" value="X" />
                        <input type="button" class="tjd_keyboard_two_btn" value="C" />
                        <input type="button" class="tjd_keyboard_two_btn" value="V" />
                        <input type="button" class="tjd_keyboard_two_btn" value="B" />
                        <input type="button" class="tjd_keyboard_two_btn" value="N" />
                        <input type="button" class="tjd_keyboard_two_btn" value="M" />
                        <span class="tjd_keyboard_del_btn"><img src="../../assets/images/common/btndelete.png" /></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { util } from 'util'
import clickoutside from '../../directives/clickoutside'
export default {
    props: ['rdParkId'],
  data() {
    return {
      curActiveInput: null,
      curActiveIndex: 0
    }
  },
  directives: { clickoutside },
  events: {
    //接收父组件的传值
    setCarnum2Child: function(carNum) {
      this.setTjdKbdCarnum(carNum)
    }
  },
  created: function() {
    this.nextActive()
    this.setExceptDoms('.tjd_carnum_two,.tjd_carnum_one')
    this.initEventBind()
    $(
      '.tjdKbdWrapper .tjd_keyboard_two_btn,' +
        '.tjdKbdWrapper .tjd_keyboard_one_btn,' +
        '.tjdKbdWrapper .tjd_carnum_two,' +
        '.tjdKbdWrapper .tjd_carnum_one,' +
        '.tjdKbdWrapper .tjd_carnum_one_row,' +
        '.tjdKbdWrapper .tjd_carnum_two_row'
    ).bind('focus', function() {
      $(this).blur()
    })
  },
  ready: function() {
    //首先隐藏，渲染完成后再显示。否则刚开始闪一下时没有样式，键盘很难看
    setTimeout(function() {
      $('.tjdKbdWrapper .tjd_carnum_input_div_one').show()
    })
  },
  computed:{
        isRdPark:function () {
            return  util.constants.rdParkId.indexOf(this.rdParkId) >= 0?true:false;
        }
  },
  methods: {
    getClassByIndex: function(index) {
      var clazz = ''
      switch (index) {
        case 1:
          clazz = 'tjd_carnum_first'
          break
        case 2:
          clazz = 'tjd_carnum_second'
          break
        case 3:
          clazz = 'tjd_carnum_third'
          break
        case 4:
          clazz = 'tjd_carnum_forth'
          break
        case 5:
          clazz = 'tjd_carnum_fivth'
          break
        case 6:
          clazz = 'tjd_carnum_sixth'
          break
        case 7:
          clazz = 'tjd_carnum_seventh'
          break
        case 8:
          clazz = 'tjd_carnum_eighth'
          break
      }
      return clazz
    },
    getCurInput: function() {
      return $('.tjdKbdWrapper .' + this.getClassByIndex(this.curActiveIndex))
    },
    addActive: function(index) {
      var clazz = this.getClassByIndex(index)

      $('.tjdKbdWrapper .carnum_btn').removeClass('tjd_keyboard_input_active')
      $('.tjdKbdWrapper .' + clazz).addClass('tjd_keyboard_input_active')
      this.showKbd(index)
    },
    //判断显示首位省份键盘还是数字键盘
    showKbd: function(index) {
      if (index > 1) {
        this.showKbdTwo()
      } else {
        this.showKbdOne()
      }
    },

    hideKbds: function() {
      $('.tjdKbdWrapper .tjd_carnum_two').hide()
      $('.tjdKbdWrapper .tjd_carnum_one').hide()
    },
    showTjdKbd: function(index,e) {
      this.addActive(index)
      this.curActiveIndex = index
        if(e){
            e.stopPropagation();
            e.preventDefault();
        }

    },
    setValue: function(val) {
      var clazz = this.getClassByIndex(this.curActiveIndex)
      $('.tjdKbdWrapper .' + clazz).val(val)
    },
    nextActive: function() {
      if (this.curActiveIndex < 8) {
        this.curActiveIndex++
      }
      this.addActive(this.curActiveIndex)
    },
    prevActive: function() {
      if (this.curActiveIndex > 1) {
        this.curActiveIndex--
      }
      this.addActive(this.curActiveIndex)
    },
    //将用户选择的键盘值赋值到对应的键盘输入区域
    setValCommon: function(val) {
      this.setValue(val)
      this.nextActive()
    },
    initEventBind: function() {
      //中文键盘选择事件
      var self = this
      setTimeout(() => {
        $('.tjdKbdWrapper .tjd_keyboard_one_btn').bind('touchend ', function(
          e
        ) {
          self.showKbdTwo()
          self.setValCommon($(this).val())
          e.stopPropagation()
          return false
        })

        //字母数字键盘选择事件
        $('.tjdKbdWrapper .tjd_keyboard_two_btn').bind('touchend ', function(
          e
        ) {
          self.setValCommon($(this).val())
          e.stopPropagation()
          return false
        })

        //数字字母键盘删除按钮的删除事件
        $('.tjdKbdWrapper .tjd_keyboard_del_btn').bind('touchend ', function(
          e
        ) {
          var curInput = self.getCurInput()
          if (util.isEmpty(curInput.val()) && curInput.val() != '0') {
            //当前光标位置有值的话删除，光标不动；没有值的话删除前一位的值，同时光标前移
            self.prevActive()
            curInput = self.getCurInput()
            curInput.val('')
            if (curInput.hasClass('tjd_carnum_first')) {
              self.showKbdOne()
            }
          } else {
            curInput.val('')
          }

          e.stopPropagation()
          return false
        })

        //province switch
        $('.tjd_keyboard_province').bind('touchend ', function(e) {
          self.hideKbds()
          self.showKbd(1)
          e.stopPropagation()
          return false
        })
        $('.tjd_keyboard_ABC').bind('touchend ', function(e) {
          self.hideKbds()
          self.showKbd(2)
          e.stopPropagation()
          return false
        })
      })

    },
    reset: function() {
      this.curActiveIndex = 1
    },
    /**
     * 初始化停简单车牌号键盘，根据传入的参数选择器来实现touch除了这些地方以外隐藏键盘
     */
    setExceptDoms: function(selectors) {
      $(selectors).bind('touchend ', function(e) {
        e.stopPropagation()
        e.preventDefault()
      })
    },
    /**
     * 是否车牌输入了但是不全
     * @returns {Boolean}
     */
    isCarNumNotFull: function() {
      if (
        (this.getTjdKbdCarnum().length > 1 &&
          this.getTjdKbdCarnum().length < 7) ||
        (this.getTjdKbdCarnum().length == 7 &&
          !util.isEmpty($('.tjdKbdWrapper .tjd_carnum_eighth').val()))
      ) {
        return true
      }
      return false
    },
    resetActive: function() {
      var clazz = 'tjd_carnum_first'
      $('.tjdKbdWrapper .' + clazz).trigger('click')
    },
    resetKbd: function() {
      var clazz = 'tjd_carnum_first'
      //var thirdClazz="tjd_carnum_third";
      $('.tjdKbdWrapper .' + clazz)
        .siblings()
        .val('')
        .end()
        .val('')
      setTimeout(() => {
        $('.tjdKbdWrapper .' + clazz).trigger('touchend ')
      }, 50)
    },
    showKbdOne: function() {
      $('.tjd_carnum_one').show()
      $('.tjd_carnum_two').hide()
    },
    showKbdTwo: function() {
      $('.tjd_carnum_one').hide()
      $('.tjd_carnum_two').show()
    },
    /**
     * 车牌号是否为空，长度为0或1
     * @returns {Boolean}
     */
    isCarNumEmpty: function() {
      if (this.getTjdKbdCarnum().length <= 1) {
        return true
      }
      return false
    },

    /**
     * 是否车牌完全没有输入(只有第一位有值)
     * @returns {Boolean}
     */
    isCarNumFullEmpty: function() {
      if (
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_first').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_second').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_third').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_forth').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_fivth').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_sixth').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_seventh').val()) &&
        util.isEmpty($('.tjdKbdWrapper .tjd_carnum_eighth').val())
      ) {
        return true
      }
      return false
    },

    /**
     * 获得停简单键盘用户输入的车牌号
     * @returns
     */
    getTjdKbdCarnum: function() {
      return (
        $('.tjdKbdWrapper .tjd_carnum_first').val() +
        $('.tjdKbdWrapper .tjd_carnum_second').val() +
        $('.tjdKbdWrapper .tjd_carnum_third').val() +
        $('.tjdKbdWrapper .tjd_carnum_forth').val() +
        $('.tjdKbdWrapper .tjd_carnum_fivth').val() +
        $('.tjdKbdWrapper .tjd_carnum_sixth').val() +
        $('.tjdKbdWrapper .tjd_carnum_seventh').val() +
        $('.tjdKbdWrapper .tjd_carnum_eighth').val()
      )
    },
    /**
     * 将车牌号设置到键盘
     */
    setTjdKbdCarnum: function(carNum) {
      if (!util.isEmpty(carNum)) {
        $('.tjdKbdWrapper .tjd_carnum_first').val(carNum.charAt(0))
        $('.tjdKbdWrapper .tjd_carnum_second').val(carNum.charAt(1))
        $('.tjdKbdWrapper .tjd_carnum_third').val(carNum.charAt(2))
        $('.tjdKbdWrapper .tjd_carnum_forth').val(carNum.charAt(3))
        $('.tjdKbdWrapper .tjd_carnum_fivth').val(carNum.charAt(4))
        $('.tjdKbdWrapper .tjd_carnum_sixth').val(carNum.charAt(5))
        $('.tjdKbdWrapper .tjd_carnum_seventh').val(carNum.charAt(6))
        $('.tjdKbdWrapper .tjd_carnum_eighth').val(carNum.charAt(7))
      } else {
        //$(".tjd_carnum_first").val("京");
      }
    },
    /**
     * 将车牌号设置到键盘
     */
    clearCarnum: function(carNum) {
      this.resetActive()
      $('.tjdKbdWrapper .tjd_carnum_first').val('')
      $('.tjdKbdWrapper .tjd_carnum_second').val('')
      $('.tjdKbdWrapper .tjd_carnum_third').val('')
      $('.tjdKbdWrapper .tjd_carnum_forth').val('')
      $('.tjdKbdWrapper .tjd_carnum_fivth').val('')
      $('.tjdKbdWrapper .tjd_carnum_sixth').val('')
      $('.tjdKbdWrapper .tjd_carnum_seventh').val('')
      $('.tjdKbdWrapper .tjd_carnum_eighth').val('')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/reset.less';
/*车牌键盘输入区域总体样式*/
.tjd_carnum_input_div_one {
  padding: 0 4px;
  background: #ffffff;
  height: 3em;
  width: 100%;
  margin: 1em auto;
  display: -moz-box;
  display: -webkit-box;
  border-radius: 6px;
  text-align: center;
  box-sizing: border-box;
}

.tjd_carnum_input_div_one {
  display: -moz-box;
  display: -webkit-box;
  border: solid 1px #f2f2f2;
  background: transparent;
  text-align: center;
  line-height: 1em;
  outline: none;
  border-radius: 0.4em;
}

/*车牌键盘输入区域按钮样式*/
.tjd_carnum_input_div_one input {
  border: none;
  background: transparent;
  text-align: center;
  line-height: 1em;
  outline: none;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  width: 2.5em;
  display: block;
  border-radius: 0.1em;
  font-size: 18px;
  color: #4bc1cd;

    /*车牌键盘输入区域按钮激活样式*/
  &.tjd_keyboard_input_active {
    border-bottom: solid 3px #4bc1cd;
    text-align: center;
    outline: none;
    -webkit-box-flex: 1;
    display: block;
  }
}

.tjd_carnum_input_div_one.rdPark input {
    color: #9b000d;

    &.tjd_keyboard_input_active {
         border-bottom: solid 3px #9b000d;
     }
}

section article b {
  line-height: 2.5em;
  font-size: 30px;
  padding-left: 3%;
}
.tjd_carnum_input_div_two {
  background: #ffffff;
  height: 2.5em;
  float: right;
  width: 62.5%;
  margin: 1em auto;
  display: -moz-box;
  display: -webkit-box;
  border-radius: 6px;
  border: solid 1px #e0e0e0;
  text-align: center;
}
/*车牌键盘输入区域按钮样式*/
.tjd_carnum_input_div_two input {
  border: none;
  background: #fff;
  text-align: center;
  line-height: 1em;
  outline: none;
  margin: 0.4em 0.4em;
  -webkit-box-flex: 1;
  width: 2.5em;
  display: block;
  border-radius: 0.1em;
  font-size: 18px;
  color: #000;
}

/* 键盘样式 */
.tjd_carnum_one,
.tjd_carnum_two {
  height: auto;
  width: 100%;
  background: #e5e6e8;
  position: absolute;
  padding-top: 0.5em;
  z-index: 9999;
  bottom: 0;
  display: none;
  left: 0;
}
/*键盘每行的样式*/
.tjd_carnum_one_row,
.tjd_carnum_two_row {
  width: 98%;
  height: 36px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.5em;
  display: -moz-box;
  display: -webkit-box;
}
/*键盘每行具体按钮的样式*/
.tjd_carnum_one_row input,
.tjd_carnum_two_row input {
  border: none;
  background: none;
  color: #000;
  outline: none;
  height: 36px;
  background: #fcfcfc;
  margin: 0 0.3%;
  line-height: 36px;
  border-radius: 3px;
  -webkit-box-flex: 1;
  display: block;
  font-size: 18px;
  -moz-box-flex: 1;
}

/*字母数字键盘的删除按钮*/
.tjd_keyboard_del_btn,
.tjd_keyboard_ABC,
.tjd_keyboard_province {
  height: 36px;
  line-height: 36px;
  -webkit-box-flex: 1;
  display: block;
  background: #b4c4d3;
  margin: 0 0.3%;
  color: #fff;
  border-radius: 3px;
  letter-spacing: 0.5px;
  font-weight: 500;
}
/*删除按钮的图片*/
.tjd_keyboard_del_btn img {
  width: 1.6em;
  vertical-align: middle;
}
.tjd_keyboard_ABC img {
  width: 2.6em;
  vertical-align: middle;
}
/*不可见，但是仍占据空间*/
.tjd_no_visible {
  visibility: hidden;
}
/*键盘按钮激活时样式*/
// .tjd_keyboard_one_btn:active,
// .tjd_keyboard_two_btn:active {
//   background: #4EA8B1 !important;
//   color: #fff;
//   height: 36px;
// }
/*禁用系统默认键盘*/
.ime-disabled {
  ime-mode: disabled;
}

.tjd_carnum_input_div .tjd_carnum_seventh {
  border-right: none;
}

/*不可见，但是仍占据空间*/
.tjd_no_visible {
  visibility: hidden;
}
/**/

/*首字中文无边框（边框和背景色一致时，pc和安卓都看不到边框，但是iphone却能看到，不知什么原因，暂时这样处理）*/
/*.tjd_carnum_first{*/
/*border-bottom: none!important;*/
/*}*/
/*L键特别对待，部分iphone6上边，L键经常选不中*/
.tjd_l {
  padding-right: 0.12em;
  padding-left: 0.12em;
}
</style>