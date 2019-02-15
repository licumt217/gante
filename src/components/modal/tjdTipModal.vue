<template>
    <div class="tjd-tip-wrapper">
        <div class="tjd-tip-contianer" >
            <transition name="scale-fade">
                <div class="tjd-tip-window" v-show="isShowTipModal">
                    <p class="tjd-tip-title"></p>
                    <div class="tjd-protocal-content" v-if="isProtocalTipModal">
                        <p>感谢您信任并使用停简单！</p>
                        <p>我们依据最新法律法规及监管政策要求，更新了<span @click="go2Protocal">《停简单用户服务协议》</span>特此向您推送本提示。</p>
                        <p>请您务必审慎阅读，并充分理解协议条款内容后使用停简单产品和服务，点击同意代表您已阅读并同意<span @click="go2Protocal">《停简单用户服务协议》</span>如果您不同意，将可能影响使用停简单产品和服务。</p>
                        <p>停简单重视用户隐私，我们将严格保护您的个人信息，确保个人安全。</p>
                    </div>
                    <div class="tjd-tip-content" v-else>
                        <p class="tip_info_top"></p>
                    </div>
                    <div class="tjd-tip-footer">
                        <button class="tjd_tip_cancelBtn"></button>
                        <button class="tjd_tip_confirmBtn"></button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>


