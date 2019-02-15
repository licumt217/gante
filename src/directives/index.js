/**
 * Created by liq on 2017/8/17.
 */
import Vue from 'vue'

Vue.directive('title', {
    inserted: function (el, binding) {

        if(typeof AlipayJSBridge!='undefined'){
            AlipayJSBridge.call('setTitle', {
                title: binding.value,
            });
        }else{
            document.title = binding.value
        }


    }
})