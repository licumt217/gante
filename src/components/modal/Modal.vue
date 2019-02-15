<template>
    <div class="tjd-dialog-wrapper">
        <div class="tjd-dialog-contianer">
            <transition name="scale-fade">
                <div class="tjd-dialog-window" v-show="isShowModal">
                    <p class="tjd-dialog-title">{{title}}</p>

                    <div v-show="type==0" class="tjd-dialog-header fail"></div>
                    <div v-show="type==1" class="tjd-dialog-header ok"></div>
                    <div v-show="type==2" class="tjd-dialog-header confirm"></div>
                    <div v-show="type==3" class="tjd-dialog-header alert"></div>

                    <div class="tjd-dialog-content">
                        <p class="modal_info_top">{{modalErrorMsg}}</p>
                    </div>

                    <div v-if="noButton===0" class="tjd-dialog-footer">
                        <button class="tjd_cancel" v-show="withTwoButtons===1" @click="realCancel">
                            {{cancelButtonMessage}}
                        </button>
                        <button class="tjd_confirm" @click="realConfirm" :class="{'only':withTwoButtons===0}">
                            {{confirmButtonMessage}}
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>


<script>
    import store from '../../store'

    export default {
        data() {
            return {
                defaultModalType:0,
                defaultErrorMsg: '网络繁忙请稍等',
            }
        },
        props: {
            type: {
                type:[Number, String],
                default: 0
            },
            withTwoButtons: {
                type: Number,
                default: 0
            },
            callBack: {
                type: Function,
                default: null
            },
            callBackForCancel: {
                type: Function,
                default: null
            },
            autoCloseCallBack: {
                type: Function,
                default: null
            },
            autoCloseTime: {
                type: Number,
                default: 2200
            },
            noButton: {
                type: Number,
                default: 0
            },
            noCloseAuto: {
                type: Boolean,
                default: false
            },
            confirmButtonMessage: {
                type: String,
                default: '确定'
            },
            cancelButtonMessage: {
                type: String,
                default: '取消'
            },
            title: {
                type: String,
                default: ''
            },
            errorMsg: {
                type: String,
                default: ''
            }
        },
        watch: {
            isShowModal: function () {
                if (this.isShowModal) {
                    /**
                     * 没有按钮的弹窗在指定时间后自动关闭
                     */
                    if (this.noButton && !this.noCloseAuto) {
                        setTimeout(() => {
                            this.close()
                            this.autoCloseCallBack && this.autoCloseCallBack()
                        }, this.autoCloseTime)
                    }

                    //如果参数中有具体的参数信息，则更新store中对应的值
                    if (this.errorMsg) {
                        store.commit('modalErrorMsg', this.errorMsg)
                    }
                    //没有手工设置的值的话就使用默认值
                    if (!store.getters.modalErrorMsg) {
                        store.commit('modalErrorMsg', this.defaultErrorMsg)
                    }
                    //如果参数中有具体的参数信息，则更新store中对应的值
                    if (this.type) {
                        store.commit('modalType', this.type)
                    }
                    //没有手工设置的值的话就使用默认值
                    if (!store.getters.modalType) {
                        store.commit('modalType', this.defaultModalType)
                    }

                }

            }
        },
        computed: {
            isShowModal(){
                return this.$store.getters.isShowModal
            },
            modalErrorMsg(){
                return this.$store.getters.modalErrorMsg
            },
            modalType(){
                return this.$store.getters.modalType
            },
        },
        methods: {
            realCancel(){
                this.close()
                this.callBackForCancel && this.callBackForCancel()
            },
            realConfirm(){
                this.close()
                this.callBack && this.callBack()
            },
            close(){
                //充值错误信息
                store.commit('modalErrorMsg', '')
                store.commit('modalType', '')
                this.$parent.hideTjdModal()
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/reset.less';

    .tjd-dialog-contianer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: -webkit-flex;
        display: flex;
        display: -webkit-box;
        display: -moz-box;
        align-items: center;
        -webkit-box-align: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        z-index: 999;
    }

    .tjd-dialog-window {
        padding: 2em 0 0;
        background: #fff;
        position: relative;
        width: 78%;
        border-radius: 10px;
        overflow: hidden;
    }

    .tjd-dialog-title {
        position: absolute;
        top: 1.2em;
        width: 100%;
        font-size: 17px;
        text-align: center;
        color: #666;
        height: 22px;
        line-height: 22px;
        letter-spacing: 1px;
    }

    .tjd-dialog-header {
        width: 100%;
        height: 15vw;
        margin: 0 auto;
        background: url("../../assets/images/dialog/fail.png") no-repeat 0 0;
        background-size: auto 17%;
        background-position: 50% 50%;
    }

    .tjd-dialog-header.ok {
        background: url("../../assets/images/dialog/success.png") no-repeat 0 0;
        background-size: auto 80%;
        background-position: 50% 50%;
    }

    .tjd-dialog-header.fail {
        background: url("../../assets/images/dialog/fail.png") no-repeat 0 0;
        background-size: auto 80%;
        background-position: 50% 50%;
    }

    .tjd-dialog-header.confirm {
        background: url("../../assets/images/dialog/confirm.png") no-repeat 0 0;
        background-size: auto 80%;
        background-position: 50% 50%;
    }

    .tjd-dialog-header.alert {
        background: url("../../assets/images/dialog/alert.png") no-repeat 0 0;
        background-size: auto 80%;
        background-position: 50% 50%;
    }

    .tjd-dialog-content {
        padding: 1.2em 2.5em 3em;
        line-height: 140%;
        text-align: center;
        font-size: 14px;
        color: #171e2f;
    }

    .tjd-dialog-footer {
        width: 100%;
        margin-top: -1em;
        text-align: center;
        display: -webkit-flex;
        display: -webkit-box;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        -webkit-box-orient:horizontal;
        -webkit-box-lines:single;
        -webkit-box-align: center;
        -webkit-align-items: center;
    }

    .tjd-dialog-footer button {
        -webkit-appearance: normal;
        width: 100%;
        padding: 4% 0;
        overflow: hidden;
        outline: none;
        background-color: #fff;
        border: none;
        font-size: 15px;
        color: #a5b0bc;
        border-top: 1px solid rgba(23, 30, 47, 0.1);
        border-right: 1px solid rgba(23, 30, 47, 0.1);
    }
    .tjd-dialog-footer button:active{
        color: #15bef0;
    }
    .tjd-dialog-footer button:last-child{
        border-right: none;
    }
    .tjd-dialog-footer button.only {
        color: #a5b0bc;
    }
    .tjd-dialog-footer button.only:active {
        color: #15bef0;
    }

    .scale-fade-enter-active {
        transition: opacity .4s ease;
        animation: bounce-in .4s;
    }
    .scale-fade-leave-active {
        transition: opacity .2s ease-out;
        animation: bounce-in .2s reverse;
    }
    .scale-fade-enter{
        opacity: 0.8;
    }
    .scale-fade-leave-to{
        opacity: 0;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0.5);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }


    @media screen and (max-width: 320px) {
        .tjd-dialog-window[data-v-29bccdc6] {
            padding: 1.4em 0 0;
        }
        .tjd-dialog-content {
            padding: 1em 1.5em 2em;
        }
        .tjd-dialog-footer {
            margin-top: -0.5em;
        }

    }

    @media screen and (min-width: 1000px){
        .tjd-dialog-window{
            width: 40%;
        }
        .tjd-dialog-header {
            height: 10vw;
        }
    }


</style>
