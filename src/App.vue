<template>
    <div class="outerContainer">
        <tjd-tip-modal></tjd-tip-modal>
        <modal v-show="isShowModal" v-bind="this.modalInfo"></modal>

        <router-view class="view"></router-view>

    </div>

</template>
<script type="text/ecmascript-6">
    import { util } from 'util'
    import store from './store'
    import Modal from './components/modal/Modal.vue'
    require('./assets/js/cnzz/cnzz')

    export default{
        store,
        components: {
            Modal
        },
        data(){
            return {
                modalInfo:null
            }
        },
        computed: {
            isShowModal(){
                return this.$store.getters.isShowModal;
            },
        },
        methods: {
            showTjdModal(params){
                if (params) {
                    this.modalInfo=params;
                }
                this.$store.commit('isShowModal', true)

            },
            hideTjdModal(){
                this.$store.commit('isShowModal', false)
                this.modalInfo = null  //此句必不可少，不然在直接用store调用的弹窗和用this.$parent.showTjdModal  之间会有信息互冲
            }
        }
    }

</script>
<style lang="less">
    @import 'assets/css/common.less';

    .outerContainer {
        height: 100%;
    }
</style>
