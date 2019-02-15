<template>
    <div v-title="''">
        <div class="container">
            <h1 @click="go">fsssssssssss</h1>

            <!--<img style="width:50px;height:50px;"-->
            <!--:src="require(`../../assets/images/common/about${util.constants.uniqueSign}.png`)">-->
            <!--<img style="width:50px;height:50px;" src="../../assets/images/common/about.png">-->


            <!--<input type="button" value="哈哈哈" @click="test"/>-->
            <!--<input type="button" value="中文" @click="changeLang('zh')"/>-->
            <!--<input type="button" value="英文" @click="changeLang('en')"/>-->
            <!--<p class="aaa">22:22:55</p>-->

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { util } from 'util';
    import { wxUtil } from '../../assets/js/wxUtil'


    //    import store from '../../store'
    //    import {TcapiUtil as util} from '../../assets/js/tjdlib'
    export default {
        data(){
            return {
                util: util
            }
        },

        mounted(){
            document.addEventListener('resume', function (e) {
                AlipayJSBridge.call('alert', {
                    title: 'resume',
                    message: '你好',
                    button: '确定'
                }, function(e) {
                    alert(JSON.stringify(e));
                });
            }, false);

        },
        methods: {

            go(){
alert(1)
                wxUtil.chooseInvoice().then(data=>{
                    this.$parent.showTjdModal({
                        errorMsg: JSON.stringify(data),
                        type: 2
                    })
                  alert(2)
                  console.log(data)
                })


//                setTimeout(data => {
//                    AlipayJSBridge.call('popWindow');
//                }, 3000)
//                location.href = util.getWxControlAlipayAuthUrl(util.constants.tcapiWebUrl + 'test/def');
            }
        }
    }
</script>

