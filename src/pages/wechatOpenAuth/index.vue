<template>
    <div v-title="'停简单授权'">

    </div>

</template>
<script type="text/ecmascript-6">
    import {util} from 'util'

    export default {
        data () {
            let component_appid='';
            if(location.href.indexOf("open.tingjiandan.com")!==-1){
                component_appid='wx79b20bdd5106c58c';
            }else{
                component_appid='wx93ca6d1cda0ee706';
            }

            return {
                thirdName:null,
                component_appid:component_appid,
                pre_auth_code:'',
                redirect_uri:util.constants.tcapiWebUrl+'wechatOpenAuth/authSuccess?thirdName='
            }

        },
        mounted: function() {
            let thirdName=util.getUrlParam("thirdName")
            if(thirdName){
                this.thirdName=thirdName;
                this.go2Auth();
            }else{
                alert("请配置thirdName")
            }

        },
        methods: {
            getUrl:function () {
                return "https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid="+
                    this.component_appid+"&pre_auth_code="+this.pre_auth_code+"&redirect_uri="+this.redirect_uri+this.thirdName;
            },
            go2Auth:function () {
                $.get(util.constants.wxControlUrl+'wechatOpenPlatform/getPreAuthCode',{
                    openType:'serviceOne'
                }, data=>{

                    this.pre_auth_code=data.result.preAuthCode;
                    location.href=this.getUrl();
                })
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

