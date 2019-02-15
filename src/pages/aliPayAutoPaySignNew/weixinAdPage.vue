<template>
    <div v-title="'立享20元停车大礼包'">
        <section id="wrapper" class="wrapper">
            <div class="pic">
                <img src="./images/reproductionNew.png" alt="">
            </div>
            <div class="signBtnArea">
                <input type="button" class="sure" value="下载APP领取" @click="go2download()">
            </div>
            <div class="content">
                <h2><span>活动规则</span><img class="showMore" src="./images/jiantou.png" alt=""></h2>
                <p>1、活动期间，下载APP，可获得20元停车优惠券；</p>
                <p>2、享受优惠后，停车费最低支付金额为1元；</p>
                <p>3、用户参与流程：下载停简单APP→领20元停车优惠券；</p>
                <p>4、每个用户只能领取一次；</p>
                <p>5、活动最终解释权归停简单所有。咨询电话：<a :href="'tel:'+servicePhone">{{servicePhone | parseServicePhone}}</a></p>
            </div>
            <div class="subscribe">
                <img src="./images/downLoadApp.png" alt="">
                <p>下载APP领20元停车大礼包</p>
            </div>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'

    export default {
        data() {
            return {
                servicePhone:util.constants.servicePhone,
            }
        },
        mounted: function() {

        },
        methods: {
            go2download(){
                util.cnzzSend("下载APP领礼包按钮",'点击')
                location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.tingjiandan.client"
            }
        }
    }

</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';
    .wrapper {
        /*padding: 0 10%;*/
    }
    .pic{
        text-align: center;
        overflow: hidden;
        img{
            width: 100%;
        }
        img:nth-child(2){
            width: 78%;
            margin-top: 8%;
        }
    }
    .signBtnArea{
        margin-top: -13%;
        padding: 0 11%;
        text-align: center;
        .sure{
            outline: none;
            border: none;
            font-size: 17px;
            text-align: center;
            color: #fff;
            background: url("./images/button_normal.png") no-repeat;
            background-size: 100% 100%;
            width: 100%;
            padding: 12px 0;
            margin: 0.5em 0 2em;
            letter-spacing: 2px;
            font-weight: 500;
        }
        .sure:active{
            background: url("./images/button_press.png") no-repeat;
            background-size: 100% 100%;
        }
    }
    .content{
        margin: 0 0 32px;
        padding: 0 11%;
        color: #2a2a2a;
        letter-spacing: 1px;
        h2{
            font-size: 13px;
            text-align: center;
            font-weight: 500;
            position: relative;
            margin-bottom: 3em;
            .showMore{
                position: absolute;
                top: 27px;
                left: 50%;
                width: 8px;
                transform:translateX(-50%);
            }
        }
        p{
            margin-bottom: 1.3em;
            font-size: 12px;
            a{
                color: #2a2a2a;
            }
        }
        p:last-child{
            margin-bottom: 0;
        }
    }
    .subscribe{
        margin-bottom: 2em;
        text-align: center;
        img{
            width: 38%;
        }
        p{
            color: #6e81ff;
            font-weight: bold;
            margin-top: 1.5em;
            letter-spacing: 2px;
            font-size: 14px;
        }
    }



</style>
