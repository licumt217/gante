<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            small: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            //显示位置
            top:{
                type: Boolean,
                default: true
            },
            // 为true时无法通过点击遮罩层关闭modal
            force: {
                type: Boolean,
                default: false
            },
            // 自定义组件transition
            transition: {
                type: String,
                default: 'modal'
            },
            // 确认按钮text
            okText: {
                type: String,
                default: '确认'
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
        data () {
            return {
                duration: null,
                show:false
            };
        },
        computed: {
            modalClass () {
                return {
                    'modal-top': this.top,
                    'modal-lg': this.large,
                    'modal-sm': this.small,
                }
            }
        },
        created () {
            if (this.show) {
                document.body.className += ' modal-open';
            }
        },
        beforeDestroy () {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
        },
        watch: {
            show (value) {
                // 在显示时去掉body滚动条，防止出现双滚动条
                if (value) {
                    document.body.className += ' modal-open';
                }
                // 在modal动画结束后再加上body滚动条
                else {
                    if (!this.duration) {
                        this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                    }
                    window.setTimeout(() => {
                        document.body.className = document.body.className.replace(/\s?modal-open/, '');
                    }, this.duration || 0);
                }
            }
        },
        methods: {
            ok () {
                this.$emit('ok');
                if (this.closeWhenOK) {
                    this.show = false;
                }
            },
            cancel () {
                this.$emit('cancel');
                this.show = false;
            },
            // 点击遮罩层
            clickMask () {
                if (!this.force) {
                    this.cancel();
                }
            },
            showModal(){
                this.show = true
            },
            hideModal(){
                this.show = false
            }
        }
    };
</script>

<template>
    <transition name="slide-fade">
        <div v-show="show">
            <div class="modal fade" @click.self="clickMask" :class="show?'in':''">
                <div  class="modal-dialog" :class="modalClass">
                    <div class="modal-content">
                        <!--Header-->
                        <div class="modal-header" v-if="title">
                            <slot name="header">
                                <a type="button" class="close" @click="cancel">x</a>
                                <h4 class="modal-title">
                                    <slot name="title">
                                        {{title}}
                                    </slot>
                                </h4>
                            </slot>
                        </div>
                        <!--Container-->
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <!--Footer-->
                        <div class="modal-footer" v-if="isShowFooter">
                            <slot name="footer">
                                <button v-if="!oneBtn" type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                                <button type="button" :class="okClass" @click="ok">{{okText}}</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade in"></div>
        </div>
    </transition>
</template>

<style src="../../assets/css/ydgModal.css" scoped></style>
<style lang="less" scoped>
    /*@import "../../assets/css/reset.less";*/
    /*@import "../../assets/css/bootstrap.css";*/
    /*@import "../../assets/css/ydgModal.css";*/
    .modal {
        display: block;
    }
    .slide-fade-enter-active,.slide-fade-leave-active{
        transition: all .6s ease;
    }
    .slide-fade-enter-active .modal-dialog,.slide-fade-leave-active .modal-dialog{
        transition: all .5s ease;
    }
    .slide-fade-enter .modal-dialog, .slide-fade-leave-to .modal-dialog{
        opacity: 0;
        transform: translateY(-30%);
    }
    .slide-fade-enter .modal-backdrop, .slide-fade-leave-to .modal-backdrop{
        opacity: 0;
    }
</style>
