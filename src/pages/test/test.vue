<template>
    <div v-title="''">
        <!--<div class="container">-->
            <!--<div>{{data1|datetime('YMDHMS')}}</div>-->
            <!--<div>{{data1|datetime('YMD')}}</div>-->
            <!--<div>{{data1|datetime('HMS')}}</div>-->
            <!--<div>{{data1|datetime('YMDHM')}}</div>-->
            <!--<div>{{data1|datetime }}</div>-->

            <!--<div>{{data2|datetime('YMDHMS')}}</div>-->
            <!--<div>{{data2|datetime('YMD')}}</div>-->
            <!--<div>{{data2|datetime('HMS')}}</div>-->
            <!--<div>{{data2|datetime('YMDHM')}}</div>-->
            <!--<div>{{data2|datetime }}</div>-->

            <!--<div>{{data3|datetime('YMDHMS')}}</div>-->
            <!--<div>{{data3|datetime('YMD')}}</div>-->
            <!--<div>{{data3|datetime('HMS')}}</div>-->
            <!--<div>{{data3|datetime('YMDHM')}}</div>-->
            <!--<div>{{data3|datetime }}</div>-->

        <!--</div>-->
        <!--<radial-progress-bar :diameter="200"-->
                             <!--:completed-steps="completedSteps"-->
                             <!--:total-steps="totalSteps">-->
            <!--<p>Total steps: {{ totalSteps }}</p>-->
            <!--<p>Completed steps: {{ completedSteps }}</p>-->
        <!--</radial-progress-bar>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    // import RadialProgressBar from 'vue-radial-progress'

    export default {
        data(){
            return {
                data1:'20171111121212',
                data2:'1510373532000',
                data3:'1510373532',
                completedSteps: 0,
                totalSteps: 10
            }
        },
        components: {
            // RadialProgressBar
        },
        mounted(){

            setTimeout(()=>{
                AlipayJSBridge.call("tradePay", {
                    tradeNO: "201802282100100427058809844", // 必传，此使用方式下该字段必传
                    bizType:"trade",                          // 非必传，默认为 “trade”
                    bizSubType:"",                          // 非必传，默认为 “”
                    bizContext:""                           // 非必传，默认为H5启动选项(safePayContext)
                }, function(result) {
                    alert(1)
                    alert(JSON.stringify(result))
                });


            },1000)


            AlipayJSBridge.call('alert', {
                title: '亲',
                message: '你好',
                button: '确定'
            }, function(e){
                alert('回调结果：' + JSON.stringify(e))
            });


            setTjdTimeout(()=>{
                AlipayJSBridge.call('confirm', {
                    title: '亲',
                    message: '确定要退出吗？',
                    okButton: '是',
                    cancelButton: '否'
                }, function(e){
                    alert('回调结果：' + JSON.stringify(e))
                });
            },5000)


            setInterval(()=>{
                if(this.completedSteps<10){
                    this.completedSteps++;

                }
            },200)


        },
        methods: {
            init: function () {

            },
        }
    }
</script>


