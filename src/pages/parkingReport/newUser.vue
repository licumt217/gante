<template>
    <div v-title="'停简单年度停车报表'">
        <section class="wrapBox">
            <div class="bgBox">
                <p class="title">
                    <img class="logo" src="../../assets/images/parkingReport/logo.png" alt="">
                    <img class="tjdtip" src="../../assets/images/parkingReport/newUserTip.png" alt="">
                </p>
                <div class="download">
                    <div class="downloadBox">
                        <button @click="download">下载客户端新用户领取30元停车礼包</button>
                    </div>
                    <p>
                        <img src="../../assets/images/parkingReport/easyTip.png" alt="" class="easyTip">
                        <img src="../../assets/images/parkingReport/pieNew.png" alt="" class="pie">
                        <img src="../../assets/images/parkingReport/bottomTip.png" alt="" class="bottomTip">
                    </p>
                </div>
                <div class="code">
                    <div id="qr_code">
                    </div>
                </div>
            </div>
            <reportModal ref="msgModal" :type="modalType" :oneBtn="true" @ok="okCallBack">
                <p>{{msg}}</p>
            </reportModal>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">

import { util } from 'util'
import { tjdServices } from 'tjdServices'
import { wxUtil } from '../../assets/js/wxUtil'
import { } from '../../assets/js/qrcode'

export default {
    data() {
        return {
            modalType: 1,//弹窗图片
            msg: '',//弹窗提示语
            okCallBack: () => { },
        }

    },
    mounted: function() {
        this.init();
    },
    methods: {
        init() {
            wxUtil.initWxJsAPI().then(() => {
                wxUtil.onShareFriends({
                    title: '停简单',
                    desc: '原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/newUser`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),
                });
                wxUtil.onShareFriendsZone({
                    title: '停简单：原来停车不简单-2018停车个人报告',
                    link: `${util.constants.tcapiWebUrl}parkingReport/newUser`,
                    imgUrl: util.constants.domainWithProtocol + require('../../assets/images/parkingReport/shareTjd.png'),

                })
            })
            this.renderQRCode();
        },
        renderQRCode() {
            let url;
            if (util.isAlipay() && util.isAndroidDevice()) {
                url = "https://m.pp.cn/detail.html?appid=6608514";
            } else {
                url = "https://a.app.qq.com/o/simple.jsp?pkgname=com.tingjiandan.client";
            }

            $('#qr_code').qrcode({
                render: 'image',
                size: 92,
                text: url
            })
        },
        download() {
            if (util.isAlipay() && util.isAndroidDevice()) {
                window.location.href = "https://m.pp.cn/detail.html?appid=6608514";
            } else {
                window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.tingjiandan.client";
            }
        }

    }
}
</script>

<style>
    html, body{
        overflow: auto;
        height: auto;
    }
</style>
<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapBox {
    .bgBox {
        width: 100%;
        background: url(../../assets/images/parkingReport/newUser.png) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .title {
            text-align: center;
            padding: 10% 0 5%;
            .logo {
                width: 75%;
            }
            .tjdtip {
                width: 80%;
            }
        }
        .download {
            .downloadBox{
                text-align: center;
                font-size: 15px;
                color: #fff;
                font-weight: 500;
                letter-spacing: 0.5px;
                width: 92%;
                height: 85px;
                padding-left: 10%;
                margin: -20px 0 10px;
                position: relative;
                background: url(../../assets/images/parkingReport/grayGenerateReportNew.png) no-repeat;
                background-size: 100% 100%;
            button {
                width: 87%;
                vertical-align: middle;
                display: table;
                background: none;
                padding: 14px 0 19.5px;
                color: #fff;
                position: absolute;
                bottom: 0;
                border: none;
                outline: none;
             }
            }
            p {
                text-align: center;
                .easyTip {
                    width: 60%;
                    float: right;
                    margin: 40px 5% 20px 0;
                }
                .pie {
                    width: 80%;
                    margin-bottom: 20px;
                }
                .bottomTip {
                    width: 50%;
                    margin-top: 50px;
                }
            }
        }
        .code {
            width: 114px;
            height: 130px;
            background: url(../../assets/images/parkingReport/codeBg.png) no-repeat;
            background-size: 100% 100%;
            margin: 20px auto 100px;
            text-align: center;
            #qr_code {
                width: 92px;
                display: inline-block;
                margin: 9px auto;
                border: solid 2px #2AD6DE;
                img {
                    width: 92px;
                }
            }
        }
        @media screen and (max-width: 320px) {
            .download button {
                font-size: 13px;
            }
        }
    }
}
</style>

