<template>
   <div v-title="''">
        <h1>公众号授权成功</h1>
    </div>

</template>
<script type="text/ecmascript-6">
    import {util} from 'util'

    export default {
        data () {
            return {
                thirdName:''
            }

        },
        mounted: function () {
          this.thirdName=util.getUrlParam("thirdName")
            this.init();
        },
        methods: {
            init:function () {
                $.get(util.constants.wxControlUrl+'wechatOpenPlatform/getAuthTokenAndRefreshToken',{
                    authCode:util.getUrlParam('auth_code'),
                    openType:'serviceOne',
                    thirdName:this.thirdName
                }, function (data) {

                })
            }
        }

    }

</script>


<style lang="less" scoped>
    @import '../../assets/css/common.less';
    h1{
        text-align: center;
        box-shadow: 3px 3px 3px gray;
        font-size: 42px;
        padding:2em;
    }

</style>

