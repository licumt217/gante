<template>
    <div v-title="''">
        <div class="container">
            <h1>def</h1>
            <h1>def</h1>
            <h1>def</h1>
            <h1>def</h1>
            <h1 @click="go">baidu</h1>


        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    import {wxUtil} from '../../assets/js/wxUtil'
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
        mounted(){
//            this.doClose();

            document.addEventListener('back', function(e) {
                AlipayJSBridge.call('alert', {
                    title: '亲',
                    message: '你好',
                    button: '确定'
                }, function(e) {
                    alert(JSON.stringify(e));
                });


                AlipayJSBridge.call('popWindow', {
                    data: {
                        from: location.href,
                        info: Date.now()
                    }
                });
            });
            document.addEventListener('close', function(e) {
                AlipayJSBridge.call('alert', {
                    title: '亲2',
                    message: '你好',
                    button: '确定'
                }, function(e) {
                    alert(JSON.stringify(e));
                });


                AlipayJSBridge.call('popWindow', {
                    data: {
                        from: location.href,
                        info: Date.now()
                    }
                });
            });

        },
        methods: {
            doClose(){

            },
            go(){
//                this.$router.push({path: '/test/abc'})
                wxUtil.closeWindow();
            },
            init: function () {

            },
        }
    }
</script>


