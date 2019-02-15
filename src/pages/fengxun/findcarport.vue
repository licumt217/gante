<template>
    <div v-title="'查询车辆'">

        <section id="wrapper" class="wrapper" v-show="isShow">
            <div id="content">
                <p class="logo">
                    <img :src="logoSrc" alt=""/>
                </p>

                <div class="tabBox">
                    <div class="tabContent">
                        <div class="gasolineCar">
                            <div class="carNumber">
                                <p>请输入您的车牌号</p>
                                <tjdKbdCommonReal4 ref="tjdkbd"></tjdKbdCommonReal4>
                            </div>
                            <input type="button" value="确定" class="next" @click="next()"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'

    export default {
        data() {

            return {
                minCarNumLength: 7, //最少输入车牌号位数
                parkId: util.getUrlParam("parkId"),
                isShow: false
            }
        },
        mounted: function () {
            if(this.parkId){
                this.initial()
            }else{
                this.$parent.showTjdModal({
                    errorMsg: '请先配置停车场ID！',
                    type: 2
                })
            }

        },
        computed: {
            logoSrc: function () {
                return require('../../assets/images/fengxun/logo4.png');
            }
        },
        methods: {

            next: function () {
                //首先验证
                if (
                    (this.$refs.tjdkbd.isCarNumNotFull() ||
                    this.$refs.tjdkbd.isCarNumEmpty())
                ) {
                    this.$parent.showTjdModal({
                        errorMsg: '请输入完整的车牌号！',
                        type: 2
                    })
                } else {
                    this.confirmQuery();
                }
            },
            confirmQuery: function () {
                this.queryOrderByCarNum(this.$refs.tjdkbd.getTjdKbdCarnum())
            },
            /**
             * 根据车牌号查询车位内是否有此车
             */
            queryOrderByCarNum: function (carNum) {
                if (carNum.length < this.minCarNumLength) {
                    this.$parent.showTjdModal({
                        errorMsg: '请输入完整的车牌号!',
                        type: 2
                    })
                } else {

                    tjdServices
                        .request({
                            method: 'findCar',
                            carNum: carNum,
                            parkId: this.parkId,
                        })
                        .then(data => {
                            if (data.searchUrl) {
                                location.href = data.searchUrl
                            }else{
                                this.$parent.showTjdModal({
                                    errorMsg: '未找到车辆！'
                                })
                            }

                        })
                }
            },

            queryDefaultProvince: function () {
                if (!util.isEmpty(this.parkId)) {
                    tjdServices
                        .request({
                            method: 'queryDefaultProvince',
                            parkId: this.parkId
                        })
                        .then(function (data) {
                            if (data.provinceShort) {
                                $('.tjd_carnum_first').val(data.provinceShort)
                            }
                        })
                }
            },
            initial: function () {
                if (util.isWeixinBrowserOnly() || util.isAlipayBrowserOnly()) {
                    if (util.isWeixinBrowserOnly()) {
                        util.setPlatform(util.platforms.weixin)
                    } else {
                        util.setPlatform(util.platforms.alipay)
                    }

                    this.isShow = true;
                    this.queryDefaultProvince(this.parkId)
                    this.$refs.tjdkbd.showTjdKbd(1)
                } else {
                    this.$parent.showTjdModal({
                        errorMsg: '请在微信或支付宝中打开！'
                    })
                }


            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';
    @import '../../assets/css/keyboard.css';

    .logo {
        text-align: right;
        margin-right: 2em;
        margin-top: 2em;

    img {
        width: 6em;
        margin-bottom: 1.5rem;
    }

    }

    .title {
        text-align: center;
        margin-top: 1.5em;
        color: #fff;
        line-height: 2.5em;
    }

    .title span {
        display: block;
    }

    .title span:first-child {
        font-size: 25px;
        letter-spacing: 2px;
    }

    .title span:nth-child(2) {
        font-size: 20px;
        letter-spacing: 2px;
    }

    .middle {
        text-align: center;
    }

    .title img {
        width: 15em;
    }

    /*tab切换*/
    .tabBox {
        width: 93%;
        margin: 0.2em auto;
    }

    .carMenu {
        width: 40%;
        z-index: 1;
        height: 35px;
        line-height: 35px;
        border-radius: 30px;
        border: solid 1px #ededed;
        display: flex;
        padding: 5px 5px;
        margin: 0 0 12px 0;
    }

    .carMenu li {
        width: 70px;
        text-align: center;
        font-size: 13px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        letter-spacing: 1px;
    }

    .selected {
        border-radius: 25px 30px 30px 0;
        background: #15bef0;
    }

    .selected a {
        color: #fff;
    }

    .carNumber {
        padding: 20px 15px 10px 15px;
        background: #ffffff;
        border-radius: 10px;
        border: solid 1px #ededed;
        color: #999;
    }

    .next {
        outline: none;
        box-sizing: border-box;
        width: 100%;
        padding: 0.7em 0;
        border: 1px solid #7bdbf7;
        font-size: 15px;
        color: #16bdf1;
        border-radius: 30px;
        background: #fff;
        margin: 2em 0;
        text-align: center;
    }


</style>

