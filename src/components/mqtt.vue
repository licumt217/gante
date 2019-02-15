<template>
    <div class="mqtt">

    </div>
</template>


<script>
  import {util} from 'util'
  import {Paho} from '../assets/js/mqttv3.1'
    export default{
        data(){
            return {
              reconnectTime:3000,
            }
        },
        props:{
            clientId:{
                type:String,
                default:''
            },
            topic:{
                type:String,
                default:''
            },
        },
        mounted: function () {
        },
        methods:{
          init:function () {
            if(this.clientId && this.topic){
              this.initConnect();
            }else{
              console.log("mqtt clientId or topic is empty!!! please check!!!")
              this.onExcept("mqtt clientId or topic is empty!!! please check!!!")
            }

          },
          initConnect:function () {
            this.mqtt = new Paho.MQTT.Client(
              util.constants.mqttHostname,//MQTT域名
              util.constants.mqttPort,//WebSocket端口，如果使用HTTPS加密则配置为443,否则配置80
              this.clientId//客户端ClientId
            );
            this.mqtt.onConnectionLost = this.onConnectionLost;
            this.mqtt.onMessageArrived = this.onMessageArrived;

            let options = {
              userName:util.constants.mqttUsername,
              password:util.constants.mqttPassword,
              onSuccess: this.onConnect,
              onFailure: (err)=>{
                setTimeout(this.initConnect,this.reconnectTime);
              }
            };
            this.mqtt.connect(options);
          },
          /**
           * 连接上后马上订阅对应主题消息：
           * this.mqtt.subscribe(this.topic_single);
           * this.mqtt.subscribe(this.topic_single, {qos: 0});
           * @param
           */
          onConnect:function () {
            this.mqtt.subscribe(this.topic);
          },

          onConnectionLost:function (responseObject) {
            if (responseObject.errorCode !== 0) {
              this.onExcept("mqtt连接丢失:"+responseObject.errorMessage)
            }
            this.onExcept("mqtt 3s后重连。。。")
            setTimeout(this.initConnect,this.reconnectTime);
          },
          /**
           * 消息内容：message.payloadString
           * 消息对应主题：message.destinationName(topic)
           * @param message
           */
          onMessageArrived:function (message) {
            this.$emit('msgArrived',message)
          },
          onExcept:function (msg) {
            this.$emit('exceptArrived',msg)
          }

        }
    }
</script>

