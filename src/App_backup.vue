<template>
    <div class="outerContainer">
        <tjd-modal></tjd-modal>
        <notice
                :isShowAllNotice="isShowAllNotice"
                :isShowSingleNotice="isShowSingleNotice"
                :allMsg="allNoticeObj.allMsg"
                :singleMsg="singleNoticeObj.singleMsg" ></notice>

        <router-view class="view"></router-view>
    </div>

</template>
<script type="text/ecmascript-6">
    import {util} from 'util'
    import tjdModal from './components/modal/tjdModal.vue'
    import Notice from './components/modal/Notice.vue'

    export default{
        components:{
            tjdModal,
            Notice
        },
        data(){
            return {
                isShowAllNotice:false,
                isShowSingleNotice:false,
                allNoticeObj:{
                    msg:"",
                    endDateTime:'',
                },
                singleNoticeObj:{
                    msg:"",
                    endDateTime:'',
                },
                //mqtt相关
                mqtt:null,
                host:util.constants.mqttHost,
                port:util.constants.mqttPort,
                accessKey:util.constants.mqttAccessKey,
                password:util.constants.mqttPassword,
                groupId:util.constants.mqttGroupId,
                clientId:'',
                topic_all:util.constants.topic_all,//需要操作的Topic
                topic_single:util.constants.topic_single,//需要操作的Topic
                reconnectTime:1,
                top:'',
                keyOfParkId:util.constants.keyOfParkId,
                keyOfClientId:util.constants.keyOfClientId,
                mqttMsgObj:{
                    messageJsonId:'',
                    messageType:'',
                    content:'',
                    sendTime:"",
                    validTime:''
                }

            }
        },
        mounted: function () {
                this.initMqtt();
        },
        watch:{
            'mqttMsgObj.messageJsonId':function (val,oldVal) {
                if(this.mqttMsgObj.messageType==='online'){
                    this.showNotice();
                    this.handleValidTime();//处理过期后取消消息提示
                }else if(this.mqttMsgObj.messageType==='offline'){
                    this.hideNotice();
                }
            }
        },
        methods:{
            initMqtt:function () {
                //首先查询是否有进行中的消息

                util.setSession(this.keyOfParkId,'022bd98a1181463c80826b71a48b558f')
                util.setSession(this.keyOfClientId,'xxxxxxxxxxxx')
                let parkId=util.getSession(this.keyOfParkId)
                let clientId=util.getSession(this.keyOfClientId);

                if(parkId){
                    this.clientId=this.groupId+'@@@'+clientId
                    this.topic_single=this.topic_single+parkId
                    this.initConnect();
                }else{
                    setTimeout(()=>{
                        this.initMqtt();
                    },1000)
                }
            },
            initConnect:function () {
                this.mqtt = new Paho.MQTT.Client(
                    this.host,//MQTT域名
                    this.port,//WebSocket端口，如果使用HTTPS加密则配置为443,否则配置80
                    this.clientId//客户端ClientId
                );
                let options = {
                    userName:this.accessKey,
                    password:this.password,
                    onSuccess: this.onConnect,
                    keepAliveInterval:10,
                    onFailure: (err)=>{
                        setTimeout(this.initConnect,this.reconnectTime);
                    }
                };
                this.mqtt.onConnectionLost = this.onConnectionLost;
                this.mqtt.onMessageArrived = this.onMessageArrived;
                this.mqtt.connect(options);
            },
            onConnect:function () {
                this.mqtt.subscribe(this.topic_all, {qos: 0});
                this.mqtt.subscribe(this.topic_single, {qos: 0});
            },
            onConnectionLost:function (err) {
                setTimeout(this.initConnect,this.reconnectTime);
            },
            onMessageArrived:function (message) {
                this.topic=message.destinationName;
                this.mqttMsgObj=JSON.parse(message.payloadString);
            },
            handleValidTime:function () {
                if(this.mqttMsgObj.validTime){
                    let clearTime=this.mqttMsgObj.validTime.trans14Datetime2Milli();
                    setInterval(()=>{
                        let data=new Date().getTime();
                        if(data>clearTime){
                            this.hideNotice();
                        }
                    },1000)
                }
            },
            isAllParks:function () {
                return this.topic.indexOf('allparks')!==-1;
            },
            /**
             * 显示mqtt通知
             * @param msg
             */
            showNotice(msg){
                if(this.isAllParks()){
                    this.isShowAllNotice=true;
                    this.allNoticeObj={
                        allMsg:this.mqttMsgObj.content,
                    }
                    util.setSession('mqttAllMsgObj',JSON.stringify(this.mqttMsgObj))
                }else{
                    this.isShowSingleNotice=true;
                    this.singleNoticeObj={
                        singleMsg:this.mqttMsgObj.content,
                    }
                    util.setSession('mqttSingleMsgObj',JSON.stringify(this.mqttMsgObj))
                }
            },
            /**
             * 隐藏mqtt通知
             * @param msg
             */
            hideNotice(msg){
                if(this.isAllParks()){
                    this.isShowAllNotice=false;
                    util.removeSession('mqttAllMsgObj')
                }else{
                    this.isShowSingleNotice=false;
                    util.removeSession('mqttSingleMsgObj')
                }
            },
        }
    }

</script>
<style lang="less">
    @import 'assets/css/common.less';
</style>