<script>
    import { util } from '../../assets/js/tjdUtils'


    export default {
        data() {
            return {
                isShowTipModal:false,
                isProtocalTipModal:false
            }
        },
        mounted: function() {
            this.init();
        },
        methods: {
            init() {
                var _this = this;
                var tjdModalEntity = {
                    defaultErrorMsg: "网络繁忙请稍等",
                    oneButtonMessage: "确定",//底部只有一个按钮时，按钮的默认文字
                    cancelButtonMessage: "取消",//取消按钮的默认文字
                    autoCloseTime: 2200,//弹出窗多久后自动关闭
                    modalWidth: '80%',//模态窗默认宽度
                    messageTopClass: ".tip_info_top",
                    tjd_tip_class: '.tjd-tip-wrapper',
                    titleClass:'.tjd-tip-title',
                    one_button_class: 'only',
                    footerClass: '.tjd-tip-footer',
                    noButton:false,
                    isProtocalTipModal:false

                };
                var tjd_tip_footer = ".tjd-tip-footer";
                var tip_confirm_btn = ".tjd_tip_confirmBtn";
                var tip_cancel_btn = ".tjd_tip_cancelBtn";
                /**
                 * 提示弹出窗，失败、成功、警告
                 *  errorMsg:可以自定义第一行的提示信息,
                 type:0,//0是错误信息，1是成功信息，2是警告信息。对应不同的提示图标
                 withTwoButtons:0,//是否带有关闭和确定两个按钮
                 buttonColor:"#4EA8B1",按钮的颜色
                 bodyColor:"#FFF",弹出窗主体的颜色
                 withMessageBottom:0,是否显示第二行的提示信息
                 withOneButton:1,是否只显示一个确定按钮，0否，1是。默认1
                 oneButtonMessage:oneButtonMessage,只显示一个按钮时此按钮上的信息
                 width:""弹出窗的宽度，可以百分比或em或px
                 */
                $.extend({
                    showTipModal: function(options) {

                        function showTwoButtons() {
                            $(tjd_tip_footer).show();
                            $(tip_cancel_btn).show().text(opts.cancelButtonMessage);
                            $(tip_confirm_btn).show().text(opts.oneButtonMessage);
                        }
                        function showConfirmBtnOnly() {
                            $(tjd_tip_footer).show();
                            $(tip_cancel_btn).hide();
                            $(tip_confirm_btn).show()
                                .text(opts.oneButtonMessage)
                                .addClass(tjdModalEntity.one_button_class);
                        }
                        function showNoButtons() {
                            $(tjd_tip_footer).hide();
                        }
                        function showButtons(opts) {
                            if (opts.withTwoButtons) {//带确定和取消按钮
                                showTwoButtons();
                            } else if (opts.noButton == 1) {//没有按钮，2.2秒后自动关闭
                                setTimeout(function() {
                                    $.hideTjdTipModal();
                                }, opts.autoCloseTime || tjdModalEntity.autoCloseTime);
                            } else {//默认只有一个确定按钮
                                showConfirmBtnOnly();
                                $(tip_cancel_btn).hide();
                                $(tip_confirm_btn).text(opts.oneButtonMessage);
                            }
                        }
                        function reset() {
                            showNoButtons();
                            $(tjdModalEntity.messageTopClass).text("");
                            $(tjdModalEntity.titleClass).text("");
                            $(tip_confirm_btn).removeClass(tjdModalEntity.one_button_class);
                            $(tip_cancel_btn).text(tjdModalEntity.cancelButtonMessage);
                            $(tip_confirm_btn).unbind('touchend');
                            $(tip_cancel_btn).unbind('touchend');

                        }
                        function showModalDom() {
                            $(tjdModalEntity.tjd_tip_class).css("visibility", "hidden").show();
                            _this.isShowTipModal = true;
                            setTimeout(function() {
                                $(tjdModalEntity.tjd_tip_class).css("visibility", "visible")
                                _this.isShowTipModal = true;
                            }, 10)
                        }
                        function bindTjdModalEvent(opts) {
                            if (opts.callBack) {
                                if (opts.withTwoButtons == "1") {
                                    $(tip_confirm_btn).bind('touchend', function(e) {
                                        e.preventDefault();
                                        e.stopPropagation();
//                                    $.hideTjdTipModal();
                                        setTimeout(function() {
                                            if (opts.scope) {
                                                opts.scope[opts.callBack]();
                                            } else {
                                                try {
                                                    eval(opts.callBack + "()");
                                                } catch (e) {
                                                    opts.callBack();
                                                }

                                            }
                                        });
                                    }).bind('touchstart', function() {
                                        //$(this).css('background','#E3E3E3');
                                    });
                                    if (sessionStorage.isTest) {
                                        $(tip_confirm_btn).bind('click', function() {
                                            $(this).trigger('touchend')
                                        });
                                    }
                                    if (opts.callBackForCancel) {
                                        $(tip_cancel_btn).bind('touchend', function(e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $.hideTjdTipModal();
                                            setTimeout(function() {
                                                if (opts.scope) {
                                                    opts.scope[opts.callBackForCancel]();
                                                } else if (typeof opts.callBackForCancel == 'function') {
                                                    opts.callBackForCancel();
                                                } else {
                                                    try {
                                                        eval(opts.callBackForCancel + "()");
                                                    } catch (e) {
                                                        opts.callBackForCancel();
                                                    }
                                                }
                                            });
                                        });
                                        if (sessionStorage.isTest) {
                                            $(tip_cancel_btn).bind('click', function() {
                                                $(this).trigger('touchend')
                                            });
                                        }
                                    } else {
                                        //如果有取消按钮，则绑定关闭弹出窗事件n
                                        $(tip_cancel_btn).bind('touchend', function(e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $.hideTjdTipModal();
                                        });
                                        if (sessionStorage.isTest) {
                                            $(tip_cancel_btn).bind('click', function() {
                                                $(this).trigger('touchend')
                                            });
                                        }
                                    }


                                } else {
                                    $(tip_confirm_btn).bind('touchend', function(e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        $.hideTjdTipModal();
                                        setTimeout(function() {
                                            if (opts.scope) {
                                                opts.scope[opts.callBack]();
                                            } else {
                                                try {
                                                    eval(opts.callBack + "()");
                                                } catch (e) {
                                                    opts.callBack();
                                                }
                                            }
                                        });
                                    });
                                    if (sessionStorage.isTest) {
                                        $(tip_confirm_btn).bind('click', function() {
                                            $(this).trigger('touchend')
                                        });
                                    }
                                }
                            }else if(opts.autoCloseCallBack && opts.noButton == 1){
                                setTimeout(function() {
                                    if (opts.scope) {
                                        opts.scope[opts.autoCloseCallBack]();
                                    } else {
                                        try {
                                            eval(opts.autoCloseCallBack + "()");
                                        } catch (e) {
                                            opts.autoCloseCallBack();
                                        }

                                    }
//                                $.hideTjdTipModal();
                                }, opts.autoCloseTime || tjdModalEntity.autoCloseTime);
                            } else {
                                //如果有取消按钮，则绑定关闭弹出窗事件n
                                $(tip_confirm_btn).bind('touchend', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $.hideTjdTipModal();
                                });
                                if (sessionStorage.isTest) {
                                    $(tip_confirm_btn).bind('click', function() {
                                        $(this).trigger('touchend')
                                    });
                                }
                            }


                        }

                        function showModalMessages(opts) {
                            $(tjdModalEntity.titleClass).html(opts.titleText);
                            if(opts.isProtocalTipModal){
                                _this.isProtocalTipModal = true
                            }else {
                                _this.isProtocalTipModal = false
                                $(tjdModalEntity.messageTopClass).html(opts.errorMsg);
                            }

                        }
                        var defaults = {
                            errorMsg: tjdModalEntity.defaultErrorMsg,
                            withTwoButtons: 0,//是否带有关闭按钮
                            withOneButton: 1,//是否只有一个按钮，默认是。0不是，1是
                            oneButtonMessage: tjdModalEntity.oneButtonMessage,//只有一个按钮时，按钮的文字
                            width: tjdModalEntity.modalWidth,
                            noButton: 0,//是否不显示按钮，1不显示按钮,
                            callBack: '',
                            callBackForCancel: '',//有取消和确定按钮时给取消按钮添加回调函数
                            autoCloseCallBack:'',//没有取消和确定按钮时自动关闭弹窗的回调函数
                            scope: '',
                            isProtocalTipModal:false,//如果是停简单协议就显示内容不一样
                        };
                        reset();
                        var opts = $.extend(defaults, options);
                        showModalMessages(opts);
                        showButtons(opts);
                        $(tip_cancel_btn).bind('touchstart', function(e) {//
                            //$(this).css('background','#E3E3E3');
                            e.preventDefault();
                        });
                        setTimeout(function() {
                            bindTjdModalEvent(opts);
                        }, 17);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
                        //},500);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
                        showModalDom();
                    },

                    hideTjdTipModal: function() {
                        _this.isShowTipModal = false;
                        $(tjdModalEntity.tjd_tip_class).hide();
                    },
                });
            },
            go2Protocal:function () {
                location.href = util.constants.tcapiWebUrl+'app/userAgreement';
            }

        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    .tjd-tip-wrapper {
        display: none;
    }

    .tjd-tip-contianer {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: -webkit-flex;
        display: flex;
        display: -webkit-box;
        display: -moz-box;
        align-items: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -webkit-box-align: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        z-index: 999;
    }

    .tjd-tip-window {
        padding: 1.8em 0 1em;
        background: #fff;
        width: 80%;
        border-radius: 10px;
    }
    .tjd-tip-title{
        width: 100%;
        font-size: 15px;
        text-align:center;
        color: #666;
        letter-spacing: 1px;
        margin-bottom: 1em;
    }
    .tjd-protocal-content{
        padding: 2.2em 0;
        margin: 0 12% 1em;
        color: #6e6e6e;
        font-size: 12px;
        line-height: 150%;
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        letter-spacing: 1px;
        p{
            margin-bottom: 0.8em;
            span{
                color: #63c4f1;
                border-bottom: 1px solid #63c4f1;
            }
        }
        p:last-child{
            margin-bottom: 0;
        }
    }
    .tjd-tip-content {
        padding: 1.5em 1.7em;
        line-height: 150%;
        text-align: center;
        font-size: 14px;
        color: #323232;
    }

    .tjd-tip-footer {
        width: 100%;
        text-align: center;
    }

    .tjd-tip-footer button {
        -webkit-appearance: normal;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 18px 0px 18px;
        width: 120px;
        text-align: center;
        overflow: hidden;
        outline: none;
        background-color: #fff;
        font-size: 14px;
        color: #999;
        border: none;
        box-sizing: border-box;
    }

    .tjd-tip-footer button.tjd_tip_confirmBtn {
        background: url("../../assets/images/dialog/agreedto_normal.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
    }
    .tjd-tip-footer button.tjd_tip_cancelBtn {
        background: url("../../assets/images/dialog/refusedto_normal.png") no-repeat;
        background-size: 100% 100%;
        color: #a9a9a9;
    }
    .tjd-tip-footer button.only {
        background: url("../../assets/images/dialog/agreedto_normal.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
    }
    /* 可以设置弹框进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .scale-fade-enter-active {
        transition: all .4s ease;
    }
    .scale-fade-leave-active {
        transition: all .2s ease-out;
    }
    .scale-fade-enter{
        opacity: 0;
        transform: scale(0.9,0.9);
    }
    .scale-fade-leave-to{
        opacity: 0;
        transform: scale(0.9,0.9);
    }


    @media screen and (max-width:320px) {
        .tjd-tip-content {
            padding: 1em 0 0.7em;
        }
        .tjd-tip-footer {
            padding-bottom: 0.3em;
        }
    }
</style>