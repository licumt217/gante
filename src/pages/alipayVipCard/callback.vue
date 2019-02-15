<template>
    <div v-title="''">
        <section id="wrapper" class="wrapper">
            <span class="loading" v-show="showLoading">
                <img src="../../assets/images/alipayVipCard/vipCardLoading.gif" alt="">
                <br>
                <i class="loadingText">开卡中</i>
            </span>
            <span class="hasDone" v-show="!showLoading">
                <img src="../../assets/images/alipayVipCard/hasDone.png" alt="">
                <br>
                <i class="loadingText">开卡成功</i>
            </span>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import { tjdServices } from 'tjdServices'

    export default {
        data() {
            return {
                requestId:null,
                showLoading:true
            }

        },
        mounted: function() {
            this.requestId =  this.$route.query.request_id
            this.init();
        },
        methods: {

            openCard(){
              tjdServices.applyAlipayCard({
                requestId:this.requestId,
                token:sessionStorage.accessToken
              }).then((data) => {
                this.showLoading = false;
                location.href=data.returnUrl;
              });
            },

            init: function() {
              tjdServices.getLoginInfo().then(()=>{
                this.openCard();
              })
            }
        }
    }

</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';
    .loading,.hasDone{
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        overflow: hidden;
        img{
            width: 20px;
        }
        i{
            display: inline-block;
            color: #a6b8cc;
            font-size: 15px;
            letter-spacing: 1px;
            margin-top: 15px;
        }
    }
</style>
