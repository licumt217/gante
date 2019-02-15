<template>
    <div v-title="'香山桃花节'">
        <div class="wrapper">
            <div class="car-port" :style="mapHeight">
                <span :style="position1">{{p1.count}}</span>
                <span :style="position4">{{p4.count}}</span>
                <span :style="position5">{{p5.count}}</span>
                <span :style="position6">{{p6.count}}</span>
                <span :style="position7">{{p7.count}}</span>
                <span :style="position8">{{p8.count}}</span>
                <span :style="position9">{{p9.count}}</span>
                <span :style="position10">{{p10.count}}</span>
                <span :style="useRatioStyle">停车紧张指数 <em :style="useRatioEmStyle">{{useRatio}}%</em></span>
            </div>
            <p class="banner">
                <img src="./img/theslogan@3x.png" alt="">
            </p>
            <div class="qrcode">
                <img :src="qrcodeImg" alt="">
                <p>长按关注停简单</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { util } from 'util'
    import { tjdServices } from '../../assets/js/tjdServices'

    export default {
        data() {
            let parkIds = []
            if (location.href.indexOf('open.tingjiandan.com') !== -1) {
                parkIds = ['4c6f27dad39d47fb84f3f1ded71b929a', '849d7d65cd8a4378930458f11169b9f1', '1afdcd8ba7bc40f694561249f838f81c', 'ee72e7ae20bf4ebe9c88f211ddb90886']
            } else {
                parkIds = ['ee72e7ae20bf4ebe9c88f211ddb90886','4c6f27dad39d47fb84f3f1ded71b929a','849d7d65cd8a4378930458f11169b9f1','1afdcd8ba7bc40f694561249f838f81c']

            }

            return {
                parkIds: parkIds,
                // parkIds: [
                //   '761de5ca8d2848f6a72a8158c4497ad1',//测试停车场
                //   'e44636d3f90d4de1bdbe605da86a3f5a',
                //   '5bae754fe76c4ffb9457409f8a9fcaf2',
                //   'c2d01554d76742b1a6e1891434616f95'
                // ],
                qrcodeImg: '',
                p1: {
                    maxCount: 300 //此数据从表里拿，如果有变直接改，下同
                },
                p4: {
                    maxCount: 160
                },
                p5: {},
                p6: {
                    maxCount: 120
                },
                p7: {},
                p8: {},
                p9: {
                    maxCount: 130
                },
                p10: {},
                useRatio: 0,
                rateX: window.innerWidth * .98 / 367.5, //切得图有点问题，做了margin处理
                rateY: window.innerWidth * 507 * .98 / (735 * 260),
                timer: 0
            }
        },
        computed: {
            mapHeight(){
                return {
                    height: `${window.innerWidth * 507 * .98 / 735}px`
                }
            },
            position1() {
                return {
                    left: `${this.rateX * 276}px`,
                    top: `${this.rateY * 121}px`,
                    color: `${this._getColor((300 - this.p1.count) * 100 / 300)}`
                }
            },
            position4() {
                return {
                    left: `${this.rateX * 189}px`,
                    top: `${this.rateY * 77}px`,
                    color: `${this._getColor((160 - this.p4.count) * 100 / 160)}`
                }
            },
            position5() {
                return {
                    left: `${this.rateX * 148}px`,
                    top: `${this.rateY * 108}px`,
                    color: `${this._getColor((this.p5.maxCount - this.p5.count) * 100 / this.p5.maxCount)}`
                }
            },
            position6() {
                return {
                    left: `${this.rateX * 113}px`,
                    top: `${this.rateY * 76}px`,
                    color: `${this._getColor((120 - this.p6.count) * 100 / 120)}`,
                    transform: 'rotate(6deg)'
                }
            },
            position7() {
                return {
                    left: `${this.rateX * 82}px`,
                    top: `${this.rateY * 24}px`,
                    color: `${this._getColor((this.p7.maxCount - this.p7.count) * 100 / this.p7.maxCount)}`
                }
            },
            position8() {
                return {
                    left: `${this.rateX * 79}px`,
                    top: `${this.rateY * 110}px`,
                    color: `${this._getColor((this.p8.maxCount - this.p8.count) * 100 / this.p8.maxCount)}`
                }
            },
            position9() {
                return {
                    left: `${this.rateX * 35}px`,
                    top: `${this.rateY * 121}px`,
                    color: `${this._getColor((130 - this.p9.count) * 100 / 130)}`
                }
            },
            position10() {
                return {
                    left: `${this.rateX * 100}px`,
                    top: `${this.rateY * 176}px`,
                    color: `${this._getColor((this.p10.maxCount - this.p10.count) * 100 / this.p10.maxCount)}`
                }
            },
            useRatioStyle(){
                return {
                    left: `${this.rateX * 244}px`,
                    top: `${this.rateY * 8}px`,
                    fontWeight: 'normal',
                    textShadow: 'none',
                    fontSize: '12px',
                    color: '#7d7c7c'
                }
            },
            useRatioEmStyle(){
                return {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textShadow: '0px 1px 0px',
                    color: `${this._getColor(this.useRatio)}`,
                    transform: 'scaleY(1.1)',
                    display: '-webkit-inline-box'
                }
            }
        },
        created() {
            this._initCommonInfo()
            this._getParkCount()
            this.timer = setInterval(() => {
                this._getParkCount()
            }, 30000)
        },
        methods: {
            _initCommonInfo() {
                if (util.isWeixinBrowserOnly()) {
                    util.setPlatform(util.platforms.weixin)
                    this.qrcodeImg = require('./img/wechat.png')
                } else if (util.isAlipayBrowserOnly()) {
                    util.setPlatform(util.platforms.alipay)
                    this.qrcodeImg = require('./img/alipay.png')
                } else {
                    util.setPlatform(util.platforms.third)
                }
            },

            _getParkCount() {
                tjdServices.request({
                    method: 'getParkCount',
                    parkIds: this.parkIds
                }).then(data => {
                    const parkCount = data.parkCount || []
                    let count = 0,
                        maxCount = 0
                    parkCount.forEach(item => {
                        count += ~~item.count
                        maxCount += ~~item.maxCount
                        if (item.pmParkId === this.parkIds[0]) {
                            this.$set(this.p7, 'count', item.count)
                            this.$set(this.p7, 'maxCount', item.maxCount)
                        }
                        if (item.pmParkId === this.parkIds[1]) {
                            this.$set(this.p8, 'count', item.count)
                            this.$set(this.p8, 'maxCount', item.maxCount)
                        }
                        if (item.pmParkId === this.parkIds[2]) {
                            this.$set(this.p10, 'count', item.count)
                            this.$set(this.p10, 'maxCount', item.maxCount)
                        }
                        if (item.pmParkId === this.parkIds[3]) {
                            this.$set(this.p5, 'count', item.count)
                            this.$set(this.p5, 'maxCount', item.maxCount)
                        }
                    })
                    this.useRatio = Math.round((maxCount - count) * 100 / maxCount)
                    if (this.useRatio >= 100) {
                        this.useRatio = 98
                    }
                    this.$set(this.p1, 'count', this._randomCount(300))
                    this.$set(this.p4, 'count', this._randomCount(160))
                    this.$set(this.p6, 'count', this._randomCount(120))
                    this.$set(this.p9, 'count', this._randomCount(130))
                })
            },

            _randomCount(val = 0) {
                return Math.round((100 - this.useRatio) * val / 100 )
            },

            _getColor(val){
                val *= 1
                if (val < 60) return '#5FBFB4'
                if (val >= 60 && val <= 90) return '#FCC371'
                if (val > 90) return '#C80407'
            }
        },
        beforeRouteLeave(to, from, next){
            clearInterval(this.timer)
            next()
        }
    }
