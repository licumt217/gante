<template>
    <div v-title="'异常车场监控'">
        <div class="wrapper-content">
            <section class="abnormal-content">
                <p class="title">
                    <img src="../../assets/images/monitor/list_line_left.png">
                    <span>异常车场监控</span>
                    <img src="../../assets/images/monitor/list_line_right.png">
                </p>
                <p class="numberYard">
                    <em>共计</em>
                    <span>{{displayDataArray[0].all.length+displayDataArray[1].all.length+displayDataArray[2].all.length+displayDataArray[3].all.length}}</span>
                    <em>个车场</em>
                </p>
                <div class="abnormal-detail">
                    <div class="abnormal-type" v-for="row in displayDataArray">
                        <p class="abnormal-type-title"><img :src="row.imgUrl" alt="" style="width:16px;">{{row.text}}
                            <span>{{row.all.length}}</span>
                        </p>
                        <div class="abnormal-type-info">
                            <p>
                                <template v-for="item in row.top">
                                    <span :class="{'special':item.isImportant=='0'}">{{item.parkName}}</span>
                                </template>
                            </p>
                            <p>
                                <template v-for="item in row.bottom">
                                    <span :class="{'special':item.isImportant=='0'}">{{item.parkName}}</span>
                                </template>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {util} from 'util';

    export default {
        data(){
            return {
                heartBeats:{
                    all:[],
                    top:[],
                    bottom:[],
                    text:'心跳异常',
                    imgUrl:require('../../assets/images/monitor/icon_1.png')

                },
                serverList:{
                    all:[],
                    top:[],
                    bottom:[],
                    text:'服务器异常',
                    imgUrl:require('../../assets/images/monitor/icon_4.png')
                },
                longConnect:{
                    all:[],
                    top:[],
                    bottom:[],
                    text:'长连异常',
                    imgUrl:require('../../assets/images/monitor/icon_3.png')
                },
                orderList:{
                    all:[],
                    top:[],
                    bottom:[],
                    text:'订单异常',
                    imgUrl:require('../../assets/images/monitor/icon_2.png')
                },
                displayDataArray:[],
                loopTime:120000,
            }
        },
        mounted(){
            this.init();


        },
        methods: {
            fetchData:function () {
                this.http.post('parkmonitor/exceptParkMonitor').then((data)=>{
                    this.heartBeats.all=data.heartBeats;
                    this.serverList.all=data.serverList;
                    this.longConnect.all=data.longConnect;
                    this.orderList.all=data.orderList;
                    this.handle();
                }).catch((data)=>{
                });
            },
            handle:function () {
                this.splitData([this.heartBeats,this.serverList,this.longConnect,this.orderList])
                this.displayDataArray=[]
                this.displayDataArray.push(this.heartBeats,this.orderList,this.longConnect,this.serverList)
            },
            //每行的总数据拆分为两行
            splitData:function (array) {

                array.forEach((obj)=>{
                    obj.top=[];
                    obj.bottom=[];
                    let topLen=0,bottomLen=0,spaceLen=2;
                    obj.all.forEach((item)=>{
                        if(topLen<=bottomLen){
                            obj.top.push(item)
                            topLen+=(item.parkName.length+spaceLen)
                        }else{
                            obj.bottom.push(item)
                            bottomLen+=(item.parkName.length+spaceLen)
                        }
                    })
                })


            },
            init: function () {
                this.fetchData();
                setInterval(()=>{
                    this.fetchData();
                },this.loopTime)


            },
        }
    }
</script>
<style lang="less" scoped>
@import '../../assets/css/common.less';
.wrapper-content {
    background: #161C27;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: auto;
}

.abnormal-content {
    width: 98%;
    margin: 0 auto;
    .title {
        text-align: center;
        height: 138px;
        line-height: 138px;
        color: #D9EEFF;
        font-size: 26px;
        letter-spacing: 0.5px;
        font-family: "微软雅黑 Light";
        span {
            padding: 0 50px;
        }
        img {
            vertical-align: middle;
            width:200px;
        }
    }
    .numberYard {
        height: 60px;
        background: #383F52;
        line-height: 60px;
        border-radius: 4px;
        padding-left: 50px;
        margin-bottom: 10px;
        em {
            color: #96a1aa;
            font-size: 18px;
        }
        span {
            color: #00a8ff;
            font-size: 20px;
            padding: 0 8px;
        }
    }
    .abnormal-detail {
        height: 850px;
        background: #292D38;
        border-radius: 4px;
        .abnormal-type-title {
            padding: 30px 0 15px 60px;
            color: #96a1aa;
            font-size: 15px;
            img {
                padding: 3px 10px 0 0;
            }
            span {
                padding-left: 5px;
            }
        }
        .abnormal-type-info {
            height: 140px;
            background: #383F52;
            border-radius: 4px;
            width: 98%;
            margin: 0 auto;
            overflow-x: auto;
            white-space: nowrap;
            p {
                width: 98%;
                margin: 0 1%;
                span {
                    padding: 10px 30px;
                    background: #fdb0a7;
                    border-radius: 4px;
                    border: solid 1px #ff705f;
                    margin: 20px 10px -10px 0;
                    display: inline-block;
                    color: #751a10;
                    font-size: 16px;
                    letter-spacing: 1px;
                }
            }
            .special {
                background: #FF705F;
            }
        }
    }
}


::-webkit-scrollbar {
    width: 20px;
    height: 20px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
}

::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
}

::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, .2) inset;
}

::-webkit-scrollbar-corner {
    background: transparent;
}
</style>

