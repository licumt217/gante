<template>
    <div class="wrapper" id="wrapper" v-title="'支付成功'">
        <div class="paySuccess">
            <p>
                <img src="./images/paySuccessIcon.png" alt="">
                <span>支付成功</span>
                <span>您将有15分钟时间离场，期间不产生任何费用。</span>
            </p>
            <!--<div class="tipInfo">-->
                <!--<span>-->
                    <!--<label>!</label>温馨提示:-->
                <!--</span>-->
                <!--<em>颐堤港停车场各出口为电子支付出口，请先支付后离场。如需发票，请提前到3号出口（酒仙桥路出口西）岗亭人工办理。</em>-->
            <!--</div>-->
            <input type="button" class="closeBtn" value="关闭" @click="close">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    import {wxUtil} from '../../assets/js/wxUtil'

    export default {
        data(){
            return {
            }
        },
        mounted(){

        },
        methods: {
            close(){
                wxUtil.closeWindow()
            }
        }
    }
</script>


<style lang="less" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: url(./images/paySuccessBj.png) no-repeat;
    background-size: 100% 100%;
    p {
        margin-top: 25%;
        text-align: center;
        img {
            width: 70px;
        }
        span{
            display: block;
            color: #c39f6b;
            font-size: 14px;
            margin-top: 15px;
        }

    }
    .closeBtn{
        border: none;
        outline: none;
        padding: 10px 0;
        font-size: 14px;
        background: #E2BA90;
        border-radius: 10px;
        width: 60%;
        margin: 25% 20% 0;
        text-align: center;
        color: #fff;
    }
    .tipInfo {
        padding: 10px 5%;
        font-size: 12px;
        color: #c39f6b;
        span {
            display: block;
            label {
                color: #fff;
                background: #c39f6b;
                width: 13px;
                height: 13px;
                display: inline-block;
                text-align: center;
                line-height: 14px;
                border-radius: 100%;
                font-size: 12px;
                float: left;
                margin-top: 1px;
                margin-right: 7px;
            }
        }
        em{
            display: block;
            padding-left: 20px;
        }
    }
}
</style>
