<template>
     <div v-title="'停简单'">

        <section>
            <div class="content">
                <p>
                    <a href="javascript:;" @click="go2Auth()">test auth</a>
                    <input type="text" v-model="openId"/>
                </p>
            </div>

        </section>
    </div>

</template>
<script type="text/ecmascript-6">
    import {util} from 'util'

    export default {
        data () {
            return {
                openId:''
            }

        },
        methods: {
            go2Auth:function () {
                console.log(location.href)
                let code=util.getUrlParam("code");
                $.get(util.constants.wxControlUrl+'wechatOpenPlatform/getAccessToken',{
                    code:code,
                    openType:'serviceOne',
                    thirdName:'shoujingmaoappoint'
                }, function (data) {
                    alert(JSON.stringify(data))
                })
                alert(location.href)
            }
        }

    }

</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';
    .content{
        text-align: center;
        padding: 2em;
        color: gray;
    }
    a{
        box-shadow: 4px 4px 4px gray;
        font-size: 36px;
    }

</style>

