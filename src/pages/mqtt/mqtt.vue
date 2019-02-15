<template>
    <div v-title="'隐私政策2222222'">
        clientId:<input type="text" v-model="clientId">
        <input type="button" value="连接" @click="connect">
        <span v-text="content"></span>

        <mqtt @msgArrived="doMsg" @exceptArrived="doExcept" ref="mqtt" :clientId="clientId" topic="tcauth/group/tcauth_client_chaobei/outPark"></mqtt>
    </div>
</template>

<script type="text/ecmascript-6">
  import {util} from 'util'
  export default{
    data(){
      return {
            clientId:'',
        content:''
      }
    },
    mounted: function () {
    },
    methods:{
      connect:function () {
        this.$refs.mqtt.init()
      },
      doMsg:function (message) {

        this.content=this.content+message.payloadString;
      },
      doExcept:function (message) {

        this.content=this.content+message;
      }
    }
  }

</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';
#wrapper p,#wrapper h2{
    padding: 0 3%;
    line-height: 28px;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.5px;
}
#wrapper p{
    color: #787878;
};
#wrapper h2{
   font-weight: normal;
}
#wrapper h1 {
    line-height: 50px;
    text-align: center;
    font-weight: normal;
    letter-spacing: 0.5px;
}
</style>

