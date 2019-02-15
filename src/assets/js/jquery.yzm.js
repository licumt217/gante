/**
 * Created by liqiang on 2017/6/2.
 */

//----------------------------------------------------------------------------------------

import {util} from './tjdUtils'
import {tjdServices} from './tjdServices'
import store from '../../store'
$.extend({
    initYzm: function (options) {
        var defaults={
            phoneClass:'yzm-phone',//手机号
            yzmBtnClass:'yzm-get-yzm',//获取验证码按钮
            yzmClass:'yzm-yzm',//验证码
            nextBtnClass:'yzm-btn',//下一步按钮
            wait:59,
            getYzmText:'获取验证码',
            getYzmActiveClass:'active_yzm',
            getYzmInActiveClass:'inactive_yzm',
            nextActiveClass:'next_active',
            nextInActiveClass:'next_inactive',
        }
        var opts= $.extend({},defaults,options);
        var that=this,isEnableYzm=false,wait=opts.wait;


        $('.'+opts.yzmBtnClass).click(function (e) {
            if(isEnableYzm){
                var phone=$("."+opts.phoneClass).val();
                //验证手机号格式
                if(!util.validates.isValidPhone(phone)){
                    setTimeout(function () {
                        store.commit('modalErrorMsg',"请输入正确的手机号码")
                        store.commit('modalType',2)
                        store.commit('isShowModal',true)


                    },600)
                }else{
                    getRealYzm(phone);
                    util.focus(opts.yzmClass,e);
                }

            }
        });

        $("."+opts.phoneClass).bind('keyup input', function () {
            if(!util.isEmpty(getPhone()) && getPhone().length===11){
                isEnableYzm=true;
                activeGetYzm();
            }else{
                isEnableYzm=false;
                inActiveGetYzm();

            }
            isEnableNextBtn();
        });
        $("."+opts.yzmClass).bind('keyup input', function () {
            isEnableNextBtn();
        });

        inActiveGetYzm();
        inActiveNext();

        function isEnableNextBtn(){
            if(!util.isEmpty(getPhone()) && !util.isEmpty(getYzm()) && getPhone().length===11 && getYzm().length>=4){
                activeNext();

            }else{
                inActiveNext();
            }
        }

        function activeGetYzm(){
            $("."+opts.yzmBtnClass).addClass(opts.getYzmActiveClass).removeClass(opts.getYzmInActiveClass)
            $("."+opts.yzmBtnClass).attr('disabled',false);
        }
        function inActiveGetYzm(){
            $("."+opts.yzmBtnClass).addClass(opts.getYzmInActiveClass).removeClass(opts.getYzmActiveClass)
            $("."+opts.yzmBtnClass).attr('disabled',true);
        }

        function activeNext(){
            $("."+opts.nextBtnClass).attr('disabled',false);
            $("."+opts.nextBtnClass).addClass(opts.nextActiveClass).removeClass(opts.nextInActiveClass)
        }

        function inActiveNext(){
            $("."+opts.nextBtnClass).attr('disabled',true);
            $("."+opts.nextBtnClass).addClass(opts.nextInActiveClass).removeClass(opts.nextActiveClass)
        }

        function getPhone(){
            return $("."+opts.phoneClass).val();
        }
        function getYzm(){
            return $("."+opts.yzmClass).val();
        }

        function disablePhone(){
            $("."+opts.phoneClass).attr("disabled",true);
        }
        function enablePhone(){
            $("."+opts.phoneClass).attr("disabled",false);
        }

        function getRealYzm(phone) {

            tjdServices.request({
                method:'getPhoneCode',
                phone:phone
            }).then(function(data){
                isEnableYzm=false;
                inActiveGetYzm();
                disablePhone();
                time($("."+opts.yzmBtnClass)[0]);
            });
        }

        function time(o,sign){
            clearTimeout(sign);
            if (wait === 0) {
                o.innerHTML = opts.getYzmText;
                wait = opts.wait;
                isEnableYzm=true;
                activeGetYzm();
                enablePhone()
            } else {
                if(util.isEmpty(wait)){
                    wait = opts.wait;
                }
                o.innerHTML ="已发送("+wait + "s)";
                wait--;
                var timeoutSign = setTimeout(function () {
                    time(o,timeoutSign);
                },1000)
            }
        }

    }
});

