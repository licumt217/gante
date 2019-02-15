<template>
    <div v-title="''">
        <section id="wrapper" class="wrapper">
            <div class="result" v-if="isSuccess">
                <img src="./images/success.png" alt="">
                <div>开通成功</div>
            </div>
            <div class="result" v-else>
                <img src="./images/fail.png" alt="">
                <div>开通失败</div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
//    import {onlyShowOnce} from '../../assets/js/onlyShowOnce'


    export default {
        data(){
            return {
                isSuccess:false,
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init: function () {
                sessionStorage.setItem('signResultShowed','1')
                let isSuccess = util.getUrlParam('isSuccess');
                if(!util.isEmpty(isSuccess) && isSuccess){
                    util.setTitle('开通成功')
                    this.isSuccess = true;
                }else {
                    util.setTitle('开通失败')
                    this.isSuccess = false;
                }
//                onlyShowOnce.init().then(()=>{
//                    let isSuccess = util.getUrlParam('isSuccess');
//                    if(!util.isEmpty(isSuccess) && isSuccess){
//                        util.setTitle('开通成功')
//                        this.isSuccess = true;
//                    }else {
//                        util.setTitle('开通失败')
//                        this.isSuccess = false;
//                    }
//                });
            },
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';

.result{
    margin-top: 45%;
    text-align: center;
    color: #999;
    font-size: 13px;
    letter-spacing: 1px;
    img{
        width: 28%;
        margin-bottom: 57px;
    }
}



</style>


