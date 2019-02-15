<template>
    <div class="tjd-notice-wrapper">
        <div v-show="isShowAllNotice" class="allNoticeMsg">{{allMsg}}</div>
        <div v-show="isShowSingleNotice" class="singleNoticeMsg">{{singleMsg}}</div>
    </div>
</template>


<script>
    export default{
        props:{
            allMsg:{
                type:String,
                default:''
            },
            singleMsg:{
                type:String,
                default:''
            },
            endDateTime:{
                type:String,
                default:''
            },
            isShowAllNotice:{
                type:Boolean,
                default:false
            },
            isShowSingleNotice:{
                type:Boolean,
                default:false
            },

        },
        data(){
            return {
            }
        },
        mounted: function () {
            this.init();
        },
        methods:{
            init() {

            },

        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    .tjd-notice-wrapper{
        position: fixed;
        left:50%;
        top:50%;
        z-index: 100;
    }

</style>