</script>
<style lang="less" scoped>
    @font-face {
        font-family: 'hanyilinxin';
        src: url('../../assets/font/hanyilinxin_sinmple.ttf');
    }

    .wrapper {
        background: url('./img/background01@2x.png') repeat-x;
        background-size: 100% 100%;
    }

    .car-port {
        background: url('./img/themap@2x.png') repeat-x;
        background-size: 100% auto;
        height: 260px;
        width: 98%;
        position: relative;
        margin-top: 40%;
        z-index: 10;

    span {
        font-size: 13px;
        /*font-family: 'hanyilinxin';*/
        font-weight: bold;
        text-shadow: 0px 1px 0px;
        position: absolute;
    }

    }
    .banner {
        width: 65%;
        margin: 0 auto;

    img {
        width: 100%;
    }

    }
    .qrcode {
        width: 110px;
        background: #fff;
        margin: 0 auto;
        margin-top: 15px;
        border-radius: 10px;
        border: 1px solid transparent;
        box-shadow: 1px 4px 7px #a2b3b0;

    img {
        width: 80px;
        padding: 15px 15px 5px;
    }

    p {
        text-align: center;
        font-size: 12px;
        margin-bottom: 5px;
        color: #5f5e5e;
        transform: scale(.9);
    }

    }
</style>
