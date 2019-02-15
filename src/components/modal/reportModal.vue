<script>
export default {
    props: {
        type: {
            type: [Number, String],
            default:1
        },
        title: {
            type: String,
            default: ''
        },
        // 为true时无法通过点击遮罩层关闭modal
        force: {
            type: Boolean,
            default: true
        },
        // 自定义组件transition
        transition: {
            type: String,
            default: 'reportModal'
        },
        // 确认按钮text
        okText: {
            type: String,
            default: '我知道了'
        },
        // 取消按钮text
        cancelText: {
            type: String,
            default: '取消'
        },
        // 确认按钮className
        okClass: {
            type: String,
            default: 'btn blue'
        },
        // 取消按钮className
        cancelClass: {
            type: String,
            default: 'btn red btn-outline'
        },
        // 点击确定时关闭Modal
        // 默认为false，由父组件控制prop.show来关闭
        closeWhenOK: {
            type: Boolean,
            default: true
        },
        oneBtn: {
            type: Boolean,
            default: false
        },
        isShowFooter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            duration: null,
            show: false
        };
    },
    computed: {
        modalClass() {
            return {
            }
        }
    },
    created() {

    },
    watch: {
        show(value) {

        }
    },
    methods: {
        ok() {
            this.$emit('ok');
            if (this.closeWhenOK) {
                this.show = false;
            }
        },
        cancel() {
            this.$emit('cancel');
            this.show = false;
        },
        // 点击遮罩层
        clickMask() {
            if (!this.force) {
                this.cancel();
            }
        },
        showModal() {
            this.show = true
        },
        hideModal() {
            this.show = false
        }
    }
};
</script>

<template>
    <transition name="slide-fade">
        <div v-show="show">
            <div class="reportModal" @click.self="clickMask" >
                <div class="reportModal-dialog" :class="modalClass">
                    <div class="reportModal-content">
                        <!--Header-->
                        <div class="reportModal-header">
                            <h4 class="reportModal-title">
                                <p>
                                    <img v-show="type==0" src="../../assets/images/parkingReport/modalAlert.png" alt="">
                                    <img v-show="type==1" src="../../assets/images/parkingReport/modalTip.png" alt="">
                                </p>
                            </h4>
                        </div>
                        <!--Container-->
                        <div class="reportModal-body">
                            <slot></slot>
                        </div>
                        <!--Footer-->
                        <div class="reportModal-footer" v-if="isShowFooter">
                            <slot name="footer">
                                <button v-if="!oneBtn" type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                                <button type="button" :class="okClass" @click="ok">{{okText}}</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reportModal-backdrop fade in"></div>
        </div>
    </transition>
</template>
<style src="../../assets/css/reportModal.css" scoped></style>

<style lang="less" scoped>
.reportModal {
    display: block;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .6s ease;
}

.slide-fade-enter-active .reportModal-dialog,
.slide-fade-leave-active .reportModal-dialog {
    transition: all .5s ease;
}

.slide-fade-enter .reportModal-dialog,
.slide-fade-leave-to .reportModal-dialog {
    opacity: 0;
    transform: translateY(-30%);
}

.slide-fade-enter .reportModal-backdrop,
.slide-fade-leave-to .reportModal-backdrop {
    opacity: 0;
}
</style>
